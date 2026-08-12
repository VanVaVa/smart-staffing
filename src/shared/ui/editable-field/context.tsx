"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { AdminBlockEditContextValue } from "./types";

const AdminBlockEditContext = createContext<AdminBlockEditContextValue | null>(null);

export function useAdminBlockEditOptional() {
  return useContext(AdminBlockEditContext);
}

export function AdminBlockEditProvider({
  value,
  children,
}: {
  value: AdminBlockEditContextValue;
  children: ReactNode;
}) {
  return (
    <AdminBlockEditContext.Provider value={value}>{children}</AdminBlockEditContext.Provider>
  );
}
