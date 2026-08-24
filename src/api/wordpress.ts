import {API_CONFIG} from './config';
import {fetchJson} from './requestCache';
import {WordPressCategory, WordPressPost} from './types';

const postsUrl = (query: string): string =>
    `${API_CONFIG.wordpress.baseUrl}${API_CONFIG.wordpress.endpoints.posts}${query}`;

const request = <T>(url: string, errorLabel: string): Promise<T> =>
    fetchJson<T>(url, {errorLabel});

export const fetchNews = async (): Promise<WordPressPost[]> => {
    try {
        return await request<WordPressPost[]>(postsUrl('?_embed'), 'Ошибка API при получении новостей');
    } catch (error) {
        console.error('Ошибка при получении новостей:', error);
        throw error;
    }
};

export const fetchPost = async (id: string | number | undefined): Promise<WordPressPost> => {
    try {
        return await request<WordPressPost>(postsUrl(`/${id}?_embed`), 'Ошибка API при получении новости');
    } catch (error) {
        console.error('Ошибка при получении новости:', error);
        throw error;
    }
};

export const fetchPostForCategories = async (tag: number | undefined): Promise<WordPressPost[]> => {
    try {
        return await request<WordPressPost[]>(postsUrl(`?categories=${tag}&_embed`), 'Ошибка API при получении новостей');
    } catch (error) {
        console.error('Ошибка при получении новостей:', error);
        throw error;
    }
};

export const fetchPostForCategoriesPerPage = async (tag: number | undefined, perPage: number): Promise<WordPressPost[]> => {
    try {
        return await request<WordPressPost[]>(
            postsUrl(`?categories=${tag}&_embed&per_page=${perPage}`),
            'Ошибка API при получении новостей'
        );
    } catch (error) {
        console.error('Ошибка при получении новостей:', error);
        throw error;
    }
};

export const fetchCategories = async (): Promise<WordPressCategory[]> => {
    try {
        return await request<WordPressCategory[]>(
            `${API_CONFIG.wordpress.baseUrl}${API_CONFIG.wordpress.endpoints.categories}`,
            'Ошибка API при получении категорий'
        );
    } catch (error) {
        console.error('Ошибка при получении категорий:', error);
        throw error;
    }
};