const createSlug = (title: string, city: string, date:string) => {
    return `${title}_${city}_${date}`
        .toLowerCase()
        .replace(/[^a-zа-яё0-9-\s]/g, '')
        .replace(/\s+/g, '_')
        .replace(/-+/g, '_');
};

export default createSlug
