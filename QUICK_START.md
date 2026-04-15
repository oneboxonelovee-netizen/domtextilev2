# 🚀 DomTextil v2.0 - ГОТОВО К ДЕПЛОЮ!

## ✅ Статус проекта

Все файлы созданы и готовы к развертыванию на **Vercel** (бесплатный хостинг).

```
✅ js/config.js         - Конфигурация API
✅ js/main.js           - Основной код
✅ index.html           - Главная страница
✅ 404.html             - Ошибка 404
✅ privacy.html         - Политика конфиденциальности
✅ styles.css           - Стили (оптимизированные)
✅ sw.js                - Service Worker
✅ offline.html         - Оффлайн страница
✅ vercel.json          - Конфиг для Vercel
✅ material/site.webmanifest - PWA манифест
📁 assets/              - Папка для изображений
```

---

## 🎯 ШАГ 1: Подготовка (5 минут)

### Установите Git (если не установлен)
- **Скачайте:** https://git-scm.com/download/win
- **Установите** с настройками по умолчанию

### Создайте GitHub аккаунт (если не есть)
- **Откройте:** https://github.com/signup
- **Создайте аккаунт** (это займет 2 минуты)

---

## 🎯 ШАГ 2: Загрузка на GitHub (5 минут)

### Откройте PowerShell/Command Prompt

```powershell
# Перейдите в папку проекта
cd c:\Users\max\Documents\domtextilev2

# Инициализируйте Git
git init
git add .
git commit -m "DomTextil v2.0 - Initial commit"
git branch -M main
```

### На GitHub.com

1. **Создайте новый репо:** https://github.com/new
   - Name: `domtextilev2`
   - Public
   - Не инициализируйте с README
   - Create repository

2. **Скопируйте URL репо** (будет вроде `https://github.com/YOUR_USERNAME/domtextilev2.git`)

### В PowerShell (продолжение)

```powershell
# Замените YOUR_USERNAME и URL на свои!
git remote add origin https://github.com/YOUR_USERNAME/domtextilev2.git
git push -u origin main

# ✅ Готово! Код на GitHub!
```

---

## 🎯 ШАГ 3: Развертывание на Vercel (3 минуты)

### На Vercel.com

1. **Откройте:** https://vercel.com/new
2. **Авторизируйтесь** через GitHub (кнопка "Continue with GitHub")
3. **Найдите** репо `domtextilev2`
4. **Нажмите "Import"**

### Настройка переменных окружения

На странице развертывания найдите **"Environment Variables"** и добавьте:

```
VITE_REACT_APP_PRODUCTS_API_URL = https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercache
VITE_REACT_APP_ORDER_API_URL = https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercache
VITE_REACT_APP_HOME_PAGE_URL = https://domtextilev2.vercel.app
```

> **⚠️ ВАЖНО:** Замените `YOUR_SCRIPT_ID` на реальный ID из оригинального app.js!

### Нажмите "Deploy"

⏳ **Ждите 30-60 секунд...**

✅ **ГОТОВО!** Ваш сайт доступен по уникальному URL!

---

## 📱 Проверка

### Откройте ваш сайт

Адрес будет вроде: `https://domtextilev2.vercel.app`

### Проверьте консоль (F12 → Console)

Должны быть логи:
```
✅ Config loaded successfully
✅ Service Worker loaded and ready
```

### Проверьте товары

Если все окей - товары должны загружаться с API!

---

## 🔧 ЧТО ДАЛЬШЕ?

### 1. Добавьте изображения товаров

Если у вас есть изображения из v1 проекта:

```powershell
# Скопируйте изображения в assets/ папку
# Потом:
git add assets/
git commit -m "Add product images"
git push origin main

# Vercel автоматически перестроит!
```

### 2. Используйте собственный домен (опционально)

Если у вас есть домен домтекстиль.рф:

1. На Vercel Dashboard → Settings → Domains
2. Добавьте домен
3. Следуйте инструкциям по DNS

### 3. Обновляйте код просто через Git

```powershell
# Измените файл (например, js/main.js)
# Потом:
git add js/main.js
git commit -m "Fix bug"
git push origin main

# Vercel автоматически перестроит за 30 сек!
```

---

## 🎓 ДОПОЛНИТЕЛЬНАЯ ДОКУМЕНТАЦИЯ

| Файл | Для чего |
|------|----------|
| **DEPLOY_VERCEL_QUICK.md** | 📋 Подробная инструкция деплоя |
| **README.md** | 📖 Полная документация v2.0 |
| **DEPLOYMENT.md** | 🚀 5 вариантов развертывания |
| **CHECKLIST.md** | ✅ Полный чеклист всех задач |

---

## ⚡ БЫСТРЫЕ ССЫЛКИ

- **GitHub Dashboard:** https://github.com
- **Vercel Dashboard:** https://vercel.com
- **Ваш проект:** https://github.com/YOUR_USERNAME/domtextilev2
- **Ваш сайт:** https://domtextilev2.vercel.app (примерно)

---

## 🆘 ЕСЛИ ЧТО-ТО НЕ РАБОТАЕТ

### Товары не загружаются?
1. Проверьте `js/config.js` - верны ли API URLs?
2. Откройте DevTools → Network → ищите ошибки
3. Проверьте Vercel Logs (Dashboard → Deployments → Logs)

### Git ошибка?
```powershell
# Настройте Git
git config --global user.email "your@email.com"
git config --global user.name "Your Name"
```

### Vercel ошибка?
1. Откройте Vercel Dashboard
2. Выберите проект → Deployments
3. Нажмите на ошибки deployment
4. Читайте логи

---

## 🎉 ВСЕ ГОТОВО!

Ваше приложение DomTextil v2.0 готово к использованию! 

**Что вы получили:**

✅ Быстрый, оптимизированный веб-сайт  
✅ Service Worker для offline поддержки  
✅ PWA функциональность (можно установить на экран)  
✅ Автоматическое обновление (просто push → Vercel разместит)  
✅ Бесплатный HTTPS и SSL сертификат  
✅ Бесплатный хостинг на Vercel  

**Время до лайва: ~15 минут!** ⏱️

---

**Поздравляем! Ваш проект v2.0 в интернете! 🚀**
