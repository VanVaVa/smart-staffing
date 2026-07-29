"use client";

import { type FormEvent, useMemo, useState } from "react";

import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  FeedbackFormChannelToggle,
  type FeedbackFormChannel,
} from "@/shared/ui/feedback-form-channel-toggle";
import { Input } from "@/shared/ui/input";
import { Link } from "@/shared/ui/link";

import { useFeedbackFormSuccessModal } from "./FeedbackFormSuccessModalProvider";

import styles from "./FeedbackForm.module.css";

const CHANNEL_FIELDS: Record<
  FeedbackFormChannel,
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

type FeedbackFormProps = {
  className?: string;
  submitLabel?: string;
};

export function FeedbackForm({
  className,
  submitLabel = "Отправить",
}: FeedbackFormProps) {
  const [channel, setChannel] = useState<FeedbackFormChannel>("telegram");
  const [consented, setConsented] = useState(false);
  const [contactValue, setContactValue] = useState("");
  const { openSuccessModal } = useFeedbackFormSuccessModal();

  const field = useMemo(() => CHANNEL_FIELDS[channel], [channel]);

  const canSubmit = consented && contactValue.trim().length > 0;

  const formClassName = [styles["feedback-form"], className].filter(Boolean).join(" ");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }
    openSuccessModal();
  };

  return (
    <form className={formClassName} action="#" method="post" onSubmit={handleSubmit}>
      <input type="hidden" name="channel" value={channel} />
      <div className={styles["feedback-form__fields"]}>
        <FeedbackFormChannelToggle
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
          className={styles["feedback-form__input"]}
        />
      </div>
      <Checkbox
        name="consent"
        checked={consented}
        onChange={(event) => setConsented(event.target.checked)}
        className={styles["feedback-form__consent"]}
        label={
          <>
            Я даю согласие на обработку персональных данных в соответствии с{" "}
            <Link href="#" variant="inline" className={styles["feedback-form__consent-link"]}>
              политикой конфиденциальности
            </Link>
          </>
        }
      />
      <Button type="submit" variant="primary" withArrow disabled={!canSubmit}>
        {submitLabel}
      </Button>
    </form>
  );
}
