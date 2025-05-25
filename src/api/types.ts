// Тип для заголовка поста
export interface WordPressTitle {
    rendered: string;
}

// Тип для контента поста
export interface WordPressContent {
    rendered: string;
    protected?: boolean;
}

// Тип для поста WordPress
export interface WordPressPost {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: WordPressTitle;
    content: WordPressContent;
    excerpt?: {
        rendered: string;
        protected?: boolean;
    };
    categories: number[];
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url?: string;
            media_details?: {
                sizes?: {
                    medium?: {
                        source_url?: string;
                    };
                    thumbnail?: {
                        source_url?: string;
                    };
                };
            };
        }>;
        author?: Array<{
            name?: string;
            avatar_urls?: {
                [key: string]: string;
            };
        }>;
    };
}

export interface WordPressCategory {
    id: number;
    name: string;
}