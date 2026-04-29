/**
 * GTMStackGraphic — v3
 * Light (#f0f4ff) background. Context panel uses layout flow (not absolute overlay)
 * so expanded content pushes layers down instead of overlapping them.
 * Signal bar delays are stable constants — no Math.random() in render.
 */

import { useEffect, useRef, useState } from "react";

const LAYERS = [
  {
    id: "l1",
    num: "01",
    name: "Data Foundation",
    gradient: "linear-gradient(135deg,#0a1f6e 0%,#1240c4 55%,#1a6bff 100%)",
    desc: "Your single source of truth. We unify accounts, contacts, and intent signals from Salesforce, Snowflake, and your data warehouse into one clean, enriched, governed record layer — so every downstream system works from the same reality.",
    tags: ["Salesforce", "Snowflake", "HubSpot", "Clay"],
    barDelays: [0, 0.18, 0.36, 0.54],
    barDurations: [1.1, 1.5, 1.3, 1.7],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="8" ry="2.8" stroke="white" strokeWidth="1.7"/>
        <path d="M4 5v5.5c0 1.55 3.58 2.8 8 2.8s8-1.25 8-2.8V5" stroke="white" strokeWidth="1.7"/>
        <path d="M4 10.5v5.5c0 1.55 3.58 2.8 8 2.8s8-1.25 8-2.8v-5.5" stroke="white" strokeWidth="1.7"/>
        <circle cx="19" cy="5" r="2.2" fill="rgba(255,255,255,.2)" stroke="white" strokeWidth="1.2"/>
        <path d="M19 3.5v1M19 6.5v1M17.5 5h1M20.5 5h1" stroke="white" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "l2",
    num: "02",
    name: "Workflow Architecture",
    gradient: "linear-gradient(135deg,#0d2540 0%,#1a4a7a 55%,#2563eb 100%)",
    desc: "The if-this-then-that logic engine for your entire GTM motion. We design and build the decision trees, routing rules, and automation sequences that turn your strategy into repeatable, governed execution — without human bottlenecks.",
    tags: ["n8n", "Make", "Zapier", "AI Agents"],
    barDelays: [0, 0.22, 0.44, 0.66],
    barDurations: [1.4, 1.1, 1.6, 1.2],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="4" cy="12" r="2.2" stroke="white" strokeWidth="1.7"/>
        <circle cx="20" cy="6" r="2.2" stroke="white" strokeWidth="1.7"/>
        <circle cx="20" cy="18" r="2.2" stroke="white" strokeWidth="1.7"/>
        <circle cx="12" cy="12" r="2.2" stroke="white" strokeWidth="1.7"/>
        <path d="M6.2 12h3.6" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M14.2 12l2.5-4.8" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M14.2 12l2.5 4.8" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M4 9.5V6a1 1 0 011-1h5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 2" opacity=".5"/>
      </svg>
    ),
  },
  {
    id: "l3",
    num: "03",
    name: "Attribution & Analytics",
    gradient: "linear-gradient(135deg,#0f1e3d 0%,#2d3f6e 55%,#4f5f8a 100%)",
    desc: "Revenue visibility you can actually act on. We build multi-touch attribution models, pipeline dashboards, and performance loops that tell you exactly which signals, channels, and sequences are driving revenue — and which are burning budget.",
    tags: ["Looker", "Tableau", "Salesforce", "Metabase"],
    barDelays: [0, 0.15, 0.30, 0.45],
    barDurations: [1.2, 1.8, 1.1, 1.5],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 4h18l-7 8v6l-4-2v-4L3 4z" stroke="white" strokeWidth="1.7" strokeLinejoin="round"/>
        <circle cx="17" cy="17" r="3.5" stroke="white" strokeWidth="1.5"/>
        <path d="M17 15.5v1.5l1 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "l4",
    num: "04",
    name: "Agent-Ready Infrastructure",
    gradient: "linear-gradient(135deg,#3d1e00 0%,#a05500 55%,#f59e0b 100%)",
    desc: "We build the infrastructure that AI agents actually need to run — clean data, governed APIs, defined decision boundaries, and human-in-the-loop checkpoints. Your stack becomes agent-ready without becoming agent-dependent.",
    tags: ["OpenAI", "Anthropic", "LangChain", "Clay AI"],
    barDelays: [0, 0.20, 0.40, 0.60],
    barDurations: [1.6, 1.2, 1.4, 1.1],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.8" stroke="white" strokeWidth="1.7"/>
        <circle cx="5" cy="5" r="1.8" stroke="white" strokeWidth="1.5"/>
        <circle cx="19" cy="5" r="1.8" stroke="white" strokeWidth="1.5"/>
        <circle cx="5" cy="19" r="1.8" stroke="white" strokeWidth="1.5"/>
        <circle cx="19" cy="19" r="1.8" stroke="white" strokeWidth="1.5"/>
        <path d="M6.6 6.6l3.7 3.7M17.4 6.6l-3.7 3.7M6.6 17.4l3.7-3.7M17.4 17.4l-3.7-3.7" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="5.5" stroke="white" strokeWidth="1" strokeDasharray="2 3" opacity=".4"/>
      </svg>
    ),
  },
  {
    id: "l5",
    num: "05",
    name: "Governance & Reporting",
    gradient: "linear-gradient(135deg,#042b10 0%,#0f6e2e 55%,#22c55e 100%)",
    desc: "Audit-ready, board-ready, scale-ready. We implement the rules, permissions, change logs, and executive dashboards that give leadership full visibility and control — so your GTM infrastructure can grow without governance debt.",
    tags: ["Audit Logs", "RBAC", "Board Decks", "SLAs"],
    barDelays: [0, 0.25, 0.50, 0.75],
    barDurations: [1.3, 1.6, 1.1, 1.8],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L4 6.5v5c0 4.5 3.4 8.7 8 9.5 4.6-.8 8-5 8-9.5v-5L12 3z" stroke="white" strokeWidth="1.7" strokeLinejoin="round"/>
        <path d="M8.5 12l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function GTMStackGraphic() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggeredRef = useRef(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Drop-and-stack animation on scroll into view
  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    if (!section || !scene) return;

    const dropLayer = (layer: HTMLDivElement, index: number) => {
      const delay = index * 380;
      setTimeout(() => {
        layer.animate([
          { opacity: 0, transform: "translateY(-420px) scale(0.82) rotate(-3deg)", filter: "blur(4px)", offset: 0 },
          { opacity: 1, transform: "translateY(-420px) scale(0.82) rotate(-3deg)", filter: "blur(4px)", offset: 0.01 },
          { opacity: 1, transform: "translateY(14px) scale(1.03) rotate(.5deg)", filter: "blur(0px)", offset: 0.68 },
          { opacity: 1, transform: "translateY(-6px) scale(.99) rotate(-.2deg)", filter: "blur(0px)", offset: 0.82 },
          { opacity: 1, transform: "translateY(3px) scale(1.005) rotate(0deg)", filter: "blur(0px)", offset: 0.92 },
          { opacity: 1, transform: "translateY(0px) scale(1) rotate(0deg)", filter: "blur(0px)", offset: 1 },
        ], { duration: 750, easing: "cubic-bezier(0.18, 0.89, 0.32, 1.15)", fill: "forwards" });

        // Impact shake + flash at 68% through
        setTimeout(() => {
          scene.animate([
            { transform: "translateX(0)" }, { transform: "translateX(-6px)" },
            { transform: "translateX(5px)" }, { transform: "translateX(-3px)" },
            { transform: "translateX(2px)" }, { transform: "translateX(0)" },
          ], { duration: 280, easing: "ease-out" });

          const flash = document.createElement("div");
          flash.style.cssText = "position:absolute;inset:0;z-index:10;background:rgba(255,255,255,.18);border-radius:16px;pointer-events:none;";
          flash.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, easing: "ease-out", fill: "forwards" });
          const card = layer.querySelector(".gtm-card") as HTMLElement;
          if (card) { card.style.position = "relative"; card.appendChild(flash); setTimeout(() => flash.remove(), 500); }

          layer.classList.add("landed");
        }, delay + 750 * 0.68);
      }, delay);
    };

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          layerRefs.current.forEach((layer, i) => { if (layer) dropLayer(layer, i); });
          obs.disconnect();
        }
      });
    }, { threshold: 0.12 });

    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative", width: "100%",
        background: "#f0f4ff", borderRadius: "16px",
        fontFamily: "'Barlow',sans-serif",
        padding: "clamp(20px,4vw,48px) clamp(16px,3vw,32px) clamp(28px,5vw,56px)",
      }}
    >
      <style>{`
        @keyframes gtm-bar { 0%,100%{height:4px;opacity:.3;} 50%{height:18px;opacity:.9;} }
        .gtm-layer {
          opacity: 0;
          transform: translateY(-300px) scale(0.88) rotate(-1.5deg);
          will-change: transform, opacity;
          margin-bottom: 8px;
          position: relative;
          border-radius: 16px;
        }
        .gtm-layer.landed { transition: box-shadow .3s; }
        .gtm-layer.landed:hover { box-shadow: 0 8px 32px rgba(0,0,0,.22); z-index: 2; position: relative; }
        .gtm-layer.gtm-open { box-shadow: 0 8px 32px rgba(0,0,0,.22); z-index: 2; position: relative; }
        .gtm-layer-shadow {
          position: absolute; bottom: -6px; left: 8%; right: 8%; height: 12px;
          border-radius: 50%; background: rgba(0,0,0,0); filter: blur(8px);
          pointer-events: none; z-index: 0; transition: background .4s;
        }
        .gtm-layer.landed .gtm-layer-shadow { background: rgba(0,0,0,.2); }
        /* Signal bars */
        .gtm-signal { transition: opacity .3s; }
        .gtm-layer:hover .gtm-signal,
        .gtm-layer.gtm-open .gtm-signal { opacity: 0; }
        .gtm-layer:hover .gtm-chevron,
        .gtm-layer.gtm-open .gtm-chevron { transform: rotate(180deg); opacity: 0.7; }
        .gtm-layer:hover .gtm-ico,
        .gtm-layer.gtm-open .gtm-ico { transform: scale(1.1) rotate(-4deg); }
        /* Context panel — part of layout flow, not absolute */
        .gtm-context {
          max-height: 0;
          overflow: hidden;
          transition: max-height .55s cubic-bezier(.22,1,.36,1), opacity .4s;
          opacity: 0;
        }
        .gtm-layer:hover .gtm-context,
        .gtm-layer.gtm-open .gtm-context {
          max-height: 600px;
          opacity: 1;
        }
        .gtm-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: rgba(255,255,255,.28); z-index: 2; pointer-events: none;
        }
        /* Mobile: make cards tappable */
        @media (hover: none) {
          .gtm-layer:hover .gtm-signal { opacity: 1; }
          .gtm-layer:hover .gtm-chevron { transform: none; opacity: 0.4; }
          .gtm-layer:hover .gtm-ico { transform: none; }
          .gtm-layer:hover .gtm-context { max-height: 0; opacity: 0; }
        }
      `}</style>

      <div ref={sceneRef} style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {LAYERS.map((layer, i) => (
          <div
            key={layer.id}
            ref={el => { layerRefs.current[i] = el; }}
            className={`gtm-layer${openIdx === i ? ' gtm-open' : ''}`}
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            style={{ cursor: 'pointer' }}
          >
            <div className="gtm-layer-shadow" />
            {/* Card — overflow hidden only on the outer card for rounded corners */}
            <div
              className="gtm-card"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                background: layer.gradient,
              }}
            >
              {/* Main header row */}
              <div
                className="gtm-card-main"
                style={{
                  position: "relative", zIndex: 3, display: "flex", alignItems: "center",
                  gap: "clamp(12px,2vw,20px)",
                  padding: "clamp(14px,2vw,22px) clamp(16px,2.5vw,28px)",
                }}
              >
                <div style={{ fontSize: "clamp(9px,1.2vw,11px)", fontWeight: 900, letterSpacing: ".14em", color: "rgba(255,255,255,.45)", width: "26px", flexShrink: 0, textAlign: "center" }}>
                  {layer.num}
                </div>
                <div
                  className="gtm-ico"
                  style={{
                    width: "clamp(36px,4.5vw,46px)", height: "clamp(36px,4.5vw,46px)", flexShrink: 0, borderRadius: "10px",
                    background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "transform .4s cubic-bezier(.22,1,.36,1)",
                  }}
                >
                  {layer.icon}
                </div>
                <div style={{ fontSize: "clamp(13px,1.8vw,17px)", fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "#fff", textShadow: "0 1px 8px rgba(0,0,0,.35)", flex: 1, fontFamily: "'Barlow Condensed',sans-serif" }}>
                  {layer.name}
                </div>
                {/* Signal bars */}
                <div className="gtm-signal" style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: "18px", flexShrink: 0 }}>
                  {layer.barDelays.map((delay, j) => (
                    <span
                      key={j}
                      style={{
                        width: "3px", borderRadius: "2px", background: "rgba(255,255,255,.5)",
                        animation: `gtm-bar ${layer.barDurations[j]}s ${delay}s ease-in-out infinite`,
                        display: "block",
                      }}
                    />
                  ))}
                </div>
                {/* Chevron */}
                <div className="gtm-chevron" style={{ width: "20px", height: "20px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.4, transition: "opacity .3s, transform .4s" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>

              {/* Context panel — inside the card, part of layout flow */}
              <div className="gtm-context">
                <div style={{ height: "1px", background: "rgba(255,255,255,.12)", margin: "0 28px" }} />
                <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", padding: "16px 28px 24px" }}>
                  <div style={{ flex: 1, fontSize: "clamp(13px,1.4vw,15px)", fontWeight: 400, color: "rgba(255,255,255,.85)", lineHeight: 1.7, fontFamily: "'Barlow',sans-serif" }}>
                    {layer.desc}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", flexShrink: 0 }}>
                    {layer.tags.map(tag => (
                      <div
                        key={tag}
                        style={{
                          fontSize: "clamp(9px,1vw,11px)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase",
                          padding: "4px 10px", borderRadius: "20px", background: "rgba(0,0,0,.25)",
                          border: "1px solid rgba(255,255,255,.15)", color: "rgba(255,255,255,.7)", whiteSpace: "nowrap",
                          fontFamily: "'Space Mono',monospace",
                        }}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
