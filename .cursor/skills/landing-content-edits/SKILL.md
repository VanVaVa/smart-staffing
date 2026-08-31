---
name: landing-content-edits
description: >-
  Контентные правки лендинга smart-staffing: тексты, заголовки, карточки, meta,
  медиа-статьи. Использовать при правке copy на страницах about, home, clients,
  vacancies, documents, media, footer или когда пользователь просит обновить
  текст/контент на сайте.
---

# Контентные правки лендинга

## Архитектура

Dev-сервер читает контент из **PostgreSQL**, не из TS-файлов напрямую. Сид и sync берут данные из одного источника — статических модулей.

| Слой | Назначение |
|------|------------|
| `src/entities/landing/model/*-content.ts` | Тексты about, clients, documents, media, vacancies |
| `src/entities/landing/model/content.ts` | Тексты главной (hero, features, testimonials и т.д.) |
| `src/entities/landing/model/media-articles-seed.ts` | Медиа-статьи |
| `src/entities/landing/model/*-blocks.ts` | Сборка блоков для сида из content-модулей |
| `prisma/lib/build-seed-pages.ts` | Единая сборка всех страниц для seed и sync |
| `prisma/seed.ts` | Полный пересев БД |
| `prisma/sync-landing-page-from-static.ts` | Точечная синхронизация static → БД без полного seed |

## Обязательный workflow

После любой контентной правки выполни **все три шага**:

1. **Правка static-источника** — меняй только TS-модули контента, не props в БД и не хардкод в UI-компонентах.
2. **Sync на dev** — обнови БД, чтобы изменения сразу отобразились на dev-сервере.
3. **Проверка seed** — сид уже импортирует те же файлы через `buildSeedPages()`; отдельный шаг не нужен, если правка в static-источнике.

### Sync-команды

```bash
npm run db:sync-content -- about
npm run db:sync-content -- about benefits
npm run db:sync-content
```

| Аргумент | Действие |
|----------|----------|
| без аргументов | синхронизировать все страницы |
| `<slug>` | одна страница (meta + все блоки) |
| `<slug> <blockType>` | один блок на странице |

Примеры slug: `home`, `about`, `vacancies`, `documents`, `media`, `footer`, `clients-enterprise`, `media-<article-slug>`.

### Когда какую команду

| Сценарий | Команда |
|----------|---------|
| Правка текста на about/home/clients | `npm run db:sync-content -- <slug>` |
| Правка одной секции (например benefits) | `npm run db:sync-content -- about benefits` |
| Массовая правка по всему сайту | `npm run db:sync-content` |
| Новая страница / новый блок / смена структуры | `npm run db:seed` |

## Где править контент

| Страница | Файл |
|----------|------|
| Главная | `src/entities/landing/model/content.ts` |
| О компании | `src/entities/landing/model/about-content.ts` |
| Клиенты (сегменты) | `src/entities/landing/model/clients-content.ts` |
| Вакансии | `src/entities/landing/model/vacancies-content.ts` |
| Документы | `src/entities/landing/model/documents-content.ts` |
| Медиа (лендинг) | `src/entities/landing/model/media-content.ts` |
| Медиа-статьи | `src/entities/landing/model/media-articles-seed.ts` |
| Футер | `src/entities/landing/model/footer-blocks.ts` (если нет отдельного content) |

## Типографика

- Неразрывные пробелы перед короткими словами: `\u00a0` (как в существующих текстах).
- Переносы строк в UI: `\n` в строке props.

## Чеклист перед завершением

- [ ] Static-файл обновлён
- [ ] `npm run db:sync-content -- <slug>` выполнен успешно
- [ ] Dev-сервер показывает новый текст (при необходимости — hard refresh)

## Антипаттерны

- Править только `about-content.ts` без sync — на dev текст не изменится
- Дублировать текст в компоненте TSX вместо content-модуля
- Запускать полный `db:seed` для точечной правки текста — достаточно sync
