/**
 * Service Worker для DomTextil v2.0
 * 
 * Функциональность:
 * - Кэширование статических активов (HTML, CSS, JS)
 * - Кэширование API ответов (product list, images)
 * - Оффлайн-режим с fallback страницей
 * - Стратегия кэширования: cache-first для assets, network-first для API
 * - Периодическое обновление кэша в фоне
 */

const CACHE_NAME = 'domtextil-v2.0';
const RUNTIME_CACHE = 'domtextil-runtime-v2.0';
const API_CACHE = 'domtextil-api-v2.0';
const IMAGE_CACHE = 'domtextil-images-v2.0';

// Ресурсы, которые нужно кэшировать при установке
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/js/config.js',
  '/js/main.js',
  '/robots.txt',
  '/offline.html', // Fallback страница
  '/material/site.webmanifest',
];

// API endpoints которые нужно кэшировать
const API_ENDPOINTS = [
  'script.google.com/macros/d/', // Google Apps Script для продуктов
];

// ============================================================================
// INSTALLATION (Установка SW)
// ============================================================================

self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('📦 Caching critical assets');
      // Кэшируем с обработкой ошибок для отсутствующих файлов
      return Promise.allSettled(
        CRITICAL_ASSETS.map((url) => {
          return cache.add(url).catch(() => {
            console.warn(`⚠️ Failed to cache: ${url}`);
          });
        })
      );
    })
  );

  // Принудительно активируем SW при установке
  self.skipWaiting();
});

// ============================================================================
// ACTIVATION (Активация SW)
// ============================================================================

self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activated');

  event.waitUntil(
    // Удаляем старые версии кэша
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (![CACHE_NAME, RUNTIME_CACHE, API_CACHE, IMAGE_CACHE].includes(cacheName)) {
            console.log(`🗑️ Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
    })
  );

  // Принудительно захватываем все клиенты
  self.clients.claim();
});

// ============================================================================
// FETCH EVENT (Обработка сетевых запросов)
// ============================================================================

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const { url, method } = request;

  // Игнорируем не-GET запросы и запросы к другим origin'ам
  if (method !== 'GET' || !url.startsWith('http')) {
    return;
  }

  // Определяем стратегию кэширования в зависимости от типа запроса
  if (isApiRequest(url)) {
    // API: network-first (сначала сеть, потом кэш)
    event.respondWith(networkFirstStrategy(request, API_CACHE));
  } else if (isImageRequest(url)) {
    // Изображения: cache-first с сетевым fallback
    event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
  } else if (isAssetRequest(url)) {
    // Активы (CSS, JS, HTML): cache-first
    event.respondWith(cacheFirstStrategy(request, CACHE_NAME));
  } else {
    // Остальное: network-first с fallback на кэш
    event.respondWith(networkFirstStrategy(request, RUNTIME_CACHE));
  }
});

// ============================================================================
// CACHE STRATEGIES (Стратегии кэширования)
// ============================================================================

/**
 * Cache-First Strategy
 * Проверяем кэш в первую очередь, если нет - идем в сеть
 */
function cacheFirstStrategy(request, cacheName) {
  return caches.match(request).then((response) => {
    if (response) {
      // Обновляем кэш в фоне без блокирования ответа
      updateCacheInBackground(request, cacheName);
      return response;
    }

    // Кэш miss - идем в сеть
    return fetch(request)
      .then((response) => {
        // Проверяем валидность ответа
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Клонируем ответ перед кэшированием
        const responseToCache = response.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // Сетевая ошибка - возвращаем fallback
        return getFallbackResponse(request);
      });
  });
}

/**
 * Network-First Strategy
 * Сначала пытаемся получить из сети, если ошибка - используем кэш
 */
function networkFirstStrategy(request, cacheName) {
  return fetch(request)
    .then((response) => {
      // Проверяем валидность ответа
      if (!response || response.status !== 200) {
        return response;
      }

      // Клонируем ответ перед кэшированием
      const responseToCache = response.clone();
      caches.open(cacheName).then((cache) => {
        cache.put(request, responseToCache);
      });

      return response;
    })
    .catch(() => {
      // Сетевая ошибка - проверяем кэш
      return caches.match(request).then((response) => {
        return response || getFallbackResponse(request);
      });
    });
}

// ============================================================================
// UTILITY FUNCTIONS (Вспомогательные функции)
// ============================================================================

/**
 * Определяет, является ли запрос API запросом
 */
function isApiRequest(url) {
  return API_ENDPOINTS.some((endpoint) => url.includes(endpoint));
}

/**
 * Определяет, является ли запрос изображением
 */
function isImageRequest(url) {
  return /\.(png|jpg|jpeg|webp|gif|svg|ico)(\?.*)?$/i.test(url);
}

/**
 * Определяет, является ли запрос статическим активом
 */
function isAssetRequest(url) {
  return /\.(css|js|json|woff2|woff|ttf|eot)(\?.*)?$/i.test(url);
}

/**
 * Обновляет кэш в фоне (для cache-first стратегии)
 */
function updateCacheInBackground(request, cacheName) {
  // Не блокируем ответ пользователю, обновляем кэш асинхронно
  fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        const responseToCache = response.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(request, responseToCache);
        });
      }
    })
    .catch(() => {
      // Silently fail - кэш остается старым
    });
}

/**
 * Возвращает fallback ответ для оффлайн-режима
 */
function getFallbackResponse(request) {
  // Для изображений - возвращаем placeholder
  if (isImageRequest(request.url)) {
    return new Response(
      createPlaceholderImage(),
      {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  // Для HTML - возвращаем оффлайн-страницу
  if (request.headers.get('accept')?.includes('text/html')) {
    return caches.match('/offline.html').catch(() => {
      return createOfflineResponse();
    });
  }

  // Для остального - 503 Service Unavailable
  return new Response(
    'Service Unavailable',
    { status: 503, statusText: 'Service Unavailable' }
  );
}

/**
 * Создает SVG placeholder для отсутствующих изображений
 */
function createPlaceholderImage() {
  return `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#f0f0f0"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-family="Arial" font-size="14">
        Изображение недоступно
      </text>
    </svg>
  `;
}

/**
 * Создает оффлайн-страницу в HTML
 */
function createOfflineResponse() {
  return new Response(
    `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Оффлайн режим</title>
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background: linear-gradient(135deg, #f4f7fc 0%, #eaf2ff 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .offline-container {
          max-width: 500px;
          text-align: center;
          background: white;
          padding: 40px 20px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #171f2e;
          margin: 0 0 10px;
          font-size: 28px;
        }
        p {
          color: #67758e;
          margin: 0 0 20px;
          line-height: 1.6;
        }
        .icon {
          font-size: 60px;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          background: #2f6fed;
          color: white;
          padding: 12px 30px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          margin-top: 20px;
          cursor: pointer;
          border: none;
          font-size: 16px;
        }
        .button:hover {
          background: #225cd1;
        }
      </style>
    </head>
    <body>
      <div class="offline-container">
        <div class="icon">📱</div>
        <h1>Вы оффлайн</h1>
        <p>К сожалению, нет подключения к интернету. Некоторые функции могут быть недоступны.</p>
        <p>Проверьте подключение и попробуйте позже.</p>
        <button class="button" onclick="location.reload()">Попробовать снова</button>
      </div>
    </body>
    </html>
    `,
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    }
  );
}

// ============================================================================
// BACKGROUND SYNC (Фоновая синхронизация)
// ============================================================================

self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync:', event.tag);

  if (event.tag === 'sync-orders') {
    event.waitUntil(syncPendingOrders());
  }

  if (event.tag === 'sync-cache') {
    event.waitUntil(syncCacheFromAPI());
  }
});

/**
 * Синхронизирует ожидающие заказы при восстановлении соединения
 */
async function syncPendingOrders() {
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    const pendingOrders = await cache.match('/pending-orders.json');

    if (pendingOrders) {
      const orders = await pendingOrders.json();
      // TODO: Отправить ожидающие заказы на сервер
      console.log('📤 Syncing pending orders:', orders);
    }
  } catch (error) {
    console.error('❌ Sync error:', error);
  }
}

/**
 * Обновляет кэш продуктов из API
 */
async function syncCacheFromAPI() {
  try {
    const response = await fetch('/api/products');
    if (response.ok) {
      const cache = await caches.open(API_CACHE);
      cache.put('/api/products', response.clone());
      console.log('✅ Cache updated from API');
    }
  } catch (error) {
    console.error('❌ Cache sync error:', error);
  }
}

// ============================================================================
// PUSH NOTIFICATIONS (Пушевые уведомления)
// ============================================================================

self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || 'Новое уведомление от DomTextil',
    icon: '/assets/icon-192.png',
    badge: '/assets/badge.png',
    tag: data.tag || 'notification',
    requireInteraction: data.requireInteraction || false,
    data: data.data || {},
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'DomTextil', options)
  );
});

// ============================================================================
// MESSAGE HANDLING (Обработка сообщений от клиента)
// ============================================================================

self.addEventListener('message', (event) => {
  console.log('💬 Message from client:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName);
      });
      console.log('🗑️ All caches cleared');
    });
  }

  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    calculateCacheSize().then((size) => {
      event.ports[0].postMessage({ cacheSize: size });
    });
  }
});

/**
 * Вычисляет размер всех кэшей
 */
async function calculateCacheSize() {
  let totalSize = 0;

  try {
    const cacheNames = await caches.keys();

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();

      for (const request of keys) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }
    }
  } catch (error) {
    console.error('❌ Error calculating cache size:', error);
  }

  return totalSize;
}

console.log('✅ Service Worker loaded and ready');
