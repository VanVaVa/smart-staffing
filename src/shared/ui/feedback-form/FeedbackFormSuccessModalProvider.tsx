"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";

import { CompanyConnectionModal } from "./CompanyConnectionModal";
import { FeedbackFormSuccessModal } from "./FeedbackFormSuccessModal";

export type FeedbackFormSuccessContent = {
  title: string;
  description: string;
  homeLabel: string;
  illustrationSrc: string;
  illustrationWidth: number;
  illustrationHeight: number;
};

type FeedbackFormSuccessModalContextValue = {
  openCompanyConnectionModal: () => void;
  openSuccessModal: (content?: FeedbackFormSuccessContent) => void;
};

const FeedbackFormSuccessModalContext =
  createContext<FeedbackFormSuccessModalContextValue | null>(null);

type FeedbackFormSuccessModalProviderProps = {
  children: ReactNode;
};

export function FeedbackFormSuccessModalProvider({
  children,
}: FeedbackFormSuccessModalProviderProps) {
  const pathname = usePathname();
  const [companyConnectionPathname, setCompanyConnectionPathname] = useState<
    string | null
  >(null);
  const companyConnectionOpen = companyConnectionPathname === pathname;
  const [successOpen, setSuccessOpen] = useState(false);
  const [successContent, setSuccessContent] = useState<FeedbackFormSuccessContent | null>(
    null,
  );
  const openCompanyConnectionModal = useCallback(
    () => setCompanyConnectionPathname(pathname),
    [pathname],
  );
  const openSuccessModal = useCallback((content?: FeedbackFormSuccessContent) => {
    setSuccessContent(content ?? null);
    setSuccessOpen(true);
  }, []);
  const closeSuccessModal = useCallback(() => {
    setSuccessOpen(false);
    setSuccessContent(null);
  }, []);
  const contextValue = useMemo(
    () => ({ openCompanyConnectionModal, openSuccessModal }),
    [openCompanyConnectionModal, openSuccessModal],
  );

  return (
    <FeedbackFormSuccessModalContext value={contextValue}>
      {children}
      <CompanyConnectionModal
        open={companyConnectionOpen}
        onClose={() => setCompanyConnectionPathname(null)}
      />
      <FeedbackFormSuccessModal
        open={successOpen}
        onClose={closeSuccessModal}
        content={successContent}
      />
    </FeedbackFormSuccessModalContext>
  );
}

export function useFeedbackFormSuccessModal() {
  const context = useContext(FeedbackFormSuccessModalContext);

  if (!context) {
    throw new Error(
      "useFeedbackFormSuccessModal must be used within FeedbackFormSuccessModalProvider",
    );
  }

  return context;
}
