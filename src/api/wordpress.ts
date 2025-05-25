import {API_CONFIG} from './config';
import {WordPressCategory, WordPressPost} from './types';

export const fetchNews = async (): Promise<WordPressPost[]> => {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.posts}?_embed`);

        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении новостей:', error);
        throw error;
    }
};

export const fetchPost = async (id: string | number | undefined): Promise<WordPressPost> => {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.posts}/${id}?_embed`);

        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении новости:', error);
        throw error;
    }
};

export const fetchPostForCategories = async (tag: number | undefined): Promise<WordPressPost[]> => {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.posts}?categories=${tag}&_embed`);
        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении новостей:', error);
        throw error;
    }
};
export const fetchPostForCategoriesPerPage = async (tag: number | undefined, perPage: number): Promise<WordPressPost[]> => {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.posts}?categories=${tag}&_embed&per_page=${perPage}`);
        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении новостей:', error);
        throw error;
    }
};

export const fetchCategories = async (): Promise<WordPressCategory[]> => {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.categories}`);

        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении категорий:', error);
        throw error;
    }
}