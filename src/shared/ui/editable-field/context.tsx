"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { AdminBlockEditContextValue, LandingBlockLike } from "./types";

const AdminBlockEditContext = createContext<AdminBlockEditContextValue | null>(null);

export function useAdminBlockEditOptional<
  TBlock extends LandingBlockLike = LandingBlockLike,
>() {
  return useContext(AdminBlockEditContext) as AdminBlockEditContextValue<TBlock> | null;
}

export function AdminBlockEditProvider<TBlock extends LandingBlockLike>({
  value,
  children,
}: {
  value: AdminBlockEditContextValue<TBlock>;
  children: ReactNode;
}) {
  return (
    <AdminBlockEditContext.Provider
      value={value as AdminBlockEditContextValue}
    >
      {children}
    </AdminBlockEditContext.Provider>
  );
}
