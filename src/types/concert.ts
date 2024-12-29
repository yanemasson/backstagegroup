export interface Track {
    musician: string,
    composition: string,
}
export interface Concert {
    title: string,
    city: string,
    location: string,
    date: Date,
    poster: string,
    descriptionShort: string,
    descriptionFull: string,
    url?: string,
    videos?: string[],
    photos?: string[],
    trackListType?: 'playlist' | 'tracks',
    playlistUrl?: string;
    trackList?: Track[],
}