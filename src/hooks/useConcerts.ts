import { useState, useEffect } from 'react';
import {Concert, Track} from "../types/Concert.ts";

export const useConcerts = () => {
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [error, setError] = useState<string | null>(null);

    const parseMultilineField = (content: string, fieldName: string): string => {
        const regex = new RegExp(`${fieldName}:\\s*>-\\s*\\n((\\s{2,}.*\\n?)*)`);
        const match = content.match(regex);
        if (match && match[1]) {
            return match[1]
                .split('\n')
                .map(line => line.trim())
                .filter(line => line)
                .join('\n');
        }
        return '';
    };
    const parseArrayField = (content: string, fieldName: string): string[] => {
        const regex = new RegExp(`${fieldName}:\\s*\\n((\\s{2,}-.*\\n?)*)`);
        const match = content.match(regex);
        if (match && match[1]) {
            return match[1]
                .split('\n')
                .map(line => line.trim().replace(/^-\s*/, ''))
                .filter(line => line);
        }
        return [];
    };
    const parseTrackList = (content: string): Track[] => {
        const regex = new RegExp(`tracks:\\s*\\n((\\s{2,}-.*\\n?)*)`);
        const match = content.match(regex);
        if (match && match[1]) {
            const tracksYaml = match[1];
            const tracks: Track[] = [];
            let currentTrack: Partial<Track> = {};

            tracksYaml.split('\n').forEach(line => {
                line = line.trim();
                if (!line) return;

                if (line.startsWith('-')) {
                    if (Object.keys(currentTrack).length > 0) {
                        tracks.push(currentTrack as Track);
                    }
                    currentTrack = {};
                } else {
                    const musicianMatch = line.match(/musician:\s*(.*)/);
                    const compositionMatch = line.match(/composition:\s*(.*)/);

                    if (musicianMatch) {
                        currentTrack.musician = musicianMatch[1].trim();
                    }
                    if (compositionMatch) {
                        currentTrack.composition = compositionMatch[1].trim();
                    }
                }
            });

            // Добавляем последний трек
            if (Object.keys(currentTrack).length > 0) {
                tracks.push(currentTrack as Track);
            }

            return tracks;
        }
        return [];
    };

    useEffect(() => {
        const loadConcerts = async () => {
            try {
                const concertFiles = import.meta.glob('/content/concerts/*.md', {
                    eager: true,
                    as: 'raw'
                });

                const loadedConcerts: Concert[] = [];

                for (const path in concertFiles) {
                    try {
                        const fileContent = concertFiles[path];
                        const content = fileContent.trim();
                        const frontMatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

                        if (frontMatterMatch) {
                            const frontMatter = frontMatterMatch[1];

                            // простые поля
                            const simpleFields = {
                                title: frontMatter.match(/title:\s*(.*)/)?.[1]?.trim(),
                                city: frontMatter.match(/city:\s*(.*)/)?.[1]?.trim(),
                                location: frontMatter.match(/location:\s*(.*)/)?.[1]?.trim(),
                                date: frontMatter.match(/date:\s*(.*)/)?.[1]?.trim(),
                                poster: frontMatter.match(/poster:\s*(.*)/)?.[1]?.trim(),
                                url: frontMatter.match(/url:\s*(.*)/)?.[1]?.trim()

                            };

                            // многострочные поля
                            const descriptionShort = frontMatter.match(/descriptionShort:\s*(.*?)(?=\n\w|$)/s)?.[1]?.trim() || '';
                            const descriptionFull = parseMultilineField(frontMatter, 'descriptionFull');

                            const concert: Concert = {
                                ...simpleFields,
                                date: new Date(simpleFields.date || ''),
                                descriptionShort,
                                descriptionFull,
                                videos: frontMatter.match(/videos:/i) ?
                                    parseArrayField(frontMatter, 'videos') : [],
                                photos: frontMatter.match(/photos:/i) ?
                                    parseArrayField(frontMatter, 'photos') : [],
                                trackListType: frontMatter.match(/trackListType:\s*(.*)/)?.[1] as 'playlist' | 'tracks' | undefined,
                                playlistUrl: frontMatter.match(/playlistUrl:\s*(.*)/)?.[1]?.trim() || '',
                                trackList: frontMatter.match(/tracks:/i) ?
                                    parseTrackList(frontMatter) : undefined,
                            };

                            loadedConcerts.push(concert);
                        }
                    } catch (err) {
                        console.error(`Error processing concert file ${path}:`, err);
                    }
                }

                const sortedConcerts = loadedConcerts.sort((a, b) =>
                    b.date.getTime() - a.date.getTime()
                );

                setConcerts(sortedConcerts);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ошибка загрузки концертов');
                console.error('Error loading concerts:', err);
            }
        };

        loadConcerts();
    }, []);

    return { concerts, error };
};

export default useConcerts;