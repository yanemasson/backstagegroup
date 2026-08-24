import {API_CONFIG} from './config';
import {fetchJson} from './requestCache';
import {getTodayISODate} from '../utils/getTodayISODate';
import {DrupalNode, DrupalResponse} from './types';
import {Event} from '../types/events/event';
import {Track} from '../types/events/track';
import {Artist} from '../types/events/artist';
import {Program} from '../types/events/program';
import {InformationItem} from "../types/events/information_item.ts";

type IncludedIndex = Map<string, DrupalNode>;

const indexIncluded = (included?: DrupalNode[]): IncludedIndex => {
    const index: IncludedIndex = new Map();

    for (const item of included ?? []) {
        index.set(`${item.type}|${item.id}`, item);
    }

    return index;
};

const getIncluded = (index: IncludedIndex, type: string, id?: string): DrupalNode | undefined =>
    id ? index.get(`${type}|${id}`) : undefined;

class DrupalParser {
    static getFieldValue(attributes: Record<string, unknown>, fieldName: string): string | number | null {
        const field = attributes[fieldName];
        if (!field) return null;

        if (typeof field === 'object' && 'data' in field) {
            const fieldData = field as { data?: { type?: string; id?: string } };
            if (fieldData.data && fieldData.data.type === 'file--file') {
                return fieldData.data.id || null;
            }
        }

        if (typeof field === 'string' || typeof field === 'number') {
            return field;
        }

        if (typeof field === 'object' && 'value' in field) {
            const fieldValue = (field as { value: unknown }).value;
            if (typeof fieldValue === 'string' || typeof fieldValue === 'number') {
                return fieldValue;
            }
        }

        if (Array.isArray(field) && field.length > 0) {
            const firstItem = field[0];
            if (typeof firstItem === 'object' && firstItem !== null && 'value' in firstItem) {
                const itemValue = (firstItem as { value: unknown }).value;
                if (typeof itemValue === 'string' || typeof itemValue === 'number') {
                    return itemValue;
                }
            }
            if (typeof firstItem === 'string' || typeof firstItem === 'number') {
                return firstItem;
            }
        }
        return null;
    }

    private static getFileUrl(index: IncludedIndex, fileId?: string): string {
        const fileData = getIncluded(index, 'file--file', fileId);
        const url = fileData?.attributes?.uri?.url;

        if (!url) return '';

        return url.startsWith('/') ? `${API_CONFIG.drupal.baseUrl}${url}` : url;
    }

    private static getRelatedFileUrl(
        relationships: DrupalNode['relationships'],
        field: string,
        index: IncludedIndex
    ): string {
        return this.getFileUrl(index, relationships?.[field]?.data?.id);
    }

    private static getRelatedIds(relationships: DrupalNode['relationships'], field: string): string[] {
        const data = relationships?.[field]?.data;

        return Array.isArray(data) ? data.map((ref: { id: string }) => ref.id) : [];
    }

    private static parseTrackList(
        relationships: DrupalNode['relationships'],
        index: IncludedIndex
    ): Track[] {
        return this.getRelatedIds(relationships, 'field_tracklist_new')
            .map(id => getIncluded(index, 'paragraph--track', id))
            .filter((node): node is DrupalNode => node !== undefined)
            .map(node => ({
                title: this.getFieldValue(node.attributes, 'field_title')?.toString() || '',
                artist: this.getFieldValue(node.attributes, 'field_artist')?.toString() || '',
                source: this.getFieldValue(node.attributes, 'field_source')?.toString() || '',
            }));
    }

    private static parseInformation(
        relationships: DrupalNode['relationships'],
        index: IncludedIndex,
        field: string,
        paragraphType: string
    ): InformationItem[] {
        return this.getRelatedIds(relationships, field)
            .map(id => getIncluded(index, paragraphType, id))
            .filter((node): node is DrupalNode => node !== undefined)
            .map(node => ({
                title: this.getFieldValue(node.attributes, 'field_information_title')?.toString() || '',
                photo: this.getRelatedFileUrl(node.relationships, 'field_photo', index),
                text: this.getFieldValue(node.attributes, 'field_text')?.toString() || '',
            }))
            .filter(item => item.title || item.text || item.photo);
    }

    private static parseArtists(
        relationships: DrupalNode['relationships'],
        index: IncludedIndex
    ): Artist[] {
        return this.getRelatedIds(relationships, 'field_artists')
            .map(id => getIncluded(index, 'node--artist', id))
            .filter((node): node is DrupalNode => node !== undefined)
            .map(node => ({
                photo: this.getRelatedFileUrl(node.relationships, 'field_photo', index),
                name: node.attributes?.field_name || '',
                role: node.attributes?.field_role || 'Вокал',
            }));
    }

    private static parseMediaItems(
        relationships: DrupalNode['relationships'],
        index: IncludedIndex,
        field: string,
        paragraphType: string,
        fileField: string
    ): string[] {
        return this.getRelatedIds(relationships, field)
            .map(id => getIncluded(index, paragraphType, id))
            .filter((node): node is DrupalNode => node !== undefined)
            .map(node => this.getRelatedFileUrl(node.relationships, fileField, index))
            .filter(url => url !== '');
    }

    static parseEvent(node: DrupalNode, included?: DrupalNode[]): Event {
        const {attributes, relationships} = node;
        const index = indexIncluded(included);

        const locationPhotos = this.getRelatedIds(relationships, 'field_location_photos')
            .map(id => this.getFileUrl(index, id))
            .filter(url => url !== '');

        return {
            title: attributes.title || '',
            poster: this.getRelatedFileUrl(relationships, 'field_poster', index),
            video: this.getRelatedFileUrl(relationships, 'field_video', index),
            date: attributes.field_date || '',
            city: attributes.field_city || '',
            location: attributes.field_location || '',
            address: attributes.field_address || '',
            descriptionShort: attributes.field_description_short || '',
            descriptionFull: attributes.field_description_full || '',
            duration: attributes.field_duration || '',
            age: attributes.field_age?.toString() || '',
            artistsTeam: attributes.field_artists_team || '',
            artistsSubTitle: attributes.field_artist_subtitle || '',
            artistsGroupPhoto: this.getRelatedFileUrl(relationships, 'field_artists_group_photo', index),
            eventId: attributes.field_event_id?.toString() || '',
            locationPhotos,
            tag: attributes.field_tag || '',
            trackList: this.parseTrackList(relationships, index),
            artists: this.parseArtists(relationships, index),
            operator: attributes.field_operator,
            program: attributes.field_program,
            information: this.parseInformation(
                relationships, index, 'field_information', 'paragraph--events_iformation_item'
            ),
            photos: [],
            videos: [],
            orgId: attributes.field_org_id || '',
            eventLink: attributes.field_event_link || '',
        };
    }

    static parseProgram(node: DrupalNode, included?: DrupalNode[]): Program {
        const {attributes, relationships} = node;
        const index = indexIncluded(included);

        return {
            title: attributes.title || '',
            poster: this.getRelatedFileUrl(relationships, 'field_poster', index),
            video: this.getRelatedFileUrl(relationships, 'field_video', index),
            descriptionShort: attributes.field_description_short || '',
            descriptionFull: attributes.field_description_full || '',
            duration: attributes.field_duration || '',
            age: attributes.field_age?.toString() || '',
            url: attributes.field_url || '',
            tag: attributes.field_tag || '',
            trackList: this.parseTrackList(relationships, index),
            information: this.parseInformation(
                relationships, index, 'field_program_information', 'paragraph--events_iformation_item'
            ),
            photos: this.parseMediaItems(
                relationships, index, 'field_photos', 'paragraph--photos_item', 'field_photos_item_'
            ),
            videos: this.parseMediaItems(
                relationships, index, 'field_videos', 'paragraph--videos_item', 'field_videos_item'
            ),
        };
    }
}


export interface EventsQuery {
    /** Только предстоящие события (дата >= сегодня). Фильтрация на стороне Drupal. */
    upcomingOnly?: boolean;
    /** Максимальное число событий, которое вернёт сервер. */
    limit?: number;
}

export class DrupalAPI {
    private static readonly FILE_FIELDS = 'fields[file--file]=uri,url,filename';
    private static readonly EVENT_INCLUDES = 'include=field_poster,field_video';

    private static request<T>(resource: string, params: string[] = []): Promise<T> {
        const query = params.filter(Boolean).join('&');
        const url = `${API_CONFIG.drupal.baseUrl}${API_CONFIG.drupal.jsonApiPath}${resource}${query ? `?${query}` : ''}`;

        return fetchJson<T>(url, {errorLabel: 'Drupal API Error'});
    }


    private static eventsQueryParams({upcomingOnly, limit}: EventsQuery = {}): string[] {
        const params = ['sort=field_date'];

        if (upcomingOnly) {
            params.push(
                'filter[upcoming][condition][path]=field_date',
                'filter[upcoming][condition][operator]=>=',
                `filter[upcoming][condition][value]=${getTodayISODate()}`,
            );
        }

        if (limit) {
            params.push(`page[limit]=${limit}`);
        }

        return params;
    }

    private static toNodes(data: DrupalResponse['data']): DrupalNode[] {
        return Array.isArray(data) ? data : [data];
    }

    static async getPrograms(): Promise<Program[]> {
        try {
            const response = await this.request<DrupalResponse>('/node/program', [
                'include=field_poster,field_video',
                this.FILE_FIELDS,
            ]);

            return this.toNodes(response.data).map(node => DrupalParser.parseProgram(node, response.included));
        } catch (error) {
            console.error('Error fetching programs:', error);
            throw error;
        }
    }

    static async getProgramByUrl(link: string): Promise<Program | null> {
        try {
            const data = await this.request<DrupalResponse>('/node/program', [
                `filter[field_link]=${link}`,
                'include=field_poster,field_video,field_program_information,field_program_information.field_photo,field_photos,field_photos.field_photos_item_,field_videos,field_videos.field_videos_item',
                this.FILE_FIELDS,
            ]);

            const nodes = this.toNodes(data.data);
            if (!nodes.length || !nodes[0]) return null;

            return DrupalParser.parseProgram(nodes[0], data.included);
        } catch (error) {
            console.error('Error fetching program by url:', error);
            return null;
        }
    }

    private static async fetchEvents(
        filter: string,
        query: EventsQuery,
        errorContext: string
    ): Promise<Event[]> {
        try {
            const data = await this.request<DrupalResponse>('/node/concert', [
                filter,
                this.EVENT_INCLUDES,
                this.FILE_FIELDS,
                ...this.eventsQueryParams(query),
            ]);

            return this.toNodes(data.data).map(node => DrupalParser.parseEvent(node, data.included));
        } catch (error) {
            console.error(`Error fetching ${errorContext}:`, error);
            throw error;
        }
    }

    static getEvents(query: EventsQuery = {}): Promise<Event[]> {
        return this.fetchEvents('', query, 'events');
    }

    static getEventsByProgram(program: string | undefined, query: EventsQuery = {}): Promise<Event[]> {
        return this.fetchEvents(`filter[field_program]=${program}`, query, 'events by program');
    }

    static getEventsByCity(cityName: string, query: EventsQuery = {}): Promise<Event[]> {
        const filter = cityName === 'Все города'
            ? ''
            : `filter[field_city]=${encodeURIComponent(cityName)}`;

        return this.fetchEvents(filter, query, 'events by city');
    }

    static async getEventByEventId(eventId: string): Promise<Event | null> {
        try {
            const data = await this.request<DrupalResponse>('/node/concert', [
                `filter[field_event_id]=${eventId}`,
                'include=field_poster,field_video,field_artists_group_photo,field_location_photos,field_tracklist_new,field_information,field_information.field_photo,field_artists,field_artists.field_photo',
                this.FILE_FIELDS,
            ]);

            const nodes = this.toNodes(data.data);
            if (!nodes.length || !nodes[0]) return null;

            return DrupalParser.parseEvent(nodes[0], data.included);
        } catch (error) {
            console.error('Error fetching event by ID:', error);
            return null;
        }
    }

    static async getCities(): Promise<string[]> {
        try {
            const data = await this.request<DrupalResponse>('/node/concert', [
                'fields[node--concert]=field_city',
            ]);

            const cities = this.toNodes(data.data)
                .map(node => {
                    const city = node.attributes.field_city;
                    return typeof city === 'string' ? city.trim() : '';
                })
                .filter(city => city !== '');

            return [...new Set(cities)].sort();
        } catch (error) {
            console.error('Error fetching cities:', error);
            throw error;
        }
    }
}
