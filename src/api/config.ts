export const API_CONFIG = {
    wordpress: {
        baseUrl: 'https://backstagegroup.ru/wp/wp-json/wp/v2',
        endpoints: {
            posts: '/posts',
            categories: '/categories',
        }
    },
    drupal: {
        baseUrl: 'http://api.backstagegroup.ru',
        jsonApiPath: '/jsonapi',
    }
};
