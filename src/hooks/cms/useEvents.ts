import { useState, useEffect } from 'react';
import {Event, Concert, Track} from "../../types/event.ts";

export const useEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const parseConcerts = (frontMatter: string): Concert[] => {
        const concertsMatch = frontMatter.match(/concerts:\s*([\s\S]*?)(?=\n\w+:|$)/);
        if (!concertsMatch) return [];
        const concertsText = concertsMatch[1];
        const concertEntries = concertsText.split(/\n\s*-\s*/).filter(Boolean);
        return concertEntries.map(entry => {
            const dateMatch = entry.match(/date:\s*(.+)/);
            const date = dateMatch ? dateMatch[1].trim() : '';
            const eventIdMatch = entry.match(/eventId:\s*(\d+)/);
            const eventId = eventIdMatch ? Number(eventIdMatch[1]) : 0;
            return { date, eventId };
        });
    };

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
                const durationMatch = trackString.match(/\s*duration:\s*([^\n]+)/);
                if (musicianMatch?.[1] && compositionMatch?.[1] && durationMatch?.[1]) {
                    if (musicianMatch && compositionMatch && durationMatch) {
                        tracks.push({
                            musician: musicianMatch[1].trim(),
                            composition: compositionMatch[1].trim(),
                            duration: durationMatch[1].trim()
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
        const loadEvents = async () => {
            const eventFiles = import.meta.glob('/content/events/*.md', {
                eager: true,
                as: 'raw'
            });
            const loadedEvents: Event[] = [];
            for (const path in eventFiles) {
                const fileContent = eventFiles[path];
                const content = fileContent.trim();
                const frontMatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
                if (frontMatterMatch) {
                    const frontMatter = frontMatterMatch[1];
                    const event: Event = {
                        title: frontMatter.match(/title:\s*(.*)/)?.[1]?.trim() || '',
                        city: frontMatter.match(/city:\s*(.*)/)?.[1]?.trim() || '',
                        location: frontMatter.match(/location:\s*(.*)/)?.[1]?.trim() || '',
                        poster: frontMatter.match(/poster:\s*(.*)/)?.[1]?.trim() || '',
                        descriptionShort: frontMatter.match(/descriptionShort:\s*(.*?)(?=\n\w|$)/s)?.[1]?.trim() || '',
                        descriptionFull: frontMatter.match(/descriptionFull:\s*([\s\S]*?)(?=\n\w+:|$)/)?.[1]
                            ?.replace(/^\|-?\s*/, '')
                            ?.replace(/['"]/g, '')
                            ?.replace(/\|/g, '')
                            ?.split('\n')
                            .map(line => line.trim())
                            .join('\n')
                            ?.trim() || '',
                        videos: frontMatter.match(/videos:/i) ?
                            parseArrayField(frontMatter, 'videos') : [],
                        photos: frontMatter.match(/photos:/i) ?
                            parseArrayField(frontMatter, 'photos') : [],
                        trackList: frontMatter.match(/tracks:/i) ?
                            parseTrackList(frontMatter) :
                            undefined,
                        trackListType: frontMatter.match(/trackListType:\s*(.*)/)?.[1] as 'playlist' | 'tracks' | undefined,
                        playlistUrl: frontMatter.match(/playlistUrl:\s*(.*)/)?.[1]?.trim() || '',
                        concerts: parseConcerts(frontMatter) || []
                    };
                    loadedEvents.push(event);
                }
            }
            const sortedEvents = loadedEvents.sort((a, b) =>
                a.concerts[0].date.localeCompare(b.concerts[0].date)
            );
            setEvents(sortedEvents);
        };
        loadEvents();
        setIsLoading(false)
    }, [isLoading, setIsLoading]);
    return { events, isLoading };
};

export default useEvents;