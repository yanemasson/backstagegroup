import { useState, useEffect } from 'react';
import {Artist, Event, Track} from "../../types/event.ts";
import {parseArrayField} from "./utils/parseArrayField.ts";
import {getCurrentDateString} from "./utils/getCurrentDateString.ts";

export const useEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true)

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
                const sourceMatch = trackString.match(/\s*source:\s*([^\n]+)/);
                if (musicianMatch?.[1] && compositionMatch?.[1] && sourceMatch?.[1]) {
                    if (musicianMatch && compositionMatch && sourceMatch) {
                        tracks.push({
                            musician: musicianMatch[1].trim()?.replace(/['"]/g, ''),
                            composition: compositionMatch[1].trim()?.replace(/['"]/g, ''),
                            source: sourceMatch[1].trim()?.replace(/['"]/g, '')
                        });
                    }
                }
            });
            return tracks;
        }
        return [];
    };

    const parseArtists = (content: string): Artist[] => {
        const regex = /artists:\s*(\n\s*-[^]*?)(?=\n\w|$)/;
        const match = content.match(regex);
        if (match && match[1]) {
            const artistsSection = match[1];
            const artists: Artist[] = [];
            const artistStrings = artistsSection
                .split('\n  -')
                .filter(str => str.trim());

            artistStrings.forEach(artistString => {
                const nameMatch = artistString.match(/\s*name:\s*([^\n]+)/);
                const photoMatch = artistString.match(/\s*photo:\s*([^\n]+)/);
                const roleMatch = artistString.match(/\s*role:\s*([^\n]+)/);
                if (nameMatch?.[1] && photoMatch?.[1] && roleMatch?.[1]) {
                    if (nameMatch && photoMatch && roleMatch) {
                        artists.push({
                            name: nameMatch[1].trim()?.replace(/['"]/g, ''),
                            photo: photoMatch[1].trim()?.replace(/['"]/g, ''),
                            role: roleMatch[1].trim()?.replace(/['"]/g, '')
                        });
                    }
                }
            });
            return artists;
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
                        title: frontMatter.match(/title:\s*(.*)/)?.[1]?.trim() || ''
                            ?.replace(/['"]/g, ''),
                        city: frontMatter.match(/city:\s*(.*)/)?.[1]?.trim() || '',
                        location: frontMatter.match(/location:\s*(.*)/)?.[1]?.trim() || '',
                        address: frontMatter.match(/address:\s*(.*)/)?.[1]?.trim() || '',
                        descriptionShort: frontMatter.match(/descriptionShort:\s*(.*?)(?=\n\w|$)/s)?.[1]?.trim() || '',
                        descriptionFull: frontMatter.match(/descriptionFull:\s*([\s\S]*?)(?=\n\w+:|$)/)?.[1]
                            ?.replace(/^\|-?\s*/, '')
                            ?.replace(/['"]/g, '')
                            ?.replace(/\|/g, '')
                            ?.replace(/>-/g, '')
                            ?.split('\n')
                            .map(line => line.trim())
                            .join('\n')
                            ?.trim() || '',
                        video: frontMatter.match(/video:\s*(.*)/)?.[1]?.trim() || '',
                        photos: frontMatter.match(/photos:/i) ?
                            parseArrayField(frontMatter, 'photos') : [],
                        trackList: frontMatter.match(/tracks:/i) ?
                            parseTrackList(frontMatter) : undefined,
                        eventId: Number(frontMatter.match(/eventId:\s*(\d+)/)?.[1]) || 0,
                        date: frontMatter.match(/date:\s*(.*)/)?.[1]?.trim() || '',
                        age: Number(frontMatter.match(/age:\s*(\d+)/)?.[1]) || 6,
                        artists: frontMatter.match(/artists:/i) ?
                            parseArtists(frontMatter) : undefined,
                        artistsTeam: frontMatter.match(/artistsTeam:\s*(.*)/)?.[1]?.trim() || ''
                    };
                    loadedEvents.push(event);
                }
            }
            const sortedEvents = loadedEvents
                .filter(a => a.date >= getCurrentDateString())
                .sort((a, b) => a.date.localeCompare(b.date)
            );
            setEvents(sortedEvents);
        };
        loadEvents();
        setIsLoading(false)
    }, [isLoading, setIsLoading]);
    return { events, isLoading };
};

export default useEvents;