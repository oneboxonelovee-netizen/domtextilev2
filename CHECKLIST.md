# DomTextil v2.0 - Implementation Checklist ✅

## 📋 Статус: Core files ready, Final steps needed

Этот файл содержит полный чеклист всех задач для полного внедрения DomTextil v2.0.

---

## ✅ ЗАВЕРШЕНО (8/8 основных компонентов)

### 1. ✅ Структура проекта
- [x] Создана папка `domtextilev2` с модульной структурой
- [x] Создан каталог `js/` для JavaScript модулей
- [x] Создан каталог `assets/` для изображений и ресурсов
- [x] Создан каталог `material/` для PWA ресурсов
- [x] Создан каталог `scripts/` для утилит

### 2. ✅ Конфигурация
- [x] Создан `js/config.js` с централизованной конфигурацией
- [x] Экспортирует `window.APP_CONFIG` глобально
- [x] Включает API URLs, cache settings, timing constants
- [x] Готов к переменным окружения

### 3. ✅ Основной код
- [x] Создан `js/main.js` с улучшенной архитектурой
- [x] Импортирует конфиг вместо hardcoded значений
- [x] Включает skeleton функций с комментариями
- [x] Использует `TIMINGS` и `VALIDATION_MESSAGES` из config

### 4. ✅ HTML улучшения
- [x] Обновлен `index.html` с lazy loading для изображений
- [x] Удалены version query parameters
- [x] Добавлены правильные script references
- [x] Включена поддержка PWA manifest

### 5. ✅ Стили
- [x] Создан оптимизированный `styles.css`
- [x] Добавлен `font-display: swap` для шрифтов
- [x] Включены CSS переменные для легкого кастомизирования
- [x] Responsive design (mobile-first)

### 6. ✅ Service Worker
- [x] Создан `sw.js` с полной функциональностью
- [x] Cache-first для статических активов
- [x] Network-first для API запросов
- [x] Offline fallback страница
- [x] Background sync для заказов

### 7. ✅ PWA Manifest
- [x] Заполнен `material/site.webmanifest`
- [x] Добавлены все необходимые поля (name, icons, etc.)
- [x] Включены shortcuts для быстрого доступа
- [x] Настроены параметры display и orientation

### 8. ✅ Документация
- [x] Создан подробный `README.md`
- [x] Включены инструкции по установке
- [x] Описаны все улучшения в v2.0
- [x] Добавлены примеры конфигурации
- [x] Включены troubleshooting рекомендации

---

## 🔄 В ПРОЦЕССЕ (2/10 расширенных задач)

### 1. ⏳ Копирование полного app.js
**Статус:** Требует внимания
- [ ] Скопировать полный app.js из оригинального проекта
- [ ] Заменить hardcoded API URLs на `API_CONFIG` ссылки
- [ ] Заменить магические числа (30*1000, 2600, и т.д.) на `TIMINGS` константы
- [ ] Заменить `CHECKOUT_FIELD_MESSAGES` на импорт из config
- [ ] Добавить `loading="lazy"` ко всем img тегам в render функциях
- [ ] Обновить все `fetch` calls чтобы использовать `PRODUCTS_API_URL`

**Как выполнить:**
```javascript
// Вместо:
const PRODUCTS_API_URL = "https://script.google.com/...";
window.setInterval(func, 30 * 1000);

// Используйте:
const { API_CONFIG, TIMINGS } = window.APP_CONFIG;
const PRODUCTS_API_URL = API_CONFIG.PRODUCTS_API_URL;
window.setInterval(func, TIMINGS.WORKTIME_UPDATE_INTERVAL);
```

### 2. ⏳ Копирование остальных HTML файлов
**Статус:** Требует внимания
- [ ] Скопировать `404.html` из v1
- [ ] Скопировать `privacy.html` из v1
- [ ] Скопировать `admin.html` из v1
- [ ] Обновить meta tags во всех файлах
- [ ] Добавить `<link rel="manifest" href="/material/site.webmanifest">`
- [ ] Добавить Service Worker registration скрипт

**Структура head в каждом файле:**
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="...">
<link rel="manifest" href="/material/site.webmanifest">
<link rel="stylesheet" href="/styles.css">
<script src="/js/config.js"></script>
```

---

## ❌ НЕ НАЧАТО (5 расширенных задач)

### 1. ❌ Копирование asset файлов
**Приоритет:** ВЫСОКИЙ

- [ ] Скопировать все иконки (SVG/PNG) в `assets/`
- [ ] Скопировать все изображения товаров в `assets/`
- [ ] Скопировать логотип в `assets/logo.png`
- [ ] Создать / найти иконки для PWA (192x192, 512x512)
- [ ] Создать maskable icons для PWA
- [ ] Оптимизировать изображения (webp format, compression)

**Рекомендуемые размеры иконок:**
```
icon-192.png  - 192x192px (для Add to Home Screen)
icon-512.png  - 512x512px (для splash screen)
icon-maskable-192.png - для adaptive icons
icon-maskable-512.png - для adaptive icons
shortcut-catalog.png - 96x96px
shortcut-cart.png - 96x96px
```

### 2. ❌ Модуляризация JavaScript
**Приоритет:** СРЕДНИЙ (можно делать после v2 работает)

Разделить `js/main.js` на отдельные модули:
- [ ] `js/catalog.js` - логика каталога товаров
- [ ] `js/cart.js` - управление корзиной
- [ ] `js/modal.js` - работа с модальными окнами
- [ ] `js/api.js` - API запросы и кэширование
- [ ] `js/utils.js` - утилиты (форматирование, нормализация, и т.д.)
- [ ] `js/worktime.js` - логика графика работы
- [ ] `js/checkout.js` - оформление заказа

### 3. ❌ Стили robots.txt и sitemap.xml
**Приоритет:** НИЗКИЙ

- [ ] Обновить `robots.txt` для корректной индексации
- [ ] Обновить `sitemap.xml` с актуальными страницами
- [ ] Добавить canonical tags в HTML

### 4. ❌ Настройка CI/CD
**Приоритет:** СРЕДНИЙ (для production)

- [ ] Создать GitHub Actions workflow для автоматического тестирования
- [ ] Настроить автоматический deploy на Vercel/Netlify
- [ ] Добавить pre-commit hooks для линтинга
- [ ] Настроить lighthouse CI для мониторинга performance

### 5. ❌ Тестирование и оптимизация
**Приоритет:** ВЫСОКИЙ (перед production)

- [ ] Протестировать на мобильных браузерах (iOS Safari, Chrome Android)
- [ ] Проверить PWA функциональность (offline, install)
- [ ] Проверить сервис-воркер кэширование
- [ ] Запустить lighthouse audit
- [ ] Проверить Core Web Vitals
- [ ] Протестировать на медленном интернете (3G)
- [ ] Проверить accessibility (a11y)

---

## 🚀 NEXT STEPS (Следующие шаги)

### Сегодня:
1. [ ] Скопировать full `app.js` из v1 в `js/main.js`
2. [ ] Заменить hardcoded значения на config ссылки
3. [ ] Скопировать `404.html`, `privacy.html`, `admin.html`

### Завтра:
1. [ ] Скопировать asset файлы
2. [ ] Протестировать основную функциональность
3. [ ] Проверить Service Worker регистрацию

### На неделе:
1. [ ] Модуляризировать JavaScript
2. [ ] Запустить lighthouse audit
3. [ ] Развернуть на staging сервере

### Перед production:
1. [ ] Полное тестирование на разных браузерах
2. [ ] Проверка SEO
3. [ ] Настройка SSL certificate
4. [ ] Финальная оптимизация performance

---

## 📊 Progress Summary

```
Core Infrastructure:     ✅ 100% (8/8)
Main Functionality:      ⏳ 50% (2/4)
Extended Features:       ❌ 0% (0/5)
---
Overall Progress:        ⏳ 45% (10/22)
```

---

## 🎯 Важные замечания

### ⚠️ КРИТИЧНО ДО PRODUCTION:

1. **Установить API URLs в config.js**
   - Без этого товары не загрузятся
   - Проверьте CORS headers на API сервере

2. **Скопировать asset файлы**
   - Без изображений товаров выглядит неправильно
   - Оптимизируйте размеры изображений

3. **Включить HTTPS**
   - Service Worker требует HTTPS (кроме localhost)
   - Используйте Let's Encrypt для бесплатного сертификата

4. **Протестировать на мобильных**
   - PWA функциональность важна для мобильных пользователей
   - Проверьте offline режим

### 💡 РЕКОМЕНДАЦИИ:

1. **Версионирование**
   ```javascript
   // Добавьте в config.js
   APP_VERSION: '2.0.0',
   BUILD_DATE: '2024-01-15'
   ```

2. **Логирование**
   ```javascript
   // Для отладки в production
   const log = (msg) => {
     if (window.APP_CONFIG.DEBUG) console.log(msg);
   };
   ```

3. **Error Tracking**
   - Используйте Sentry или похожий сервис
   - Ловите ошибки при загрузке API

4. **Performance Monitoring**
   - Настройте Google Analytics
   - Мониторьте Core Web Vitals

---

## 📞 Поддержка

Если у вас есть вопросы по реализации:

1. Проверьте console в DevTools на ошибки
2. Смотрите Network tab для API запросов
3. Проверьте Application tab для Service Worker и Cache
4. Читайте README.md для подробных инструкций

---

**Обновлено:** 2024  
**Версия:** 2.0.0  
**Статус:** 🟡 Требует завершения (45% ready)
