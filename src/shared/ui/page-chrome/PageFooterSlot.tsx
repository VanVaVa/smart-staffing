"use client";

import { createContext, useContext, type ReactNode } from "react";

const PageFooterContext = createContext<ReactNode>(null);

type PageFooterProviderProps = {
  footer: ReactNode;
  children: ReactNode;
};

export function PageFooterProvider({ footer, children }: PageFooterProviderProps) {
  return (
    <PageFooterContext.Provider value={footer}>{children}</PageFooterContext.Provider>
  );
}

export function usePageFooter(): ReactNode {
  return useContext(PageFooterContext);
}
