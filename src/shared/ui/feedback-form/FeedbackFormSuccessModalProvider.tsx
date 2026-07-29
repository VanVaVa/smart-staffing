"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { CompanyConnectionModal } from "./CompanyConnectionModal";
import { FeedbackFormSuccessModal } from "./FeedbackFormSuccessModal";

type FeedbackFormSuccessModalContextValue = {
  openCompanyConnectionModal: () => void;
  openSuccessModal: () => void;
};

const FeedbackFormSuccessModalContext =
  createContext<FeedbackFormSuccessModalContextValue | null>(null);

type FeedbackFormSuccessModalProviderProps = {
  children: ReactNode;
};

export function FeedbackFormSuccessModalProvider({
  children,
}: FeedbackFormSuccessModalProviderProps) {
  const [companyConnectionOpen, setCompanyConnectionOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const openCompanyConnectionModal = useCallback(
    () => setCompanyConnectionOpen(true),
    [],
  );
  const openSuccessModal = useCallback(() => setSuccessOpen(true), []);
  const contextValue = useMemo(
    () => ({ openCompanyConnectionModal, openSuccessModal }),
    [openCompanyConnectionModal, openSuccessModal],
  );

  return (
    <FeedbackFormSuccessModalContext value={contextValue}>
      {children}
      <CompanyConnectionModal
        open={companyConnectionOpen}
        onClose={() => setCompanyConnectionOpen(false)}
      />
      <FeedbackFormSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
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
