"use client";

import { useMemo, useState } from "react";

import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Link } from "@/shared/ui/link";

import {
  ContactChannelToggle,
  type ContactChannel,
} from "../contact-channel-toggle";

import styles from "./ContactForm.module.css";

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

export function ContactForm() {
  const [channel, setChannel] = useState<ContactChannel>("telegram");
  const [consented, setConsented] = useState(false);
  const [contactValue, setContactValue] = useState("");

  const field = useMemo(() => CHANNEL_FIELDS[channel], [channel]);

  const canSubmit = consented && contactValue.trim().length > 0;

  return (
    <form className={styles["contact-form"]} action="#" method="post">
      <input type="hidden" name="channel" value={channel} />
      <div className={styles["contact-form__fields"]}>
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
          className={styles["contact-form__input"]}
        />
      </div>
      <Checkbox
        name="consent"
        checked={consented}
        onChange={(event) => setConsented(event.target.checked)}
        className={styles["contact-form__consent"]}
        label={
          <>
            Я даю согласие на обработку персональных данных в соответствии с{" "}
            <Link href="#" variant="inline" className={styles["contact-form__consent-link"]}>
              политикой конфиденциальности
            </Link>
          </>
        }
      />
      <Button type="submit" variant="primary" withArrow disabled={!canSubmit}>
        Отправить
      </Button>
    </form>
  );
}
