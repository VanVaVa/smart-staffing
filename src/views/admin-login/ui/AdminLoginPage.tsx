"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import styles from "./AdminLoginPage.module.css";

export function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/admin/home";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Неверный email или пароль");
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("Не удалось выполнить вход");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={styles["admin-login-page"]}>
      <form className={styles["admin-login-page__form"]} onSubmit={handleSubmit}>
        <h1 className={styles["admin-login-page__title"]}>Вход в админ-панель</h1>
        <Input
          label="Email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          label="Пароль"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error ? (
          <p className={styles["admin-login-page__error"]} role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Вход…" : "Войти"}
        </Button>
      </form>
    </div>
  );
}
