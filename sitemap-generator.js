import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const SITE_URL = 'https://backstagegroup.ru';

async function getEventIds() {
    try {
        const eventFiles = await glob('public/content/events/*.md');
        const eventIds = [];
        for (const filePath of eventFiles) {
            const content = fs.readFileSync(filePath, 'utf8').trim();
            const frontMatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
            if (frontMatterMatch) {
                const frontMatter = frontMatterMatch[1];
                const eventIdMatch = frontMatter.match(/eventId:\s*(\d+)/);
                if (eventIdMatch && eventIdMatch[1]) {
                    eventIds.push(Number(eventIdMatch[1]));
                }
            }
        }
        console.log(`Найдено ${eventIds.length} событий:`, eventIds);
        return eventIds;
    } catch (error) {
        console.error('Ошибка при получении eventId:', error);
        return [];
    }
}

async function getNewsIds() {
    try {
        const newsFiles = await glob('public/content/news/*.md');
        const newsIds = [];
        for (const filePath of newsFiles) {
            const content = fs.readFileSync(filePath, 'utf8').trim();
            const frontMatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
            if (frontMatterMatch) {
                const frontMatter = frontMatterMatch[1];
                const newsIdMatch = frontMatter.match(/id:\s*(\d+)/);
                if (newsIdMatch && newsIdMatch[1]) {
                    newsIds.push(Number(newsIdMatch[1]));
                }
            }
        }
            console.log(`Найдено ${newsIds.length} новостей`, newsIds);
            return newsIds;
        } catch (error) {
            console.error('Ошибка при получении newsId:', error);
            return [];
        }
}

async function generateSitemap() {
    try {
        const eventIds = await getEventIds();
        const newsIds = await getNewsIds();
        const staticRoutes = [
            '',
            '/news',

            '/refund',
            '/user_agreement',
            '/offer',
            '/privacy_policy'

        ];

        // Добавляем динамические маршруты для событий и новостей
        const eventRoutes = eventIds.map(id => `/events/${id}`);
        const newsRoutes = newsIds.map(id => `/events/${id}`);

        // Объединяем все маршруты
        const allRoutes = [...staticRoutes, ...eventRoutes, ...newsRoutes];

        console.log(`Генерация sitemap для ${allRoutes.length} маршрутов`);

        // Текущая дата для lastmod
        const date = new Date().toISOString();

        // Создаем XML-контент с правильным форматированием
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

        // Записываем sitemap в файл
        const outputPath = path.resolve('public/sitemap.xml');
        fs.writeFileSync(outputPath, sitemap);
        console.log(`Sitemap успешно сгенерирован и сохранен в ${outputPath}`);
    } catch (error) {
        console.error('Ошибка при генерации sitemap:', error);
    }
}

// Запускаем генерацию
generateSitemap();

