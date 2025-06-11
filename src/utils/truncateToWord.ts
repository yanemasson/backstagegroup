export const truncateToWord = (str: string, maxLength: number) => {
    if (str.length <= maxLength) return str;
    const lastSpace = str.lastIndexOf(' ', maxLength);
    if (lastSpace === -1) return str.slice(0, maxLength);
    return str.slice(0, lastSpace);
}