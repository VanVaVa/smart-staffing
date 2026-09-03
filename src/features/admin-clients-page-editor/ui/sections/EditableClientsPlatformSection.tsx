"use client";

import type { AdminValues } from "@/shared/ui/admin-form";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { Badge } from "@/shared/ui/badge";
import { Container } from "@/shared/ui/container";
import {
  AdminInlineImage,
  AdminInlineText,
} from "@/shared/ui/admin-inline-field";

import {
  getPlatformContent,
  getStringList,
  patchPlatform,
} from "../../lib/patch-form-values";

import sectionStyles from "@/widgets/clients-platform-section/ui/ClientsPlatformSection.module.css";
import editableStyles from "./EditableClientsPlatformSection.module.css";

type EditableClientsPlatformSectionProps = {
  values: AdminValues;
  onChange: (values: AdminValues) => void;
  disabled?: boolean;
};

function updateStringList(
  values: AdminValues,
  listKey: "painPoints" | "tags",
  updater: (items: string[]) => string[],
): AdminValues {
  return patchPlatform(values, {
    [listKey]: updater(getStringList(values, "platform", listKey)),
  });
}

export function EditableClientsPlatformSection({
  values,
  onChange,
  disabled,
}: EditableClientsPlatformSectionProps) {
  const content = getPlatformContent(values);
  const painPoints = getStringList(values, "platform", "painPoints");
  const tags = getStringList(values, "platform", "tags");

  return (
    <section className={sectionStyles["clients-platform-section"]}>
      <div
        className={sectionStyles["clients-platform-section__clip"]}
        data-header-backdrop="dark"
        data-header-veil-bg="#090909"
      >
        <div className={sectionStyles["clients-platform-section__decor"]} aria-hidden>
          <div className={sectionStyles["clients-platform-section__gradient"]} />
          <div
            className={`${sectionStyles["clients-platform-section__orb"]} ${sectionStyles["clients-platform-section__orb--orange"]}`}
          />
          <div
            className={`${sectionStyles["clients-platform-section__orb"]} ${sectionStyles["clients-platform-section__orb--purple-large"]}`}
          />
          <div
            className={`${sectionStyles["clients-platform-section__orb"]} ${sectionStyles["clients-platform-section__orb--purple-small"]}`}
          />
        </div>
        <Container className={sectionStyles["clients-platform-section__container"]}>
          <div className={sectionStyles["clients-platform-section__layout"]}>
            <div className={sectionStyles["clients-platform-section__pain-column"]}>
              <ul className={sectionStyles["clients-platform-section__pain-list"]}>
                {painPoints.map((point, index) => (
                  <li
                    key={index}
                    className={[
                      sectionStyles["clients-platform-section__pain-item"],
                      editableStyles["editable-clients-platform-section__pain-item"],
                    ].join(" ")}
                  >
                    <span
                      className={sectionStyles["clients-platform-section__pain-marker"]}
                      aria-hidden
                    >
                      <ArrowIcon
                        name="cta"
                        className={sectionStyles["clients-platform-section__pain-icon"]}
                      />
                    </span>
                    <div
                      className={editableStyles["editable-clients-platform-section__pain-content"]}
                    >
                      <AdminInlineText
                        className={sectionStyles["clients-platform-section__pain-text"]}
                        value={point}
                        disabled={disabled}
                        onChange={(next) =>
                          onChange(
                            updateStringList(values, "painPoints", (items) =>
                              items.map((item, itemIndex) =>
                                itemIndex === index ? next : item,
                              ),
                            ),
                          )
                        }
                      />
                      <button
                        type="button"
                        className={editableStyles["editable-clients-platform-section__remove"]}
                        disabled={disabled || painPoints.length <= 1}
                        onClick={() =>
                          onChange(
                            updateStringList(values, "painPoints", (items) =>
                              items.filter((_, itemIndex) => itemIndex !== index),
                            ),
                          )
                        }
                      >
                        Удалить
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={editableStyles["editable-clients-platform-section__list-controls"]}>
                <button
                  type="button"
                  className={editableStyles["editable-clients-platform-section__add"]}
                  disabled={disabled}
                  onClick={() =>
                    onChange(
                      updateStringList(values, "painPoints", (items) => [...items, ""]),
                    )
                  }
                >
                  + Боль
                </button>
              </div>
            </div>
            <div className={sectionStyles["clients-platform-section__main"]}>
              <figure className={sectionStyles["clients-platform-section__preview"]}>
                <AdminInlineImage
                  layout="frame"
                  className={sectionStyles["clients-platform-section__preview-frame"]}
                  imageSrc={content.imageSrc || "/landing/clients/enterprise/platform-preview.png"}
                  imageWidth={content.imageWidth}
                  imageHeight={content.imageHeight}
                  imageAlt={content.imageAlt}
                  disabled={disabled}
                  sizes="(max-width: 450px) 328px, (max-width: 768px) 359px, (max-width: 1050px) 540px, (max-width: 1620px) 680px, 602px"
                  onChange={(patch) =>
                    onChange(patchPlatform(values, { imageSrc: patch.imageSrc }))
                  }
                />
              </figure>
              <div className={sectionStyles["clients-platform-section__copy"]}>
                <AdminInlineText
                  variant="heading"
                  className={sectionStyles["clients-platform-section__title"]}
                  value={content.title}
                  disabled={disabled}
                  multiline
                  onChange={(title) => onChange(patchPlatform(values, { title }))}
                />
                <AdminInlineText
                  className={sectionStyles["clients-platform-section__subtitle"]}
                  value={content.subtitle}
                  disabled={disabled}
                  multiline
                  onChange={(subtitle) => onChange(patchPlatform(values, { subtitle }))}
                />
              </div>
              <div
                className={[
                  sectionStyles["clients-platform-section__tags"],
                  editableStyles["editable-clients-platform-section__tags-controls"],
                ].join(" ")}
              >
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className={editableStyles["editable-clients-platform-section__tag-item"]}
                  >
                    <Badge variant="chip">
                      <AdminInlineText
                        value={tag}
                        disabled={disabled}
                        onChange={(next) =>
                          onChange(
                            updateStringList(values, "tags", (items) =>
                              items.map((item, itemIndex) =>
                                itemIndex === index ? next : item,
                              ),
                            ),
                          )
                        }
                      />
                    </Badge>
                    <button
                      type="button"
                      className={editableStyles["editable-clients-platform-section__remove"]}
                      disabled={disabled}
                      onClick={() =>
                        onChange(
                          updateStringList(values, "tags", (items) =>
                            items.filter((_, itemIndex) => itemIndex !== index),
                          ),
                        )
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  className={editableStyles["editable-clients-platform-section__add"]}
                  disabled={disabled}
                  onClick={() =>
                    onChange(updateStringList(values, "tags", (items) => [...items, ""]))
                  }
                >
                  + Тег
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
