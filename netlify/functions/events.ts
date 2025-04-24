import { Handler } from '@netlify/functions';
import fs from 'fs';
import path from 'path';
import { Event } from '../../src/types/event';
import {parseTrackList} from "../../src/hooks/cms/utils/parseTrackList";
import {parseArrayField} from "../../src/hooks/cms/utils/parseArrayField";
import {parseArtists} from "../../src/hooks/cms/utils/parseArtists";

let eventsCache: Event[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;

const handler: Handler = async () => {
    try {
        // Проверяем кэш
        const now = Date.now();
        if (!eventsCache || now - lastCacheTime > CACHE_TTL) {
            const eventsDirectory = path.join(__dirname, '../../content/events');

            const fileNames = fs.readdirSync(eventsDirectory);
            const eventFiles = fileNames.filter(fileName => fileName.endsWith('.md'));
            const loadedEvents: Event[] = [];

            for (const fileName of eventFiles) {
                const filePath = path.join(eventsDirectory, fileName);
                const fileContent = fs.readFileSync(filePath, 'utf8').trim();

                const frontMatterMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);

                if (frontMatterMatch) {
                    const frontMatter = frontMatterMatch[1];

                    const event: Event = {
                        title: frontMatter.match(/title:\s*(.*)/)?.[1]?.trim().replace(/['"]/g, '') || '',
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
                        video: frontMatter.match(/video:\s*(.*)/)?.[1]?.trim() || '',
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
                        photos: frontMatter.match(/photos:/i) ?
                            parseArrayField(frontMatter, 'photos') : undefined,
                    };

                    loadedEvents.push(event);
                }
            }

            eventsCache = loadedEvents.sort((a, b) => a.date.localeCompare(b.date));
            lastCacheTime = now;
        }

        // Возвращаем весь список событий
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Для CORS
            },
            body: JSON.stringify(eventsCache)
        };

    } catch (error: unknown) {
        let errorMessage = 'Неизвестная ошибка';

        // Проверяем, является ли ошибка объектом с сообщением
        if (error && typeof error === 'object' && 'message' in error) {
            errorMessage = String(error.message);
        } else if (error && typeof error === 'string') {
            errorMessage = error;
        }

        console.error('Ошибка при получении событий:', errorMessage);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Ошибка при получении списка событий',
                error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
            })
        };
    }
};

export { handler };