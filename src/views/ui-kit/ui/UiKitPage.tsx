import {
  ArrowButton,
  Badge,
  Button,
  Card,
  CaseStudyCard,
  Checkbox,
  CompanyConnectionButton,
  Divider,
  Heading,
  IconButton,
  InfoCard,
  Input,
  Link,
  Logo,
  Pagination,
  Section,
  SectionTitle,
  StepItem,
  TestimonialCard,
  Text,
  Textarea,
} from "@/shared/ui";

import styles from "./UiKitPage.module.css";

const colorTokens = [
  { name: "White", varName: "--color-white", hex: "#FFFFFF" },
  { name: "Black", varName: "--color-black", hex: "#000000" },
  { name: "Background", varName: "--color-bg", hex: "#F9F9FB" },
  { name: "Grey 200", varName: "--color-grey-200", hex: "#EAEAEC" },
  { name: "Grey 300", varName: "--color-grey-300", hex: "#DBDCE3" },
  { name: "Grey 400", varName: "--color-grey-400", hex: "#939393" },
  { name: "Grey 500", varName: "--color-grey-500", hex: "#7A7A83" },
  { name: "Grey 600", varName: "--color-grey-600", hex: "#77778E" },
  { name: "Grey 700", varName: "--color-grey-700", hex: "#181818" },
  { name: "Grey 800", varName: "--color-grey-800", hex: "#0E0D18" },
  { name: "Grey 900", varName: "--color-grey-900", hex: "#090909" },
  { name: "Accent", varName: "--color-accent", hex: "#F75827" },
  { name: "Accent hover", varName: "--color-accent-hover", hex: "#EC673A" },
  { name: "Accent 2", varName: "--color-accent-2", hex: "#4F4BA8" },
  { name: "Purple mid", varName: "--color-purple-mid", hex: "#5B589F" },
  { name: "Purple deep", varName: "--color-purple-deep", hex: "#242953" },
  { name: "Purple dark", varName: "--color-purple-dark", hex: "#353368" },
  { name: "Blue muted", varName: "--color-blue-muted", hex: "#D7DEF0" },
  { name: "White 40%", varName: "--color-white-40", hex: "rgb(255 255 255 / 40%)" },
  { name: "White 64%", varName: "--color-white-64", hex: "rgb(255 255 255 / 64%)" },
  { name: "Black 40%", varName: "--color-black-40", hex: "rgb(0 0 0 / 40%)" },
] as const;

const textStyles = [
  { label: "Heading 56px", node: <Heading level={1}>Heading 56px</Heading> },
  { label: "Heading 3 · 40px", node: <Heading level={2}>Heading 3 40px</Heading> },
  { label: "Heading 2 · 26px", node: <Heading level={3}>Heading 2 26px</Heading> },
  { label: "Heading 4 · 20px", node: <Heading level={4}>Heading 4 20px</Heading> },
  {
    label: "Lead 26px medium",
    node: (
      <Text size="lead" weight="medium" tone="accentLead">
        lead text 26px medium
      </Text>
    ),
  },
  {
    label: "Lead 26px regular",
    node: <Text size="lead">lead text 26px regular</Text>,
  },
  {
    label: "Text 20px regular / medium",
    node: (
      <>
        <Text size="xl">text 20px regular</Text>
        <Text size="xl" weight="medium">
          text 20px medium
        </Text>
      </>
    ),
  },
  {
    label: "Text 16px regular / medium",
    node: (
      <>
        <Text>text 16px regular</Text>
        <Text weight="medium">text 16px medium</Text>
      </>
    ),
  },
  {
    label: "Hint 14px / 12px",
    node: (
      <>
        <Text size="sm">hint text 14px regular</Text>
        <Text size="caption">hint text 12px regular</Text>
      </>
    ),
  },
] as const;

export function UiKitPage() {
  return (
    <>
      <Section tone="muted" className={styles["ui-kit-page__hero"]}>
        <div className={styles["ui-kit-page__hero-inner"]}>
          <Badge variant="purple">Design system</Badge>
          <Heading level={1}>UI Kit</Heading>
          <Text size="lead" tone="muted" className={styles["ui-kit-page__hero-lead"]}>
            Токены и компоненты из выделения Figma: Text styles, Color styles, UI-KIT.
          </Text>
        </div>
      </Section>

      <Section>
        <SectionTitle title="Color styles" subtitle="Палитра из макета" />
        <div className={styles["ui-kit-page__color-grid"]}>
          {colorTokens.map((token) => (
            <div key={token.varName} className={styles["ui-kit-page__color-swatch"]}>
              <div
                className={styles["ui-kit-page__color-sample"]}
                style={{ background: `var(${token.varName})` }}
              />
              <Text size="sm">{token.name}</Text>
              <Text size="caption" tone="muted">
                {token.hex}
              </Text>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionTitle title="Text styles" />
        <div className={styles["ui-kit-page__type-stack"]}>
          {textStyles.map((item, index) => (
            <div key={item.label}>
              {index > 0 ? <Divider /> : null}
              <div className={styles["ui-kit-page__type-row"]}>
                <Text size="caption" tone="muted" className={styles["ui-kit-page__type-label"]}>
                  {item.label}
                </Text>
                {item.node}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle title="Кнопки" subtitle="Button dark / light / color with arrow" />
        <div className={styles["ui-kit-page__block"]}>
          <Text size="sm" tone="muted">
            Dark · Light · Primary · Primary + arrow
          </Text>
          <div className={styles["ui-kit-page__row"]}>
            <Button variant="dark">Регистрация</Button>
            <Button variant="light">Регистрация</Button>
            <CompanyConnectionButton>Подключить</CompanyConnectionButton>
            <CompanyConnectionButton withArrow>
              Подключить компанию
            </CompanyConnectionButton>
            <Button withArrow disabled>
              Подключить компанию
            </Button>
          </div>
        </div>
        <div className={styles["ui-kit-page__block"]}>
          <Text size="sm" tone="muted">
            Plain · Ghost · Outline
          </Text>
          <div className={styles["ui-kit-page__row"]}>
            <Button variant="plain">О компании</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionTitle title="Ссылки, теги и бейджи" />
        <div className={styles["ui-kit-page__row"]}>
          <Link href="#colors" variant="nav">
            О компании
          </Link>
          <Link href="#docs" variant="inline">
            Текстовая ссылка
          </Link>
          <Badge variant="tag">Платформа</Badge>
          <Badge variant="chipAccent">Важное</Badge>
          <Badge variant="chip">Интересное</Badge>
          <Badge variant="chip">Новость</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="purple">Purple</Badge>
        </div>
      </Section>

      <Section>
        <SectionTitle title="Формы" subtitle="Input · Checkbox" />
        <div className={styles["ui-kit-page__form-grid"]}>
          <Input label="Telegram" placeholder="@ivan_ivanov" />
          <Input
            label="С ошибкой"
            placeholder="@ivan_ivanov"
            defaultValue="@ivan_ivanov"
            error="Проверьте формат"
          />
          <Input label="Disabled" placeholder="Недоступно" disabled />
          <Textarea label="Комментарий" placeholder="Расскажите о задаче" />
          <Checkbox label="Согласен на обработку персональных данных" defaultChecked />
        </div>
      </Section>

      <Section tone="muted">
        <SectionTitle title="Icon button" subtitle="Arrow button · Arrow button round" />
        <div className={styles["ui-kit-page__block"]}>
          <Text size="sm" tone="muted">
            Default
          </Text>
          <div className={styles["ui-kit-page__row"]}>
            <ArrowButton label="Назад" direction="left" variant="soft" />
            <ArrowButton label="Вперёд" direction="right" variant="soft" />
            <ArrowButton label="Назад" direction="left" variant="softAccent" />
            <ArrowButton label="Вперёд" direction="right" variant="softAccent" />
            <ArrowButton label="Назад" direction="left" variant="soft" disabled />
            <IconButton label="Меню" variant="outline">
              <span className={styles["ui-kit-page__dots"]} aria-hidden />
            </IconButton>
          </div>
        </div>
        <div className={styles["ui-kit-page__block"]}>
          <Text size="sm" tone="muted">
            Round
          </Text>
          <div className={styles["ui-kit-page__row"]}>
            <ArrowButton label="Назад" direction="left" shape="round" variant="soft" />
            <ArrowButton label="Вперёд" direction="right" shape="round" variant="soft" />
            <ArrowButton label="Назад" direction="left" shape="round" variant="softAccent" />
            <ArrowButton label="Вперёд" direction="right" shape="round" variant="softAccent" />
            <ArrowButton label="Назад" direction="left" shape="round" variant="soft" disabled />
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle title="Pagination" />
        <Pagination currentPage={2} totalPages={5} pathname="/ui-kit" />
      </Section>

      <Section tone="muted">
        <SectionTitle title="Logo" />
        <div className={styles["ui-kit-page__row"]}>
          <Logo />
          <div className={styles["ui-kit-page__logo-dark"]}>
            <Logo light />
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle title="Карточки" />
        <div className={styles["ui-kit-page__cards-grid"]}>
          <Card>
            <Heading level={4}>Card default</Heading>
            <Text tone="muted">Бордер и белый фон</Text>
          </Card>
          <Card variant="elevated">
            <Heading level={4}>Card elevated</Heading>
            <Text tone="muted">Тень shadow-card</Text>
          </Card>
          <Card variant="muted">
            <Heading level={4}>Card muted</Heading>
            <Text tone="muted">Фон #F9F9FB</Text>
          </Card>
        </div>
        <div className={styles["ui-kit-page__cards-grid-wide"]}>
          <InfoCard
            statValue="98%"
            title="Точность подбора"
            text="Сокращаем время закрытия вакансий за счёт аналитики и матчинга."
            variant="accent"
          />
          <StepItem
            step={1}
            title="Подключение"
            text="Импорт команды и ролей из ваших систем."
          />
          <TestimonialCard
            quote="Платформа помогла выстроить прозрачный процесс staffing."
            name="Анна К."
            role="HR Director"
          />
        </div>
        <CaseStudyCard
          href="#"
          panelSrc="/landing/case-studies/panel-bg-timforce.png"
          logoSrc="/landing/case-studies/logo-timforce.svg"
          logoWidth={340}
          logoHeight={61}
          panelAlt="ТИМ ФОРС"
          metric="15%"
          metricLabel="к производительности проектного департамента"
          description="Благодаря внедрению платформы группа компаний «ТИМ ФОРС» смогла выстроить прозрачную и управляемую экосистему взаимодействия с подрядчиками."
        />
      </Section>

      <Section tone="dark">
        <SectionTitle
          title="На тёмном фоне"
          subtitle="Button plain White · dark CTA"
          dark
          centered
        />
        <div className={styles["ui-kit-page__dark-row"]}>
          <Logo light />
          <Button href="#contacts" variant="dark">
            Регистрация
          </Button>
          <CompanyConnectionButton withArrow>
            Подключить компанию
          </CompanyConnectionButton>
        </div>
      </Section>
    </>
  );
}
