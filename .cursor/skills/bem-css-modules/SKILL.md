---
name: bem-css-modules
description: >-
  Именование классов в CSS Modules по БЭМ (блок, элемент, модификатор) в
  smart-staffing. Использовать при добавлении или правке *.module.css, рефакторинге
  стилей, когда пользователь просит БЭМ, или при согласовании className в TSX с
  co-located CSS.
---

# БЭМ в CSS Modules

## Блок

- Имя блока — **kebab-case** от имени компонента: `HeroVisual` → `hero-visual`, `CaseStudyCard` → `case-study-card`.
- Корневой класс компонента — **блок**, не `.root`: `.hero`, `.button`, `.header-nav`.
- Один `*.module.css` — один блок (исключение: внутренние детали без своего TSX остаются в модуле родителя, см. widget-ui-structure).

## Элемент

- Формат: `блок__элемент`, части элемента через дефис: `.hero__visual-slot`, `.button__arrow-slot`.
- Вложенность в CSS — через селекторы, без цепочек имён: `.hero__copy .hero__title`, не `hero__copy-title`.

## Модификатор

- Блок или элемент: `блок--модификатор`, `блок__элемент--модификатор`.
- Варианты UI (size, variant, tone), состояния и флаги — модификаторы: `.text--md`, `.button--primary`, `.hero__orb--orange`.
- Boolean-модификаторы: `.button--full-width`, `.button--with-arrow`.

## TSX и CSS Modules

- Элементы и блок без `--` — через точку: `styles.hero__title`.
- Классы с `--` — через скобки: `styles["button--primary"]`, `` styles[`text--${size}`] ``.
- Динамические variant/size/tone — строка модификатора с префиксом блока: `` `button--${variant}` ``, не голый `styles[variant]`.
- Внешний `className` с пропсов по-прежнему concatenation в конце.

## Согласование с FSD

- Co-located CSS у каждого компонента; блок совпадает с именем этого компонента, не родительского виджета.
- Стили виджета в `Hero.module.css` — блок `hero`; подкомпонент `HeroSegment` — блок `hero-segment`.

## Чеклист

1. Заменить `.root` на имя блока.
2. Переименовать остальные классы в `блок__*` или `блок--*`.
3. Обновить все селекторы и media queries в том же файле.
4. Обновить TSX (и динамические ключи) в парном файле.
5. Не смешивать camelCase-классы с БЭМ в новом коде.

## Пример

```css
.hero {
  position: relative;
}

.hero__title {
  font-size: var(--text-h1);
}

.hero__orb--orange {
  border-radius: 50%;
}
```

```tsx
<section className={styles.hero}>
  <h1 className={styles.hero__title}>…</h1>
  <div className={styles["hero__orb--orange"]} aria-hidden />
</section>
```

Эталон после миграции: `src/widgets/hero/`, `src/shared/ui/button/`.
