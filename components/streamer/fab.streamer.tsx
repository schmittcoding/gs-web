"use client";

import { IconLayoutDashboard, IconPlus, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SupportStreamerDialog } from "./support-dialog.streamer";
import { IconStreamer } from "@/components/icons";
import { cn } from "@/lib/utils";

export function StreamerFab() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSupportClick = () => {
    setOpen(false);
    setDialogOpen(true);
  };

  return (
    <>
      <SupportStreamerDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      <div
        ref={containerRef}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      >
        {/* Sub-button 2 — Streamer Dashboard */}
        <div
          className={cn(
            "flex items-center gap-2.5 transition-all duration-300 ease-out",
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none",
          )}
          style={{ transitionDelay: open ? "60ms" : "0ms" }}
        >
          <span className="ran-fab-label">Streamer Dashboard</span>
          <Link
            href="/sas"
            onClick={() => setOpen(false)}
            className="ran-fab-sub"
            aria-label="Streamer Dashboard"
          >
            <IconLayoutDashboard className="size-5" />
          </Link>
        </div>

        {/* Sub-button 1 — Support a Streamer */}
        <div
          className={cn(
            "flex items-center gap-2.5 transition-all duration-300 ease-out",
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none",
          )}
          style={{ transitionDelay: open ? "0ms" : "60ms" }}
        >
          <span className="ran-fab-label">Support a Streamer</span>
          <button
            onClick={handleSupportClick}
            className="ran-fab-sub"
            aria-label="Support a Streamer"
          >
            <IconStreamer className="size-5" />
          </button>
        </div>

        {/* Main FAB */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close streamer menu" : "Open streamer menu"}
          className="ran-fab-main"
          data-open={open}
        >
          <span
            className={cn(
              "transition-transform duration-300",
              open ? "rotate-45 scale-90" : "rotate-0 scale-100",
            )}
          >
            {open ? <IconX className="size-6" /> : <IconPlus className="size-6" />}
          </span>
        </button>
      </div>
    </>
  );
}
