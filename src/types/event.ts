export interface Track {
    musician: string,
    composition: string,
    duration: string,
}
export interface Concert {
    eventId: number,
    date: string,
}
export interface Event {
    title: string,
    city: string,
    location: string,
    poster: string,
    descriptionShort: string,
    descriptionFull: string,
    concerts: Concert[],
    videos?: string[],
    photos?: string[],
    trackListType?: 'playlist' | 'tracks',
    playlistUrl?: string;
    trackList?: Track[],
}