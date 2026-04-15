# 🚀 Git Командная Строка - Пошаговая Инструкция

## ⏳ Когда Git установится, скопируйте эти команды

### Шаг 1️⃣: Откройте PowerShell

1. Нажмите **Win + X**
2. Выберите **Windows Terminal** или **PowerShell**
3. Вставьте и выполните этот блок команд:

```powershell
# Перейти в папку проекта
cd c:\Users\max\Documents\domtextilev2

# Инициализировать Git репо
git init

# Добавить все файлы
git add .

# Создать первый коммит
git commit -m "DomTextil v2.0 - Initial commit"

# Переименовать ветку на main (Vercel требует)
git branch -M main
```

**Результат:**
```
Initialized empty Git repository in c:\Users\max\Documents\domtextilev2\.git
[main (root-commit) abc1234] DomTextil v2.0 - Initial commit
 19 files changed, 5000+ insertions(+)
 create mode 100644 index.html
 ...
```

---

### Шаг 2️⃣: Создайте репо на GitHub

1. Откройте https://github.com/new
2. Заполните:
   - **Repository name:** `domtextilev2`
   - **Description:** `E-commerce platform v2.0 with PWA`
   - **Public** (важно!)
3. **НЕ инициализируйте** с README/gitignore
4. Нажмите **Create repository**
5. Скопируйте URL (будет вроде `https://github.com/YOUR_USERNAME/domtextilev2.git`)

---

### Шаг 3️⃣: Загрузите код на GitHub

Вставьте и выполните (замените `YOUR_USERNAME`):

```powershell
# Добавить удаленный репо (замените URL на ваш!)
git remote add origin https://github.com/YOUR_USERNAME/domtextilev2.git

# Загрузить код на GitHub
git push -u origin main
```

**Результат:**
```
Enumerating objects: 19, done.
Counting objects: 100% (19/19), done.
Delta compression using up to 8 threads
Compressing objects: 100% (15/15), done.
Writing objects: 100% (19/19), 5.00 MiB | 500 KiB/s
...
To https://github.com/YOUR_USERNAME/domtextilev2.git
 * [new branch]      main -> main
Branch 'main' is set to track remote branch 'main' from 'origin'.
```

✅ **ВСЕ ГОТОВО! Код на GitHub!**

---

## 🔍 Проверка

```powershell
# Проверить статус репо
git status

# Должно быть:
# On branch main
# Your branch is up to date with 'origin/main'.
# nothing to commit, working tree clean
```

---

## 🚀 Следующий шаг: Развертывание на Vercel

Когда код будет на GitHub:

1. Откройте https://vercel.com/new
2. Авторизируйтесь через GitHub
3. Выберите репо `domtextilev2`
4. Нажмите **Import**
5. Добавьте Environment Variables:
   ```
   VITE_REACT_APP_PRODUCTS_API_URL = https://script.google.com/macros/d/YOUR_ID/usercache
   VITE_REACT_APP_ORDER_API_URL = https://script.google.com/macros/d/YOUR_ID/usercache
   VITE_REACT_APP_HOME_PAGE_URL = https://domtextilev2.vercel.app
   ```
6. Нажмите **Deploy**

✅ **Через 30 сек ваш сайт в интернете!**

---

## ❓ Частые ошибки

### Ошибка: "git command not found"
**Решение:** Git еще не установлен. Дождитесь завершения установки или перезагрузите PowerShell.

### Ошибка: "remote repository not found"
**Решение:** Проверьте что:
- Репо на GitHub создан (Public, а не Private)
- URL скопирован правильно
- GitHub аккаунт активен

### Ошибка: "Authentication failed"
**Решение:** 
```powershell
# Сбросьте учетные данные
git config --global user.email "your@email.com"
git config --global user.name "Your Name"

# Попробуйте еще раз
git push -u origin main

# Если просит пароль - используйте Personal Access Token:
# https://github.com/settings/tokens
```

---

## 📝 Все команды одним блоком (скопируйте и вставьте)

```powershell
cd c:\Users\max\Documents\domtextilev2
git init
git add .
git commit -m "DomTextil v2.0 - Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/domtextilev2.git
git push -u origin main
```

⚠️ **ВАЖНО:** Замените `https://github.com/YOUR_USERNAME/domtextilev2.git` на реальный URL вашего репо!

---

**Когда будете готовы:**
1. Дождитесь установки Git
2. Скопируйте команды выше
3. Выполните в PowerShell
4. Проверьте что все файлы на GitHub
5. Разверните на Vercel

**Удачи! 🚀**
