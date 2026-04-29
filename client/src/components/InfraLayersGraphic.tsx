/**
 * InfraLayersGraphic
 * Layers animate in sequentially (bottom-to-top stacking) when the section
 * scrolls into view, using IntersectionObserver. Each layer has a distinct
 * accent color, expanded description, and a hover-reveal detail panel.
 */

import { useEffect, useRef, useState } from "react";

const LAYERS = [
  {
    num: "01",
    label: "Data Foundation",
    tagline: "Single source of truth",
    desc: "Clean, enriched, and deduplicated CRM data is the bedrock of every reliable GTM motion. We audit your full data architecture, eliminate fragmentation across systems, enforce hygiene standards, and build the enrichment pipelines that keep your records accurate as your business scales.",
    color: "#2563EB",
    bg: "rgba(37,99,235,0.07)",
    glow: "rgba(37,99,235,0.15)",
    border: "rgba(37,99,235,0.25)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
      </svg>
    ),
  },
  {
    num: "02",
    label: "Workflow Architecture",
    tagline: "Logic that executes your strategy",
    desc: "Most GTM failures aren't tool failures — they're logic failures. We redesign your lead routing, handoff sequences, SLA enforcement, and lifecycle automation so that every signal triggers the right action at the right time, without manual intervention or exception handling.",
    color: "#4A90B8",
    bg: "rgba(74,144,184,0.07)",
    glow: "rgba(74,144,184,0.15)",
    border: "rgba(74,144,184,0.25)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    num: "03",
    label: "Attribution & Analytics",
    tagline: "Revenue visibility you can act on",
    desc: "Pipeline reports that don't reflect reality destroy forecast confidence. We implement multi-touch attribution models, build board-ready dashboards, and establish the data lineage that lets your leadership team trace every dollar of pipeline back to its source — and make decisions with conviction.",
    color: "#4F5F8A",
    bg: "rgba(79,95,138,0.07)",
    glow: "rgba(79,95,138,0.15)",
    border: "rgba(79,95,138,0.25)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
  {
    num: "04",
    label: "AI & Agent Readiness",
    tagline: "Infrastructure that agents can run on",
    desc: "AI agents fail when the underlying data and logic are broken. We prepare your GTM stack for agent deployment — structuring data schemas for LLM consumption, designing prompt frameworks, establishing governance guardrails, and integrating AI models into your existing execution workflows.",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.07)",
    glow: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.25)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    num: "05",
    label: "Governance & Reporting",
    tagline: "Audit-ready, board-ready, scale-ready",
    desc: "Execution infrastructure without governance degrades under pressure. We implement change management protocols, audit trails, access controls, and reporting cadences that keep your GTM systems reliable as your team grows — and give your PE sponsors or board the operational visibility they require.",
    color: "#2D7A6E",
    bg: "rgba(45,122,110,0.07)",
    glow: "rgba(45,122,110,0.15)",
    border: "rgba(45,122,110,0.25)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
];

export function InfraLayersGraphic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          LAYERS.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCount((prev) => Math.max(prev, i + 1));
            }, i * 130 + 80);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        background: "#f0f4ff",
        padding: "2rem 1.75rem 1.75rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        opacity: 0.6,
      }}/>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      {/* Header */}
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.22em",
          color: "#4A90B8", textTransform: "uppercase",
        }}>
          GTM Infrastructure Stack
        </span>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(74,144,184,0.5), transparent)" }}/>
      </div>

      {/* Layer stack */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", position: "relative" }}>
        {LAYERS.map((layer, i) => {
          const isVisible = visibleCount > i;
          const isActive = activeLayer === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setActiveLayer(i)}
              onMouseLeave={() => setActiveLayer(null)}
              style={{
                border: `1px solid ${isActive ? layer.border : "rgba(10,22,40,0.08)"}`,
                borderLeft: `4px solid ${layer.color}`,
                background: isActive ? layer.bg : "rgba(255,255,255,0.6)",
                cursor: "default",
                backdropFilter: "blur(6px)",
                boxShadow: isActive
                  ? `0 6px 28px ${layer.glow}, inset 0 1px 0 rgba(255,255,255,0.9)`
                  : "0 1px 4px rgba(10,22,40,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
                transition: "border-color 0.2s, background 0.2s, box-shadow 0.25s",
                // Scroll-in animation
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0) scaleX(1)" : "translateY(20px) scaleX(0.98)",
                transitionProperty: "opacity, transform, border-color, background, box-shadow",
                transitionDuration: isVisible ? "0.45s, 0.45s, 0.2s, 0.2s, 0.25s" : "0s",
                transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: isVisible ? `${i * 0.01}s` : "0s",
              }}
            >
              {/* Main row */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px" }}>
                {/* Layer number */}
                <span style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em",
                  color: layer.color, opacity: 0.7, flexShrink: 0, width: "20px",
                }}>
                  {layer.num}
                </span>

                {/* Icon */}
                <span style={{
                  color: layer.color, flexShrink: 0,
                  opacity: isActive ? 1 : 0.5,
                  transform: isActive ? "scale(1.15)" : "scale(1)",
                  transition: "opacity 0.2s, transform 0.2s",
                }}>
                  {layer.icon}
                </span>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.2rem",
                    textTransform: "uppercase", letterSpacing: "0.04em",
                    color: isActive ? "#0a1628" : "#1e3a5f",
                    transition: "color 0.2s",
                  }}>
                    {layer.label}
                  </div>
                  <div style={{
                    fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em",
                    color: layer.color, opacity: isActive ? 0.85 : 0.55,
                    marginTop: "1px",
                    transition: "opacity 0.2s",
                  }}>
                    {layer.tagline}
                  </div>
                </div>

                {/* Right indicator */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "6px", flexShrink: 0,
                }}>
                  <div style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    backgroundColor: layer.color,
                    opacity: isActive ? 1 : 0.2,
                    transform: isActive ? "scale(1.5)" : "scale(1)",
                    transition: "opacity 0.2s, transform 0.2s",
                  }}/>
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke={layer.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{
                      opacity: isActive ? 0.8 : 0.25,
                      transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "opacity 0.2s, transform 0.25s",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>

              {/* Expanded description */}
              <div style={{
                overflow: "hidden",
                maxHeight: isActive ? "120px" : "0px",
                transition: "max-height 0.32s cubic-bezier(0.22,1,0.36,1)",
              }}>
                <div style={{
                  padding: "0 16px 14px 54px",
                  borderTop: `1px solid ${layer.color}22`,
                  paddingTop: "10px",
                }}>
                  <p style={{
                    fontFamily: "'Barlow', sans-serif", fontSize: "0.88rem", lineHeight: 1.6,
                    color: "rgba(10,22,40,0.65)",
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(4px)",
                    transition: "opacity 0.25s 0.05s, transform 0.25s 0.05s",
                  }}>
                    {layer.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
