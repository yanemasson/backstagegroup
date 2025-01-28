const createSlug = (title: string, city: string, date: string) => {
    return `${title}_${city}_${date}`
        .toLowerCase()
        .replace(/[^a-zа-яё0-9-_\s]/g, '') // добавили _ в список разрешенных символов
        .replace(/\s+/g, '_')
        .replace(/-+/g, '_');
};

export default createSlug
