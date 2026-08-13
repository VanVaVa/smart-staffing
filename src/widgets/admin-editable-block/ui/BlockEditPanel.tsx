"use client";

import {
  HOME_BLOCK_TYPE_LABELS,
  type HomeBlock,
} from "@/entities/landing";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { MediaField } from "./MediaField";
import { TextAreaField } from "./TextAreaField";
import styles from "./BlockEditPanel.module.css";

type BlockEditPanelProps = {
  block: HomeBlock;
  onChange: (block: HomeBlock) => void;
  onClose: () => void;
};

export function BlockEditPanel({ block, onChange, onClose }: BlockEditPanelProps) {
  function setProps(nextProps: HomeBlock["props"]) {
    onChange({ ...block, props: nextProps } as HomeBlock);
  }

  return (
    <aside className={styles["block-edit-panel"]}>
      <div className={styles["block-edit-panel__header"]}>
        <h2 className={styles["block-edit-panel__title"]}>
          {HOME_BLOCK_TYPE_LABELS[block.type]}
        </h2>
        <button type="button" className={styles["block-edit-panel__close"]} onClick={onClose}>
          Закрыть
        </button>
      </div>
      <div className={styles["block-edit-panel__body"]}>
        {block.type === "hero" ? (
          <>
            <TextAreaField
              label="Заголовок"
              value={block.props.title}
              onChange={(title) => setProps({ ...block.props, title })}
            />
            <Input
              label="Подзаголовок (lead)"
              value={block.props.subtitleLead}
              onChange={(e) =>
                setProps({ ...block.props, subtitleLead: e.target.value })
              }
            />
            <Input
              label="Подзаголовок (tail)"
              value={block.props.subtitleTail}
              onChange={(e) =>
                setProps({ ...block.props, subtitleTail: e.target.value })
              }
            />
            <Input
              label="Текст CTA"
              value={block.props.primaryCta}
              onChange={(e) =>
                setProps({ ...block.props, primaryCta: e.target.value })
              }
            />
            <Input
              label="Реестр — подпись"
              value={block.props.registryLabel}
              onChange={(e) =>
                setProps({ ...block.props, registryLabel: e.target.value })
              }
            />
            <Input
              label="Реестр — ссылка"
              value={block.props.registryHref}
              onChange={(e) =>
                setProps({ ...block.props, registryHref: e.target.value })
              }
            />
            <MediaField
              label="Dashboard"
              value={block.props.dashboardImageSrc}
              onChange={(dashboardImageSrc) =>
                setProps({ ...block.props, dashboardImageSrc })
              }
            />
            <div className={styles["block-edit-panel__section"]}>
              <p className={styles["block-edit-panel__section-title"]}>Сегменты</p>
              {block.props.segments.map((segment, index) => (
                <div key={`${segment.label}-${index}`} className={styles["block-edit-panel__card"]}>
                  <Input
                    label="Подпись"
                    value={segment.label}
                    onChange={(e) => {
                      const segments = [...block.props.segments];
                      segments[index] = { ...segments[index], label: e.target.value };
                      setProps({ ...block.props, segments });
                    }}
                  />
                  <MediaField
                    label="Изображение"
                    value={segment.imageSrc}
                    onChange={(imageSrc) => {
                      const segments = [...block.props.segments];
                      segments[index] = { ...segments[index], imageSrc };
                      setProps({ ...block.props, segments });
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => {
                      const segments = block.props.segments.filter((_, i) => i !== index);
                      setProps({ ...block.props, segments });
                    }}
                  >
                    Удалить сегмент
                  </Button>
                </div>
              ))}
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() =>
                  setProps({
                    ...block.props,
                    segments: [
                      ...block.props.segments,
                      { label: "Новый сегмент", imageSrc: "/landing/hero-segment-enterprise.png" },
                    ],
                  })
                }
              >
                Добавить сегмент
              </Button>
            </div>
          </>
        ) : null}

        {block.type === "productShowcase" ? (
          <>
            <Input
              label="Тег"
              value={block.props.tag}
              onChange={(e) => setProps({ ...block.props, tag: e.target.value })}
            />
            <Input
              label="Заголовок"
              value={block.props.title}
              onChange={(e) => setProps({ ...block.props, title: e.target.value })}
            />
            <TextAreaField
              label="Подзаголовок"
              value={block.props.subtitle}
              onChange={(subtitle) => setProps({ ...block.props, subtitle })}
            />
            <Input
              label="Заголовок benefits"
              value={block.props.benefitsTitle}
              onChange={(e) =>
                setProps({ ...block.props, benefitsTitle: e.target.value })
              }
            />
            <MediaField
              label="Mockup — устройство"
              value={block.props.mockupDeviceSrc}
              onChange={(mockupDeviceSrc) =>
                setProps({ ...block.props, mockupDeviceSrc })
              }
            />
            <MediaField
              label="Mockup — экран"
              value={block.props.mockupScreenSrc}
              onChange={(mockupScreenSrc) =>
                setProps({ ...block.props, mockupScreenSrc })
              }
            />
            <div className={styles["block-edit-panel__section"]}>
              <p className={styles["block-edit-panel__section-title"]}>Cost icons</p>
              {block.props.benefitMedia.costIcons.map((icon, index) => (
                <MediaField
                  key={index}
                  label={`Cost icon ${index + 1}`}
                  value={icon.imageSrc}
                  onChange={(imageSrc) => {
                    const costIcons = [...block.props.benefitMedia.costIcons];
                    costIcons[index] = { imageSrc };
                    setProps({
                      ...block.props,
                      benefitMedia: { ...block.props.benefitMedia, costIcons },
                    });
                  }}
                />
              ))}
            </div>
            <MediaField
              label="Медиа contractors"
              value={block.props.benefitMedia.contractors}
              onChange={(contractors) =>
                setProps({
                  ...block.props,
                  benefitMedia: { ...block.props.benefitMedia, contractors },
                })
              }
            />
            <MediaField
              label="Медиа competencies"
              value={block.props.benefitMedia.competencies}
              onChange={(competencies) =>
                setProps({
                  ...block.props,
                  benefitMedia: { ...block.props.benefitMedia, competencies },
                })
              }
            />
            <MediaField
              label="Медиа stat"
              value={block.props.benefitMedia.stat}
              onChange={(stat) =>
                setProps({
                  ...block.props,
                  benefitMedia: { ...block.props.benefitMedia, stat },
                })
              }
            />
            <div className={styles["block-edit-panel__section"]}>
              <p className={styles["block-edit-panel__section-title"]}>Карточки benefits</p>
              {block.props.benefits.map((benefit, index) => (
                <div key={benefit.id} className={styles["block-edit-panel__card"]}>
                  <Input
                    label="ID"
                    value={benefit.id}
                    onChange={(e) => {
                      const benefits = [...block.props.benefits];
                      benefits[index] = { ...benefits[index], id: e.target.value };
                      setProps({ ...block.props, benefits });
                    }}
                  />
                  <Input
                    label="Layout"
                    value={benefit.layout}
                    onChange={(e) => {
                      const benefits = [...block.props.benefits];
                      benefits[index] = {
                        ...benefits[index],
                        layout: e.target.value as typeof benefit.layout,
                      };
                      setProps({ ...block.props, benefits });
                    }}
                  />
                  <Input
                    label="Заголовок"
                    value={benefit.title}
                    onChange={(e) => {
                      const benefits = [...block.props.benefits];
                      benefits[index] = { ...benefits[index], title: e.target.value };
                      setProps({ ...block.props, benefits });
                    }}
                  />
                  <TextAreaField
                    label="Текст"
                    value={benefit.text}
                    onChange={(text) => {
                      const benefits = [...block.props.benefits];
                      benefits[index] = { ...benefits[index], text };
                      setProps({ ...block.props, benefits });
                    }}
                  />
                  {benefit.layout === "stat" ? (
                    <Input
                      label="Stat value"
                      value={benefit.statValue ?? ""}
                      onChange={(e) => {
                        const benefits = [...block.props.benefits];
                        benefits[index] = {
                          ...benefits[index],
                          statValue: e.target.value,
                        };
                        setProps({ ...block.props, benefits });
                      }}
                    />
                  ) : null}
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => {
                      const benefits = block.props.benefits.filter((_, i) => i !== index);
                      setProps({ ...block.props, benefits });
                    }}
                  >
                    Удалить карточку
                  </Button>
                </div>
              ))}
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() =>
                  setProps({
                    ...block.props,
                    benefits: [
                      ...block.props.benefits,
                      {
                        id: `benefit-${Date.now()}`,
                        layout: "cost",
                        title: "",
                        text: "",
                      },
                    ],
                  })
                }
              >
                Добавить карточку
              </Button>
            </div>
          </>
        ) : null}

        {block.type === "features" ? (
          <div className={styles["block-edit-panel__section"]}>
            <p className={styles["block-edit-panel__section-title"]}>Строки решений</p>
            {block.props.rows.map((row, index) => (
              <div key={`${row.title}-${index}`} className={styles["block-edit-panel__card"]}>
                <Input
                  label="Заголовок"
                  value={row.title}
                  onChange={(e) => {
                    const rows = [...block.props.rows];
                    rows[index] = { ...rows[index], title: e.target.value };
                    setProps({ ...block.props, rows });
                  }}
                />
                <TextAreaField
                  label="Описание"
                  value={row.description}
                  onChange={(description) => {
                    const rows = [...block.props.rows];
                    rows[index] = { ...rows[index], description };
                    setProps({ ...block.props, rows });
                  }}
                />
                <TextAreaField
                  label="Теги (через перенос строки)"
                  value={row.tags.join("\n")}
                  onChange={(raw) => {
                    const rows = [...block.props.rows];
                    rows[index] = {
                      ...rows[index],
                      tags: raw.split("\n").map((t) => t.trim()).filter(Boolean),
                    };
                    setProps({ ...block.props, rows });
                  }}
                />
                <MediaField
                  label="Изображение"
                  value={row.imageSrc}
                  onChange={(imageSrc) => {
                    const rows = [...block.props.rows];
                    rows[index] = { ...rows[index], imageSrc };
                    setProps({ ...block.props, rows });
                  }}
                />
                <Input
                  label="Alt"
                  value={row.imageAlt}
                  onChange={(e) => {
                    const rows = [...block.props.rows];
                    rows[index] = { ...rows[index], imageAlt: e.target.value };
                    setProps({ ...block.props, rows });
                  }}
                />
                <label className={styles["block-edit-panel__checkbox"]}>
                  <input
                    type="checkbox"
                    checked={Boolean(row.reversed)}
                    onChange={(e) => {
                      const rows = [...block.props.rows];
                      rows[index] = { ...rows[index], reversed: e.target.checked };
                      setProps({ ...block.props, rows });
                    }}
                  />
                  reversed
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => {
                    const rows = block.props.rows.filter((_, i) => i !== index);
                    setProps({ ...block.props, rows });
                  }}
                >
                  Удалить строку
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() =>
                setProps({
                  ...block.props,
                  rows: [
                    ...block.props.rows,
                    {
                      title: "Новая строка",
                      description: "",
                      tags: [],
                      imageSrc: "/landing/features/feature-projects.png",
                      imageAlt: "",
                      imageWidth: 956,
                      imageHeight: 542,
                    },
                  ],
                })
              }
            >
              Добавить строку
            </Button>
          </div>
        ) : null}

        {block.type === "platformOnboarding" ? (
          <>
            <p className={styles["block-edit-panel__section-title"]}>Partner</p>
            <Input
              label="Заголовок"
              value={block.props.partner.title}
              onChange={(e) =>
                setProps({
                  ...block.props,
                  partner: { ...block.props.partner, title: e.target.value },
                })
              }
            />
            <TextAreaField
              label="Подзаголовок"
              value={block.props.partner.subtitle}
              onChange={(subtitle) =>
                setProps({
                  ...block.props,
                  partner: { ...block.props.partner, subtitle },
                })
              }
            />
            <MediaField
              label="Изображение"
              value={block.props.partner.imageSrc}
              onChange={(imageSrc) =>
                setProps({
                  ...block.props,
                  partner: { ...block.props.partner, imageSrc },
                })
              }
            />
            <p className={styles["block-edit-panel__section-title"]}>Demo</p>
            <Input
              label="Заголовок"
              value={block.props.demo.title}
              onChange={(e) =>
                setProps({
                  ...block.props,
                  demo: { ...block.props.demo, title: e.target.value },
                })
              }
            />
            <MediaField
              label="Mockup"
              value={block.props.demo.mockupSrc}
              onChange={(mockupSrc) =>
                setProps({
                  ...block.props,
                  demo: { ...block.props.demo, mockupSrc },
                })
              }
            />
            <p className={styles["block-edit-panel__section-title"]}>Steps</p>
            <Input
              label="Заголовок"
              value={block.props.steps.title}
              onChange={(e) =>
                setProps({
                  ...block.props,
                  steps: { ...block.props.steps, title: e.target.value },
                })
              }
            />
            {block.props.steps.steps.map((step, index) => (
              <div key={`${step.title}-${index}`} className={styles["block-edit-panel__card"]}>
                <Input
                  label="Шаг — заголовок"
                  value={step.title}
                  onChange={(e) => {
                    const steps = [...block.props.steps.steps];
                    steps[index] = { ...steps[index], title: e.target.value };
                    setProps({
                      ...block.props,
                      steps: { ...block.props.steps, steps },
                    });
                  }}
                />
                <TextAreaField
                  label="Шаг — текст"
                  value={step.text}
                  onChange={(text) => {
                    const steps = [...block.props.steps.steps];
                    steps[index] = { ...steps[index], text };
                    setProps({
                      ...block.props,
                      steps: { ...block.props.steps, steps },
                    });
                  }}
                />
              </div>
            ))}
          </>
        ) : null}

        {block.type === "caseStudies" ? (
          <>
            <Input
              label="Заголовок секции"
              value={block.props.title}
              onChange={(e) => setProps({ ...block.props, title: e.target.value })}
            />
            {block.props.items.map((item, index) => (
              <div key={`${item.panelSrc}-${index}`} className={styles["block-edit-panel__card"]}>
                <MediaField
                  label="Фон панели"
                  value={item.panelSrc}
                  onChange={(panelSrc) => {
                    const items = [...block.props.items];
                    items[index] = { ...items[index], panelSrc };
                    setProps({ ...block.props, items });
                  }}
                />
                <MediaField
                  label="Логотип"
                  value={item.logoSrc ?? ""}
                  onChange={(logoSrc) => {
                    const items = [...block.props.items];
                    items[index] = { ...items[index], logoSrc };
                    setProps({ ...block.props, items });
                  }}
                />
                <TextAreaField
                  label="Описание"
                  value={item.description}
                  onChange={(description) => {
                    const items = [...block.props.items];
                    items[index] = { ...items[index], description };
                    setProps({ ...block.props, items });
                  }}
                />
                <Input
                  label="Метрика"
                  value={item.metric}
                  onChange={(e) => {
                    const items = [...block.props.items];
                    items[index] = { ...items[index], metric: e.target.value };
                    setProps({ ...block.props, items });
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => {
                    const items = block.props.items.filter((_, i) => i !== index);
                    setProps({ ...block.props, items });
                  }}
                >
                  Удалить кейс
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() =>
                setProps({
                  ...block.props,
                  items: [
                    ...block.props.items,
                    {
                      href: "#",
                      panelSrc: "/landing/case-studies/panel-bg-case-2.png",
                      logoSrc: "/landing/case-studies/logo-case-2.svg",
                      panelAlt: "",
                      description: "",
                      metric: "",
                      metricLabel: "",
                    },
                  ],
                })
              }
            >
              Добавить кейс
            </Button>
          </>
        ) : null}

        {block.type === "testimonials" ? (
          <>
            <Input
              label="Заголовок секции"
              value={block.props.title}
              onChange={(e) => setProps({ ...block.props, title: e.target.value })}
            />
            {block.props.items.map((item, index) => (
              <div key={`${item.company}-${index}`} className={styles["block-edit-panel__card"]}>
                <Input
                  label="Компания"
                  value={item.company}
                  onChange={(e) => {
                    const items = [...block.props.items];
                    items[index] = { ...items[index], company: e.target.value };
                    setProps({ ...block.props, items });
                  }}
                />
                <TextAreaField
                  label="Цитата"
                  value={item.quote}
                  onChange={(quote) => {
                    const items = [...block.props.items];
                    items[index] = { ...items[index], quote };
                    setProps({ ...block.props, items });
                  }}
                />
                <MediaField
                  label="Логотип"
                  value={item.logoSrc}
                  onChange={(logoSrc) => {
                    const items = [...block.props.items];
                    items[index] = { ...items[index], logoSrc };
                    setProps({ ...block.props, items });
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => {
                    const items = block.props.items.filter((_, i) => i !== index);
                    setProps({ ...block.props, items });
                  }}
                >
                  Удалить отзыв
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() =>
                setProps({
                  ...block.props,
                  items: [
                    ...block.props.items,
                    {
                      company: "Компания",
                      role: "",
                      date: "",
                      quote: "",
                      logoSrc: "/landing/testimonials/logo-kokoc.svg",
                      logoWidth: 32,
                      logoHeight: 17,
                    },
                  ],
                })
              }
            >
              Добавить отзыв
            </Button>
          </>
        ) : null}

        {block.type === "contact" ? (
          <>
            <Input
              label="Заголовок"
              value={block.props.title}
              onChange={(e) => setProps({ ...block.props, title: e.target.value })}
            />
            <TextAreaField
              label="Подзаголовок"
              value={block.props.subtitle}
              onChange={(subtitle) => setProps({ ...block.props, subtitle })}
            />
            <Input
              label="Акцент в подзаголовке"
              value={block.props.subtitleAccent}
              onChange={(e) =>
                setProps({ ...block.props, subtitleAccent: e.target.value })
              }
            />
          </>
        ) : null}
      </div>
    </aside>
  );
}
