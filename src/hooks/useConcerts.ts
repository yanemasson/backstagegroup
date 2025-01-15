import { useState, useEffect } from 'react';
import {Concert, Track} from "../types/concert.ts";

export const useConcerts = () => {
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const parseTrackList = (content: string): Track[] => {
        const regex = /tracks:\s*(\n\s*-[^]*?)(?=\n\w|$)/;
        const match = content.match(regex);
        if (match && match[1]) {
            const tracksSection = match[1];
            const tracks: Track[] = [];
            const trackStrings = tracksSection
                .split('\n  -')
                .filter(str => str.trim());

            trackStrings.forEach(trackString => {
                const musicianMatch = trackString.match(/\s*musician:\s*([^\n]+)/);
                const compositionMatch = trackString.match(/\s*composition:\s*([^\n]+)/);
                if (musicianMatch?.[1] && compositionMatch?.[1]) {
                    if (musicianMatch && compositionMatch) {
                        tracks.push({
                            musician: musicianMatch[1].trim(),
                            composition: compositionMatch[1].trim()
                        });
                    }
                }
            });
            return tracks;
        }
        return [];
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
    useEffect(() => {
        const loadConcerts = async () => {
            const concertFiles = import.meta.glob('/content/concerts/*.md', {
                eager: true,
                as: 'raw'
            });
            const loadedConcerts: Concert[] = [];
            for (const path in concertFiles) {
                const fileContent = concertFiles[path];
                const content = fileContent.trim();
                const frontMatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
                if (frontMatterMatch) {
                    const frontMatter = frontMatterMatch[1];
                    const concert: Concert = {
                        title: frontMatter.match(/title:\s*(.*)/)?.[1]?.trim() || '',
                        city: frontMatter.match(/city:\s*(.*)/)?.[1]?.trim() || '',
                        location: frontMatter.match(/location:\s*(.*)/)?.[1]?.trim() || '',
                        date: frontMatter.match(/date:\s*(.*)/)?.[1]?.trim() || '',
                        poster: frontMatter.match(/poster:\s*(.*)/)?.[1]?.trim() || '',
                        url: frontMatter.match(/url:\s*(.*)/)?.[1]?.trim(),
                        descriptionShort: frontMatter.match(/descriptionShort:\s*(.*?)(?=\n\w|$)/s)?.[1]?.trim() || '',
                        descriptionFull: frontMatter.match(/descriptionFull:\s*(.*?)(?=\n\w|$)/s)?.[1]?.trim() || '',
                        videos: frontMatter.match(/videos:/i) ?
                            parseArrayField(frontMatter, 'videos') : [],
                        photos: frontMatter.match(/photos:/i) ?
                            parseArrayField(frontMatter, 'photos') : [],
                        trackList: frontMatter.match(/tracks:/i) ?
                            parseTrackList(frontMatter) :
                            undefined,
                        trackListType: frontMatter.match(/trackListType:\s*(.*)/)?.[1] as 'playlist' | 'tracks' | undefined,
                        playlistUrl: frontMatter.match(/playlistUrl:\s*(.*)/)?.[1]?.trim() || '',
                    };
                    loadedConcerts.push(concert);
                }
            }
            const sortedConcerts = loadedConcerts.sort((a, b) =>
                a.date.localeCompare(b.date)
            );
            setConcerts(sortedConcerts);
        };
        loadConcerts();
    }, []);
    return { concerts };
};

export default useConcerts;