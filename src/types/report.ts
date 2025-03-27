export interface Report {
    id: string;
    title: string;
    text: string;
    date: string;
    source: 'VK' | 'TG' | 'site';
    video: string;
}