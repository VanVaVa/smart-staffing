"use client";

import { type FormEvent, useMemo, useState } from "react";

import {
  ContactChannelToggle,
  type ContactChannel,
} from "@/widgets/contact-section";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Link } from "@/shared/ui/link";

import { VacanciesApplicationSuccessModal } from "../vacancies-application-success-modal";

import styles from "./VacanciesApplicationForm.module.css";

const CHANNEL_FIELDS: Record<
  ContactChannel,
  { name: string; type: string; placeholder: string; autoComplete?: string }
> = {
  telegram: {
    name: "telegram",
    type: "text",
    placeholder: "@ivan_ivanov",
    autoComplete: "username",
  },
  phone: {
    name: "phone",
    type: "tel",
    placeholder: "+7 (___) ___-__-__",
    autoComplete: "tel",
  },
  email: {
    name: "email",
    type: "email",
    placeholder: "name@company.ru",
    autoComplete: "email",
  },
};

type VacanciesApplicationFormProps = {
  fullNamePlaceholder: string;
  attachLabel: string;
  submitLabel: string;
  successModal: {
    title: string;
    description: string;
    homeLabel: string;
    illustrationSrc: string;
    illustrationWidth: number;
    illustrationHeight: number;
  };
};

export function VacanciesApplicationForm({
  fullNamePlaceholder,
  attachLabel,
  submitLabel,
  successModal,
}: VacanciesApplicationFormProps) {
  const [channel, setChannel] = useState<ContactChannel>("telegram");
  const [consented, setConsented] = useState(false);
  const [contactValue, setContactValue] = useState("");
  const [fullName, setFullName] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  const field = useMemo(() => CHANNEL_FIELDS[channel], [channel]);

  const canSubmit =
    consented && contactValue.trim().length > 0 && fullName.trim().length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }
    setSuccessOpen(true);
  };

  return (
    <>
      <form
        className={styles["vacancies-application-form"]}
        action="#"
        method="post"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="channel" value={channel} />
        <div className={styles["vacancies-application-form__fields"]}>
          <ContactChannelToggle
            value={channel}
            onChange={(next) => {
              setChannel(next);
              setContactValue("");
            }}
          />
          <Input
            key={channel}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            required
            value={contactValue}
            onChange={(event) => setContactValue(event.target.value)}
            className={styles["vacancies-application-form__input"]}
          />
          <Input
            name="fullName"
            type="text"
            placeholder={fullNamePlaceholder}
            autoComplete="name"
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className={styles["vacancies-application-form__input"]}
          />
        </div>
        <Checkbox
          name="consent"
          checked={consented}
          onChange={(event) => setConsented(event.target.checked)}
          className={styles["vacancies-application-form__consent"]}
          label={
            <>
              Я даю согласие на обработку персональных данных в соответствии с{" "}
              <Link
                href="#"
                variant="inline"
                className={styles["vacancies-application-form__consent-link"]}
              >
                политикой конфиденциальности
              </Link>
            </>
          }
        />
        <div className={styles["vacancies-application-form__actions"]}>
          <label className={styles["vacancies-application-form__attach"]}>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              className={styles["vacancies-application-form__attach-input"]}
            />
            {attachLabel}
          </label>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            withArrow
            disabled={!canSubmit}
            className={styles["vacancies-application-form__submit"]}
          >
            {submitLabel}
          </Button>
        </div>
      </form>
      <VacanciesApplicationSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title={successModal.title}
        description={successModal.description}
        homeLabel={successModal.homeLabel}
        illustrationSrc={successModal.illustrationSrc}
        illustrationWidth={successModal.illustrationWidth}
        illustrationHeight={successModal.illustrationHeight}
      />
    </>
  );
}
