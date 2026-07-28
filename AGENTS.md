<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Стандарты кода

## Чистый код

- Простота и читаемость: говорящие имена, короткие функции, один уровень абстракции.
- Минимальный diff: без лишних абстракций, хелперов «на один вызов» и кода «на будущее».
- Архитектура FSD: импорты только вниз по слоям, снаружи slice — через Public API (`index.ts`).
- TypeScript строго: без `any`; типы на границах модулей и публичных API.
- Ошибки обрабатывай только для реальных сценариев; без шумных try/catch.
- Согласуйся с уже принятыми в файле стилем, именованием и структурой сегментов (`ui`, `model`, `api`, `lib`).

## Комментарии

- Не пиши комментарии в исходниках: ни однострочные, ни блочные, ни JSDoc.
- Пояснения — через имена и структуру кода.
- Исключение: явная просьба пользователя или обязательная директива линтера/инструмента; иначе комментарии не добавлять.
