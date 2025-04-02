export interface Track {
    musician: string,
    composition: string,
    source: string,
}

export interface Artist {
    photo: string,
    name: string,
    role: string | 'Вокал',
}

export interface Event {
    title: string,
    city: string,
    location: string,
    locationPhotos: string[],
    duration: string,
    address: string,
    descriptionShort: string,
    descriptionFull: string,
    video?: string,
    photos?: string[],
    trackList?: Track[],
    age?: number,
    eventId: number,
    date: string,
    artists?: Artist[],
    artistsGroupPhoto?: string,
    artistsTeam?: string,
}