import {API_CONFIG} from './config';
import {DrupalNode, DrupalResponse} from './types';
import {Event} from '../types/events/event';
import {Track} from '../types/events/track';
import {Artist} from '../types/events/artist';
import {Program} from '../types/events/program';
import {InformationItem} from "../types/events/information_item.ts";

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

    static parseEvent(node: DrupalNode, included?: any[]): Event {
        const {attributes, relationships} = node;

        let videoUrl = '';
        if (relationships?.field_video?.data) {
            const videoData = relationships.field_video.data;
            if (videoData.id) {
                videoUrl = this.getFileUrl(videoData.id, included);
            }
        }

        let posterUrl = '';
        if (relationships?.field_poster?.data) {
            const posterData = relationships.field_poster.data;
            if (posterData.id) {
                posterUrl = this.getFileUrl(posterData.id, included);
            }
        }

        let artistGroupPhotoUrl = '';
        if (relationships?.field_artists_group_photo?.data) {
            const photoData = relationships.field_artists_group_photo.data;
            if (photoData.id) {
                artistGroupPhotoUrl = this.getFileUrl(photoData.id, included);
            }
        }

        let locationPhotos: string[] = [];
        if (relationships?.field_location_photos?.data && Array.isArray(relationships.field_location_photos.data)) {
            locationPhotos = relationships.field_location_photos.data
                .map((photoRef: any) => this.getFileUrl(photoRef.id, included))
                .filter((url : string) => url !== '');
        }

        let artists: Artist[] = [];
        if (relationships?.field_artists?.data && Array.isArray(relationships.field_artists.data)) {
            artists = relationships.field_artists.data
                .map((artistRef: any) => {
                    const artistData = included?.find(item =>
                        item.type === 'node--artist' && item.id === artistRef.id
                    );

                    if (!artistData) {
                        return null;
                    }

                    // Парсинг фото артиста
                    let photoUrl = '';
                    if (artistData.relationships?.field_photo?.data?.id) {
                        photoUrl = this.getFileUrl(artistData.relationships.field_photo.data.id, included);
                    }

                    return {
                        photo: photoUrl,
                        name: artistData.attributes?.field_name || '',
                        role: artistData.attributes?.field_role || 'Вокал'
                    };
                })
                .filter((artist : Artist) => artist !== null);
        }

        let trackList: Track[] = [];
        if (relationships?.field_tracklist_new?.data && Array.isArray(relationships.field_tracklist_new.data)) {
            trackList = relationships.field_tracklist_new.data
                .map((trackRef: any) => {
                    const trackData = included?.find(item =>
                        item.type === 'paragraph--track' && item.id === trackRef.id
                    );

                    if (!trackData) {
                        return null;
                    }

                    const trackTitle = this.getFieldValue(trackData.attributes, 'field_title');
                    const trackArtist = this.getFieldValue(trackData.attributes, 'field_artist');
                    const trackSource = this.getFieldValue(trackData.attributes, 'field_source');

                    return {
                        title: trackTitle?.toString() || '',
                        artist: trackArtist?.toString() || '',
                        source: trackSource?.toString() || '',
                    };
                })
                .filter((track: Track | null): track is Track => track !== null);
        }

        let information: InformationItem[] = [];
        if (relationships?.field_information?.data && Array.isArray(relationships.field_information.data)) {
            information = relationships.field_information.data
                .map((itemRef: any) => {
                    const informationData = included?.find(item =>
                        item.type === 'paragraph--events_information_item' && item.id === itemRef.id
                    );

                    if (!informationData) {
                        return null;
                    }

                    const itemTitle = this.getFieldValue(informationData.attributes, 'field_information_title');
                    const photoId = informationData.relationships?.field_photo?.data?.id;
                    const itemPhoto = photoId ? this.getFileUrl(photoId, included) : '';
                    const itemText = this.getFieldValue(informationData.attributes, 'field_text');

                    console.log('title:', itemTitle);

                    return {
                        title: itemTitle?.toString() || '',
                        photo: itemPhoto?.toString() || '',
                        text: itemText?.toString() || '',
                    };
                })
                .filter((item: any): item is InformationItem => item !== null); // Фильтрация null
        }

        return {
            title: attributes.title || '',
            poster: posterUrl,
            video: videoUrl,
            date: attributes.field_date || '',
            city: attributes.field_city || '',
            location: attributes.field_location || '',
            address: attributes.field_address || '',
            descriptionShort: attributes.field_description_short || '',
            descriptionFull: attributes.field_description_full || '',
            duration: attributes.field_duration || '',
            age: attributes.field_age?.toString() || '',
            artistsTeam: attributes.field_artists_team || '',
            artistsGroupPhoto: artistGroupPhotoUrl,
            eventId: attributes.field_event_id?.toString() || '',
            locationPhotos: locationPhotos,
            tag: attributes.field_tag || '',
            trackList: trackList,
            artists: artists,
            operator: attributes.field_operator,
            program: attributes.field_program,
            information: information,
            photos: [],
            videos: [],
        };
    }

    static parseProgram(node: DrupalNode, included?: any[]): Program {
        const {attributes, relationships} = node;

        let videoUrl = '';
        if (relationships?.field_video?.data) {
            const videoData = relationships.field_video.data;
            if (videoData.id) {
                videoUrl = this.getFileUrl(videoData.id, included);
            }
        }

        let posterUrl = '';
        if (relationships?.field_poster?.data) {
            const posterData = relationships.field_poster.data;
            if (posterData.id) {
                posterUrl = this.getFileUrl(posterData.id, included);
            }
        }

        let trackList: Track[] = [];
        if (relationships?.field_tracklist_new?.data && Array.isArray(relationships.field_tracklist_new.data)) {
            trackList = relationships.field_tracklist_new.data
                .map((trackRef: any) => {
                    const trackData = included?.find(item =>
                        item.type === 'paragraph--track' && item.id === trackRef.id
                    );

                    if (!trackData) {
                        return null;
                    }

                    const trackTitle = this.getFieldValue(trackData.attributes, 'field_title');
                    const trackArtist = this.getFieldValue(trackData.attributes, 'field_artist');
                    const trackSource = this.getFieldValue(trackData.attributes, 'field_source');

                    return {
                        title: trackTitle?.toString() || '',
                        artist: trackArtist?.toString() || '',
                        source: trackSource?.toString() || '',
                    };
                })
                .filter((track: Track | null): track is Track => track !== null);
        }

        let information: InformationItem[] = [];
        if (relationships?.field_program_information?.data && Array.isArray(relationships.field_program_information.data)) {
            information = relationships.field_program_information.data
                .map((itemRef: any) => {
                    const informationData = included?.find(item =>
                        item.type === 'paragraph--events_iformation_item' && item.id === itemRef.id
                    );

                    if (!informationData) {
                        return null;
                    }

                    const itemTitle = this.getFieldValue(informationData.attributes, 'field_information_title');
                    const photoId = informationData.relationships?.field_photo?.data?.id;
                    const itemPhoto = photoId ? this.getFileUrl(photoId, included) : '';
                    const itemText = this.getFieldValue(informationData.attributes, 'field_text');


                    return {
                        title: itemTitle?.toString() || '',
                        photo: itemPhoto?.toString() || '',
                        text: itemText?.toString() || '',
                    };
                })
                .filter((item: any): item is InformationItem => item !== null); // Фильтрация null
        }

        let photos: string[] = []
        if (relationships?.field_photos?.data && Array.isArray(relationships.field_photos.data)) {
            photos = relationships.field_photos.data
                .map((itemRef: any) => {
                    const photosData = included?.find(item =>
                        item.type === 'paragraph--photos_item' && item.id === itemRef.id
                    );

                    if (!photosData) {
                        return null;
                    }

                    const photoId = photosData.relationships?.field_photos_item_?.data?.id;
                    const itemPhoto = photoId ? this.getFileUrl(photoId, included) : '';

                    return itemPhoto?.toString() || '';
                })

        }

        let videos: string[] = []
        if (relationships?.field_videos?.data && Array.isArray(relationships.field_videos.data)) {
            videos = relationships.field_videos.data
                .map((itemRef: any) => {
                    const videosData = included?.find(item =>
                        item.type === 'paragraph--videos_item' && item.id === itemRef.id
                    );

                    if (!videosData) {
                        return null;
                    }

                    const videoId = videosData.relationships?.field_videos_item?.data?.id;
                    const itemVideo = videoId ? this.getFileUrl(videoId, included) : '';

                    return itemVideo?.toString() || '';
                })

        }

        return {
            title: attributes.title || '',
            poster: posterUrl,
            video: videoUrl,
            descriptionShort: attributes.field_description_short || '',
            descriptionFull: attributes.field_description_full || '',
            duration: attributes.field_duration || '',
            age: attributes.field_age?.toString() || '',
            url: attributes.field_url || '',
            tag: attributes.field_tag || '',
            trackList: trackList,
            information: information,
            photos: photos,
            videos: videos
        };
    }

    static getFileUrl(fileId: string, included?: any[]): string {
        if (!included || !fileId) return '';

        const fileData = included.find(item =>
            item.type === 'file--file' && item.id === fileId
        );

        if (!fileData?.attributes?.uri?.url) return '';

        // Если URL относительный, добавьте базовый домен
        const url = fileData.attributes.uri.url;
        if (url.startsWith('/')) {
            return `https://api.backstagegroup.ru${url}`;
        }

        return url;
    }
}

export class DrupalAPI {
    private static async fetchApi(endpoint: string): Promise<any> {
        const includeFields = [
            'field_poster',
            'field_video'
        ];
        const includeParam = includeFields.join(',');
        const fieldsParam = 'fields[file--file]=uri,url,filename';

        const separator = endpoint.includes('?') ? '&' : '?';
        const url = `${API_CONFIG.drupal.baseUrl}${API_CONFIG.drupal.jsonApiPath}${endpoint}${separator}include=${includeParam}&${fieldsParam}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Drupal API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    static async getPrograms(): Promise<Program[]> {
        try {
            const response: DrupalResponse = await this.fetchApi('/node/program');
            const nodes = Array.isArray(response.data) ? response.data : [response.data];
            return nodes.map(node => DrupalParser.parseProgram(node, response.included))
        } catch (error) {
            console.error('Error fetching programs:', error);
            throw error;
        }
    }

    static async getProgramByUrl(link: string): Promise<Program | null> {
        try {
            const filterParam = `filter[field_link]=${link}`;
            const includeParam = 'field_poster,field_video,field_program_information,field_program_information.field_photo,field_photos,field_photos.field_photos_item_,field_videos,field_videos.field_videos_item';
            const fieldsParam = 'fields[file--file]=uri,url,filename';
            const url = `${API_CONFIG.drupal.baseUrl}${API_CONFIG.drupal.jsonApiPath}/node/program?${filterParam}&include=${includeParam}&${fieldsParam}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Drupal API Error: ${response.status} ${response.statusText}`);
            }

            const data: DrupalResponse = await response.json();

            if (data.data && (Array.isArray(data.data) ? data.data.length > 0 : true)) {
                const nodes = Array.isArray(data.data) ? data.data : [data.data];
                return DrupalParser.parseProgram(nodes[0], data.included);
            }

            return null;
        } catch (error) {
            console.error('Error fetching program by url:', error);
            return null;
        }
    }

    static async getEvents(): Promise<Event[]> {
        try {
            const response: DrupalResponse = await this.fetchApi('/node/concert');
            const nodes = Array.isArray(response.data) ? response.data : [response.data];
            const events = nodes.map(node => DrupalParser.parseEvent(node, response.included));

            return events.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA.getTime() - dateB.getTime();
            });
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    }

    static async getEventsByProgram(program: string | undefined): Promise<Event[]> {

        try {
            const filterParam = `filter[field_program]=${program}`;
            const includeParam = 'field_poster,field_video';
            const fieldsParam = 'fields[file--file]=uri,url,filename';
            const url = `${API_CONFIG.drupal.baseUrl}${API_CONFIG.drupal.jsonApiPath}/node/concert?${filterParam}&include=${includeParam}&${fieldsParam}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Drupal API Error: ${response.status} ${response.statusText}`);
            }
            const data: DrupalResponse = await response.json();
            const nodes = Array.isArray(data.data) ? data.data : [data.data];
            const events = nodes.map(node => DrupalParser.parseEvent(node, data.included));

            return events.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA.getTime() - dateB.getTime();
            });

        } catch (error) {
            console.error('Error fetching events by program:', error);
            throw error;
        }
    }

    static async getEventsByCity(cityName: string): Promise<Event[]> {
        const isAllCities = cityName === 'Все города'

        try {
            const encodedCityName = encodeURIComponent(cityName);
            const filterParam = isAllCities ? '' : `filter[field_city]=${encodedCityName}`;
            const includeParam = 'field_poster,field_video';
            const fieldsParam = 'fields[file--file]=uri,url,filename';
            const url = `${API_CONFIG.drupal.baseUrl}${API_CONFIG.drupal.jsonApiPath}/node/concert?${filterParam}&include=${includeParam}&${fieldsParam}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Drupal API Error: ${response.status} ${response.statusText}`);
            }
            const data: DrupalResponse = await response.json();
            const nodes = Array.isArray(data.data) ? data.data : [data.data];
            const events = nodes.map(node => DrupalParser.parseEvent(node, data.included));

            return events.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA.getTime() - dateB.getTime();
            });
        } catch (error) {
            console.error('Error fetching events by city:', error);
            throw error;
        }
    }

    static async getEventByEventId(eventId: string): Promise<Event | null> {
        try {
            const filterParam = `filter[field_event_id]=${eventId}`;

            const includeParam = 'field_poster,field_video,field_artists_group_photo,field_location_photos,field_tracklist_new,field_information,field_information.field_photo,field_artists,field_artists.field_photo';

            const fieldsParam = 'fields[file--file]=uri,url,filename';

            const url = `${API_CONFIG.drupal.baseUrl}${API_CONFIG.drupal.jsonApiPath}/node/concert?${filterParam}&include=${includeParam}&${fieldsParam}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Drupal API Error: ${response.status} ${response.statusText}`);
            }

            const data: DrupalResponse = await response.json();

            if (data.data && (Array.isArray(data.data) ? data.data.length > 0 : true)) {
                const nodes = Array.isArray(data.data) ? data.data : [data.data];
                return DrupalParser.parseEvent(nodes[0], data.included);
            }

            return null;
        } catch (error) {
            console.error('Error fetching event by ID:', error);
            return null;
        }
    }

    static async getCities(): Promise<string[]> {
        try {
            const fieldsParam = 'fields[node--concert]=field_city';
            const url = `${API_CONFIG.drupal.baseUrl}${API_CONFIG.drupal.jsonApiPath}/node/concert?${fieldsParam}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Drupal API Error: ${response.status} ${response.statusText}`);
            }

            const data: DrupalResponse = await response.json();

            const nodes = Array.isArray(data.data) ? data.data : [data.data];
            const cities = nodes
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