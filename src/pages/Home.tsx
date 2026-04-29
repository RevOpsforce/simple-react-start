/**
 * Opsforce.ai — Home Page v4
 * Design: Enriched Enterprise Editorial
 *
 * COLOR SYSTEM:
 *   DARK BG:      #0A1628  Deep Navy
 *   MID BG:       #0F2040  Navy Mid
 *   LIGHT BG:     #F0F4FF  Cool White
 *   ALT BG:       #E8EDF8  Off White
 *   PRIMARY:      #2563EB  Electric Blue — CTAs, links
 *   STEEL BLUE:  #4A90B8  — Supporting accent, data labels (replaces neon cyan)
 *   AMBER:        #F59E0B  — Warm energy, number callouts, contrast
 *   AMBER LIGHT:  #FCD34D  — Highlight moments
 *   SLATE INDIGO: #4F5F8A  — Depth accent, methodology phases (replaces gaming violet)
 *   MUTED TEAL:   #2D7A6E  — Governance, success states (replaces neon emerald)
 *   SLATE:        #64748B  — Secondary text on light
 *   LIGHT SLATE:  #94A3B8  — Muted text on dark
 */

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight, ChevronDown, Menu, X, CheckCircle2, Zap, Database, Brain, Shield, BarChart3, Settings, Linkedin } from "lucide-react";
import { GTMGraphic } from "@/components/GTMGraphic";
import GTMStackGraphic from "@/components/GTMStackGraphic";

// ─── Shared Utilities ────────────────────────────────────────────────────────
function scrollToContact(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  // On mobile (< 1024px), the iframe is below the section headline — scroll directly to the form
  const isMobile = window.innerWidth < 1024;
  const target = document.getElementById(isMobile ? 'contact-form' : 'contact');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
  navy:        "#0A1628",
  navyMid:     "#0F2040",
  navyLight:   "#162B52",
  navyDeep:    "#070F1E",
  blue:        "#2563EB",
  blueLight:   "#3B82F6",
  // Enterprise replacements — desaturated, no neon
  cyan:        "#4A90B8",   // Steel blue (replaces neon cyan)
  cyanLight:   "#5BA3C9",   // Lighter steel blue
  amber:       "#F59E0B",
  amberLight:  "#FCD34D",
  amberDark:   "#D97706",
  violet:      "#4F5F8A",   // Slate indigo (replaces gaming violet)
  violetLight: "#6B7DB3",   // Lighter slate indigo
  emerald:     "#2D7A6E",   // Muted teal (replaces neon emerald)
  coolWhite:   "#F0F4FF",
  offWhite:    "#E8EDF8",
  slate:       "#64748B",
  lightSlate:  "#94A3B8",
  border:      "rgba(255,255,255,0.08)",
  borderLight: "rgba(10,22,40,0.09)",
};

// ─── Asset URLs ───────────────────────────────────────────────────────────────
const HERO_BG     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663500125074/S6vDgqwvNTJhbK5iDVG3QD/hero-v2-7ogFTeheEkmMq5JNtHPjmY.webp";
const PROBLEM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663500125074/S6vDgqwvNTJhbK5iDVG3QD/problem-v2-9pGs745cc2CXvMT6Rnsaka.webp";
const CTA_BG      = "https://d2xsxph8kpxj0f.cloudfront.net/310519663500125074/S6vDgqwvNTJhbK5iDVG3QD/cta-v2-bgLqVrm8SBKRzsZDBJXy2t.webp";
const GTM_DIAGRAM = "https://d2xsxph8kpxj0f.cloudfront.net/310519663500125074/S6vDgqwvNTJhbK5iDVG3QD/gtm-execution-layer-Q8KSkgddnREDcraJu9kPgZ.webp";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663500125074/S6vDgqwvNTJhbK5iDVG3QD";
const CLIENT_LOGOS: { name: string; img?: string; }[] = [
  { name:"Google",         img:`${CDN}/google_f35599a1.png` },
  { name:"Salesforce",     img:`${CDN}/salesforce_17af7b57.png` },
  { name:"Adobe",          img:`${CDN}/adobe_91073938.png` },
  { name:"VMware",         img:`${CDN}/vmware_46804955.png` },
  { name:"Broadcom",       img:`${CDN}/broadcom_dfbaec94.png` },
  { name:"Tableau",        img:`${CDN}/tableau_e6884b58.png` },
  { name:"Amex",           img:`${CDN}/amex_5e03485b.png` },
  { name:"Arm",            img:`${CDN}/arm_bc84b1a2.png` },
  { name:"Panasonic",      img:`${CDN}/panasonic_7630e66e.png` },
  { name:"Workday",        img:`${CDN}/workday_8f62c5ac.png` },
  { name:"NYSE",            img:`${CDN}/nyse_4feecedf.png` },
  { name:"Comcast",         img:`${CDN}/comcast_b8d73a21.png` },
  { name:"The Trade Desk",  img:`${CDN}/tradedesk_400df714.png` },
  { name:"Kaiser",          img:`${CDN}/kaiser_b658bd57.png` },
  { name:"HCL Tech",        img:`${CDN}/hcltech_8979fb1e.png` },
  { name:"GLG",             img:`${CDN}/glg_41f93ce3.png` },
  { name:"Impossible Foods",img:`${CDN}/impossible_cc6344d0.png` },
  { name:"Swrve",           img:`${CDN}/swrve_dc4f2eb9.png` },
  { name:"Vista Equity",     img:"https://d2xsxph8kpxj0f.cloudfront.net/310519663500125074/S6vDgqwvNTJhbK5iDVG3QD/vistaequity_76c9c257.png" },
];

const TECH_LOGOS: { name: string; img: string; }[] = [
  // AI & Automation
  { name:"OpenAI",              img:`${CDN}/openai_d0daf05c.png` },
  { name:"Anthropic",           img:`${CDN}/anthropic_adfe3e13.png` },
  { name:"Clay",                img:`${CDN}/clay_65f6526e.png` },
  { name:"Zapier",              img:`${CDN}/zapier_6487e89f.png` },
  { name:"Make",                img:`${CDN}/make_5b3ee5ee.png` },
  { name:"Workato",             img:`${CDN}/workato_1fc96362.png` },
  { name:"Jasper",              img:`${CDN}/jasper_75a9d97c.png` },
  // CRM & Sales
  { name:"Salesforce",          img:`${CDN}/salesforce_17af7b57.png` },
  { name:"HubSpot",             img:`${CDN}/hubspot_9ff91956.png` },
  { name:"Microsoft Dynamics",  img:`${CDN}/dynamics365_0cb100fb.png` },
  { name:"Outreach",            img:`${CDN}/outreach_ffac7bc4.png` },
  { name:"Salesloft",           img:`${CDN}/salesloft_58e2313a.png` },
  { name:"Apollo.io",           img:`${CDN}/apollo_2f4ab2a6.png` },
  // Marketing Automation
  { name:"Marketo",             img:`${CDN}/marketo_9b8fe4a5.png` },
  { name:"Pardot",              img:`${CDN}/pardot_16bb67ed.png` },
  { name:"Braze",               img:`${CDN}/braze_371e8c0c.png` },
  { name:"Customer.io",         img:`${CDN}/customerio_6531f6bb.png` },
  { name:"Intercom",            img:`${CDN}/intercom_a4315e5b.png` },
  // Intelligence & Intent
  { name:"Gong",                img:`${CDN}/gong_b9f92f4f.png` },
  { name:"ZoomInfo",            img:`${CDN}/zoominfo_f162b648.png` },
  { name:"Clearbit",            img:`${CDN}/clearbit_019a931f.png` },
  { name:"6sense",              img:`${CDN}/6sense_26bd252c.png` },
  { name:"Demandbase",          img:`${CDN}/demandbase_015ed2cb.png` },
  // Analytics
  { name:"Tableau",             img:`${CDN}/tableau_e6884b58.png` },
  { name:"Power BI",            img:`${CDN}/powerbi_bbab3521.png` },
  { name:"Looker",              img:`${CDN}/looker_c574cacd.png` },
  { name:"Domo",                img:`${CDN}/domo_ab9ebfb9.png` },
  // RevOps & Routing
  { name:"LeanData",            img:`${CDN}/leandatainc_081df60f.png` },
  { name:"Chili Piper",         img:`${CDN}/chilipiper_456a6263.png` },
  // CS & Retention
  { name:"Gainsight",           img:`${CDN}/gainsight_f0248336.png` },
  { name:"ChurnZero",           img:`${CDN}/churnzero_1ebab79b.png` },
  { name:"Totango",             img:`${CDN}/totango_5d758d17.png` },
];

const PAIN_POINTS = [
  { tag:"Revenue Predictability", color: C.amber,   headline:"Fragmented CRM data is the leading cause of inaccurate pipeline forecasts in enterprise B2B companies.", body:"Inflated MQLs, duplicate records, and broken attribution mean every forecast conversation starts with a data fight. Clean, trustworthy pipeline data is not a nice-to-have — it is the prerequisite for everything downstream, including your agents." },
  { tag:"Agent Deployment",      color: C.blue,    headline:"GTM agent deployments fail because of data, workflow, and governance problems — not because of the model.", body:"Agents fail on dirty schemas. Copilots hallucinate on ungoverned data. The gap between your AI roadmap and production is always a data, logic, or governance problem — not a vendor problem." },
  { tag:"Execution Velocity",     color: C.blueLight, headline:"Manual handoffs and undefined workflow logic are structural causes of slow GTM execution, not people problems.", body:"When work isn't broken into defined tasks, routed by clear logic, and governed by consistent rules, every campaign launch is a manual fire drill. Your competitors aren't faster because they hired better people. They built better systems." },
  { tag:"Operational Debt",       color: C.blue,    headline:"Point-to-point integrations without orchestration logic create GTM systems that are expensive to maintain and impossible to hand to an agent.", body:"Years of ungoverned connections, undocumented logic, and shadow workflows have created a stack that is expensive to maintain, impossible to hand to an agent, and fragile under any change." },
  { tag:"Data Integrity",         color: C.blue,    headline:"Duplicate records, missing fields, and inconsistent enrichment make CRM data unreliable as a foundation for pipeline reporting and agent deployment.", body:"Every decision — and every agent — runs on what's underneath. The data layer is the foundation. Right now, for most GTM teams, it is cracked." },
  { tag:"Org Alignment",          color: C.amber,   headline:"Marketing, Sales, and RevOps operating on different data definitions is an infrastructure problem, not a culture problem.", body:"Misaligned definitions, duplicate tooling, and no single source of record. The execution layer is where go-to-market alignment either lives or dies." },
];

const CAPABILITIES = [
  { Icon: Zap,       color: C.blue,      title:"Workflow Architecture",
    body:"Workflow architecture is the design and implementation of the logic that governs how work moves through a GTM system — including lead routing, handoff rules, SLA enforcement, and lifecycle stage transitions.",
    detail:"We design and implement lead routing, SDR-to-AE handoff workflows, SLA enforcement, and lifecycle stage logic inside Salesforce, HubSpot, or Microsoft Dynamics 365. Every workflow is documented, tested, and owned by your team at handoff. Outcome: faster pipeline velocity and fewer deals lost to process gaps." },
  { Icon: Database,  color: C.blue,      title:"Data Foundation",
    body:"A GTM data foundation is the CRM data model, deduplication logic, enrichment workflows, and source-of-truth configuration that pipeline reporting and agent deployment depend on.",
    detail:"We rebuild the CRM data model — including contact and account deduplication, field standardization, enrichment workflows via ZoomInfo, Clearbit, or Clay, and source-of-truth configuration. Outcome: pipeline numbers your board can trust and AI that actually performs on clean inputs." },
  { Icon: Shield,    color: C.amber,     title:"Governance & Rules",
    body:"GTM governance is the set of ownership rules, validation controls, monitoring systems, and accountability structures that prevent GTM systems from degrading after implementation.",
    detail:"We implement ownership assignment rules, required field validation, lifecycle stage enforcement, and change management controls across your CRM and marketing automation platform. Outcome: teams operate from the same logic — no more shadow processes or tribal knowledge." },
  { Icon: Settings,  color: C.blueLight, title:"System Integration Layer",
    body:"GTM orchestration is the coordination layer that routes work across CRM, marketing automation, sales engagement, and data tools — connecting systems through intentional integrations and event-based triggers.",
    detail:"We design and build intentional integrations between Salesforce, HubSpot, Marketo, Outreach, Gong, and your data warehouse — using middleware platforms like Workato, Tray.io, or native APIs. Outcome: a stack that scales without breaking every time something changes." },
  { Icon: BarChart3, color: C.blueLight, title:"Reporting & Attribution",
    body:"Multi-touch attribution is the measurement framework that assigns revenue credit across marketing and sales touchpoints to produce pipeline generation metrics that finance and leadership can act on.",
    detail:"We operationalize multi-touch attribution models, build pipeline generation dashboards in Tableau, Looker, or Power BI, and configure forecasting inputs that align Marketing, Sales, and RevOps on a single version of the truth. Outcome: CFO-ready metrics your board can act on." },
  { Icon: Brain,     color: C.blue,      title:"Automation & Orchestration",
    body:"GTM automation is the systematic replacement of manual handoffs, data entry, and QA processes with cross-tool workflow automation across the revenue stack.",
    detail:"We identify and automate manual handoffs, data entry, campaign operations, and QA processes across your GTM stack using Zapier, Make, Workato, or native platform automation. Outcome: your team focuses on strategy, not operational firefighting." },
  { Icon: Zap,       color: C.amber,     title:"Agent Deployment",
    body:"Agent deployment in a GTM context is the design, build, and production deployment of governed automation agents into live revenue workflows — including lead scoring, pipeline enrichment, and outreach personalization.",
    detail:"We design, build, and deploy governed agents for lead scoring, pipeline enrichment, outreach personalization, and revenue forecasting. Operating securely within your own VPC, these agents integrate directly into your CRM and marketing automation workflows using OpenAI, Anthropic, Clay, and 6sense. Outcome: Governed agents that generate revenue, not just demos." },
  { Icon: CheckCircle2, color: C.amber,  title:"Customer Lifecycle Management",
    body:"Customer lifecycle management is the architecture of handoff logic, renewal triggers, and expansion signal routing that governs the post-sale GTM motion from close through expansion.",
    detail:"We build CS handoff logic, renewal trigger workflows, and expansion signal routing inside Gainsight, ChurnZero, or Salesforce Service Cloud — connected back to your CRM and marketing automation platform. Outcome: post-sale GTM that compounds, not disconnects." },
];

const METHODOLOGY = [
  { num:"01", phase:"Scope",          color: C.amber,   title:"Scope",                  body:"We run structured discovery sessions with cross-functional stakeholders to map the current execution state — where logic breaks, where data degrades, and where agent deployment is blocked. No pre-packaged playbooks. No assumptions. Just a clear, prioritized picture of what it will take to hit your mandate.", deliverables:["GTM execution map","Revenue leak analysis","Agent deployment readiness score","Prioritized fix roadmap"] },
  { num:"02", phase:"Architect & Build", color: C.blue, title:"Architect & Build",      body:"We implement. CRM restructuring, execution orchestration, agent deployment, attribution configuration, data contract enforcement. Every change is documented, tested, and owned by your team at handoff — not locked in a consultant's methodology. We move in 30-day sprints so you see value before the next board meeting.", deliverables:["System architecture documentation","System implementation","CRM logic rebuild","Agent deployment","Orchestration & data contract setup"] },
  { num:"03", phase:"Govern",         color: C.blue,    title:"Govern",                 body:"Continuous programmatic governance. We deploy Health Monitor Agents and proactive drift alerts to ensure your execution logic never degrades as your stack grows. This is your governed execution layer, maintained. For PE-backed companies, this phase produces the audit-ready documentation your investors expect. For public companies, it produces the operational controls your compliance team requires.", deliverables:["GTM NOC monitoring","Logic drift prevention","Compliance documentation","Monthly optimization reports"] },
  { num:"04", phase:"Expand",         color: C.amber,   title:"Expand",                 body:"With a stable foundation, we scale the machine. Deploy governed agents into production workflows. Activate advanced revenue signals. Extend orchestration into new channels and segments. Every expansion is built on the governed infrastructure from Phase 03 — so you scale velocity, not technical debt.", deliverables:["Governed agent production rollout","Revenue signal expansion","New channel orchestration","Quarterly maturity review"] },
];

const SERVICES = [
  { name:"GTM Diagnostic",           price:"From $10K",     accent: C.amber,    desc:"A structured audit of your execution layer — workflows, data flows, AI deployment blockers, and revenue leaks. Delivered in 4–6 weeks with a board-ready findings report." },
  { name:"Agent Deployment",  price:"From $60K",     accent: C.blue,   desc:"We design, build, and deploy governed agents directly into your GTM workflows — lead scoring, pipeline enrichment, outreach personalization, and revenue forecasting. Production-grade, not proof-of-concept." },
  { name:"Pipeline Data Integrity",  price:"From $75K",     accent: C.blue,     desc:"Rebuild the CRM data foundation your pipeline reporting depends on. Clean records, defensible attribution, and board-ready metrics that hold up under investor scrutiny." },
  { name:"Revenue Signal System",    price:"From $90K",     accent: C.blueLight,     desc:"Operationalize multi-touch attribution and build the analytics infrastructure that translates buyer behavior into leading indicators your CFO and board can act on." },
  { name:"Execution Performance",    price:"From $70K",     accent: C.amber,  desc:"Eliminate the manual QA, tribal knowledge, and fragile automation that slow every campaign launch and inflate your cost-per-opportunity." },
  { name:"GTM Governance",           price:"From $18K/mo",  accent: C.amber,    desc:"Your embedded GTM operations partner — continuous monitoring, logic governance, and optimization so your execution layer never degrades between board meetings." },
  { name:"Automation Sprints",       price:"From $20K",     accent: C.blueLight,desc:"Targeted 30-day sprints that eliminate a specific workflow break, deploy a new automation, or extend AI into a new part of your revenue motion." },
];

const CASE_STUDIES = [
  { tag:"Agent Deployment",      tagColor: C.amber,  client:"The Trade Desk",  industry:"Programmatic Advertising — Public", headline:"Deploying governed agents across CRM, data pipelines, and campaign operations to sustain competitive velocity at scale.", outcome:"Opsforce.ai embedded inside The Trade Desk's GTM operations to architect the data, workflow, and agent deployment systems that allowed a high-growth public programmatic advertising company to scale execution without proportional headcount growth. The work spanned CRM data architecture, workflow logic, and governed agent deployment." },
  { tag:"PE Board Mandate",       tagColor: C.blueLight, client:"Avalara",         industry:"B2B SaaS — PE-backed",      headline:"Rebuilding the revenue signal architecture for a PE-backed SaaS company under pressure to demonstrate GTM efficiency and pipeline predictability.", outcome:"Opsforce.ai rebuilt the revenue signal architecture for Avalara — a PE-backed B2B SaaS company — producing multi-touch attribution, AI-assisted analytics, and board-ready pipeline reporting under investor mandate. The work covered data layer remediation, attribution logic configuration, and analytics infrastructure buildout." },
  { tag:"GTM Expansion",          tagColor: C.blue,   client:"Impossible Foods", industry:"Consumer — High Growth",    headline:"Engineering the marketing and channel sales infrastructure to support rapid geographic and channel expansion without execution breakdown.", outcome:"Opsforce.ai built the CRM architecture, data workflows, and automation layer that enabled Impossible Foods to expand into new markets and channels without the operational fragility that typically accompanies hypergrowth. The work: CRM data architecture, workflow buildout, and automation layer deployment." },
];

const COMPARISON = [
  { feature:"Speed to Value",          gsis:"Slow (90+ days)",         freelance:"Variable",              aiAgents:"Fast, fails in prod",opsforce:"30-day sprint cycles" },
  { feature:"What You Own",            gsis:"Strategy deck",           freelance:"Task-based output",     aiAgents:"Black box output",  opsforce:"Logic in your systems" },
  { feature:"Enterprise Compliance",  gsis:"High (but slow)",         freelance:"Low — shadow IT risk",  aiAgents:"Low — black box",   opsforce:"High (SOC 2, CI/CD, ITIL)" },
  { feature:"Scalability",            gsis:"Requires headcount",      freelance:"Hard to scale quality", aiAgents:"Fails in production",opsforce:"Non-linear growth" },
  { feature:"Vendor Lock-In",         gsis:"High",                    freelance:"Medium",                aiAgents:"High",              opsforce:"Zero — you own everything" },
];

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.07, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(10,22,40,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      }}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663500125074/S6vDgqwvNTJhbK5iDVG3QD/opsforce-logo-icon_d0931d43.png"
            alt="Opsforce.AI icon"
            style={{ height:"36px", width:"36px", objectFit:"contain" }}
          />
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:"1.25rem", letterSpacing:"0.06em", textTransform:"uppercase", color:C.coolWhite }}>Opsforce.AI</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8 ml-auto mr-8">
          {[
            { label:"Services",     href:"#services" },
            { label:"How We Work",  href:"#how-we-work" },
            { label:"Case Studies", href:"#case-studies" },
            { label:"Contact",      href:"#contact" },
          ].map((item) => (
            <a key={item.label} href={item.href}
              className="text-sm transition-colors duration-200"
              style={{ color:"rgba(240,244,255,0.5)", fontFamily:"'Barlow',sans-serif", fontWeight:500, letterSpacing:"0.03em", fontSize:"var(--ts-base)" }}
              onMouseEnter={e=>(e.currentTarget.style.color=C.coolWhite)}
              onMouseLeave={e=>(e.currentTarget.style.color="rgba(240,244,255,0.5)")}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="#contact" onClick={scrollToContact}
            className="text-sm font-semibold px-5 py-2.5 transition-all duration-200 flex items-center gap-2"
            style={{ background:`linear-gradient(135deg, ${C.amber} 0%, ${C.amberDark} 100%)`, color:C.navy, fontFamily:"'Barlow',sans-serif", fontWeight:700, letterSpacing:"0.04em", fontSize:"var(--ts-base)", textTransform:"uppercase" }}
            onMouseEnter={e=>(e.currentTarget.style.boxShadow=`0 0 24px rgba(245,158,11,0.45)`)}
            onMouseLeave={e=>(e.currentTarget.style.boxShadow="none")}
          >
            Book a Call <ArrowRight size={13}/>
          </a>
        </div>

        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color:C.coolWhite }}>
          {menuOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden px-6 pb-6 pt-2 flex flex-col gap-4" style={{ backgroundColor:"rgba(10,22,40,0.98)" }}>
          {[
            { label:"Services",     href:"#services" },
            { label:"How We Work",  href:"#how-we-work" },
            { label:"Case Studies", href:"#case-studies" },
            { label:"Contact",      href:"#contact" },
          ].map((item) => (
            <a key={item.label} href={item.href}
              className="text-base py-2 border-b"
              style={{ color:"rgba(240,244,255,0.75)", borderColor:C.border, fontFamily:"'Barlow',sans-serif" }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => { scrollToContact(e); setMenuOpen(false); }}
            className="text-sm font-semibold px-5 py-3 text-center mt-2 block"
            style={{ background:`linear-gradient(135deg, ${C.amber}, ${C.amberDark})`, color:C.navy, fontFamily:"'Barlow',sans-serif", fontWeight:700 }}
          >
            Book a Diagnostic
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-20 lg:pb-28 overflow-hidden pt-16"
      style={{ backgroundColor:C.navy }}
    >
      <div className="absolute inset-0" style={{ backgroundImage:`url(${HERO_BG})`, backgroundSize:"cover", backgroundPosition:"center", opacity:0.55 }}/>
      <div className="absolute inset-0" style={{ background:`linear-gradient(135deg, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.80) 50%, rgba(7,15,30,0.92) 100%)` }}/>
      <div className="absolute top-0 right-0 w-2/3 h-2/3 pointer-events-none" style={{ background:`radial-gradient(ellipse at top right, rgba(245,158,11,0.12) 0%, transparent 65%)` }}/>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 pointer-events-none" style={{ background:`radial-gradient(ellipse at bottom left, rgba(124,58,237,0.12) 0%, transparent 65%)` }}/>
      <div className="absolute inset-0 pointer-events-none" style={{ background:`radial-gradient(ellipse at 30% 60%, rgba(37,99,235,0.10) 0%, transparent 60%)` }}/>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage:"linear-gradient(rgba(37,99,235,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.4) 1px, transparent 1px)", backgroundSize:"60px 60px" }}/>

      <div className="container relative z-10" style={{paddingTop: '30px'}}>
        <div className="mb-6 animate-fade-up">
          <span className="section-label" style={{ color:C.cyan, borderColor:"rgba(6,182,212,0.4)", fontFamily:"'Space Mono',monospace" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current inline-block animate-pulse mr-2"/>
            GTM Operations: Data{"\u00A0"}· Workflows{"\u00A0"}· Agent Deployment{"\u00A0"}· Governance
          </span>
        </div>

        <h1 className="font-display mb-8 animate-fade-up delay-100" role="heading" aria-level={1}
          style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(2.5rem, 8vw, 7rem)", lineHeight:0.9, textTransform:"uppercase", maxWidth:"980px" }}
        >
          <span style={{ color:C.coolWhite }}>Your Go-to-Market</span>
          <br/>
          <span style={{ background:"linear-gradient(90deg, #2563EB 0%, #4A90B8 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Operations Partner</span>
          <br/>
          <span style={{ color:C.coolWhite }}>for the Agentic Era.</span>
        </h1>

        <p className="mb-10 max-w-[640px] animate-fade-up delay-200"
          style={{ fontFamily:"'Barlow',sans-serif", fontWeight:500, fontSize:"clamp(1rem, 2.2vw, 1.25rem)", lineHeight:1.7, color:"rgba(240,244,255,0.75)" }}
        >
          Embedded engineering partners who fix the data, logic, and workflows your go-to-market motion needs to deploy governed agents today.
        </p>

        <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
          <a href="#contact" onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 font-semibold transition-all duration-300"
            style={{ background:`linear-gradient(135deg, ${C.amber} 0%, ${C.amberDark} 100%)`, color:C.navy, fontFamily:"'Barlow',sans-serif", fontWeight:800, letterSpacing:"0.04em", boxShadow:`0 4px 24px rgba(245,158,11,0.35)`, textTransform:"uppercase", fontSize:"clamp(0.8rem, 1.5vw, 0.9rem)" }}
            onMouseEnter={e=>(e.currentTarget.style.boxShadow=`0 6px 32px rgba(245,158,11,0.55)`)}
            onMouseLeave={e=>(e.currentTarget.style.boxShadow=`0 4px 24px rgba(245,158,11,0.35)`)}
          >
            Book a Working Session <ArrowRight size={16}/>
          </a>
          <a href="#how-we-work"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium border transition-all duration-200"
            style={{ color:C.coolWhite, borderColor:"rgba(240,244,255,0.2)", fontFamily:"'Barlow',sans-serif", letterSpacing:"0.03em", fontSize:"clamp(0.8rem, 1.5vw, 0.9rem)" }}
            onMouseEnter={e=>(e.currentTarget.style.backgroundColor="rgba(255,255,255,0.07)")}
            onMouseLeave={e=>(e.currentTarget.style.backgroundColor="transparent")}
          >
            See How We Work <ArrowRight size={16}/>
          </a>
        </div>

        {/* Hero stats — inline social proof */}
        <div className="flex flex-wrap gap-x-8 gap-y-5 mt-14 pt-10 animate-fade-up delay-300 justify-center sm:justify-start" style={{ borderTop:"1px solid rgba(240,244,255,0.08)" }}>
          {[
            { val:"50+",   label:"Enterprise Clients",   color: C.amber },
            { val:"200+",  label:"GTM Systems Deployed", color: C.cyan },
            { val:"$2B+",  label:"Revenue Influenced",   color: C.violet },
            { val:"100+",  label:"Tech Partners",        color: C.emerald },
          ].map((s,i) => (
            <div key={i} className="flex flex-col">
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(1.5rem, 4vw, 2.75rem)", color:s.color, lineHeight:1, letterSpacing:"-0.01em" }}>{s.val}</span>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"clamp(0.6rem, 1.2vw, 0.72rem)", letterSpacing:"0.12em", color:"rgba(240,244,255,0.3)", textTransform:"uppercase", marginTop:"5px" }}>{s.label}</span>
            </div>
          ))}
        </div>

      </div>

      <div className="absolute bottom-8 right-8 lg:right-12">
        <ChevronDown size={18} style={{ color:"rgba(6,182,212,0.5)" }} className="animate-bounce"/>
      </div>
    </section>
  );
}

// ─── Logo Ticker ──────────────────────────────────────────────────────────────
function LogoTicker() {
  const doubled = [...CLIENT_LOGOS,...CLIENT_LOGOS];
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor:"#f0f4ff", borderTop:`1px solid rgba(10,22,40,0.08)`, borderBottom:`1px solid rgba(10,22,40,0.08)`, padding:"28px 0" }}>
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 pointer-events-none z-10" style={{ background:`linear-gradient(90deg, #f0f4ff 0%, transparent 100%)` }}/>
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 pointer-events-none z-10" style={{ background:`linear-gradient(270deg, #f0f4ff 0%, transparent 100%)` }}/>

      {/* Label centered above */}
      <div className="flex items-center justify-center gap-4 mb-5">
        <div style={{ height:"1px", width:"48px", background:`linear-gradient(90deg, transparent, ${C.slate})` }}/>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"var(--ts-xs)", letterSpacing:"0.18em", color:C.slate, textTransform:"uppercase", fontWeight:600 }}>Trusted by enterprise teams at</span>
        <div style={{ height:"1px", width:"48px", background:`linear-gradient(270deg, transparent, ${C.slate})` }}/>
      </div>

      <div className="ticker-track" style={{ alignItems:"center" }}>
        {doubled.map((logo,i) => (
          <div key={i} className="mx-12 shrink-0 flex items-center justify-center" style={{ height:"52px" }}>
            {logo.img ? (
              <img
                src={logo.img}
                alt={logo.name}
                style={{
                  height: '40px',
                  width:"auto",
                  maxWidth: '180px',
                  objectFit:"contain",
                  opacity:0.8,
                  transition:"opacity 0.2s",
                  filter:"none",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity="1")}
                onMouseLeave={e => (e.currentTarget.style.opacity="0.8")}
              />
            ) : (
              <span
                style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.88rem", letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(240,244,255,0.35)", whiteSpace:"nowrap" }}
              >
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Problem Section ──────────────────────────────────────────────────────────
function ProblemSection() {
  return (
    <section style={{ backgroundColor:C.coolWhite }} className="py-24 lg:py-36">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 mb-16">
          <div className="lg:w-1/2 reveal">
            <span className="section-label mb-6 inline-flex" style={{ color:'#19f0ed', borderColor:'#24f9f6', fontFamily:"'Space Mono',monospace" }}>
              The Agentic Infrastructure Gap
            </span>
            <h2 className="font-display mt-4"
              style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(2.8rem,6vw,6rem)", lineHeight:0.92, textTransform:"uppercase" }}
            >
              <span style={{ color:C.navy }}>Your GTM Stack</span>
              <br/>
              <span style={{ color:C.navy }}>Isn’t Your Biggest Problem.</span>
              <br/>
              <span style={{ background:`linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Your Infrastructure Is.</span>
            </h2>
            <p className="mt-6 max-w-md" style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(1rem,1.8vw,1.2rem)", lineHeight:1.7, color:C.slate, fontWeight:'500' }}>
              Go-to-market teams have invested heavily in technology — but the underlying infrastructure is broken. This is the Agentic Infrastructure Gap: the distance between your AI roadmap and the data, workflow, and governance foundation required to execute it. Workflows are fragmented, data is ungoverned, and business logic is undocumented — making the entire system unable to support agents at scale.
            </p>
          </div>
          <div className="lg:w-1/2 reveal flex flex-col justify-center" style={{ paddingTop:"0", minHeight:"0" }}>
            <div className="relative" style={{ borderRadius:"4px" }}>
              {/* 5-Layer Infrastructure Graphic — no wrapper box */}
              <div>
                <GTMStackGraphic />
              </div>
              {/* hidden svg placeholder — replaced by iframe above */}
              <svg viewBox="0 0 600 460" className="w-full" xmlns="http://www.w3.org/2000/svg" style={{ display:"none" }}>
                <defs>
                  <filter id="pGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                  <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#2563EB"/><stop offset="100%" stopColor="#4A90B8"/></linearGradient>
                </defs>
                <rect width="600" height="460" fill="#070F1E"/>
                {[0,100,200,300,400,500,600].map((x,i)=><line key={`gx${i}`} x1={x} y1="0" x2={x} y2="460" stroke="rgba(37,99,235,0.05)" strokeWidth="1"/>)}
                {[0,60,120,180,240,300,360,420,460].map((y,i)=><line key={`gy${i}`} x1="0" y1={y} x2="600" y2={y} stroke="rgba(37,99,235,0.05)" strokeWidth="1"/>)}

                {/* Title */}
                <text x="300" y="30" textAnchor="middle" fill="rgba(240,244,255,0.35)" fontSize="8.5" fontFamily="monospace" letterSpacing="3" fontWeight="bold">ENTERPRISE GTM INFRASTRUCTURE</text>
                <line x1="20" y1="38" x2="580" y2="38" stroke="rgba(37,99,235,0.15)" strokeWidth="1"/>

                {/* Row 1 — 3 components */}
                {/* 1. Workflow Architecture */}
                <rect x="12" y="50" width="182" height="88" rx="3" fill="rgba(37,99,235,0.1)" stroke="rgba(37,99,235,0.5)" strokeWidth="1.5"/>
                <rect x="12" y="50" width="182" height="3" fill="#2563EB"/>
                <text x="103" y="74" textAnchor="middle" fill="#60A5FA" fontSize="8.5" fontFamily="monospace" letterSpacing="1" fontWeight="bold">WORKFLOW ARCHITECTURE</text>
                <text x="103" y="92" textAnchor="middle" fill="rgba(240,244,255,0.55)" fontSize="7.5" fontFamily="monospace">Lead → Account → Opp flows</text>
                <text x="103" y="107" textAnchor="middle" fill="rgba(240,244,255,0.55)" fontSize="7.5" fontFamily="monospace">Handoffs · Routing · SLAs</text>
                <text x="103" y="126" textAnchor="middle" fill="rgba(245,158,11,0.8)" fontSize="7" fontFamily="monospace">⚠ Fragmented workflows</text>

                {/* 2. Data Foundation */}
                <rect x="209" y="50" width="182" height="88" rx="3" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5"/>
                <rect x="209" y="50" width="182" height="3" fill="#4A90B8"/>
                <text x="300" y="74" textAnchor="middle" fill="#4A90B8" fontSize="8.5" fontFamily="monospace" letterSpacing="1" fontWeight="bold">DATA FOUNDATION</text>
                <text x="300" y="92" textAnchor="middle" fill="rgba(240,244,255,0.55)" fontSize="7.5" fontFamily="monospace">Data model · Enrichment</text>
                <text x="300" y="107" textAnchor="middle" fill="rgba(240,244,255,0.55)" fontSize="7.5" fontFamily="monospace">Hygiene · Source of truth</text>
                <text x="300" y="126" textAnchor="middle" fill="rgba(245,158,11,0.8)" fontSize="7" fontFamily="monospace">⚠ Duplicate, unreliable data</text>

                {/* 3. Governance & Rules */}
                <rect x="406" y="50" width="182" height="88" rx="3" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5"/>
                <rect x="406" y="50" width="182" height="3" fill="#F59E0B"/>
                <text x="497" y="74" textAnchor="middle" fill="#FCD34D" fontSize="8.5" fontFamily="monospace" letterSpacing="1" fontWeight="bold">GOVERNANCE & RULES</text>
                <text x="497" y="92" textAnchor="middle" fill="rgba(240,244,255,0.55)" fontSize="7.5" fontFamily="monospace">Ownership · Lifecycle stages</text>
                <text x="497" y="107" textAnchor="middle" fill="rgba(240,244,255,0.55)" fontSize="7.5" fontFamily="monospace">Validation · Access controls</text>
                <text x="497" y="126" textAnchor="middle" fill="rgba(245,158,11,0.8)" fontSize="7" fontFamily="monospace">⚠ No enforcement → chaos</text>

                {/* Row 2 — 3 components */}
                {/* 4. System Integration */}
                <rect x="12" y="152" width="182" height="88" rx="3" fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5"/>
                <rect x="12" y="152" width="182" height="3" fill="#4F5F8A"/>
                <text x="103" y="176" textAnchor="middle" fill="#C4B5FD" fontSize="8.5" fontFamily="monospace" letterSpacing="1" fontWeight="bold">SYSTEM INTEGRATION</text>
                <text x="103" y="194" textAnchor="middle" fill="rgba(240,244,255,0.55)" fontSize="7.5" fontFamily="monospace">CRM ↔ Marketing ↔ Sales ↔ CS</text>
                <text x="103" y="209" textAnchor="middle" fill="rgba(240,244,255,0.55)" fontSize="7.5" fontFamily="monospace">API · Middleware · Triggers</text>
                <text x="103" y="228" textAnchor="middle" fill="rgba(245,158,11,0.8)" fontSize="7" fontFamily="monospace">⚠ Point-to-point, no orchestration</text>

                {/* 5. Reporting & Attribution */}
                <rect x="209" y="152" width="182" height="88" rx="3" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5"/>
                <rect x="209" y="152" width="182" height="3" fill="#3B82F6"/>
                <text x="300" y="176" textAnchor="middle" fill="#93C5FD" fontSize="8.5" fontFamily="monospace" letterSpacing="1" fontWeight="bold">REPORTING & ATTRIBUTION</text>
                <text x="300" y="194" textAnchor="middle" fill="rgba(240,244,255,0.55)" fontSize="7.5" fontFamily="monospace">Pipeline · Attribution models</text>
                <text x="300" y="209" textAnchor="middle" fill="rgba(240,244,255,0.55)" fontSize="7.5" fontFamily="monospace">Funnel metrics · Forecasting</text>
                <text x="300" y="228" textAnchor="middle" fill="rgba(245,158,11,0.8)" fontSize="7" fontFamily="monospace">⚠ Metrics don’t tie to reality</text>

                {/* 6. Automation & Orchestration */}
                <rect x="406" y="152" width="182" height="88" rx="3" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5"/>
                <rect x="406" y="152" width="182" height="3" fill="#2D7A6E"/>
                <text x="497" y="176" textAnchor="middle" fill="#6EE7B7" fontSize="8.5" fontFamily="monospace" letterSpacing="1" fontWeight="bold">AUTOMATION & AI</text>
                <text x="497" y="194" textAnchor="middle" fill="rgba(240,244,255,0.55)" fontSize="7.5" fontFamily="monospace">Routing · Task automation</text>
                <text x="497" y="209" textAnchor="middle" fill="rgba(240,244,255,0.55)" fontSize="7.5" fontFamily="monospace">AI-assisted processes</text>
                <text x="497" y="228" textAnchor="middle" fill="rgba(245,158,11,0.8)" fontSize="7" fontFamily="monospace">⚠ Manual work inside automation</text>

                {/* Row 3 — 2 components centered */}
                {/* 7. Agent Deployment */}
                <rect x="110" y="254" width="182" height="88" rx="3" fill="rgba(37,99,235,0.15)" stroke="rgba(37,99,235,0.7)" strokeWidth="2" filter="url(#pGlow)"/>
                <rect x="110" y="254" width="182" height="3" fill="url(#aiGrad)"/>
                <text x="201" y="278" textAnchor="middle" fill="#F0F4FF" fontSize="8.5" fontFamily="monospace" letterSpacing="1" fontWeight="bold">AGENT DEPLOYMENT</text>
                <text x="201" y="296" textAnchor="middle" fill="rgba(6,182,212,0.85)" fontSize="7.5" fontFamily="monospace">Agents · Scoring · Enrichment</text>
                <text x="201" y="311" textAnchor="middle" fill="rgba(6,182,212,0.85)" fontSize="7.5" fontFamily="monospace">Personalization · Forecasting</text>
                <text x="201" y="330" textAnchor="middle" fill="rgba(240,244,255,0.4)" fontSize="7" fontFamily="monospace">PRODUCTION-GRADE — NOT POC</text>

                {/* 8. Customer Lifecycle */}
                <rect x="308" y="254" width="182" height="88" rx="3" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5"/>
                <rect x="308" y="254" width="182" height="3" fill="#F59E0B"/>
                <text x="399" y="278" textAnchor="middle" fill="#FCD34D" fontSize="8.5" fontFamily="monospace" letterSpacing="1" fontWeight="bold">CUSTOMER LIFECYCLE</text>
                <text x="399" y="296" textAnchor="middle" fill="rgba(240,244,255,0.55)" fontSize="7.5" fontFamily="monospace">Lead → Customer → Expansion</text>
                <text x="399" y="311" textAnchor="middle" fill="rgba(240,244,255,0.55)" fontSize="7.5" fontFamily="monospace">CS handoff · Renewal triggers</text>
                <text x="399" y="330" textAnchor="middle" fill="rgba(245,158,11,0.8)" fontSize="7" fontFamily="monospace">⚠ Post-sale disconnected from GTM</text>

                {/* Footer bar */}
                <line x1="20" y1="358" x2="580" y2="358" stroke="rgba(37,99,235,0.15)" strokeWidth="1"/>
                <rect x="0" y="360" width="600" height="100" fill="rgba(37,99,235,0.04)"/>
                <text x="300" y="390" textAnchor="middle" fill="rgba(240,244,255,0.35)" fontSize="8" fontFamily="monospace" letterSpacing="2">OPSFORCE.AI ENGINEERS ALL 8 LAYERS</text>
                <text x="300" y="410" textAnchor="middle" fill="rgba(240,244,255,0.2)" fontSize="7" fontFamily="monospace" letterSpacing="1">FROM DATA FOUNDATION TO AI PRODUCTION</text>
                <text x="300" y="432" textAnchor="middle" fill="rgba(240,244,255,0.12)" fontSize="6.5" fontFamily="monospace" letterSpacing="1">OWNED BY YOU — BUILT AND GOVERNED BY OPSFORCE.AI</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Pain points grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor:C.borderLight }}>
          {PAIN_POINTS.map((point,i) => (
            <div key={i} className="p-8 lg:p-10 reveal group transition-all duration-300"
              style={{ backgroundColor:C.coolWhite, transitionDelay:`${i*0.07}s` }}
              onMouseEnter={e=>(e.currentTarget.style.backgroundColor=C.offWhite)}
              onMouseLeave={e=>(e.currentTarget.style.backgroundColor=C.coolWhite)}
            >
              <div className="w-8 h-0.5 mb-5 transition-all duration-300 group-hover:w-16" style={{ backgroundColor:point.color }}/>
              <span className="font-label block mb-3" style={{ color:point.color, fontFamily:"'Space Mono',monospace", fontSize:"0.62rem", letterSpacing:"0.18em" }}>
                {point.tag}
              </span>
              <h3 className="mb-3" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:"clamp(1.4rem,2.2vw,1.75rem)", lineHeight:1.1, color:C.navy, textTransform:"uppercase" }}>
                {point.headline}
              </h3>
              <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.85rem,1.2vw,0.95rem)", lineHeight:1.65, color:C.slate }}>
                {point.body}
              </p>
            </div>
          ))}
        </div>

        {/* Root cause callout — diagnosis pivot */}
        <div className="mt-px relative overflow-hidden" style={{ backgroundColor:"#060e1c", borderTop:`3px solid ${C.amber}` }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background:`linear-gradient(135deg, rgba(245,158,11,0.07) 0%, rgba(6,182,212,0.04) 50%, transparent 100%)` }}/>
          <div className="p-10 lg:p-14 relative z-10">
            {/* Diagnosis label */}
            <div className="flex items-center gap-3 mb-8">
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"var(--ts-xs)", letterSpacing:"0.15em", color:C.amber, textTransform:"uppercase" }}>Root Cause Diagnosis</span>
              <div style={{ flex:1, height:"1px", background:`linear-gradient(90deg, rgba(245,158,11,0.4) 0%, transparent 100%)` }}/>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
              {/* Left: The diagnosis */}
              <div className="lg:w-5/12">
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(1.8rem,3.5vw,2.6rem)", textTransform:"uppercase", lineHeight:1.0 }}>
                  <span style={{ color:C.coolWhite }}>The Real Issue</span><br/>
                  <span style={{ color:C.coolWhite }}>Isn't Your Tools.</span><br/>
                  <span style={{ background:`linear-gradient(135deg, ${C.amber} 0%, ${C.cyan} 100%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>It's How They're Wired.</span>
                </h3>
                <p className="mt-5" style={{ fontFamily:"'Barlow',sans-serif", fontSize:"var(--ts-md)", lineHeight:1.65, color:"rgba(240,244,255,0.45)" }}>
                  Most GTM teams have the right platforms. What they're missing is a governed execution layer — the architecture that connects data, logic, and agents into a system that actually runs reliably at scale.
                </p>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px self-stretch" style={{ background:`linear-gradient(180deg, transparent, rgba(245,158,11,0.25), transparent)` }}/>

              {/* Right: What Opsforce does about it */}
              <div className="flex-1">
                <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"var(--ts-xs)", letterSpacing:"0.15em", color:C.cyan, textTransform:"uppercase", marginBottom:"16px" }}>What Opsforce.ai Does About It</p>
                <div className="flex flex-col gap-5">
                  {[
                    { icon:"01", label:"Rationalize the Stack",      desc:"Audit your full GTM tech footprint, eliminate redundancy, and consolidate around the platforms that drive revenue.",  color: C.amber },
                    { icon:"02", label:"Rebuild the Logic Layer",    desc:"Redesign workflows, routing rules, and automation sequences so your systems execute the way your strategy intends.",  color: C.cyan },
                    { icon:"03", label:"Govern the Data Foundation", desc:"Enforce data standards, ownership, and validation so your governed agents, forecasts, and reports can be trusted.",          color: C.violet },
                  ].map((item,i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"var(--ts-xs)", color:item.color, opacity:0.6, marginTop:"3px", flexShrink:0 }}>{item.icon}</span>
                      <div>
                        <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"var(--ts-base)", textTransform:"uppercase", color:C.coolWhite, letterSpacing:"0.03em", display:"block" }}>
                          {item.label}
                        </span>
                        <span style={{ fontFamily:"'Barlow',sans-serif", fontSize:"var(--ts-sm)", color:"rgba(240,244,255,0.4)", lineHeight:1.6 }}>
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issue 4 — Micro-CTA at peak pain moment */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-10 py-8 mt-px" style={{ backgroundColor:"rgba(245,158,11,0.06)", borderTop:`1px solid rgba(245,158,11,0.15)` }}>
          <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"var(--ts-base)", color:"rgba(240,244,255,0.55)", lineHeight:1.5 }}>
            <span style={{ color:C.coolWhite, fontWeight:600 }}>Sound familiar?</span>{" "}
            We can map your highest-impact execution gap in a free 30-minute call.
          </p>
          <a href="#contact" onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-7 py-3 whitespace-nowrap transition-all duration-200 shrink-0"
            style={{ background:`linear-gradient(135deg, ${C.amber} 0%, ${C.amberDark} 100%)`, color:C.navy, fontFamily:"'Barlow',sans-serif", fontWeight:800, letterSpacing:"0.04em", textTransform:"uppercase", fontSize:"var(--ts-sm)", boxShadow:`0 4px 20px rgba(245,158,11,0.3)` }}
            onMouseEnter={e=>(e.currentTarget.style.boxShadow=`0 6px 28px rgba(245,158,11,0.5)`)}
            onMouseLeave={e=>(e.currentTarget.style.boxShadow=`0 4px 20px rgba(245,158,11,0.3)`)}
          >
            Book a Diagnostic <ArrowRight size={14}/>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Capabilities ─────────────────────────────────────────────────────────────
function CapabilitiesSection() {
  return (
    <section id="services" className="py-24 lg:py-36 relative overflow-hidden" style={{ backgroundColor:C.navyMid }}>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 pointer-events-none" style={{ background:`radial-gradient(ellipse at bottom left, rgba(124,58,237,0.12) 0%, transparent 65%)` }}/>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 pointer-events-none" style={{ background:`radial-gradient(ellipse at top right, rgba(245,158,11,0.08) 0%, transparent 65%)` }}/>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-20">
          <div className="lg:w-1/2 reveal">
            <span className="section-label mb-6 inline-flex" style={{ color:C.cyan, borderColor:"rgba(6,182,212,0.3)", fontFamily:"'Space Mono',monospace" }}>
              What We Build & Deploy
            </span>
            <h2 className="font-display mt-4"
              style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(2.5rem,5vw,5.5rem)", lineHeight:0.92, textTransform:"uppercase" }}
            >
              <span style={{ color:'#f9fafa' }}>Governed Infrastructure.</span>
              <br/>
              <span style={{ color:'#fafafa' }}>Autonomous Agents.</span>
              <br/>
              <span style={{ color:C.amber }}>Measurable Revenue.</span>
            </h2>
          </div>
          <div className="lg:w-1/2 flex items-end reveal">
            <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(1rem,1.5vw,1.2rem)", lineHeight:1.7, color:"rgba(240,244,255,0.55)", fontWeight: '500' }}>
              We engineer the go-to-market execution layer that turns your technology investment into measurable pipeline, defensible attribution, and board-ready reporting. We don't just consult. We build and deploy.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor:"rgba(255,255,255,0.04)" }}>
          {CAPABILITIES.map((cap,i) => (
            <div key={i} className="p-8 lg:p-10 group transition-all duration-300 reveal flex flex-col"
              style={{ backgroundColor:C.navyMid, transitionDelay:`${i*0.07}s`, cursor:"default", minHeight:"200px" }}
              onMouseEnter={e=>(e.currentTarget.style.backgroundColor=C.navyLight)}
              onMouseLeave={e=>(e.currentTarget.style.backgroundColor=C.navyMid)}
            >
              {/* Always-visible header area */}
              <div>
                <div className="w-6 h-0.5 mb-5 transition-all duration-300 group-hover:w-12" style={{ backgroundColor:cap.color }}/>
                <cap.Icon size={22} className="mb-4" style={{ color:cap.color }}/>
                <h3 className="mb-3" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"clamp(1rem,1.4vw,1.15rem)", textTransform:"uppercase", color:C.coolWhite, letterSpacing:"0.03em", lineHeight:1.2 }}>
                  {cap.title}
                </h3>
              </div>
              {/* Default body — fades out on hover */}
              <p className="transition-all duration-300 group-hover:opacity-0 group-hover:max-h-0 group-hover:mt-0 group-hover:mb-0 overflow-hidden" style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.85rem,1.2vw,1rem)", lineHeight:1.65, color:"rgba(240,244,255,0.4)", maxHeight:"120px" }}>
                {cap.body}
              </p>
              {/* Hover-reveal detail — slides in below title */}
              <p className="opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-40 overflow-hidden" style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.85rem,1.2vw,1rem)", lineHeight:1.7, color:"rgba(240,244,255,0.72)", marginTop:0 }}>
                {cap.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GTM Maturity Model ───────────────────────────────────────────────────────
const MATURITY_LEVELS = [
  {
    num: "01",
    level: "Fragmented",
    subtitle: "You have tools, but the foundation is broken.",
    description: "Your GTM systems operate in silos. Workflows are manual, data is inconsistent, and reporting is hard to trust.",
    signs: [
      "Teams rely on spreadsheets and manual workarounds",
      "Lead handoffs are inconsistent or delayed",
      "CRM data is incomplete, duplicated, or unreliable",
      "Reporting varies by team and lacks trust",
      "Ownership and process rules are unclear",
    ],
    youreHere: "Your team spends more time fixing process issues than driving growth.",
    color: C.amber,
    bgOpacity: "rgba(245,158,11,0.06)",
    borderColor: "rgba(245,158,11,0.3)",
    barWidth: "20%",
  },
  {
    num: "02",
    level: "Connected",
    subtitle: "Your tools are integrated, but execution is still inefficient.",
    description: "You've implemented core platforms and some integrations, but the system still depends on manual intervention and inconsistent processes.",
    signs: [
      "CRM and marketing automation are connected, but not fully aligned",
      "Routing and lifecycle processes are partially standardized",
      "Dashboards exist, but teams question the numbers",
      "Data quality issues still slow down execution",
      "Governance exists informally, but is not consistently enforced",
    ],
    youreHere: "Your stack technically works, but your teams still struggle to scale efficiently.",
    color: C.blueLight,
    bgOpacity: "rgba(59,130,246,0.06)",
    borderColor: "rgba(59,130,246,0.3)",
    barWidth: "40%",
  },
  {
    num: "03",
    level: "Structured",
    subtitle: "You have a working foundation for scale.",
    description: "Your GTM workflows, data model, and governance are defined. Teams operate with more consistency, and reporting is more reliable.",
    signs: [
      "Lead-to-revenue workflows are documented and standardized",
      "Lifecycle stages and ownership rules are clearly defined",
      "Core data is cleaner and more dependable",
      "Reporting is centralized around shared KPIs",
      "Cross-functional execution is more consistent",
    ],
    youreHere: "Your GTM engine is functional, but there's still room to improve speed, efficiency, and automation.",
    color: C.violet,
    bgOpacity: "rgba(124,58,237,0.06)",
    borderColor: "rgba(124,58,237,0.3)",
    barWidth: "60%",
  },
  {
    num: "04",
    level: "Optimized",
    subtitle: "Your GTM engine is efficient, scalable, and aligned.",
    description: "Your execution is orchestrated, your data is trusted, and your systems work together in a way that supports fast execution and better decision-making.",
    signs: [
      "Workflow automation reduces manual work across teams",
      "Integrations are designed intentionally, not patched together",
      "Data is clean, current, and usable across systems",
      "Forecasting and attribution are dependable",
      "Marketing, sales, and customer teams operate from the same logic",
    ],
    youreHere: "Your GTM infrastructure supports scale without constant operational friction.",
    color: C.cyan,
    bgOpacity: "rgba(6,182,212,0.06)",
    borderColor: "rgba(6,182,212,0.3)",
    barWidth: "80%",
  },
  {
    num: "05",
    level: "Agent-Native",
    subtitle: "Your infrastructure is built for intelligent execution.",
    description: "Governed agents are embedded into how work gets done across your GTM motion, from prioritization and routing to forecasting and execution orchestration.",
    signs: [
      "Governed agents support decision-making inside workflows",
      "Repetitive work is delegated to agents across systems",
      "Data and process logic are structured for agent-ready infrastructure",
      "Teams use predictive insights to prioritize action",
      "The system continuously improves how GTM work gets executed",
    ],
    youreHere: "Your GTM infrastructure is no longer just operational — it's intelligent.",
    color: C.emerald,
    bgOpacity: "rgba(16,185,129,0.06)",
    borderColor: "rgba(16,185,129,0.35)",
    barWidth: "100%",
  },
];

function MaturityModelSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = MATURITY_LEVELS[active];

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % MATURITY_LEVELS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section className="py-24 lg:py-36 relative overflow-hidden" style={{ backgroundColor:'#f0f4ff' }}>
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none" style={{ background:`radial-gradient(ellipse at top right, rgba(37,99,235,0.12) 0%, transparent 70%)` }}/>
      <div className="absolute bottom-0 left-0 w-1/4 h-2/3 pointer-events-none" style={{ background:`radial-gradient(ellipse at bottom left, rgba(6,182,212,0.06) 0%, transparent 70%)` }}/>
      <div className="container relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16 reveal">
          <div className="lg:w-1/2">
            <span className="section-label mb-6 inline-flex" style={{ color:C.slate, borderColor:"rgba(10,22,40,0.15)", fontFamily:"'Space Mono',monospace" }}>
              GTM Maturity Model
            </span>
            <h2 className="font-display mt-4"
              style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(2.5rem,5vw,5rem)", lineHeight:0.92, textTransform:"uppercase" }}
            >
              <span style={{ color:C.navy }}>The Opsforce</span>
              <br/>
              <span style={{ color:C.navy }}>GTM Maturity</span>
              <br/>
              <span style={{ background:`linear-gradient(135deg, ${C.amber} 0%, #FCD34D 100%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Framework</span>
            </h2>
            <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.95rem,1.4vw,1.1rem)", lineHeight:1.65, color:C.slate, marginTop:"16px", maxWidth:"420px" }}>
              Five levels of go-to-market readiness — from fragmented systems to agent-native, self-optimizing infrastructure.
            </p>
          </div>
          <div className="lg:w-1/2 flex items-end">
            <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.95rem,1.4vw,1.1rem)", lineHeight:1.7, color:C.slate }}>
              Most teams are operating at Level 2 or 3 — connected enough to function, but sitting squarely in the Agentic Infrastructure Gap. Opsforce.ai engineers the infrastructure to move you to Levels 4 and 5, where governed agents can execute autonomously and safely.
            </p>
          </div>
        </div>

        {/* Maturity progression graphic */}
        <div
          className="mb-12 reveal"
          style={{ background:"rgba(10,22,40,0.04)", border:`1px solid rgba(10,22,40,0.1)`, borderRadius:"2px", padding:"1.25rem 1.5rem" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div style={{ display:"flex", gap:"8px", alignItems:"flex-end", height:"clamp(80px,15vw,120px)", marginBottom:"12px", overflowX:"auto" }}>
            {MATURITY_LEVELS.map((lvl, i) => {
              const heights = ["30%","48%","62%","80%","100%"];
              const isActive = active === i;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="flex-1 relative group transition-all duration-300"
                  style={{ height:heights[i], display:"flex", flexDirection:"column", justifyContent:"flex-end", cursor:"pointer", background:"none", border:"none", padding:0 }}
                >
                  <div
                    style={{
                      width:"100%",
                      height:"100%",
                      background: isActive
                        ? `linear-gradient(180deg, ${lvl.color}33 0%, ${lvl.color}99 100%)`
                        : `linear-gradient(180deg, ${lvl.color}11 0%, ${lvl.color}44 100%)`,
                      borderTop: `3px solid ${lvl.color}`,
                      borderLeft: `1px solid ${lvl.color}22`,
                      borderRight: `1px solid ${lvl.color}22`,
                      transition:"all 0.25s ease",
                      opacity: isActive ? 1 : 0.55,
                      position:"relative",
                    }}
                  >
                    {isActive && (
                      <div style={{ position:"absolute", top:"-22px", left:"50%", transform:"translateX(-50%)", whiteSpace:"nowrap" }}>
                        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.75rem", letterSpacing:"0.12em", color:lvl.color, textTransform:"uppercase", background:"rgba(240,244,255,0.9)", padding:"2px 6px", border:`1px solid ${lvl.color}44` }}>
                          ← You Are Here
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          {/* Level labels */}
          <div style={{ display:"flex", gap:"8px", overflowX:"auto" }}>
            {MATURITY_LEVELS.map((lvl, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="flex-1 text-left transition-all duration-200"
                style={{ background:"none", border:"none", padding:0, cursor:"pointer" }}
              >
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"clamp(0.55rem,1vw,0.65rem)", letterSpacing:"0.1em", color: active === i ? lvl.color : C.slate, textTransform:"uppercase", display:"block", transition:"color 0.2s" }}>
                  {lvl.num}
                </span>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"clamp(0.65rem,1.2vw,0.8rem)", textTransform:"uppercase", color: active === i ? C.navy : C.slate, letterSpacing:"0.02em", lineHeight:1.1, display:"block", marginTop:"2px", transition:"color 0.2s", whiteSpace:"nowrap" }}>
                  {lvl.level}
                </span>
              </button>
            ))}
          </div>
        </div>



        {/* Active level panel */}
        <div
          key={active}
          className="animate-fade-up"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            background: current.bgOpacity,
            border:`1px solid ${current.borderColor}`,
            borderTop:`3px solid ${current.color}`,
            padding:"clamp(1.25rem,3vw,2.5rem)",
            transition:"border-color 0.3s ease",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

            {/* Left: level info */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-5">
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.7rem", letterSpacing:"0.15em", color:current.color, opacity:0.7 }}>
                  LEVEL {current.num}
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor:current.borderColor }}/>
              </div>
              <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(2rem,4vw,3.5rem)", textTransform:"uppercase", lineHeight:0.92, color:C.navy }}>
                {current.level}
              </h3>
              <p className="mt-3 mb-5" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:500, fontSize:"clamp(1rem,1.5vw,1.2rem)", color:C.slate, lineHeight:1.4 }}>
                {current.subtitle}
              </p>
              <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.9rem,1.3vw,1.05rem)", lineHeight:1.7, color:C.slate }}>
                {current.description}
              </p>

              {/* Maturity progress bar */}
              <div className="mt-8">
                <div className="flex justify-between mb-2">
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.15em", color:C.slate }}>MATURITY LEVEL</span>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.1em", color:current.color }}>{current.barWidth}</span>
                </div>
                <div className="w-full h-1.5" style={{ backgroundColor:"rgba(10,22,40,0.1)", borderRadius:"1px" }}>
                  <div
                    className="h-full transition-all duration-700"
                    style={{ width:current.barWidth, backgroundColor:current.color, borderRadius:"1px" }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  {MATURITY_LEVELS.map((_,i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{ backgroundColor: i <= active ? current.color : "rgba(10,22,40,0.15)" }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: signs + you're here */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              <div>
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.15em", color:current.color, display:"block", marginBottom:"1rem" }}>
                  COMMON SIGNS

                </span>
                <ul className="flex flex-col gap-3">
                  {current.signs.map((sign, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span style={{ color:current.color, marginTop:"3px", fontSize:"0.65rem", flexShrink:0 }}>◆</span>
                      <span style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.85rem,1.2vw,1rem)", lineHeight:1.55, color:C.slate }}>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* You're likely here callout */}
              <div className="mt-2 p-5" style={{ border:`1px solid ${current.borderColor}`, background:`rgba(10,22,40,0.03)` }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.15em", color:current.color, display:"block", marginBottom:"0.5rem" }}>
                  YOU'RE LIKELY HERE IF
                </span>
                <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600, fontSize:"clamp(0.95rem,1.4vw,1.1rem)", lineHeight:1.35, color:C.navy }}>
                  {current.youreHere}
                </p>
              </div>

              {/* CTA */}
              {active < 4 && (
                <a href="#contact" onClick={scrollToContact}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 self-start"
                  style={{ backgroundColor:current.color, color:"#fff", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.85rem", letterSpacing:"0.08em", textTransform:"uppercase" }}
                >
                  Get to Level {active + 2} <ArrowRight size={14}/>
                </a>
              )}
              {active === 4 && (
                <div className="inline-flex items-center gap-2 px-6 py-3 self-start" style={{ border:`1px solid ${current.borderColor}`, background:"rgba(10,22,40,0.04)" }}>
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.85rem", letterSpacing:"0.08em", textTransform:"uppercase", color:current.color }}>You've Reached Agent-Native</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-between mt-4 reveal">
          <button
            onClick={() => { setPaused(true); setActive(Math.max(0, active - 1)); }}
            disabled={active === 0}
            className="flex items-center gap-2 px-4 py-2 transition-all duration-200"
              style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.1em", color: active === 0 ? "rgba(10,22,40,0.2)" : C.slate, cursor: active === 0 ? "not-allowed" : "pointer" }}
          >
            ← PREV LEVEL
          </button>
            <span style={{ fontFamily:"'Space Mono',monospace",fontSize:"0.65rem", letterSpacing:"0.12em", color:C.slate }}>
            {active + 1} / 5
          </span>
          <button
            onClick={() => { setPaused(true); setActive(Math.min(4, active + 1)); }}
            disabled={active === 4}
            className="flex items-center gap-2 px-4 py-2 transition-all duration-200"
              style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.1em", color: active === 4 ? "rgba(10,22,40,0.2)" : C.slate, cursor: active === 4 ? "not-allowed" : "pointer" }}
          >
            NEXT LEVEL →
          </button>
        </div>

      </div>
    </section>
  );
}

// ─── Tech Stack Ticker ────────────────────────────────────────────────────────
function TechStack() {
  const doubled = [...TECH_LOGOS,...TECH_LOGOS];
  return (
    <section className="py-14 overflow-hidden" style={{ borderTop:`1px solid ${C.borderLight}`, borderBottom:`1px solid ${C.borderLight}`, backgroundColor:C.offWhite }}>
      <div className="container mb-6 reveal">
        <span className="section-label" style={{ color:'#3ddbf0', borderColor:'#73eaf2', fontFamily:"'Space Mono',monospace" }}>
          Stack-agnostic — we work across all platforms in your ecosystem
        </span>
      </div>
      <div className="ticker-track" style={{ animationDuration:"55s", alignItems:"center" }}>
        {doubled.map((logo,i) => (
          <div key={i} className="mx-8 shrink-0 flex items-center justify-center" style={{ height:"56px" }}>
            <img
              src={logo.img}
              alt={logo.name}
              style={{
                height:"40px",
                width:"auto",
                maxWidth:"180px",
                objectFit:"contain",
                opacity:0.75,
                transition:"opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity="1")}
              onMouseLeave={e => (e.currentTarget.style.opacity="0.75")}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Methodology ─────────────────────────────────────────────────────────────
function MethodologySection() {
  const [active, setActive] = useState(0);
  const current = METHODOLOGY[active];

  return (
    <section id="how-we-work" className="py-24 lg:py-36 relative overflow-hidden" style={{ backgroundColor:C.navy }}>
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none" style={{ background:`radial-gradient(ellipse at top right, rgba(37,99,235,0.08) 0%, transparent 60%)` }}/>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 pointer-events-none" style={{ background:`radial-gradient(ellipse at bottom left, rgba(124,58,237,0.1) 0%, transparent 60%)` }}/>

      <div className="container relative z-10">
        <div className="mb-16 reveal">
          <span className="section-label mb-6 inline-flex" style={{ color:C.amber, borderColor:"rgba(245,158,11,0.35)", fontFamily:"'Space Mono',monospace" }}>
            How We Work
          </span>
          <h2 className="font-display mt-4"
            style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(2.5rem,5vw,5.5rem)", lineHeight:0.92, textTransform:"uppercase" }}
          >
            <span style={{ color:C.coolWhite }}>We Don't Stack</span>
            <br/>
            <span style={{ color:C.coolWhite }}>Innovation On Fragility.</span>
            <br/>
            <span style={{ background:`linear-gradient(135deg, ${C.amber} 0%, ${C.amberLight} 100%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>We Scale From Stability.</span>
          </h2>
          <p className="mt-6 max-w-lg" style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.95rem,1.4vw,1.1rem)", lineHeight:1.7, color:"rgba(240,244,255,0.5)" }}>
            Every engagement follows the same four-phase framework — designed to fix the foundation before scaling the machine.
          </p>
        </div>

        {/* Phase selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-0">
          {METHODOLOGY.map((phase,i) => (
            <button key={i} onClick={() => setActive(i)}
              className="p-5 text-left transition-all duration-300 border"
              style={{
                backgroundColor: active===i ? "rgba(255,255,255,0.05)" : "transparent",
                borderColor: active===i ? phase.color : "rgba(255,255,255,0.07)",
                boxShadow: active===i ? `0 0 20px ${phase.color}22` : "none",
              }}
            >
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", letterSpacing:"0.15em", color: active===i ? phase.color : "rgba(240,244,255,0.25)", display:"block", marginBottom:"6px" }}>
                {phase.num}
              </span>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"clamp(0.8rem,1.1vw,0.95rem)", textTransform:"uppercase", color: active===i ? C.coolWhite : "rgba(240,244,255,0.4)", letterSpacing:"0.05em" }}>
                {phase.phase}
              </span>
            </button>
          ))}
        </div>

        {/* Active content */}
        <div className="p-8 lg:p-12 border border-t-0" style={{ borderColor:"rgba(255,255,255,0.07)", borderTopColor: current.color, borderTopWidth:"2px" }}>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:"clamp(1.4rem,2.5vw,2rem)", textTransform:"uppercase", color:C.coolWhite, lineHeight:1.1 }}>
                {current.title}
              </h3>
              <p className="mt-4" style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.9rem,1.3vw,1.05rem)", lineHeight:1.75, color:"rgba(240,244,255,0.55)" }}>
                {current.body}
              </p>
            </div>
            <div className="lg:w-1/3">
              <p className="font-label mb-4" style={{ color:current.color, fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.15em" }}>
                Deliverables
              </p>
              <div className="flex flex-col gap-3">
                {current.deliverables.map((d,i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={14} style={{ color:current.color, flexShrink:0 }}/>
                    <span style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.85rem,1.1vw,0.95rem)", color:"rgba(240,244,255,0.6)" }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}// ─── Engagement Models ──────────────────────────────────────────────────────────────
function EngagementModelsSection() {
  const models = [
    {
      phase:"Phase 01", title:"The Diagnostic", subtitle:"GTM Execution Audit",
      range:"$10K–$50K", timeline:"4–8 weeks",
      desc:"Audit your go-to-market execution layer — workflows, data flows, orchestration logic, and agent-ready infrastructure.",
      highlight:false, accent: C.amber,
      icon:"◎",
      outcome:"You get a board-ready GTM execution map, a prioritized revenue leak analysis, and an agent readiness score — delivered in 4–8 weeks with zero internal resource drain.",
      bullets:["GTM execution map","Revenue leak analysis","Agent readiness score"],
    },
    {
      phase:"Phase 02", title:"The Build", subtitle:"GTM Infrastructure Implementation",
       range:"$30K–$300K+", timeline:"4–10+ weeks",
      desc:"Get right to solving a single major pain point in your GTM motion.",
      highlight:false,accent: C.blue,
      icon:"◈",
      outcome:"You get a production-grade CRM rebuild, deployed automation sequences, and governed data contracts — shipped in 30-day sprints so leadership sees ROI before the next board meeting.",
      bullets:["CRM logic rebuild","Automation deployment","Data contract setup"],
    },
    {
      phase:"Phase 03", title:"The Governance", subtitle:"Ongoing RevOps Monitoring & Optimization",
      range:"$18K–$60K/mo", timeline:"Ongoing",
      desc:"Your GTM NOC (revenue operations monitoring center) — continuous monitoring, governance, and optimization.",
      highlight:false, accent: C.violet,
      icon:"⬡",
      outcome:"You get a dedicated GTM NOC — proactive drift alerts, monthly optimization sprints, and a governance layer that prevents execution debt from accumulating as your stack grows.",
      bullets:["GTM NOC monitoring","Logic drift prevention","Monthly optimization"],
    },
  ];
  return (
    <section id="engagement-models" style={{ backgroundColor:C.coolWhite }} className="py-24 lg:py-36">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16">
          <div className="lg:w-1/2 reveal">
            <span className="section-label mb-6 inline-flex" style={{ color:C.slate, borderColor:"rgba(10,22,40,0.18)", fontFamily:"'Space Mono',monospace" }}>
              How We Engage
            </span>
            <h2 className="font-display mt-4"
              style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(2.5rem,5vw,5.5rem)", lineHeight:0.92, textTransform:"uppercase" }}
            >
              <span style={{ color:C.navy }}>Embedded Experts.</span>
              <br/>
              <span style={{ color:C.navy }}>Restored Velocity.</span>
              <br/>
              <span style={{ background:`linear-gradient(135deg, ${C.amber} 0%, ${C.amberLight} 100%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>At Scale.</span>
            </h2>
          </div>
          <div className="lg:w-1/2 flex items-end reveal">
            <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.95rem,1.4vw,1.1rem)", lineHeight:1.7, color:C.slate }}>
              Three modular engagement phases. Each is independently scoped and priced — start with a Diagnostic, build from there, and govern what you've built. No multi-year commitments. No delayed value.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {models.map((model,i) => (
            <div key={i} className="relative overflow-hidden reveal group"
              style={{
                backgroundColor: model.highlight ? C.navy : C.coolWhite,
                border: model.highlight ? `1px solid rgba(37,99,235,0.3)` : `1px solid ${C.borderLight}`,
                boxShadow: model.highlight ? `0 8px 40px rgba(37,99,235,0.15)` : "none",
                transitionDelay:`${i*0.1}s`,
              }}
            >
              <div className="h-1 w-full" style={{ background: model.highlight ? `linear-gradient(90deg, ${C.blue}, ${C.cyan})` : `linear-gradient(90deg, ${model.accent}, ${model.accent}88)` }}/>
              <div className="p-8">
                {model.highlight && (
                  <span className="inline-block mb-3 px-2 py-1 text-xs font-semibold"
                    style={{ background:"rgba(6,182,212,0.12)", color:C.cyan, fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", letterSpacing:"0.15em" }}
                  >
                    Most Common
                  </span>
                )}
                <div className="flex items-start justify-between mb-4">
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.75rem", letterSpacing:"0.12em", color: model.highlight ? "rgba(6,182,212,0.5)" : C.slate }}>
                    {model.phase}
                  </span>
                  <span style={{ fontSize:"1.2rem", color:model.accent, opacity:0.7 }}>{model.icon}</span>
                </div>
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:"clamp(1.2rem,1.8vw,1.5rem)", textTransform:"uppercase", color: model.highlight ? C.coolWhite : C.navy, lineHeight:1.05, letterSpacing:"0.02em" }}>
                  {model.title}
                </h3>
                <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", color: model.highlight ? "rgba(6,182,212,0.55)" : C.slate, marginTop:"4px", marginBottom:"0" }}>
                  {model.subtitle}
                </p>
                <div className="flex items-center gap-3 my-4">
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.88rem", color:model.accent, letterSpacing:"0.05em", fontWeight:700 }}>{model.range}</span>
                  <span style={{ color: model.highlight ? "rgba(255,255,255,0.15)" : C.borderLight, fontSize:"0.8rem" }}>·</span>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.82rem", color: model.highlight ? "rgba(240,244,255,0.35)" : C.slate, letterSpacing:"0.05em" }}>{model.timeline}</span>
                </div>
                <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.9rem,1.3vw,1rem)", lineHeight:1.65, color: model.highlight ? "rgba(240,244,255,0.5)" : C.slate, marginBottom:"20px" }}>
                  {model.desc}
                </p>
                <div className="flex flex-col gap-2 pt-4" style={{ borderTop: model.highlight ? "1px solid rgba(255,255,255,0.07)" : `1px solid ${C.borderLight}` }}>
                  {model.bullets.map((b,j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor:model.accent }}/>
                      <span style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.85rem,1.1vw,0.95rem)", color: model.highlight ? "rgba(240,244,255,0.45)" : C.slate }}>
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
                {(model as any).outcome && (
                  <div className="mt-5 pt-4" style={{ borderTop: model.highlight ? "1px solid rgba(255,255,255,0.07)" : `1px solid ${C.borderLight}` }}>
                    <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.12em", textTransform:"uppercase", color: model.highlight ? "rgba(6,182,212,0.55)" : model.accent, marginBottom:"8px" }}>What You Get</p>
                    <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.85rem,1.1vw,0.95rem)", lineHeight:1.6, color: model.highlight ? "rgba(240,244,255,0.55)" : C.slate, fontStyle:"italic" }}>
                      {(model as any).outcome}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Service Detail ──────────────────────────────────────────────────────────────
function ServiceDetailSection() {
  return (
    <section id="services" style={{ backgroundColor:C.coolWhite }} className="py-24 lg:py-36">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16">
          <div className="lg:w-1/2 reveal">
            <span className="section-label mb-6 inline-flex" style={{ color:C.slate, borderColor:"rgba(10,22,40,0.18)", fontFamily:"'Space Mono',monospace" }}>
              Our Services
            </span>
            <h2 className="font-display mt-4"
              style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(2.5rem,5vw,5.5rem)", lineHeight:0.92, textTransform:"uppercase" }}
            >
              <span style={{ color:C.navy }}>Modular.</span>
              <br/>
              <span style={{ color:C.navy }}>Scoped.</span>
              <br/>
              <span style={{ background:`linear-gradient(135deg, ${C.blue} 0%, ${C.cyan} 100%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Delivered Fast.</span>
            </h2>
          </div>
          <div className="lg:w-1/2 flex items-end reveal">
            <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.95rem,1.4vw,1.1rem)", lineHeight:1.7, color:C.slate }}>
              Each service is independently scoped and priced. Start with a Diagnostic, add what you need, and govern what you've built.
            </p>
          </div>
        </div>

        <div className="border-t" style={{ borderColor:C.borderLight }}>
          {SERVICES.map((service,i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 py-6 border-b group px-2 transition-all duration-200 reveal"
              style={{ borderColor:C.borderLight, transitionDelay:`${i*0.05}s` }}
              onMouseEnter={e=>(e.currentTarget.style.backgroundColor=`${service.accent}08`)}
              onMouseLeave={e=>(e.currentTarget.style.backgroundColor="transparent")}
            >
              <div className="sm:w-8 shrink-0">
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.75rem", color:"rgba(10,22,40,0.22)", letterSpacing:"0.08em" }}>
                  {String(i+1).padStart(2,"0")}
                </span>
              </div>
              <div className="sm:w-56 shrink-0 flex items-center gap-3">
                <div className="w-1 h-8 shrink-0 transition-all duration-300 group-hover:h-10" style={{ backgroundColor:service.accent }}/>
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"clamp(1rem,1.5vw,1.15rem)", textTransform:"uppercase", color:C.navy, letterSpacing:"0.03em" }}>
                  {service.name}
                </h3>
              </div>
              <div className="flex-1">
                <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(1rem,1.5vw,1.1rem)", lineHeight:1.65, color:C.slate }}>
                  {service.desc}
                </p>
              </div>
              <div className="hidden sm:flex sm:w-16 shrink-0 items-center justify-end">
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color:service.accent }}/>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}


// ─── Case Studies ─────────────────────────────────────────────────────────────
function CaseStudiesSection() {
  const [active, setActive] = useState(-1);

  const cases = [
    {
      tag: "Hardware IP",
      tagColor: C.cyan,
      company: "Arm",
      logo: `${CDN}/arm_bc84b1a2.png`,
      industry: "Hardware IP · Software",
      summary: "Designed and implemented CRM architecture, data governance frameworks, and process automation workflows for Arm's global revenue organization in Salesforce — supporting a complex, multi-segment enterprise sales motion with the precision and auditability a publicly traded hardware IP company requires.",
      capabilities: ["Data & Analytics", "CRM", "Platform Management", "Process Optimization & Automation", "Technical Project Management"],
    },
    {
      tag: "Business Intelligence",
      tagColor: C.blue,
      company: "Tableau",
      logo: `${CDN}/tableau_e6884b58.png`,
      industry: "Business Intelligence · Software",
      summary: "Built and maintained the GTM execution infrastructure for Tableau's enterprise revenue organization — including CRM architecture in Salesforce, pipeline analytics, multi-touch attribution, and data governance workflows that supported a high-velocity enterprise sales motion.",
      capabilities: ["Data & Analytics", "CRM", "Platform Management", "Process Optimization & Automation", "Technical Project Management"],
    },
    {
      tag: "Healthcare",
      tagColor: C.amber,
      company: "Kaiser Permanente",
      logo: `${CDN}/kaiser_b658bd57.png`,
      industry: "Healthcare · Insurance",
      summary: "Delivered multi-year GTM operations support for Kaiser Permanente's marketing and revenue teams — rebuilding CRM data management workflows, improving campaign execution infrastructure, and standardizing reporting across one of the nation's largest integrated health systems.",
      capabilities: ["Data & Analytics", "CRM", "Platform Management", "Process Optimization & Automation"],
    },
    {
      tag: "Private Equity",
      tagColor: C.emerald,
      company: "Vista Equity Partners",
      logo: `${CDN}/vistaequity_76c9c257.png`,
      industry: "Private Equity · Financial Services",
      summary: "Delivered multi-year GTM operations and RevOps infrastructure support across the GTM motion — implementing CRM governance, pipeline reporting standardization, data visualization, and execution workflow automation.",
      capabilities: ["Workflow Optimization", "CRM Data Workflows", "Embedded RevOps", "Process Optimization & Automation"],
    },
    {
      tag: "Advisory Services",
      tagColor: C.violet,
      company: "GLG",
      logo: `${CDN}/glg_41f93ce3.png`,
      industry: "Advisory · Business Services",
      summary: "Rebuilt GLG's CRM data model and sales process automation in Salesforce, standardizing pipeline workflows and marketing attribution across a complex, multi-segment advisory business. Delivered consistent pipeline reporting and reduced manual RevOps overhead across the revenue organization.",
      capabilities: ["Data & Analytics", "CRM", "Platform Management", "Process Optimization & Automation", "Workforce Management"],
    },
    {
      tag: "B2B SaaS",
      tagColor: C.amber,
      company: "Workfront",
      logo: `${CDN}/adobe_91073938.png`,
      industry: "Project Management · Software (Adobe)",
      summary: "Stabilized Workfront's GTM operations infrastructure following an Adobe acquisition and organizational restructuring. Rebuilt platform management workflows, automated key revenue processes, and re-established execution priorities — maintaining operational continuity through a period of significant organizational change.",
      capabilities: ["Data & Analytics", "CRM", "Platform Management", "Process Optimization & Automation", "Technical Project Management", "Workforce Management"],
    },
    {
      tag: "Enterprise Telecom",
      tagColor: C.cyan,
      company: "Comcast",
      logo: `${CDN}/comcast_b8d73a21.png`,
      industry: "Telecommunications · Enterprise",
      summary: "Deployed GTM operations infrastructure for Comcast's enterprise revenue teams — including CRM workflow automation, multi-channel sales process standardization, and pipeline data governance across a complex, high-volume sales motion. Maintained execution velocity at enterprise scale.",
      capabilities: ["Data & Analytics", "CRM", "Platform Management", "Process Optimization & Automation"],
    },
    {
      tag: "B2B SaaS",
      tagColor: C.blue,
      company: "Talend",
      logo: null,
      industry: "Data Integration · B2B Software",
      summary: "Delivered ongoing GTM operations support for Talend's revenue organization — rebuilding CRM logic, standardizing pipeline reporting in Salesforce, and automating execution workflows across Marketing and RevOps. Aligned the go-to-market infrastructure with the precision a data integration software company requires.",
      capabilities: ["Data & Analytics", "Platform Management", "Process Optimization & Automation"],
    },
    {
      tag: "High-Growth CPG",
      tagColor: C.violet,
      company: "Impossible Foods",
      logo: `${CDN}/impossible_cc6344d0.png`,
      industry: "Consumer Goods · High-Growth",
      summary: "Built the CRM architecture, channel sales data workflows, and marketing automation infrastructure that supported Impossible Foods' rapid expansion into new retail and foodservice markets. Deployed process automation and analytics that scaled execution capacity without proportional headcount growth.",
      capabilities: ["Data & Analytics", "CRM", "Platform Management", "Process Optimization & Automation"],
    },
    {
      tag: "EdTech",
      tagColor: C.cyan,
      company: "DigiPen IOT",
      logo: null,
      industry: "Education Technology",
      summary: "Rebuilt the marketing operations and CRM infrastructure supporting student recruitment and onboarding workflows. Standardized data management, automated campaign execution, and improved platform governance — reducing manual operations overhead and improving enrollment funnel visibility.",
      capabilities: ["Data & Analytics", "Platform Management", "Workforce Management"],
    },
    {
      tag: "AdTech",
      tagColor: C.amber,
      company: "The Trade Desk",
      logo: `${CDN}/tradedesk_400df714.png`,
      industry: "Programmatic Advertising · Public",
      summary: "Opsforce.ai embedded into The Trade Desk's GTM operations and rebuilt CRM data workflows, campaign automation logic, and pipeline analytics infrastructure in Salesforce and Tableau. Delivered a governed execution layer that allowed a high-growth public company to scale revenue operations without adding proportional headcount.",
      capabilities: ["Data & Analytics", "CRM", "Platform Management", "Process Optimization & Automation", "Technical Project Management"],
    },
  ];

  const prev = () => setActive(a => (a <= 0 ? 0 : a - 1));
  const next = () => setActive(a => (a + 1) % cases.length);
  const c = active >= 0 ? cases[active] : null;

  return (
    <section id="case-studies" className="py-24 lg:py-36 relative overflow-hidden" style={{ backgroundColor:C.navy }}>
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background:`radial-gradient(ellipse at 70% 40%, rgba(37,99,235,0.07) 0%, transparent 60%)` }}/>
      <div className="container relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-16 reveal">
          <div className="lg:w-1/2">
            <span className="section-label mb-6 inline-flex" style={{ color:C.cyan, borderColor:"rgba(6,182,212,0.3)", fontFamily:"'Space Mono',monospace" }}>
              Client Results
            </span>
            <h2 className="font-display mt-4"
              style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(2.5rem,5vw,5.5rem)", lineHeight:0.92, textTransform:"uppercase" }}
            >
              <span style={{ color:"#fff" }}>Embedded Experts.</span>
              <br/>
              <span style={{ color:"#fff" }}>Restored Velocity.</span>
              <br/>
              <span style={{ color:C.amber }}>At Scale.</span>
            </h2>
          </div>
          <div className="lg:w-1/2 flex items-end reveal">
            <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"1.575rem", lineHeight:1.7, color:"rgba(255,255,255,0.55)" }}>
              From high-growth consumer brands to public enterprise software companies — here is what we have built and shipped.
            </p>
          </div>
        </div>

        {/* Auto-scrolling horizontal carousel */}
        <div className="reveal" style={{ position:"relative" }}>
          {/* Fade edges */}
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"80px", background:`linear-gradient(90deg, ${C.navy}, transparent)`, zIndex:10, pointerEvents:"none" }}/>
          <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"80px", background:`linear-gradient(270deg, ${C.navy}, transparent)`, zIndex:10, pointerEvents:"none" }}/>

          <div
            className="case-scroll-track"
            style={{ display:"flex", gap:"20px", overflowX:"auto", scrollbarWidth:"none", msOverflowStyle:"none", paddingBottom:"4px", cursor:"grab" }}
            onMouseDown={e => {
              const el = e.currentTarget;
              el.style.cursor = "grabbing";
              const startX = e.pageX - el.offsetLeft;
              const scrollLeft = el.scrollLeft;
              const onMove = (ev: MouseEvent) => { el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX); };
              const onUp = () => { el.style.cursor = "grab"; window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
          >
            {cases.map((card, i) => (
              <div
                key={i}
                onClick={() => setActive(prev => prev === i ? -1 : i)}
                style={{
                  flexShrink: 0,
                  width: "340px",
                  backgroundColor: i === active ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${i === active ? card.tagColor + "55" : "rgba(255,255,255,0.08)"}`,
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  transform: i === active ? "translateY(-4px) scale(1.015)" : "translateY(0) scale(1)",
                  boxShadow: i === active ? `0 12px 40px ${card.tagColor}22` : "0 2px 8px rgba(10,22,40,0.06)",
                }}
                onMouseEnter={e => {
                  if (i !== active) {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px) scale(1.008)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${card.tagColor}22`;
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${card.tagColor}44`;
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.06)";
                  }
                }}
                onMouseLeave={e => {
                  if (i !== active) {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.03)";
                  }
                }}
              >
                {/* Top accent bar */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg, ${card.tagColor}, transparent)` }}/>
                <div style={{ padding:"28px 24px 24px" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.1em", textTransform:"uppercase", color:card.tagColor, border:`1px solid ${card.tagColor}33`, padding:"4px 10px", display:"inline-block" }}>
                      {card.tag}
                    </span>
                    {/* logo removed */}
                  </div>
                  <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(1.3rem,2vw,1.6rem)", textTransform:"uppercase", color:"#fff", lineHeight:1, marginBottom:"4px" }}>
                    {card.company}
                  </h3>
                  <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.78rem", letterSpacing:"0.08em", color:"rgba(240,244,255,0.85)", marginBottom:"12px" }}>
                  {card.industry}
                  </p>
                  <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.95rem,1.3vw,1.05rem)", lineHeight:1.65, color:"rgba(255,255,255,0.55)", display:"-webkit-box", WebkitLineClamp:4, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                    {card.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5" style={{ marginTop:"20px", paddingTop:"16px", borderTop:`1px solid rgba(255,255,255,0.07)` }}>
                    {card.capabilities.map((cap, j) => (
                      <span key={j} style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.68rem", letterSpacing:"0.06em", textTransform:"uppercase", color:card.tagColor, background:`${card.tagColor}0d`, border:`1px solid ${card.tagColor}22`, padding:"4px 9px" }}>
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint row */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-2">
              {cases.map((card, i) => (
                <div key={i} style={{ width: i === active ? "20px" : "5px", height:"4px", borderRadius:"2px", background: i === active ? card.tagColor : "rgba(255,255,255,0.15)", transition:"all 0.3s ease", cursor:"pointer" }} onClick={() => setActive(active === i ? -1 : i)} />
              ))}
            </div>
            <p style={{ fontFamily:"'Space Mono',monospace",fontSize:"0.72rem", letterSpacing:"0.1em", color:"rgba(255,255,255,0.9)", textTransform:"uppercase" }}>
              Click a card to expand
            </p>
          </div>

          {/* Expanded detail panel */}
          {active >= 0 && (
            <div className="mt-6 animate-fade-up" style={{ backgroundColor:"rgba(255,255,255,0.04)", border:`1px solid ${cases[active].tagColor}44`, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg, ${cases[active].tagColor}, transparent)` }}/>
              <div className="p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-14">
                <div className="flex-1">
                  <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:"12px" }}>Full Summary</p>
                  <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(1rem,1.4vw,1.1rem)", lineHeight:1.8, color:"rgba(255,255,255,0.75)" }}>
                    {cases[active].summary}
                  </p>
                </div>
                <div className="lg:w-64">
                  <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:"12px" }}>Capabilities Delivered</p>
                  <div className="flex flex-wrap gap-2">
                    {cases[active].capabilities.map((cap, j) => (
                      <span key={j} style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.68rem", letterSpacing:"0.07em", textTransform:"uppercase", color:cases[active].tagColor, background:`${cases[active].tagColor}15`, border:`1px solid ${cases[active].tagColor}35`, padding:"5px 11px" }}>
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* hidden prev/next for state compat */}
          <div style={{ display:"none" }}>
            <button onClick={prev} aria-label="Previous" />
            <button onClick={next} aria-label="Next" />
          </div>
        </div>
      </div>
    </section>
  );
}

// TestimonialSection removed pending approval

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="contact" className="relative py-24 lg:py-36 overflow-hidden" style={{ backgroundColor:C.navyDeep }}>
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage:`url(${CTA_BG})`, backgroundSize:"cover", backgroundPosition:"center" }}/>
      <div className="absolute inset-0" style={{ background:`linear-gradient(135deg, rgba(7,15,30,0.97) 0%, rgba(7,15,30,0.80) 60%, rgba(7,15,30,0.95) 100%)` }}/>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none" style={{ background:`radial-gradient(ellipse at top right, rgba(245,158,11,0.12) 0%, transparent 65%)` }}/>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 pointer-events-none" style={{ background:`radial-gradient(ellipse at bottom left, rgba(124,58,237,0.1) 0%, transparent 65%)` }}/>
      <div className="absolute inset-0 pointer-events-none" style={{ background:`radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.08) 0%, transparent 60%)` }}/>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-1/2 reveal">
            <span className="section-label mb-6 inline-flex" style={{ color:C.amber, borderColor:"rgba(245,158,11,0.35)", fontFamily:"'Space Mono',monospace" }}>
              Let's Talk
            </span>
            <h2 className="font-display mt-4 mb-6"
              style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(2rem,4vw,4.5rem)", lineHeight:0.92, textTransform:"uppercase", color:C.coolWhite }}
            >
              <span style={{ color:C.coolWhite }}>The Competitive</span>
              <br/>
              <span style={{ color:C.coolWhite }}>Moat Is Not</span>
              <br/>
              <span style={{ color:C.coolWhite }}>The AI Tool You Buy.</span>
              <br/>
              <span style={{ color:C.amber }}>It's The Logic</span>
              <br/>
              <span style={{ color:C.amber }}>You Own.</span>
            </h2>
            <p className="mb-10 max-w-md" style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.95rem,1.4vw,1.1rem)", lineHeight:1.7, color:"rgba(240,244,255,0.45)" }}>
              In 2026, all leaders have a mandate. The organizations that will win are those with the most defensible execution infrastructure. The window to build that infrastructure is closing.
            </p>

            {/* Trust signals */}
            <div className="flex flex-col gap-6 mt-2">
              {[
                { stat:"30 min",  label:"Free discovery call — no pitch, no deck." },
                { stat:"4–6 wk",  label:"Diagnostic to board-ready roadmap." },
                { stat:"100%",    label:"Operator-led. We build what we recommend." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5">
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(1.6rem,2.5vw,2rem)", color:C.amber, lineHeight:1, minWidth:"72px" }}>
                    {item.stat}
                  </span>
                  <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.95rem,1.3vw,1.05rem)", color:"rgba(240,244,255,0.5)", lineHeight:1.55, paddingTop:"4px" }}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="mt-10 pt-8" style={{ borderTop:"1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.88rem,1.2vw,0.95rem)", color:"rgba(240,244,255,0.28)", lineHeight:1.65, fontStyle:"italic" }}>
                "The organizations that win in 2026 won't be the ones that bought the most AI. They'll be the ones that built the most defensible execution logic."
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 reveal" id="contact-form">
            <div className="relative overflow-hidden" style={{ backgroundColor:"rgba(255,255,255,0.03)", border:`1px solid rgba(255,255,255,0.08)` }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:`linear-gradient(90deg, ${C.amber}, ${C.blue}, ${C.cyan})` }}/>
              <iframe
                src="https://meetings-na2.hubspot.com/revopsforce/website-schedular?embed=true"
                title="Book a Discovery Call"
                style={{ width:"100%", minHeight:"680px", border:"none", display:"block" }}
                allow="camera; microphone; fullscreen"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              {[
                { label:"Email",         value:"hello@opsforce.ai", href:"mailto:hello@opsforce.ai" },
                { label:"Response Time", value:"Within hours" },
                { label:"First Call",    value:"Free Discovery" },
              ].map((item,i) => (
                <div key={i}>
                  <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.1em", color:"rgba(240,244,255,0.9)", textTransform:"uppercase" }}>
                    {item.label}
                  </p>
                  {'href' in item ? (
                    <a href={(item as {href:string}).href} style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(1rem,1.4vw,1.1rem)", color:"rgba(240,244,255,0.6)", marginTop:"2px", display:"block", textDecoration:"none" }}
                      onMouseEnter={e=>(e.currentTarget.style.color="rgba(245,158,11,0.9)")}
                      onMouseLeave={e=>(e.currentTarget.style.color="rgba(240,244,255,0.6)")}>
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(1rem,1.4vw,1.1rem)", color:"rgba(240,244,255,0.6)", marginTop:"2px" }}>
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What does Opsforce.ai do?",
    a: "Opsforce.ai is a go-to-market operations services firm. We design, build, and govern the data, workflows, and systems inside enterprise GTM environments — the execution layer that determines whether AI agents, automation, and revenue strategies actually work in production."
  },
  {
    q: "Who is Opsforce.ai for?",
    a: "Opsforce.ai works with enterprise B2B companies — typically with $50M+ in revenue — where the GTM execution layer is a constraint on growth. Our clients include PE-backed SaaS companies under board mandate, high-growth public companies scaling without operational debt, and enterprise organizations deploying AI agents into revenue workflows."
  },
  {
    q: "How is Opsforce different from a RevOps consultant or a systems integrator?",
    a: "Traditional RevOps consultants produce strategy and recommendations. Systems integrators configure tools. Opsforce.ai does both — and then governs the result. We embed directly into client environments, implement the changes, and ensure the systems don't degrade after we leave. We are operators, not advisors."
  },
  {
    q: "What is GTM execution?",
    a: "GTM execution is the operational layer of a go-to-market organization — the workflows, data structures, system logic, and governance rules that determine how leads are routed, how pipeline is measured, how campaigns are launched, and how agents are deployed. GTM execution is distinct from GTM strategy: strategy defines what to do; execution determines whether it actually happens."
  },
  {
    q: "Why do AI agent deployments fail in GTM environments?",
    a: "GTM agent deployments fail because of data, workflow, and governance problems — not because of the model. Agents require clean, structured, and consistently defined data to operate reliably. They require clearly defined workflow logic to know what to do and when. And they require governance structures to prevent logic drift and ensure auditability. Most GTM environments lack all three."
  },
  {
    q: "What systems does Opsforce.ai work with?",
    a: "Opsforce.ai works across the enterprise GTM stack — including Salesforce, HubSpot, Microsoft Dynamics 365, Marketo, Pardot, Braze, Outreach, Salesloft, Gong, ZoomInfo, Clearbit, Clay, 6sense, Demandbase, Tableau, Looker, Power BI, Workato, Zapier, Make, Gainsight, and ChurnZero. We are technology-agnostic and work within the client's existing stack."
  },
  {
    q: "What does a typical Opsforce engagement look like?",
    a: "Opsforce.ai engagements are project-based and structured in 30-day sprints. Most engagements begin with a GTM Diagnostic — a structured audit of the execution layer — followed by a scoped implementation project. Ongoing governance is available as a retainer engagement. Engagements range from targeted automation sprints ($20K) to full execution layer buildouts."
  },
  {
    q: "What is the Opsforce Execution Method?",
    a: "The Opsforce Execution Method is a four-phase framework for GTM systems work: Scope (discovery and prioritization), Architect & Build (implementation), Govern (monitoring and logic governance), and Expand (agent deployment and capability extension). Each phase is delivered in documented, testable increments that the client owns at handoff."
  },
  {
    q: "Does Opsforce.ai deploy AI agents?",
    a: "Yes. Agent deployment is one of the eight core capabilities Opsforce.ai delivers. We design, build, and deploy governed agents for lead scoring, pipeline enrichment, outreach personalization, and revenue forecasting — integrated directly into the client's CRM and marketing automation workflows. Agent deployment is only viable on a clean data and governance foundation, which is why we build that first."
  },
  {
    q: "What is GTM governance?",
    a: "GTM governance is the set of ownership rules, validation controls, monitoring systems, and accountability structures that prevent GTM systems from degrading after implementation. Without active governance, logic drifts, data degrades, and agents fail. Opsforce.ai provides ongoing governance as a retainer service and embeds governance controls into every implementation."
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="faq" className="py-20 lg:py-28" style={{ backgroundColor:C.coolWhite }}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 reveal">
            <span className="section-label mb-4 inline-flex" style={{ color:C.blue, borderColor:"rgba(37,99,235,0.3)", fontFamily:"'Space Mono',monospace" }}>Frequently Asked Questions</span>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(2rem,4vw,3.5rem)", lineHeight:0.95, textTransform:"uppercase", color:C.navy, marginTop:"1rem" }}>
              What You Need to Know
            </h2>
            <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.95rem,1.4vw,1.05rem)", lineHeight:1.7, color:C.slate, marginTop:"1rem" }}>
              Answers to the most common questions about Opsforce.ai, GTM execution, and agent deployment.
            </p>
          </div>
          <div className="flex flex-col gap-0 reveal">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderBottom:`1px solid ${C.borderLight}` }}>
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full text-left flex items-start justify-between gap-4 py-5"
                  style={{ background:"none", border:"none", cursor:"pointer" }}
                  aria-expanded={openIdx === i}
                >
                  <span style={{ fontFamily:"'Barlow',sans-serif", fontWeight:700, fontSize:"clamp(0.95rem,1.4vw,1.05rem)", color:C.navy, lineHeight:1.4 }}>
                    {item.q}
                  </span>
                  <span style={{ color:openIdx === i ? C.blue : C.slate, flexShrink:0, marginTop:"2px", fontSize:"1.2rem", fontWeight:300 }}>
                    {openIdx === i ? "−" : "+"}
                  </span>
                </button>
                {openIdx === i && (
                  <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.9rem,1.3vw,1rem)", lineHeight:1.75, color:C.slate, paddingBottom:"20px", paddingRight:"2rem" }}>
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Definitional Glossary ────────────────────────────────────────────────────
const GLOSSARY_TERMS = [
  { term:"GTM Execution", def:"The operational layer of a go-to-market organization — the workflows, data structures, system logic, and governance rules that determine whether strategy is actually carried out. GTM execution is distinct from GTM strategy: strategy defines what to do; execution determines whether it happens." },
  { term:"GTM Execution Layer", def:"The interconnected system of CRM logic, workflow automation, data pipelines, and governance rules that governs how a go-to-market organization operates. The GTM execution layer is the foundation that agent deployment, pipeline reporting, and revenue forecasting depend on." },
  { term:"Agent Deployment (GTM)", def:"The design, build, and production deployment of governed automation agents into live revenue workflows. GTM agent deployment includes lead scoring agents, pipeline enrichment agents, outreach personalization agents, and revenue forecasting agents — integrated into CRM and marketing automation platforms." },
  { term:"GTM Governance", def:"The set of ownership rules, validation controls, monitoring systems, and accountability structures that prevent GTM systems from degrading after implementation. GTM governance includes lifecycle stage enforcement, field validation, logic monitoring, and change management controls." },
  { term:"Data Layer (GTM)", def:"The CRM data model, deduplication logic, enrichment workflows, and source-of-truth configuration that pipeline reporting and agent deployment depend on. A clean, governed data layer is the prerequisite for reliable GTM execution and agent deployment." },
  { term:"Workflow Architecture", def:"The design and implementation of the logic that governs how work moves through a GTM system — including lead routing, handoff rules, SLA enforcement, and lifecycle stage transitions. Workflow architecture is the structural layer between strategy and execution." },
  { term:"Revenue Signal System", def:"The analytics infrastructure that translates buyer behavior into leading indicators — including multi-touch attribution models, pipeline generation dashboards, and forecasting inputs — that finance and leadership can act on." },
  { term:"GTM Operations", def:"The function responsible for designing, implementing, and governing the systems, data, and workflows that enable a go-to-market organization to execute reliably. GTM operations includes RevOps, marketing operations, sales operations, and customer success operations." },
];

function GlossarySection() {
  return (
    <section id="glossary" className="py-16 lg:py-20" style={{ backgroundColor:C.offWhite }}>
      <div className="container">
        <div className="mb-10 reveal">
          <span className="section-label mb-4 inline-flex" style={{ color:C.violet, borderColor:"rgba(124,58,237,0.3)", fontFamily:"'Space Mono',monospace" }}>Definitions</span>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(1.8rem,3.5vw,3rem)", lineHeight:0.95, textTransform:"uppercase", color:C.navy, marginTop:"0.75rem" }}>
            GTM Execution Glossary
          </h2>
          <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.9rem,1.3vw,1rem)", lineHeight:1.7, color:C.slate, marginTop:"0.75rem", maxWidth:"560px" }}>
            Precise definitions of the terms that matter most in GTM operations, agent deployment, and execution layer design.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
          {GLOSSARY_TERMS.map((g, i) => (
            <div key={i} style={{ background:C.coolWhite, border:`1px solid ${C.borderLight}`, padding:"24px 28px" }}>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.1em", textTransform:"uppercase", color:C.violet, marginBottom:"8px" }}>Definition</p>
              <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(1.1rem,1.8vw,1.35rem)", textTransform:"uppercase", color:C.navy, marginBottom:"10px", lineHeight:1.1 }}>
                {g.term}
              </h3>
              <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.85rem,1.2vw,0.95rem)", lineHeight:1.7, color:C.slate }}>
                {g.def}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Mid-Page CTA ────────────────────────────────────────────────────────────
function MidPageCTA() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" style={{ background:`linear-gradient(135deg, #0a1628 0%, #0f1f3d 50%, #0a1628 100%)` }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)", backgroundSize:"60px 60px" }}/>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px" style={{ background:`linear-gradient(90deg, transparent, ${C.amber}, transparent)` }}/>
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label mb-6 inline-flex" style={{ color:C.amber, borderColor:"rgba(245,158,11,0.35)", fontFamily:"'Space Mono',monospace" }}>Ready to talk?</span>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(2.5rem,5vw,4.5rem)", lineHeight:0.92, textTransform:"uppercase", color:C.coolWhite, marginTop:"1rem" }}>
            Map Your Logic Leaks in a{" "}
            <span style={{ background:`linear-gradient(135deg, ${C.amber} 0%, #FCD34D 100%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>30-Minute Diagnostic.</span>
          </h2>
          <p className="mt-5 mb-10" style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.95rem,1.4vw,1.1rem)", lineHeight:1.7, color:"rgba(240,244,255,0.5)" }}>
            We'll map your biggest GTM execution gap, show you what it's costing you, and advise how we'd fix it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-9 py-4 text-sm font-bold whitespace-nowrap transition-all duration-300"
              style={{ background:`linear-gradient(135deg, ${C.amber} 0%, ${C.amberDark} 100%)`, color:C.navy, fontFamily:"'Barlow',sans-serif", fontWeight:800, letterSpacing:"0.05em", textTransform:"uppercase", fontSize:"0.82rem", boxShadow:`0 4px 32px rgba(245,158,11,0.4)` }}
              onMouseEnter={e=>(e.currentTarget.style.boxShadow=`0 6px 40px rgba(245,158,11,0.6)`)}
              onMouseLeave={e=>(e.currentTarget.style.boxShadow=`0 4px 32px rgba(245,158,11,0.4)`)}
            >
              Book a Discovery Call <ArrowRight size={15}/>
            </a>
            <a href="#services"
              className="inline-flex items-center gap-2 px-9 py-4 text-sm font-medium border whitespace-nowrap transition-all duration-200"
              style={{ color:C.coolWhite, borderColor:"rgba(240,244,255,0.2)", fontFamily:"'Barlow',sans-serif", letterSpacing:"0.03em", fontSize:"0.88rem" }}
              onMouseEnter={e=>(e.currentTarget.style.backgroundColor="rgba(255,255,255,0.07)")}
              onMouseLeave={e=>(e.currentTarget.style.backgroundColor="transparent")}
            >
              View Engagement Models <ArrowUpRight size={15}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ backgroundColor:"#050C18", borderTop:`1px solid ${C.border}` }} className="py-16">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-12">
          <div className="lg:w-1/3">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663500125074/S6vDgqwvNTJhbK5iDVG3QD/opsforce-logo-icon_d0931d43.png" alt="Opsforce.ai" style={{ height:"28px", width:"auto" }}/>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"1.1rem", letterSpacing:"0.08em", color:C.coolWhite, textTransform:"uppercase" }}>OPSFORCE.AI</span>
            </div>
            <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.9rem,1.3vw,1rem)", lineHeight:1.65, color:C.coolWhite }}>
              The GTM execution team for the agentic era. Designed, built, and governed by operators who've run it at scale.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <a href="mailto:hello@opsforce.ai"
                style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(0.9rem,1.3vw,1rem)", color:C.coolWhite, textDecoration:"none" }}
                onMouseEnter={e=>(e.currentTarget.style.color=C.amber)}
                onMouseLeave={e=>(e.currentTarget.style.color=C.coolWhite)}
              >
                hello@opsforce.ai
              </a>
              <a
                href="https://www.linkedin.com/company/opsforceai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Opsforce.ai on LinkedIn"
                style={{ color:"rgba(240,244,255,0.4)", display:"flex", alignItems:"center", transition:"color 0.2s" }}
                onMouseEnter={e=>(e.currentTarget.style.color=C.coolWhite)}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(240,244,255,0.4)")}
              >
                <Linkedin size={18}/>
              </a>
            </div>
          </div>

          <div className="lg:w-1/4">
            <p className="font-label mb-5" style={{ color:"rgba(240,244,255,0.2)", fontFamily:"'Space Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.12em" }}>Services</p>
            <div className="flex flex-col gap-3">
              {["GTM Diagnostic","Pipeline Integrity","Revenue Signal System","Agent-Ready Infrastructure","Execution Performance","Execution Continuity"].map((s) => (
                <a key={s} href="#services"
                  style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(1rem,1.4vw,1.05rem)", color:"rgba(240,244,255,0.4)", textDecoration:"none" }}
                  onMouseEnter={e=>(e.currentTarget.style.color=C.coolWhite)}
                  onMouseLeave={e=>(e.currentTarget.style.color="rgba(240,244,255,0.4)")}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:w-1/4">
            <p className="font-label mb-5" style={{ color:"rgba(240,244,255,0.2)", fontFamily:"'Space Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.12em" }}>Company</p>
            <div className="flex flex-col gap-3">
              {["How We Work","Case Studies","Contact"].map((s) => (
                <a key={s} href={`#${s.toLowerCase().replace(/ /g,"-")}`}
                  style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(1rem,1.4vw,1.05rem)", color:"rgba(240,244,255,0.4)", textDecoration:"none" }}
                  onMouseEnter={e=>(e.currentTarget.style.color=C.coolWhite)}
                  onMouseLeave={e=>(e.currentTarget.style.color="rgba(240,244,255,0.4)")}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:w-1/4">
            <p className="font-label mb-5" style={{ color:"rgba(240,244,255,0.2)", fontFamily:"'Space Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.12em" }}>Get Started</p>
            <a href="#contact" onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all duration-200"
              style={{ background:`linear-gradient(135deg, ${C.amber}, ${C.amberDark})`, color:C.navy, fontFamily:"'Barlow',sans-serif", fontWeight:700, fontSize:"0.88rem", letterSpacing:"0.05em", textTransform:"uppercase" }}
              onMouseEnter={e=>(e.currentTarget.style.boxShadow=`0 4px 20px rgba(245,158,11,0.4)`)}
              onMouseLeave={e=>(e.currentTarget.style.boxShadow="none")}
            >
              Book Discovery <ArrowRight size={14}/>
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop:`1px solid rgba(255,255,255,0.05)` }}>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.72rem", color:"rgba(240,244,255,0.2)", letterSpacing:"0.07em" }}>
            © 2026 RevOps, LLC. All rights reserved. Operating as Opsforce.ai.
          </p>
          <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
            <a href="/privacy" style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.72rem", color:"rgba(240,244,255,0.35)", letterSpacing:"0.07em", textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e=>(e.currentTarget.style.color="rgba(240,244,255,0.7)")}
              onMouseLeave={e=>(e.currentTarget.style.color="rgba(240,244,255,0.35)")}>
              Privacy Policy
            </a>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.72rem", color:"rgba(240,244,255,0.2)", letterSpacing:"0.07em", margin:0 }}>
              GTM Operations Partner for the Agentic Era
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Sticky CTA Bar ──────────────────────────────────────────────────────────
function StickyCTABar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(pct > 0.65 && !dismissed);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: "rgba(10,22,40,0.97)",
        backdropFilter: "blur(12px)",
        borderTop: `1px solid rgba(245,158,11,0.25)`,
        transform: visible ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <div className="container flex items-center justify-between py-3 gap-3">
        <div className="hidden md:flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor:C.amber }}/>
          <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:"clamp(1rem,1.4vw,1.1rem)", color:"rgba(240,244,255,0.7)", fontWeight:500 }}>
            Your competitors are already deploying AI. <span style={{ color:C.coolWhite, fontWeight:600 }}>The window to build defensible infrastructure is closing.</span>
          </p>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <a href="#contact" onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-all duration-200"
            style={{ background:`linear-gradient(135deg, ${C.amber} 0%, ${C.amberDark} 100%)`, color:C.navy, fontFamily:"'Barlow',sans-serif", fontWeight:800, letterSpacing:"0.04em", textTransform:"uppercase", fontSize:"0.78rem" }}
            onMouseEnter={e=>(e.currentTarget.style.boxShadow=`0 0 20px rgba(245,158,11,0.5)`)}
            onMouseLeave={e=>(e.currentTarget.style.boxShadow="none")}
          >
            Get in Touch <ArrowRight size={13}/>
          </a>
          <button
            onClick={() => { setDismissed(true); setVisible(false); }}
            style={{ color:"rgba(240,244,255,0.3)", background:"none", border:"none", cursor:"pointer", padding:"4px", fontSize:"1rem", lineHeight:1 }}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Trust Strip ─────────────────────────────────────────────────────────────
function TrustStrip() {
  const stats = [
    { val:"50+",   label:"Enterprise Clients",      color: C.amber },
    { val:"200+",  label:"GTM Systems Deployed",    color: C.cyan },
    { val:"$2B+",  label:"Revenue Influenced",      color: C.violet },
    { val:"100+",  label:"Tech Partners",           color: C.emerald },
  ];
  return (
    <div style={{ backgroundColor:C.navy, borderBottom:`1px solid ${C.border}` }}>
      <div className="container">
        <div className="flex flex-wrap gap-x-12 gap-y-6 py-10 justify-center sm:justify-start">
          {stats.map((s,i) => (
            <div key={i} className="flex flex-col reveal" style={{ transitionDelay:`${i*0.08}s` }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(2.8rem,5vw,4rem)", color:s.color, lineHeight:1, letterSpacing:"-0.01em" }}>{s.val}</span>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.12em", color:"rgba(240,244,255,0.3)", textTransform:"uppercase", display:"block", marginTop:"6px" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal();
  return (
    <div className="min-h-screen" style={{ backgroundColor:C.coolWhite }}>
      <Nav/>
      {/* 1. Hero — immediate value prop + dual CTA */}
      <Hero/>
      {/* 2. Logo Ticker — social proof, dark background continues from hero */}
      <LogoTicker/>
      {/* 3. Problem — agitate the pain the buyer already feels */}
      <ProblemSection/>
      {/* 4. Capabilities — buyer is now primed to hear the solution */}
      <CapabilitiesSection/>
      {/* 5. Maturity Model — self-qualification, high engagement, drives urgency — moved earlier */}
      <MaturityModelSection/>
      {/* 6. Methodology — reduce risk perception, show the process */}
      <MethodologySection/>
      {/* 7. Engagement Models — how to engage, before the full service list */}
      <EngagementModelsSection/>
      {/* 8. Case Studies — proof the solution works, after process is understood */}
      <CaseStudiesSection/>
      {/* 9. Tech Stack — credibility reinforcement */}
      <TechStack/>
      {/* FAQ — GEO-optimized, answers common buyer and LLM queries (hidden from homepage, schema + llms.txt still active) */}
      {/* <FAQSection/> */}
      {/* Glossary — definitional content for LLM entity graph building (hidden from homepage) */}
      {/* <GlossarySection/> */}
      {/* Mid-page CTA — fires after buyer has seen proof and process */}
      <MidPageCTA/>
      {/* 10. Services Detail — buyer is fully warmed up, now show full menu */}
      <ServiceDetailSection/>
      {/* 11. CTA — final conversion moment */}
      <CTASection/>
      <Footer/>
      {/* Sticky bar — captures scroll-depth visitors who haven't converted */}
      <StickyCTABar/>
    </div>
  );
}
