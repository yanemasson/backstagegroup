import {Track} from "../../../types/event.ts";

export const parseTrackList = (content: string): Track[] => {
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