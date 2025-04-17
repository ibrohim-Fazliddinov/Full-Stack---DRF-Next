# Шаблон полного стека: Django REST Framework и Next.js

> Каркас для разработки современных full-stack веб-приложений с использованием Django REST Framework и Next.js.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)
![Django](https://img.shields.io/badge/Django-latest-brightgreen.svg)
![DRF](https://img.shields.io/badge/DRF-v3.12-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-latest-black.svg)
![React](https://img.shields.io/badge/React-17%2B-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4%2B-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-blue.svg)
![SQLite](https://img.shields.io/badge/SQLite-development-lightgrey.svg)
![Docker](https://img.shields.io/badge/Docker-latest-lightblue.svg)
![Docker Compose](https://img.shields.io/badge/Docker%20Compose-latest-lightblue.svg)
![JWT](https://img.shields.io/badge/JWT-auth-orange.svg)
![OAuth2](https://img.shields.io/badge/OAuth2-social%20login-cyan.svg)
![PyTest](https://img.shields.io/badge/PyTest-6.2-blue.svg)
![Jest](https://img.shields.io/badge/Jest-27-red.svg)

---

## Содержание

- [Возможности](#возможности)
- [Технологии](#технологии)
- [Начало работы](#начало-работы)
  - [Требования](#требования)
  - [Переменные окружения](#переменные-окружения)
  - [Настройка бэкенда](#настройка-бэкенда)
  - [Настройка фронтенда](#настройка-фронтенда)
- [Доступные команды](#доступные-команды)
- [API эндпоинты](#api-эндпоинты)
- [Скриншоты](#скриншоты)
- [Содействие](#содействие)

---

## Возможности

- **Аутентификация**: Email/пароль, GitHub и Google OAuth2 (JWT)
- **Профили пользователей**: Просмотр и редактирование данных профиля
- **Управление контентом**: CRUD для постов, комментариев, лайков и тегов
- **Персонализированная лента**: Посты пользователей, на которых подписан текущий пользователь
- **Административная панель**: Django Admin для бэкофисных задач
- **Docker**: Быстрый старт одним контейнером через Docker Compose
- **SSR & SSG**: Поддержка server-side rendering и static generation в Next.js
- **OpenAPI документация**: Автоматически генерируемая схема по адресу `/schema/`

---

## Технологии

| Слой           | Технология                         |
| -------------- | ---------------------------------- |
| **Бэкенд**     | Python, Django REST Framework      |
| **Фронтенд (In developing & VIBE CODING)**   | Next.js, React, TypeScript         |
| **База данных**| PostgreSQL (SQLite для разработки) |
| **Auth**       | JWT, Social OAuth                  |
| **DevOps**     | Docker, Docker Compose             |
| **Тестирование (in Developing)**| PyTest, Jest                      |

---

## Начало работы

### Требования

- **Python** >= 3.8  
- **Node.js** >= 14.x (npm >= 6)  
- **Docker** и **Docker Compose** (рекомендуется)

### Клонировать репозиторий

```bash
git clone https://github.com/ibrohim-Fazliddinov/Full-Stack---DRF-Next.git
cd Full-Stack---DRF-Next
```

### Переменные окружения

Скопируйте примеры файлов и заполните их своими данными:

```bash
cp env.local .env         # Конфигурация бэкенда
cp local.yml .env.local   # Конфигурация фронтенда
```

#### `.env` (бэкенд)

```env
SECRET_KEY=your-django-secret-key
DEBUG=True
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB_NAME
JWT_SECRET=your-jwt-secret
SOCIAL_AUTH_GITHUB_KEY=your-github-client-id
SOCIAL_AUTH_GITHUB_SECRET=your-github-client-secret
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY=your-google-client-id
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET=your-google-client-secret
```

#### `.env.local` (фронтенд)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-github-client-id
NEXTAUTH_SECRET=your-nextauth-secret
```

---

## Настройка бэкенда

Установите зависимости, выполните миграции и запустите сервер:

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Доступ к сайту: `http://localhost:8000/`, документация API: `http://localhost:8000/schema/`

---

## Настройка фронтенда

Установите зависимости и запустите Next.js:

```bash
npm install
npm run dev
```

Перейдите в браузере по адресу `http://localhost:3000/`

---

## Доступные команды

| Команда                              | Описание                                 |
| ------------------------------------ | ---------------------------------------- |
| `npm run dev`                        | Запуск Next.js в режиме разработки       |
| `npm run build`                      | Сборка продакшн-бандла фронтенда         |
| `npm start`                          | Запуск Next.js в продакшн режиме         |
| `python manage.py runserver`         | Запуск Django в режиме разработки        |

---

## API эндпоинты

| Маршрут                                | Метод            | Описание                                  |
| -------------------------------------- | ---------------- | ----------------------------------------- |
| `/api/auth/login/`                     | `POST`           | Логин по Email/паролю (возвращает JWT)    |
| `/api/auth/login-github/`              | `POST`           | Логин через GitHub OAuth2                 |
| `/api/auth/login-google/`              | `POST`           | Логин через Google OAuth2                 |
| `/api/auth/logout/`                    | `POST`           | Выход из системы                          |
| `/api/auth/registration/`              | `POST`           | Регистрация нового пользователя           |
| `/api/posts/`                          | `GET`, `POST`    | Получение списка и создание постов        |
| `/api/posts/{id}/`                     | `GET`, `PUT`, `PATCH`, `DELETE` | Работа с конкретным постом      |
| `/api/posts/{post_id}/comments/`       | `GET`, `POST`    | Комментарии к постам                     |
| `/api/like/`                           | `POST`           | Поставить/убрать лайк                     |
| `/api/tags/`                           | `GET`, `POST`    | Просмотр и создание тегов                 |

---

## Скриншоты

<img width="1313" alt="Снимок экрана 2025-04-17 в 21 40 03" src="https://github.com/user-attachments/assets/4e02b563-b970-4fc0-a119-ce010d352895" />
<img width="1358" alt="Снимок экрана 2025-04-17 в 21 46 24" src="https://github.com/user-attachments/assets/f9fa18f6-8f7a-4c83-9a94-b12d0bb37cea" />
<img width="1360" alt="Снимок экрана 2025-04-17 в 21 46 59" src="https://github.com/user-attachments/assets/f1883b1e-97c1-4f8d-9043-07ad44e1aecc" />
<img width="1344" alt="Снимок экрана 2025-04-17 в 21 48 02" src="https://github.com/user-attachments/assets/cfde032b-9ba8-4bc2-81ee-04b0eff42ca2" />
<img width="1361" alt="Снимок экрана 2025-04-17 в 21 48 27" src="https://github.com/user-attachments/assets/20a3c831-faa0-4acd-9dbf-4e38b9fd434a" />
<img width="1356" alt="Снимок экрана 2025-04-17 в 21 52 52" src="https://github.com/user-attachments/assets/9fe0e907-9d76-42ad-8dd7-5feb1c8e8535" />




---

## Содействие

1. Форкните репозиторий  
2. Создайте ветку для фичи (`git checkout -b feature/YourFeature`)  
3. Внесите изменения и закоммитьте (`git commit -m "Добавил фичу"`)  
4. Запушьте ветку (`git push origin feature/YourFeature`)  
5. Создайте Pull Request

---

