# DomTextil v2.0 - Deployment Guide 🚀

Этот гайд содержит пошаговые инструкции для развертывания DomTextil v2.0 на различных платформах.

---

## 🎯 Выбор платформы

| Платформа | Сложность | Цена | Рекомендуется | Best For |
|-----------|-----------|------|:------------:|----------|
| **Vercel** | ⭐ Самая легкая | Free | ✅ **YES** | Production |
| **Netlify** | ⭐ Легкая | Free | ✅ **YES** | Production |
| **Firebase** | ⭐⭐ Средняя | Free tier | ✅ **YES** | Scale |
| **VPS (Linode)** | ⭐⭐⭐ Сложная | $5-10/mo | ⚠️ Maybe | Full control |
| **DigitalOcean App Platform** | ⭐⭐ Средняя | $5/mo | ⚠️ Maybe | Flexibility |
| **Docker (любой host)** | ⭐⭐⭐ Сложная | Varies | ⚠️ Maybe | Scaling |

---

## 🟢 Вариант 1: Vercel (Рекомендуется) ⚡

### Преимущества
- ✅ Самая легкая установка
- ✅ Автоматический HTTPS
- ✅ Бесплатный tier для стартапов
- ✅ Одна команда для развертывания
- ✅ Автоматический re-deploy при git push

### Инструкции

#### Шаг 1: Подготовка
```bash
# Перейдите в папку проекта
cd c:\Users\max\Documents\domtextilev2

# Инициализируйте Git (если еще не сделано)
git init
git add .
git commit -m "DomTextil v2.0 initial commit"

# Создайте репо на GitHub
# https://github.com/new
```

#### Шаг 2: Развертывание
```bash
# Способ 1: Vercel CLI (рекомендуется)
npm i -g vercel
vercel

# Следуйте инструкциям интерактивного режима:
# - Project name: domtextil
# - Root directory: ./
# - Build command: (нажмите Enter - не требуется)
# - Output directory: (нажмите Enter)

# Способ 2: GitHub подключение
# 1. Откройте https://vercel.com/new
# 2. Выберите GitHub репо
# 3. Нажмите Deploy
```

#### Шаг 3: Переменные окружения
```bash
# На Vercel Dashboard -> Settings -> Environment Variables
# Добавьте:
VITE_REACT_APP_PRODUCTS_API_URL=https://script.google.com/macros/d/YOUR_ID/usercache
VITE_REACT_APP_ORDER_API_URL=https://script.google.com/macros/d/YOUR_ID/usercache
VITE_REACT_APP_HOME_PAGE_URL=https://domtextil.example.com
```

#### Шаг 4: Domain (опционально)
```bash
# На Vercel Dashboard -> Settings -> Domains
# Добавьте ваш домен или используйте бесплатный Vercel домен
```

✅ **Готово!** Ваше приложение развернуто и доступно по URL.

---

## 🔵 Вариант 2: Netlify

### Преимущества
- ✅ Очень просто
- ✅ Бесплатный SSL
- ✅ Branch deploys
- ✅ Form submissions

### Инструкции

#### Способ 1: Drag & Drop (Самый быстрый)

```bash
# 1. Откройте https://app.netlify.com/drop
# 2. Перетащите папку domtextilev2
# 3. Ждите ~30 секунд
# 4. Готово! URL: https://random-name.netlify.app
```

#### Способ 2: Git подключение (Рекомендуется)

```bash
# 1. Залейте код на GitHub
git push origin main

# 2. На Netlify: https://app.netlify.com/
# - New site from Git
# - Choose GitHub
# - Select domtextilev2 repo
# - Deploy settings:
#   - Branch: main
#   - Build command: (оставьте пусто)
#   - Publish directory: ./

# 3. Site settings -> Environment -> New variable
VITE_REACT_APP_PRODUCTS_API_URL=https://...

# 4. Trigger deploy
```

#### Способ 3: Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.

# Следуйте инструкциям
```

---

## 🟡 Вариант 3: Firebase Hosting

### Преимущества
- ✅ Отличная интеграция с Google
- ✅ Бесплатный tier
- ✅ Analytics встроен
- ✅ Реал-тайм database (если нужна)

### Инструкции

```bash
# Шаг 1: Установка
npm install -g firebase-tools
firebase login

# Шаг 2: Инициализация
firebase init hosting

# Выберите:
# - Project: Create a new project
# - Project ID: domtextil-v2
# - Public directory: ./
# - Single-page app config: No (у нас HTML)
# - GitHub: Yes (для автоматического deploy)

# Шаг 3: Deploy
firebase deploy

# URL будет: https://domtextil-v2.web.app
```

---

## 🟠 Вариант 4: VPS (DigitalOcean/Linode) - Full Control

### Требования
- $5-10/месяц на VPS
- Базовые знания Linux
- SSH доступ
- Domain name ($10-15/год)

### Инструкции

#### Шаг 1: Создание VPS

1. Создайте droplet на DigitalOcean (Ubuntu 22.04 LTS)
2. Выберите $6/месяц размер (достаточно для v2.0)
3. Скопируйте IP адрес

#### Шаг 2: SSH подключение

```bash
# Первое подключение
ssh root@YOUR_SERVER_IP

# Введите пароль из email DigitalOcean

# Изменить пароль
passwd

# Обновить систему
apt update && apt upgrade -y
```

#### Шаг 3: Установка nginx

```bash
# Установка
apt install -y nginx git

# Запуск
systemctl start nginx
systemctl enable nginx

# Проверка
curl http://localhost

# Вы должны увидеть "Welcome to nginx!"
```

#### Шаг 4: Развертывание проекта

```bash
# Создать папку для проекта
mkdir -p /var/www/domtextil
cd /var/www/domtextil

# Скопировать файлы (с локального компьютера):
# Option 1: SCP
scp -r /path/to/domtextilev2/* root@YOUR_SERVER_IP:/var/www/domtextil/

# Option 2: Git clone (если у вас есть GitHub репо)
git clone https://github.com/your-username/domtextilev2.git .

# Установить права
chown -R www-data:www-data /var/www/domtextil
chmod -R 755 /var/www/domtextil
```

#### Шаг 5: Настройка nginx

```bash
# Создать конфиг
nano /etc/nginx/sites-available/domtextil

# Вставить:
```

```nginx
server {
    listen 80;
    listen [::]:80;
    
    server_name example.com www.example.com;
    
    root /var/www/domtextil;
    index index.html;
    
    # Все запросы идут на index.html (для SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Кэширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Service Worker не кэшируется
    location /sw.js {
        add_header Cache-Control "max-age=0, no-cache, must-revalidate";
    }
    
    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_types text/html text/css text/xml text/javascript application/json application/javascript;
}
```

```bash
# Включить конфиг
ln -s /etc/nginx/sites-available/domtextil /etc/nginx/sites-enabled/

# Проверить синтаксис
nginx -t

# Перезагрузить nginx
systemctl reload nginx

# Проверить (должно работать!)
curl http://example.com
```

#### Шаг 6: SSL Certificate (Let's Encrypt)

```bash
# Установка certbot
apt install -y certbot python3-certbot-nginx

# Получить сертификат
certbot --nginx -d example.com -d www.example.com

# Следуйте инструкциям (выберите автоматический redirect на HTTPS)

# Автоматическое обновление
systemctl start certbot.timer
systemctl enable certbot.timer

# Проверить
curl https://example.com
```

---

## 🐳 Вариант 5: Docker

### Требования
- Docker установлен
- Docker Hub аккаунт (опционально)

### Инструкции

#### Шаг 1: Создать Dockerfile

```bash
# В корне проекта создайте Dockerfile:
nano Dockerfile
```

```dockerfile
# Dockerfile
FROM nginx:latest

# Скопировать файлы
COPY . /usr/share/nginx/html

# Скопировать nginx конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Шаг 2: Создать nginx.conf

```bash
nano nginx.conf
```

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
    }
    
    gzip on;
    gzip_types text/html text/css text/javascript application/json;
}
```

#### Шаг 3: Build и Run

```bash
# Build image
docker build -t domtextil-v2 .

# Run locally для тестирования
docker run -p 80:80 domtextil-v2

# Откройте http://localhost

# Run в production (например, на DigitalOcean App Platform)
# 1. Push на Docker Hub
docker tag domtextil-v2 your-username/domtextil-v2
docker push your-username/domtextil-v2

# 2. На DigitalOcean App Platform
# - Create App
# - Container Registry
# - Select your-username/domtextil-v2
# - Deploy
```

---

## ✅ Post-Deployment Checklist

После развертывания на любой платформе проверьте:

### 1. Базовые проверки
- [ ] Сайт загружается по HTTPS
- [ ] Нет 404 ошибок в консоли
- [ ] Стили применены (не белая страница)
- [ ] Товары загружаются с API

### 2. PWA функциональность
- [ ] Service Worker регистрируется (DevTools → Application → Service Workers)
- [ ] Manifest загружается (DevTools → Application → Manifest)
- [ ] Offline режим работает (DevTools → Network → Offline)
- [ ] Приложение установляется (есть "Install" кнопка)

### 3. Performance
- [ ] Lighthouse score > 80
- [ ] FCP < 2 сек
- [ ] LCP < 3 сек
- [ ] CLS < 0.1

### 4. SEO
- [ ] Meta tags присутствуют
- [ ] Open Graph теги работают
- [ ] robots.txt доступен
- [ ] sitemap.xml доступен

### 5. Security
- [ ] HTTPS работает
- [ ] Безопасные headers присутствуют
- [ ] CSP policy установлена
- [ ] Нет утечек данных в console

### Диагностические команды

```bash
# Проверить HTTPS
curl -I https://example.com

# Проверить Service Worker
curl https://example.com/sw.js

# Проверить Manifest
curl https://example.com/material/site.webmanifest

# Проверить Security Headers
curl -I https://example.com | grep -i "x-"

# Lighthouse audit (локально)
npm install -g @lhci/cli@latest lighthouse
lighthouse https://example.com --view
```

---

## 🔧 Maintenance & Updates

### Автоматические Updates (Git-based)

```bash
# На Vercel / Netlify просто push на main branch
git add .
git commit -m "Update v2.0 features"
git push origin main

# Автоматически перестроится и задеплоится за ~1-2 минуты
```

### Ручной Deploy

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# Firebase
firebase deploy

# VPS (SCP)
scp -r domtextilev2/* root@server:/var/www/domtextil/
```

### Мониторинг

```bash
# Google Analytics (добавьте в index.html)
# Yandex.Metrica
# Sentry для error tracking
# Datadog для monitoring
```

---

## 📊 Рекомендуемые Настройки

### На уровне сервера
```bash
# Кэширование
Cache-Control: public, max-age=31536000 (для JS/CSS)
Cache-Control: no-cache (для HTML)

# Сжатие
gzip on
brotli on (для nginx-brotli)

# Security
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
```

### На уровне DNS
```bash
# Используйте Cloudflare для:
# - DDoS protection
# - SSL/TLS encryption
# - Performance optimization
# - Analytics
```

---

## 🎯 Выбор рекомендации

### Если вы новичок → Используйте **Vercel** или **Netlify**
- Самые легкие
- Бесплатно
- Автоматический HTTPS
- Одна команда для deploy

### Если нужен полный контроль → Используйте **VPS**
- Больше возможностей
- Собственный сервер
- Разумная цена ($5-10/месяц)
- Linux знания требуются

### Если нужно масштабировать → Используйте **Docker + Kubernetes**
- Легко масштабировать
- Cloud-ready (AWS, GCP, Azure)
- Сложнее в настройке
- Дороже ($20+/месяц)

---

## 🚨 Troubleshooting

### Deployment не работает

1. Проверьте logs платформы
2. Убедитесь что все файлы загружены
3. Проверьте переменные окружения
4. Очистите кэш браузера

### Site не загружается

1. Проверьте DNS propagation (может занять 24 часа)
2. Проверьте SSL сертификат
3. Проверьте файл index.html существует
4. Проверьте nginx/сервер запущен

### Service Worker не работает

1. Проверьте что используется HTTPS (не HTTP)
2. Очистите cache storage
3. Перезагрузите браузер
4. Проверьте DevTools → Application

---

## 📞 Support Links

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Firebase Hosting**: https://firebase.google.com/docs/hosting
- **Let's Encrypt**: https://letsencrypt.org/
- **Nginx**: https://nginx.org/en/docs/

---

**Вы готовы к production! 🚀**

Если у вас есть вопросы - смотрите README.md или CHECKLIST.md.
