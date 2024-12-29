import {Concert} from "../types/concert.ts";

export const ConcertListData: Concert[] = [
    {
        title: 'Christmas Time',
        city: 'Красноярск',
        location: 'Институт искусств имени Хворостовского',
        date: new Date(2025,0, 9, 19, 0),
        url: 'https://kras.kassy.events/events/koncerty-i-shou/2-14475/',
        poster: '/image/posters/1.jpg',
        videos: ['/videos/promo_video.mp4'],
        descriptionShort: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        descriptionFull: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        title: 'День рождения Ивана Ивановича',
        city: 'Красноярск',
        location: 'Торговый квартал',
        date: new Date(2025, 0, 29, 17,0),
        poster: '/image/posters/5.jpg',
        descriptionShort: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        descriptionFull: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        trackList: [
            {
                musician: 'Так себе девчонки',
                composition: 'Боинг 757'
            },
            {
                musician: 'Так себе девчонки',
                composition: 'Рейв по дружбе'
            },
            {
                musician: 'Так себе девчонки',
                composition: 'Город дружбы'
            },
            {
                musician: 'call me, RETRO17',
                composition: 'Аня Тейлор Джой'
            },
            {
                musician: 'call me',
                composition: 'Похуйпанк'
            },
            {
                musician: 'call me, ЯЛТ',
                composition: 'Холодно'
            },
            {
                musician: 'call me, Даня Тугрик, SuperStyleShit',
                composition: 'Рейв частушки'
            },
            {
                musician: 'call me',
                composition: 'Девочка из интернета'
            },
            {
                musician: 'call me',
                composition: 'Под хардкор'
            },
            {
                musician: 'call me',
                composition: 'Лирика'
            },
            {
                musician: 'call me',
                composition: 'Ты думаешь что ты шаришь?'
            },
            {
                musician: 'call me',
                composition: 'Больше денег'
            },
            {
                musician: 'call me',
                composition: 'Full Metal'
            },
            {
                musician: 'call me',
                composition: 'Майли Сайрус'
            },
            {
                musician: 'call me, RETRO17',
                composition: 'Виски с кровью'
            },
            {
                musician: 'call me, RETRO17',
                composition: 'Once upon a time in punk-rock'
            },
            {
                musician: 'call me, RETRO17',
                composition: 'Постпанк фристайл'
            },
            {
                musician: 'call me',
                composition: 'Rave Boys Paradise'
            },
            {
                musician: 'call me',
                composition: 'Санрайз'
            },
        ],

    },
    {
        title: 'Edgy Party Dancing Music',
        city: 'Красноярск',
        location: 'Торговый квартал',
        date: new Date(2025, 3, 1, 18,0),
        poster: '/image/posters/6.jpg',
        descriptionShort: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        descriptionFull: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        trackList: 'https://music.yandex.ru/iframe/playlist/vankzet/1032    '
    },
    {
        title: 'Гала-концерт',
        city: 'Ленинск-Кузнецкий',
        location: 'Зал МАУК «Дворец культуры и искусства»',
        date: new Date(2025,10,19,19,0),
        poster: '/image/posters/2.jpg',
        photos: ['/image/photos/1.jpg', '/image/photos/2.jpg', '/image/photos/3.jpg' ],
        descriptionShort: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        descriptionFull: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        title: 'Гала-концерт',
        city: 'Междуреченск',
        location: 'ДК "Распадский"',
        date: new Date(2025,10,20,18,0),
        poster: '/image/posters/3.jpg',
        descriptionShort: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        descriptionFull: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        title: 'Гала-концерт',
        city: 'Новокузнецк',
        location: 'ДК «Алюминщик»',
        date: new Date(2025,10,21,19,0),
        poster: '/image/posters/4.jpg',
        descriptionShort: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        descriptionFull: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
]
