import { useState, useEffect } from 'react';
import {Event} from "../../types/event.ts";
import {parseArrayField} from "./utils/parseArrayField.ts";
import {getCurrentDateString} from "./utils/getCurrentDateString.ts";
import {parseArtists} from "./utils/parseArtists.ts";
import {parseTrackList} from "./utils/parseTrackList.ts";

export const useEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true)

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
                        poster: frontMatter.match(/poster:\s*(.*)/)?.[1]?.trim() || '',
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
                        video: frontMatter.match(/video:\s*(.*)/)?.[1].trim() || '',
                        locationPhotos: frontMatter.match(/location_photos:/i) ?
                            parseArrayField(frontMatter, 'location_photos') : [],
                        trackList: frontMatter.match(/tracks:/i) ?
                            parseTrackList(frontMatter) : undefined,
                        eventId: Number(frontMatter.match(/eventId:\s*(\d+)/)?.[1]) || 0,
                        date: frontMatter.match(/date:\s*(.*)/)?.[1]?.trim() || '',
                        age: Number(frontMatter.match(/age:\s*(\d+)/)?.[1]) || 6,
                        artists: frontMatter.match(/artists:/i) ?
                            parseArtists(frontMatter) : undefined,
                        artistsTeam: frontMatter.match(/artists_team:\s*(.*)/)?.[1]?.trim() || '',
                        artistsGroupPhoto: frontMatter.match(/artists_group_photo:\s*(.*)/)?.[1]?.trim() || '',
                        duration: frontMatter.match(/duration:\s*(.*)/)?.[1]?.trim() || '',
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