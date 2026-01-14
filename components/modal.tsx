"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "@/lib/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      modalRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl transition-all animate-in zoom-in-95 duration-300 dark:border-zinc-800 dark:bg-zinc-900 focus:outline-none"
      >
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-blue-500/10 via-purple-500/5 to-transparent dark:from-blue-500/20 dark:via-purple-500/10" />

        <div className="relative">
          <div className="flex items-center justify-between border-b border-zinc-100 p-6 dark:border-zinc-800">
            <h3
              id="modal-title"
              className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="cursor-pointer rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-100"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
