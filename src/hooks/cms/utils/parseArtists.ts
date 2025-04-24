import {Artist} from "../../../types/event.ts";

export const parseArtists = (content: string): Artist[] => {
    const regex = /artists:\s*(\n\s*-[^]*?)(?=\n\w|$)/;
    const match = content.match(regex);
    if (match && match[1]) {
        const artistsSection = match[1];
        const artists: Artist[] = [];
        const artistStrings = artistsSection
            .split('\n  -')
            .filter(str => str.trim());

        artistStrings.forEach(artistString => {
            const nameMatch = artistString.match(/\s*name:\s*([^\n]+)/);
            const photoMatch = artistString.match(/\s*photo:\s*([^\n]+)/);
            const roleMatch = artistString.match(/\s*role:\s*([^\n]+)/);
            if (nameMatch?.[1] && photoMatch?.[1] && roleMatch?.[1]) {
                if (nameMatch && photoMatch && roleMatch) {
                    artists.push({
                        name: nameMatch[1].trim()?.replace(/['"]/g, ''),
                        photo: photoMatch[1].trim()?.replace(/['"]/g, ''),
                        role: roleMatch[1].trim()?.replace(/['"]/g, '')
                    });
                }
            }
        });
        return artists;
    }
    return [];
};