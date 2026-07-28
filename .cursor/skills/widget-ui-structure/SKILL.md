---
name: widget-ui-structure
description: >-
  Структура UI-сегмента виджетов (header, footer и аналоги) по FSD: разбиение
  на подкомпоненты, co-located CSS Modules, Public API. Использовать при
  рефакторинге или добавлении частей header/footer, layout-виджетов и сложных
  секций с несколькими блоками.
---

# Структура UI виджетов (FSD)

## Слой и Public API

- Виджет живёт в `src/widgets/<slice>/`.
- Снаружи slice импортируют только из `@/widgets/<slice>` через `index.ts`.
- В `index.ts` экспортируется один публичный компонент виджета (например `Header`, `Footer`).
- Подкомпоненты виджета **не** реэкспортируются из корневого `index.ts`.

## Дерево `ui/`

```
widgets/<slice>/
├── index.ts
└── ui/
    ├── <Widget>.tsx              # композиция, только layout виджета
    ├── <Widget>.module.css       # стили каркаса (root, grid, inset, columns)
    ├── <part-kebab>/
    │   ├── <Part>.tsx
    │   ├── <Part>.module.css
    │   └── index.ts              # export { Part } from "./Part"
    └── ...
```

Имена папок — **kebab-case** (`header-nav`, `footer-about`). Файлы компонентов — **PascalCase**, как в `shared/ui`.

## CSS Modules

- Именование классов — **БЭМ** (блок `kebab-case`, элемент `__`, модификатор `--`). Подробно: skill `bem-css-modules`.
- У каждого компонента свой `*.module.css` рядом с `*.tsx`.
- В корневом `<Widget>.module.css` — только стили **компоновки** виджета: обёртки, сетки, отступы секций, общие inset/content.
- Стили конкретного блока (навигация, колонка, соцсети) — в модуле этого блока.
- Не складывать все классы в один общий CSS для всего виджета.
- Внутренние детали одной фичи (например dropdown внутри nav) могут жить в той же папке и **одном** CSS-модуле родительской части; отдельный `index.ts` для них не нужен.

## Импорты внутри slice

- `Header.tsx` / `Footer.tsx` импортируют части через `./header-nav`, `./footer-about` (папки с `index.ts`).
- Подкомпоненты одного виджета могут импортировать друг друга относительными путями (`../footer-column-title`).
- Слои FSD: виджет импортирует только из `shared`, `entities`, `features` — не из других widgets/features «вверх».

## Внутренние vs публичные части

| Тип | Пример | `index.ts` в папке |
|-----|--------|-------------------|
| Часть, собираемая в корне виджета | `HeaderNav`, `FooterAbout` | Да |
| Деталь только для соседней части | `HeaderNavDropdown` | Нет |
| Общий мелкий блок внутри виджета | `FooterColumnTitle` | Да, если используется в нескольких частях |

## Эталон в репозитории

**Header** (`src/widgets/header/`):

- `ui/Header.tsx` + `Header.module.css` — sticky bar, inner, start.
- `ui/header-nav/` — навигация и dropdown (`HeaderNavDropdown.tsx` без public API).
- `ui/header-actions/` — кнопки входа и регистрации.

**Footer** (`src/widgets/footer/`):

- `ui/Footer.tsx` + `Footer.module.css` — root, content, inset, columns.
- `ui/footer-about/`, `footer-bottom/`, `footer-contacts/`, `footer-link-column/` — секции с собственными стилями.
- `ui/footer-column-title/` — общий заголовок колонки для contacts и link-column.

## Чеклист при изменениях

1. Новый визуальный блок → новая папка в `ui/` с `.tsx`, `.module.css`, `index.ts` (если блок публичен внутри виджета).
2. Перенести классы из корневого CSS в модуль блока.
3. Не добавлять экспорт подкомпонентов в `widgets/<slice>/index.ts`.
4. Согласовать с паттерном `src/shared/ui/<name>/` (co-located CSS, `index.ts`).
