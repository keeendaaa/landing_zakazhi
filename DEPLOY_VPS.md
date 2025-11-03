# Инструкция по деплою на VPS

## Требования

- VPS с Ubuntu 20.04+ или Debian 11+
- Минимум 2GB RAM, 20GB диска
- Доступ по SSH с правами root или sudo

## Шаг 1: Установка зависимостей на VPS

### 1.1 Обновление системы
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Установка Node.js (версия 18 или выше)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Проверка версии (должна быть 18+)
```

### 1.3 Установка PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 1.4 Создание базы данных
```bash
sudo -u postgres psql
```

В PostgreSQL консоли:
```sql
CREATE DATABASE zakazhi;
CREATE USER zakazhi_user WITH PASSWORD 'ваш_надежный_пароль';
GRANT ALL PRIVILEGES ON DATABASE zakazhi TO zakazhi_user;
\q
```

### 1.5 Установка Wasp CLI
```bash
curl -sSL https://get.wasp-lang.dev/installer.sh | sh
# Перезапустите терминал или выполните:
source ~/.bashrc
wasp version  # Проверка установки
```

### 1.6 Установка Nginx
```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 1.7 Установка PM2 (для управления процессом)
```bash
sudo npm install -g pm2
```

## Шаг 2: Подготовка проекта

### 2.1 Клонирование/загрузка проекта на VPS
```bash
# Если проект в Git:
cd /opt
sudo git clone <ваш-репозиторий> zakazhi
sudo chown -R $USER:$USER zakazhi
cd zakazhi/landing/app

# Или загрузите проект через SCP/SFTP
```

### 2.2 Установка зависимостей
```bash
cd /opt/zakazhi/landing/app
npm install
```

## Шаг 3: Настройка переменных окружения

### 3.1 Создание .env.server
```bash
nano .env.server
```

Содержимое:
```env
DATABASE_URL="postgresql://zakazhi_user:ваш_надежный_пароль@localhost:5432/zakazhi"
JWT_SECRET="генерируйте_случайную_строку_минимум_32_символа"
```

### 3.2 Создание .env.client (если нужны клиентские переменные)
```bash
nano .env.client
```

## Шаг 4: Миграция базы данных

```bash
cd /opt/zakazhi/landing/app
wasp db migrate-dev
```

## Шаг 5: Сборка проекта

```bash
cd /opt/zakazhi/landing/app
wasp build
```

Это создаст production build в `.wasp/out/`.

## Шаг 6: Запуск приложения

### 6.1 Создание скрипта запуска
```bash
nano /opt/zakazhi/start.sh
```

Содержимое:
```bash
#!/bin/bash
cd /opt/zakazhi/landing/app
export NODE_ENV=production
wasp start
```

Сделать исполняемым:
```bash
chmod +x /opt/zakazhi/start.sh
```

### 6.2 Запуск через PM2
```bash
cd /opt/zakazhi/landing/app
pm2 start "wasp start" --name zakazhi
pm2 save
pm2 startup  # Следуйте инструкциям для автозапуска
```

## Шаг 7: Настройка Nginx

### 7.1 Создание конфигурации
```bash
sudo nano /etc/nginx/sites-available/zakazhi
```

Содержимое:
```nginx
server {
    listen 80;
    server_name ваш-домен.com www.ваш-домен.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 7.2 Активация конфигурации
```bash
sudo ln -s /etc/nginx/sites-available/zakazhi /etc/nginx/sites-enabled/
sudo nginx -t  # Проверка конфигурации
sudo systemctl reload nginx
```

## Шаг 8: Настройка SSL (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ваш-домен.com -d www.ваш-домен.com
```

## Шаг 9: Обновление приложения

При внесении изменений:
```bash
cd /opt/zakazhi/landing/app
git pull  # Если используете Git
npm install
wasp db migrate-dev  # Если были изменения в схеме
wasp build
pm2 restart zakazhi
```

## Полезные команды

- Проверка статуса: `pm2 status`
- Логи: `pm2 logs zakazhi`
- Перезапуск: `pm2 restart zakazhi`
- Остановка: `pm2 stop zakazhi`

## Проблемы?

- Проверьте логи: `pm2 logs zakazhi`
- Проверьте Nginx: `sudo nginx -t` и `sudo systemctl status nginx`
- Проверьте PostgreSQL: `sudo systemctl status postgresql`
- Проверьте порты: `sudo netstat -tulpn | grep :3000`

