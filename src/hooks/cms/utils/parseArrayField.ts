export const parseArrayField = (content: string, fieldName: string): string[] => {
    const regex = new RegExp(`${fieldName}:\\s*\\n((\\s{2,}-.*\\n?)*)`);
    const match = content.match(regex);
    if (match && match[1]) {
        return match[1]
            .split('\n')
            .map(line => line.trim().replace(/^-\s*/, ''))
            .filter(line => line);
    }
    return [];
};