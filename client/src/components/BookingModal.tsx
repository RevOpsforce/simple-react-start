/**
 * BookingModal — HubSpot Meetings embed modal
 * Design: Dark navy overlay, close-only header (no title text), close on backdrop/Esc.
 *
 * Embed reload strategy:
 *   HubSpot's MeetingsEmbedCode.js scans the DOM for .meetings-iframe-container
 *   elements only once on load. On subsequent opens the container is re-mounted
 *   but the script won't re-scan. To guarantee the iframe appears every time we
 *   inject it directly as a plain <iframe> — bypassing HubSpot's script entirely.
 *   The embed URL with ?embed=true works fine as a direct iframe src.
 */

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const EMBED_URL =
  "https://meetings-na2.hubspot.com/revopsforce/website-schedular?embed=true";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Force iframe to reload its src every time the modal opens
  useEffect(() => {
    if (open && iframeRef.current) {
      // Re-assigning src forces a fresh load even if the element was already in the DOM
      iframeRef.current.src = EMBED_URL;
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(7,15,30,0.88)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Book a Discovery Call"
    >
      <div
        className="relative w-full flex flex-col"
        style={{
          maxWidth: "780px",
          maxHeight: "90vh",
          backgroundColor: "#0A1628",
          border: "1px solid rgba(245,158,11,0.25)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, #F59E0B, #2563EB, #4A90B8)", flexShrink: 0 }} />

        {/* Close button row — no title text */}
        <div
          className="flex items-center justify-end px-4 py-3"
          style={{ flexShrink: 0 }}
        >
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(240,244,255,0.5)",
              cursor: "pointer",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = "#F0F4FF";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,244,255,0.5)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* HubSpot iframe — direct injection guarantees reload on every open */}
        <div style={{ flex: 1, overflowY: "auto", minHeight: "560px" }}>
          <iframe
            ref={iframeRef}
            src={EMBED_URL}
            title="Book a Discovery Call"
            style={{
              width: "100%",
              minHeight: "560px",
              border: "none",
              display: "block",
            }}
            allow="camera; microphone; fullscreen"
          />
        </div>
      </div>
    </div>
  );
}
