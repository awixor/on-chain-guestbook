"use client";

import { useState } from "react";
import CharacterCounter from "@/components/character-counter";
import InfoBox from "@/components/info-box";
import Button from "@/components/button";

interface GuestbookFormProps {
  onSubmit?: (message: string) => void;
  isPending?: boolean;
}

export default function GuestbookForm({
  onSubmit,
  isPending = false,
}: GuestbookFormProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSubmit) {
      onSubmit(message.trim());
    }
  };

  return (
    <div className="mb-12 w-full">
      <form
        onSubmit={handleSubmit}
        className="group relative overflow-hidden rounded-2xl p-px transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50"
      >
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-zinc-900 transition-colors dark:text-zinc-50"
              >
                Your Message
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave your mark on the blockchain..."
                  rows={4}
                  maxLength={280}
                  className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-sm text-zinc-900 placeholder-zinc-400 transition-all duration-200 focus:border-zinc-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:ring-offset-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-600 dark:focus:bg-zinc-900 dark:focus:ring-zinc-700"
                />
                <CharacterCounter current={message.length} max={280} />
              </div>
            </div>

            <InfoBox
              title="Estimated Gas Fee"
              description="Gas preview will appear here"
            />

            <Button
              type="submit"
              isLoading={isPending}
              loadingText="Posting..."
              disabled={!message.trim()}
            >
              Post Message
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
