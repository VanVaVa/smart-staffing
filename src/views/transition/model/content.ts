import type { ClientsHeroContent } from "@/entities/landing";
import type { FeedbackFormPanelContent } from "@/shared/ui/feedback-form-panel";

import type { TransitionCycleContent, TransitionFactsContent, TransitionQuestion, TransitionStep } from "./types";

export const transitionTitleLines: [string, string] = ["Сократить ФОТ", "Сохранить специалистам работу"];

export const transitionHero: ClientsHeroContent = {
  title: transitionTitleLines.join("\n"),
  subtitle: {
    before: "",
    accent: "Возможность перехода ИТ\u2011специалистов",
    after: " к\u00a0новым работодателям ещё в\u00a0срок предупреждения о\u00a0сокращении.",
  },
  cta: "Перевести сотрудников",
  imageSrc: "/landing/transition/hero-specialists-square.webp",
  imageWidth: 1912,
  imageHeight: 1920,
  imageAlt: "Каталог специалистов на\u00a0платформе СмартСтаффинг",
  imageMobileSrc: "/landing/transition/hero-specialists-wide.webp",
  imageMobileWidth: 2000,
  imageMobileHeight: 1224,
};

export const transitionGains = {
  label: "Что получает ваша компания",
  items: ["Компетенции остаются в\u00a0профессии", "Без\u00a0лишних месяцев ФОТ", "Оплата только за\u00a0переход"],
};

export const transitionSteps = {
  title: "Как работает аутплейсмент",
  items: [
    {
      number: "01",
      title: "Доступные компетенции",
      text: "Вы\u00a0сообщаете специалистам о\u00a0программе. Участвуют только те, кто согласился сам.",
      imageSrc: "/landing/transition/step-1.webp",
    },
    {
      number: "02",
      title: "Реферальная программа",
      text: "Сервис открывает ваших специалистов вакансиям партнёрской сети. Работодатели и\u00a0специалисты договариваются напрямую.",
      imageSrc: "/landing/transition/step-2.webp",
    },
    {
      number: "03",
      title: "Переход состоялся",
      text: "Специалист выходит на\u00a0новую работу. Счёт\u00a0— после того как выход подтверждён.",
      imageSrc: "/landing/transition/step-3.webp",
    },
  ] satisfies TransitionStep[],
};

export const transitionCycle: TransitionCycleContent = {
  title: "Каждый переход запускает следующий",
  text: "Работодатели возвращаются с\u00a0новыми вакансиями\u00a0— следующим специалистам проще найти работу.",
  label: "Цикл: ваши специалисты в\u00a0сети, партнёры приводят вакансии, переход состоялся, сеть растёт\u00a0— и\u00a0снова",
  nodes: [
    { title: "Ваши специалисты в\u00a0сети", text: "те, кто согласился участвовать" },
    { title: "Партнёры приводят вакансии", text: "работодатели, агентства, компании сети" },
    { title: "Переход состоялся", text: "специалист вышел на\u00a0новую работу" },
    { title: "Сеть растёт", text: "новая вакансия, следующее знакомство" },
  ],
  loop: "и\u00a0снова\u00a0— больше вакансий для\u00a0следующих ваших специалистов",
};

export const transitionReasons = {
  title: "Почему работодатели нанимают ваших специалистов",
  lead: "Мы\u00a0предлагаем работодателям то, чего нет на\u00a0площадках и\u00a0у\u00a0кадровых агентств.",
  cards: {
    recommendation: "Опыт по\u00a0рекомендации",
    early: "Раньше рынка",
    team: "Сработанная команда",
  },
  note: "Подтверждение опыта\u00a0— только с\u00a0согласия специалиста.",
};

export const transitionPerks = {
  title: "Доступ к\u00a0специалистам\u00a0— под\u00a0вашим контролем",
  cards: {
    lists: "Управление участниками сети",
    contour: "Закрытый контур по\u00a0NDA",
    consent: "Данные\u00a0— только с\u00a0согласия",
    decision: "Решение\u00a0— за\u00a0специалистом",
  },
  imageSrc: "/landing/transition/perks.webp",
};

export const transitionFacts: TransitionFactsContent = {
  title: "Опытных специалистов ищут",
  lead: "Спрос в\u00a0ИТ\u2011индустрии не\u00a0исчез, а\u00a0сместился: к\u00a0опытным специалистам и\u00a0в\u00a0другие отрасли.",
  items: [
    {
      value: "2,5",
      label: "резюме на\u00a0вакансию сеньора",
      text: "Против 19 на\u00a0джуниора. Архитекторы и\u00a0лиды остаются востребованными, а\u00a0вакансии DevOps закрывают месяцами.",
      sources: [
        { label: "hh.ru", href: "https://hh.ru/article/6-trendov-v-najme-na-2026-god-kotorye-prognoziruyut-ehksperty" },
        { label: "Hi\u2011Tech Mail", href: "https://hi-tech.mail.ru/articles/150067-pochemu-vakansij-na-35-menshe-chem-v-2025-godu/" },
        { label: "Хабр", href: "https://habr.com/ru/articles/1054450/" },
      ],
    },
    {
      value: "до\u00a0300",
      label: "откликов на\u00a0одну ИТ\u2011вакансию",
      text: "Рекомендации и\u00a0личные связи\u00a0— один из\u00a0ключевых каналов найма.",
      sources: [
        { label: "CNews, данные iTrend", href: "https://www.cnews.ru/news/line/2026-02-11_rost_zarplat_v_it_ostanovilsya" },
        { label: "hh.ru", href: "https://hh.ru/article/6-trendov-v-najme-na-2026-god-kotorye-prognoziruyut-ehksperty" },
      ],
    },
    {
      value: "+25%",
      label: "вакансий в\u00a0промышленности за\u00a0год",
      text: "Реальный сектор набирает специалистов по\u00a0автоматизации: в\u00a0производстве и\u00a0сервисе таких вакансий за\u00a05\u00a0лет стало на\u00a040% больше.",
      sources: [
        { label: "Клерк, данные Авито Работы", href: "https://www.klerk.ru/buh/news/714673/" },
        { label: "Новости ИТ\u2011канала, данные hh.ru", href: "https://www.novostiitkanala.ru/news/detail.php?ID=197861" },
      ],
    },
  ],
};

export const transitionFaq = {
  title: "Вопросы",
  items: [
    {
      icon: "wallet",
      question: "Сколько это стоит?",
      answer: "Только за\u00a0состоявшийся переход. Счёт выставляется после того, как выход специалиста на\u00a0новую работу подтверждён и\u00a0вы\u00a0признали переход по\u00a0критериям договора. Стоимость и\u00a0порядок расчётов фиксируются в\u00a0договоре услуг и\u00a0дополнительном соглашении к\u00a0нему.",
    },
    {
      icon: "doc",
      question: "Как оформляется уход сотрудника?",
      answer: "Прекращение трудовых отношений оформляют ваша компания и\u00a0сотрудник в\u00a0соответствии с\u00a0законодательством. До\u00a0старта программы мы\u00a0согласуем с\u00a0вами порядок взаимодействия и\u00a0необходимые документы, чтобы учесть юридические требования.",
    },
    {
      icon: "userCheck",
      question: "Что, если сотрудник не\u00a0захочет участвовать?",
      answer: "Участие добровольное. Мы\u00a0работаем только с\u00a0теми сотрудниками, которые согласились воспользоваться программой.",
    },
    {
      icon: "shield",
      question: "Можно не\u00a0допускать конкурентов?",
      answer: "Да, вы\u00a0можете согласовать ограничения по\u00a0кругу потенциальных работодателей и\u00a0определить компании, которым нельзя предлагать специалистов. Порядок применения ограничений фиксируется при\u00a0согласовании программы.",
    },
    {
      icon: "lock",
      question: "Кто видит данные сотрудников?",
      answer: "Профиль специалиста видит только работодатель партнёрской сети, которого вы\u00a0не\u00a0исключили, и\u00a0только с\u00a0согласия самого специалиста. Каждое раскрытие фиксируется в\u00a0партнёрской сети, поэтому специалист знает, кому открыт его профиль. Мы\u00a0соблюдаем требования законодательства о\u00a0персональных данных и\u00a0конфиденциальности.",
    },
    {
      icon: "check",
      question: "Как подтверждается переход?",
      answer: "Подтверждённым результатом считается фактическое начало оплачиваемой профессиональной деятельности. Конкретные критерии, перечень подтверждающих документов и\u00a0порядок проверки заранее фиксируются в\u00a0дополнительном соглашении к\u00a0договору услуг. Само по\u00a0себе предложение о\u00a0работе не\u00a0считается состоявшимся переходом.",
    },
    {
      icon: "users",
      question: "Можем ли мы\u00a0сами нанимать специалистов из\u00a0сети?",
      answer: "Да, вы\u00a0можете рассматривать специалистов, которые ищут новые возможности, для\u00a0закрытия собственных вакансий. Формат взаимодействия и\u00a0условия такого подбора согласуются отдельно.",
    },
    {
      icon: "clock",
      question: "Что делать, если до\u00a0увольнения осталось мало времени?",
      answer: "Мы\u00a0учитываем ваши сроки при\u00a0планировании программы и\u00a0определении объёма работ. Чем раньше начнём, тем больше возможностей будет для\u00a0поиска подходящих вариантов занятости.",
    },
  ] satisfies TransitionQuestion[],
};

export const transitionLeadForm: FeedbackFormPanelContent = {
  title: "Оставьте заявку",
  subtitle: "Покажем сервис на\u00a0вашем сценарии и\u00a0ответим на\u00a0вопросы",
  subtitleAccent: "Покажем сервис",
};

export const TRANSITION_SECTION_IDS = {
  steps: "kak",
  perks: "dostup",
  faq: "voprosy",
  lead: "zayavka",
} as const;
