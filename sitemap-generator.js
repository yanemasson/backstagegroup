import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// Получаем эквивалент __dirname в ES модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Базовый URL вашего сайта
const SITE_URL = 'https://backstagegroup.ru';

// Функция для получения всех eventId из markdown файлов
async function getEventIds() {
    try {
        // Убедитесь, что путь к файлам событий правильный
        const eventFiles = await glob('content/events/*.md');
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

// Функция для генерации sitemap
async function generateSitemap() {
    try {
        // Получаем все eventId
        const eventIds = await getEventIds();

        // Статические маршруты
        const staticRoutes = [
            '',           // Главная страница
            '/refund',    // Страница возврата
        ];

        // Добавляем динамические маршруты для событий
        const eventRoutes = eventIds.map(id => `/events/${id}`);

        // Объединяем все маршруты
        const allRoutes = [...staticRoutes, ...eventRoutes];

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

