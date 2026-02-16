import {Track} from "./track.ts";
import {Artist} from "./artist.ts";
import {InformationItem} from "./information_item.ts";

export interface Event {
    title: string,
    poster?: string,
    city: string,
    location: string,
    locationPhotos: string[],
    duration: string,
    address: string,
    descriptionShort: string,
    descriptionFull: string,
    video?: string,
    trackList?: Track[],
    age?: number,
    eventId: number,
    date: string,
    artists?: Artist[],
    artistsGroupPhoto?: string,
    artistsTeam?: string,
    tag: string,
    operator: "radario" | "intickets" | "kassir",
    orgId?: number,
    program: string,
    information: InformationItem[],
    photos: string[],
    videos: string[],
}