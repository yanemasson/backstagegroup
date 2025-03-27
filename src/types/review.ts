export interface Review {
    id: string;
    name: string;
    text: string;
    date: string;
    source: 'VK' | 'TG' | 'site';
    status: 'pending' | 'approved' | 'rejected';
}