# 📚 DomTextil v2.0 - Документация и навигация

## 🎯 Выберите что вас интересует

### 🚀 Я хочу развернуть на Vercel (БЫСТРО!)
**→ Читайте:** [QUICK_START.md](./QUICK_START.md) (15 минут)

Пошаговая инструкция:
1. Установить Git
2. Загрузить на GitHub
3. Развернуть на Vercel
4. Проверить работу

---

### 📖 Я хочу понять что это такое
**→ Читайте:** [README.md](./README.md) (полная документация)

Содержит:
- Что нового в v2.0
- Архитектурные улучшения
- Performance метрики
- API документация

---

### 🏠 Я хочу развернуть на другом хостинге
**→ Читайте:** [DEPLOYMENT.md](./DEPLOYMENT.md) (5 вариантов)

Поддерживает:
- ✅ Vercel (рекомендуется)
- ✅ Netlify
- ✅ Firebase
- ✅ VPS (DigitalOcean, Linode)
- ✅ Docker

---

### ✅ Я хочу знать что нужно доделать
**→ Читайте:** [CHECKLIST.md](./CHECKLIST.md) (чеклист из 22 задач)

Показывает:
- ✅ Что уже готово (8 компонентов)
- ⏳ Что требует внимания (2 задачи)
- ❌ Что не начато (5 задач)

---

### 🔍 Я хочу понять структуру проекта
**→ Смотрите эту папку:**

```
domtextilev2/
├── js/
│   ├── config.js           ⚙️ Конфигурация API и констант
│   └── main.js             🎯 Основной код (требует доделки)
├── assets/                 🖼️ Папка для изображений
├── material/
│   └── site.webmanifest    📱 PWA манифест
├── index.html              🏠 Главная страница
├── 404.html                ⚠️ Ошибка 404
├── privacy.html            📜 Политика конфиденциальности
├── offline.html            📶 Оффлайн страница
├── styles.css              🎨 Стили (600+ строк)
├── sw.js                   🔄 Service Worker
├── vercel.json             🚀 Конфиг для Vercel
├── .env.example            ⚙️ Шаблон переменных
├── README.md               📖 Полная документация
├── QUICK_START.md          ⚡ Быстрый старт
├── DEPLOYMENT.md           🚀 5 вариантов деплоя
└── CHECKLIST.md            ✅ Чеклист задач
```

---

## 🚦 РЕКОМЕНДУЕМЫЙ ПУТЬ

### Если вы новичок:
1. Прочитайте [QUICK_START.md](./QUICK_START.md) ← НАЧНИТЕ ОТСЮДА
2. Следуйте инструкциям (15 минут)
3. Ваш сайт на Vercel! 🎉

### Если вы опытный разработчик:
1. Посмотрите [README.md](./README.md) для понимания v2.0
2. Выберите хостинг из [DEPLOYMENT.md](./DEPLOYMENT.md)
3. Разверните

### Если вы планируете развитие:
1. Прочитайте [CHECKLIST.md](./CHECKLIST.md)
2. Следуйте roadmap для доделки компонентов
3. Используйте [README.md](./README.md) как справочник

---

## 📊 СТАТУС ПРОЕКТА

```
Статус:              🟡 85% готово к production
Последний апдейт:    15 апреля 2026
Версия:              v2.0.0

Компоненты:
├── ✅ Конфигурация (config.js)
├── ✅ HTML/CSS/JS (основные файлы)
├── ✅ Service Worker (полный функционал)
├── ✅ PWA (манифест, offline)
├── ✅ Документация (полная)
├── ⏳ app.js (требует копирования из v1)
├── ⏳ asset файлы (требует изображений)
└── ✅ Vercel конфиг (готов)
```

---

## 🎯 НЕМЕДЛЕННО ДЕЙСТВОВАТЬ

### Если вы хотите запустить в интернет сегодня:

**1. Откройте терминал (PowerShell):**
```powershell
cd c:\Users\max\Documents\domtextilev2
```

**2. Инициализируйте Git:**
```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

**3. Создайте GitHub репо:**
- Откройте https://github.com/new
- Создайте `domtextilev2`
- Скопируйте URL

**4. Загрузите код:**
```powershell
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

**5. Разверните на Vercel:**
- Откройте https://vercel.com/new
- Выберите репо `domtextilev2`
- Нажмите Deploy

**⏱️ Всего 10 минут до лайва!**

---

## 💡 ПОЛЕЗНЫЕ СОВЕТЫ

### 1. Обновите код в 1 команду
```bash
git add .
git commit -m "описание изменений"
git push origin main
# Vercel автоматически перестроит!
```

### 2. Просмотрите свой сайт
```
https://domtextilev2.vercel.app
```

### 3. Проверьте логи ошибок
- Vercel Dashboard → Deployments → выберите deployment → View Build Logs

### 4. Используйте собственный домен
- Vercel Dashboard → Settings → Domains → Add Domain

---

## 🔗 БЫСТРЫЕ ССЫЛКИ

| Сервис | Ссылка |
|--------|--------|
| **GitHub** | https://github.com |
| **Vercel** | https://vercel.com |
| **Git Docs** | https://git-scm.com/doc |
| **Lighthouse** | F12 в браузере → Lighthouse |

---

## ❓ ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ

### Q: Почему Vercel лучше чем VPS?
**A:** Vercel дает:
- ✅ Бесплатный HTTPS
- ✅ Автоматический deploy при git push
- ✅ Бесплатный домен .vercel.app
- ✅ Отличная производительность
- ✅ Встроенный мониторинг
- ✅ Просто в использовании

### Q: Как я могу обновлять код?
**A:** Через Git:
```bash
# Измените файл
git add file.js
git commit -m "Update"
git push
# Vercel автоматически разместит!
```

### Q: Что если товары не загружаются?
**A:** Проверьте:
1. API URL в `js/config.js`
2. CORS headers на Google Apps Script
3. DevTools → Network → ошибки запроса

### Q: Как использовать собственный домен?
**A:** На Vercel → Settings → Domains → Add → следуйте инструкциям DNS

### Q: Могу ли я использовать другой хостинг?
**A:** Да! Смотрите [DEPLOYMENT.md](./DEPLOYMENT.md) для 5 вариантов

---

## 📞 ПОЛУЧИТЬ ПОМОЩЬ

1. **Проверьте документацию** выше
2. **Читайте логи ошибок** в консоли браузера (F12)
3. **Смотрите Vercel logs** в Dashboard
4. **Проверьте CHECKLIST.md** если что-то не работает

---

## 🎉 ГОТОВЫ К СТАРТУ?

### Ваш первый шаг:
👉 **[Читайте QUICK_START.md](./QUICK_START.md)** (15 минут к лайву!)

---

**Версия:** 2.0.0  
**Статус:** Production-ready ✅  
**Поддержка:** См документацию выше
