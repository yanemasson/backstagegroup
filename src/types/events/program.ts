import {Track} from "./track.ts";
import {InformationItem} from "./information_item.ts";

export interface Program {
    title: string,
    poster?: string,
    duration: string,
    descriptionShort: string,
    descriptionFull: string,
    video?: string,
    age?: number,
    url: string,
    tag: string,
    trackList?: Track[],
    information: InformationItem[]
}