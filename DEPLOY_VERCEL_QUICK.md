# 🚀 DomTextil v2.0 - Deploy на Vercel (Пошаговая инструкция)

## ⏱️ Время: ~15 минут

---

## 📋 Чеклист перед началом

- [ ] Есть GitHub аккаунт (зарегистрируйтесь бесплатно на https://github.com)
- [ ] Установлен Git (https://git-scm.com/download/win)
- [ ] Проект domtextilev2 готов в `c:\Users\max\Documents\domtextilev2`

---

## Шаг 1️⃣: Создание GitHub репозитория

### На компьютере (PowerShell / Command Prompt)

```bash
# 1. Откройте папку проекта
cd c:\Users\max\Documents\domtextilev2

# 2. Инициализируйте Git репо
git init

# 3. Добавьте все файлы
git add .

# 4. Создайте первый коммит
git commit -m "DomTextil v2.0 - Initial commit"

# 5. Переименуйте ветку на main (Vercel требует)
git branch -M main
```

### На GitHub

1. **Откройте** https://github.com/new
2. **Заполните:**
   - Repository name: `domtextilev2`
   - Description: `E-commerce platform v2.0 with PWA`
   - Public (чтобы Vercel смог подключиться)
3. **Создайте** репо (НЕ инициализируйте с README)
4. **Скопируйте** URL (похоже на `https://github.com/your-username/domtextilev2.git`)

### На компьютере (продолжение)

```bash
# Добавьте удаленный репо (замените YOUR_USERNAME и URL)
git remote add origin https://github.com/YOUR_USERNAME/domtextilev2.git

# Загрузите код на GitHub
git push -u origin main

# Проверьте на GitHub - должны появиться все файлы!
```

---

## Шаг 2️⃣: Подключение к Vercel

### На Vercel

1. **Откройте** https://vercel.com/new (войдите через GitHub)
2. **Выберите** репо `domtextilev2`
3. **Нажмите** "Import"
4. **В разделе "Environment Variables"** добавьте:

```
VITE_REACT_APP_PRODUCTS_API_URL
Значение: https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercache

VITE_REACT_APP_ORDER_API_URL
Значение: https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercache

VITE_REACT_APP_HOME_PAGE_URL
Значение: https://domtextilev2.vercel.app
```

> 💡 **Как найти YOUR_SCRIPT_ID?**
> - Откройте оригинальный app.js из v1 проекта
> - Найдите строку с `script.google.com/macros/d/`
> - Скопируйте ID между `/d/` и `/usercache`

5. **Нажмите** "Deploy"

✅ **Готово!** Ваш сайт должен быть доступен по адресу вроде `https://domtextilev2.vercel.app`

---

## Шаг 3️⃣: Проверка развертывания

### Откройте URL вашего сайта

```
https://domtextilev2.vercel.app
```

### Проверьте консоль DevTools (F12 → Console)

✅ Должны быть логи вроде:
```
✅ Service Worker loaded and ready
✅ Config loaded successfully
```

❌ **Если есть ошибки:**
- Проверьте `js/config.js` - верны ли API URLs?
- Проверьте Network tab - загружаются ли товары?
- Посмотрите Vercel logs: https://vercel.com → Project → Deployments

---

## Шаг 4️⃣: Копирование asset файлов (Если есть)

### Если у вас есть изображения товаров:

1. Скопируйте их в `assets/` папку
2. Закоммитьте и загрузите:

```bash
git add assets/
git commit -m "Add product images"
git push origin main
```

✅ Vercel автоматически перестроит и разместит новую версию!

---

## Шаг 5️⃣: Использование собственного домена (опционально)

### Если у вас есть домен домтекстиль.рф

1. **На Vercel** → Project Settings → Domains
2. **Добавьте** ваш домен
3. **Скопируйте** DNS записи
4. **На хостере домена** (где домен зарегистрирован):
   - Перейдите в DNS настройки
   - Добавьте Vercel DNS записи
   - Сохраните

> ⏰ **Может занять 24 часа на распространение DNS!**

---

## 📝 Обновление кода на Vercel

### Просто используйте Git!

```bash
# Внесите изменения в файлы

# Закоммитьте
git add .
git commit -m "Описание изменений"

# Загрузите на GitHub
git push origin main

# Vercel автоматически перестроит за 30-60 секунд!
```

✅ **Никаких дополнительных кликов не нужно!**

---

## 🔍 Проверка функциональности

### 1. Проверьте основную работу
- [ ] Сайт загружается
- [ ] Стили применены правильно
- [ ] Товары загружаются (если API работает)
- [ ] Нет 404 ошибок

### 2. Проверьте PWA функциональность
- [ ] Service Worker регистрируется (DevTools → Application → Service Workers)
- [ ] Offline режим работает
- [ ] Есть кнопка "Install" (на мобильном телефоне)

### 3. Проверьте Performance
```bash
# Запустите lighthouse audit
# Chrome → F12 → Lighthouse → Generate report

# Должны быть скоры:
# Performance: > 80
# Accessibility: > 80
# Best Practices: > 80
# SEO: > 90
```

---

## 🐛 Troubleshooting

### "Товары не загружаются"

**Решение:**
1. Проверьте `js/config.js` - верны ли API URLs?
2. Откройте DevTools → Network → найдите запрос к API
3. Проверьте ответ API на наличие ошибок
4. Может быть CORS issue - проверьте headers

### "Service Worker не регистрируется"

**Решение:**
1. Service Worker требует HTTPS (Vercel дает HTTPS автоматически ✅)
2. Проверьте что `sw.js` загружается (Network tab)
3. Очистите cache: DevTools → Application → Clear site data

### "Ошибка при git push"

**Решение:**
```bash
# Может потребоваться аутентификация
git config --global user.email "your@email.com"
git config --global user.name "Your Name"

# Или используйте Personal Access Token вместо пароля
# https://github.com/settings/tokens
```

---

## 📊 Что дальше?

### После успешного деплоя:

1. **Добавьте изображения товаров** (если есть)
   ```bash
   # Скопируйте в assets/
   git add assets/
   git commit -m "Add images"
   git push
   ```

2. **Оптимизируйте изображения** (webp формат, compression)
   - Используйте https://tinypng.com или подобное

3. **Добавьте Google Analytics** (опционально)
   - Дополнительно отследить трафик

4. **Настройте Email рассылку** для заказов
   - Используйте SendGrid/Mailgun (есть free tier)

5. **Мониторьте Lighthouse scores**
   - Старайтесь поддерживать > 80

---

## 💡 Pro Tips

### 1. Быстрые обновления
```bash
# Без нужно ждать - просто push!
git add file.js
git commit -m "Quick fix"
git push origin main
# Vercel задеплоит за 30-60 секунд
```

### 2. Откат версии
```bash
# На Vercel Dashboard → Deployments → выберите старую версию
# Нажмите "Promote to Production"
```

### 3. Preview Deployments
```bash
# Создайте ветку для тестирования
git checkout -b feature/new-feature
# Вносите изменения
git push origin feature/new-feature
# На GitHub → Create Pull Request
# Vercel автоматически создаст preview URL!
```

### 4. Просмотр логов
```bash
# На Vercel → Deployments → выберите deployment
# Нажмите → View Build Logs
```

---

## ✅ Готово!

Ваше приложение DomTextil v2.0 развернуто и доступно в интернете! 🎉

**URL:** `https://domtextilev2.vercel.app`
**GitHub:** `https://github.com/YOUR_USERNAME/domtextilev2`

Теперь вы можете:
- ✅ Обновлять код через `git push`
- ✅ Видеть preview для каждого pull request
- ✅ Автоматические deploys при каждом обновлении
- ✅ Бесплатный HTTPS и SSL сертификат
- ✅ Отличную производительность

---

## 📞 Помощь

Если что-то не работает:

1. **Проверьте Vercel Logs**
   - Dashboard → Project → Deployments → View Build Logs

2. **Проверьте DevTools Console**
   - F12 → Console → посмотрите ошибки

3. **Проверьте Network tab**
   - F12 → Network → найдите красные запросы

4. **Прочитайте README.md и DEPLOYMENT.md**
   - Там есть подробные troubleshooting гайды

---

**Успеха! 🚀**
