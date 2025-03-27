const createSlug = (eventId: number) => {
    return `${eventId}`
        .toLowerCase()
        .replace(/[^a-zа-яё0-9-_\s]/g, '')
        .replace(/\s+/g, '_')
        .replace(/-+/g, '_');
};

export default createSlug
