/**
 * Opsforce.ai — Privacy Policy Page
 * Matches the site's dark navy theme.
 * Legal entity: RevOps, LLC (trade name: Opsforce.ai)
 */

import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663500125074/S6vDgqwvNTJhbK5iDVG3QD/opsforce-logo-white.png";

const C = {
  navy:      "#0A1628",
  navyMid:   "#0F2040",
  navyLight: "#162B52",
  blue:      "#2563EB",
  amber:     "#F59E0B",
  coolWhite: "#F0F4FF",
  lightSlate:"#94A3B8",
  border:    "rgba(255,255,255,0.08)",
};

const EFFECTIVE_DATE = "April 27, 2026";

interface SectionProps {
  num: string;
  title: string;
  children: React.ReactNode;
}

function Section({ num, title, children }: SectionProps) {
  return (
    <section style={{ marginBottom: "3rem" }}>
      <h2
        style={{
          fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
          fontWeight: 700,
          color: C.coolWhite,
          marginBottom: "1rem",
          paddingBottom: "0.5rem",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "baseline",
          gap: "0.75rem",
        }}
      >
        <span style={{ color: C.amber, fontFamily: "monospace", fontSize: "0.85em", fontWeight: 600 }}>
          {num}
        </span>
        {title}
      </h2>
      <div
        style={{
          color: C.lightSlate,
          fontSize: "clamp(0.875rem, 1.5vw, 0.95rem)",
          lineHeight: 1.8,
        }}
      >
        {children}
      </div>
    </section>
  );
}

function TableRow({ type, purpose }: { type: string; purpose: string }) {
  return (
    <tr>
      <td
        style={{
          padding: "0.6rem 1rem",
          borderBottom: `1px solid ${C.border}`,
          color: C.coolWhite,
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        {type}
      </td>
      <td
        style={{
          padding: "0.6rem 1rem",
          borderBottom: `1px solid ${C.border}`,
          color: C.lightSlate,
        }}
      >
        {purpose}
      </td>
    </tr>
  );
}

export default function Privacy() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: C.navy,
        color: C.coolWhite,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* ── Nav ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: C.navyMid,
          borderBottom: `1px solid ${C.border}`,
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: C.lightSlate,
            fontSize: "0.85rem",
            fontWeight: 500,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = C.coolWhite)}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = C.lightSlate)}
        >
          <ArrowLeft size={16} />
          Back to Opsforce.ai
        </Link>

        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <img
            src={LOGO_URL}
            alt="Opsforce.ai"
            style={{ height: "28px", objectFit: "contain" }}
            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <span
            style={{
              fontWeight: 700,
              fontSize: "0.95rem",
              color: C.coolWhite,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Opsforce.ai
          </span>
        </Link>
      </nav>

      {/* ── Hero ── */}
      <header
        style={{
          backgroundColor: C.navyMid,
          padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem) clamp(2rem, 5vw, 4rem)",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: C.amber,
              marginBottom: "1rem",
              padding: "0.25rem 0.75rem",
              border: `1px solid ${C.amber}40`,
              borderRadius: "4px",
            }}
          >
            Legal
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 800,
              color: C.coolWhite,
              lineHeight: 1.15,
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: C.lightSlate, fontSize: "0.9rem" }}>
            Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Last Updated: {EFFECTIVE_DATE}
          </p>
        </div>
      </header>

      {/* ── Body ── */}
      <main
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 2rem)",
        }}
      >
        {/* Intro */}
        <p
          style={{
            color: C.lightSlate,
            fontSize: "clamp(0.875rem, 1.5vw, 0.95rem)",
            lineHeight: 1.8,
            marginBottom: "3rem",
            padding: "1.25rem 1.5rem",
            backgroundColor: `${C.navyLight}`,
            borderLeft: `3px solid ${C.blue}`,
            borderRadius: "0 6px 6px 0",
          }}
        >
          This Privacy Policy describes how RevOps, LLC ("RevOps," "Opsforce.ai," "we," "us," or "our") collects,
          uses, discloses, and protects information about you when you visit our website at{" "}
          <a href="https://opsforce.ai" style={{ color: C.blue, textDecoration: "none" }}>
            opsforce.ai
          </a>{" "}
          (the "Site") and interact with our services. By accessing or using the Site, you agree to the terms of
          this Privacy Policy.
        </p>

        <Section num="01" title="Who We Are">
          <p style={{ marginBottom: "1rem" }}>
            RevOps, LLC is a professional services company operating under the trade name Opsforce.ai. We provide
            go-to-market operations services, including workflow architecture, data infrastructure, agent deployment,
            and governance consulting to enterprise clients. Our principal place of business is in the United States.
          </p>
          <p>
            For questions about this Privacy Policy, you may contact us at:{" "}
            <a href="mailto:privacy@opsforce.ai" style={{ color: C.blue, textDecoration: "none" }}>
              privacy@opsforce.ai
            </a>
          </p>
        </Section>

        <Section num="02" title="Information We Collect">
          <p style={{ marginBottom: "1.25rem" }}>We collect information in the following ways:</p>

          <h3 style={{ color: C.coolWhite, fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.95rem" }}>
            2.1 Information You Provide Directly
          </h3>
          <p style={{ marginBottom: "1.25rem" }}>
            When you submit a contact form, request a consultation, or otherwise communicate with us through the
            Site, we may collect your name, job title, company name, industry, email address, phone number, the
            content of your message or inquiry, and any other information you voluntarily provide.
          </p>

          <h3 style={{ color: C.coolWhite, fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.95rem" }}>
            2.2 Information Collected Automatically
          </h3>
          <p style={{ marginBottom: "1.25rem" }}>
            When you visit the Site, we and our third-party service providers may automatically collect certain
            technical and usage information, including your IP address and approximate geographic location, browser
            type and version, operating system and device type, pages visited, time spent on pages, navigation
            paths, referring URLs, and date and time of your visit. This information is collected through cookies,
            web beacons, pixel tags, and similar tracking technologies.
          </p>

          <h3 style={{ color: C.coolWhite, fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.95rem" }}>
            2.3 Information from Third-Party Services
          </h3>
          <p>
            We use HubSpot to host our contact and inquiry forms. When you submit a form, your information is
            transmitted to and stored by HubSpot in accordance with their privacy policy. We may also receive
            information about you from analytics providers and other third-party services we use to operate the Site.
          </p>
        </Section>

        <Section num="03" title="How We Use Your Information">
          <p style={{ marginBottom: "1rem" }}>We use the information we collect to:</p>
          <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              "Respond to your inquiries and communicate with you about our services",
              "Schedule and conduct consultations or discovery calls you have requested",
              "Send you information about our services, insights, or updates, where you have provided consent or where we have a legitimate interest in doing so",
              "Improve the Site and our services by analyzing usage patterns and user feedback",
              "Comply with legal obligations and enforce our rights",
              "Detect and prevent fraud or other harmful or unauthorized activity",
              "Operate, maintain, and secure the Site and our business systems",
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p style={{ marginTop: "1rem" }}>
            We do not sell, rent, or trade your personal information to third parties for their own marketing purposes.
          </p>
        </Section>

        <Section num="04" title="Legal Bases for Processing (EEA/UK Visitors)">
          <p style={{ marginBottom: "1rem" }}>
            If you are located in the European Economic Area (EEA) or the United Kingdom, our legal bases for
            processing your personal information include contractual necessity (processing required to fulfill a
            contract with you or to take steps at your request before entering into a contract), legitimate interests
            (processing necessary for our legitimate business interests where those interests are not overridden by
            your rights), consent (where you have provided explicit consent, such as subscribing to marketing
            communications), and legal obligation (processing required to comply with applicable law).
          </p>
        </Section>

        <Section num="05" title="How We Share Your Information">
          <h3 style={{ color: C.coolWhite, fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.95rem" }}>
            5.1 Service Providers
          </h3>
          <p style={{ marginBottom: "1.25rem" }}>
            We share information with third-party vendors and service providers that perform services on our behalf,
            including HubSpot (CRM and contact form management), Google Analytics and Google Tag Manager (site
            analytics and usage tracking), and cloud hosting and infrastructure providers supporting the Site. These
            providers are contractually obligated to use your information only as directed by us and in accordance
            with this Privacy Policy.
          </p>

          <h3 style={{ color: C.coolWhite, fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.95rem" }}>
            5.2 Business Transfers
          </h3>
          <p style={{ marginBottom: "1.25rem" }}>
            If RevOps, LLC is involved in a merger, acquisition, asset sale, or other business transaction, your
            information may be transferred as part of that transaction. We will notify you if such a transfer occurs
            and your information becomes subject to a different privacy policy.
          </p>

          <h3 style={{ color: C.coolWhite, fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.95rem" }}>
            5.3 Legal Requirements
          </h3>
          <p style={{ marginBottom: "1.25rem" }}>
            We may disclose your information if required to do so by law, court order, or governmental authority, or
            if we believe in good faith that such disclosure is necessary to protect the rights, property, or safety
            of RevOps, LLC, our clients, or the public.
          </p>

          <h3 style={{ color: C.coolWhite, fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.95rem" }}>
            5.4 With Your Consent
          </h3>
          <p>We may share your information with other parties when you have given us explicit consent to do so.</p>
        </Section>

        <Section num="06" title="Cookies and Tracking Technologies">
          <p style={{ marginBottom: "1.25rem" }}>
            We use cookies and similar tracking technologies to operate and improve the Site. Cookies are small text
            files stored on your device when you visit a website.
          </p>

          <h3 style={{ color: C.coolWhite, fontWeight: 600, marginBottom: "0.75rem", fontSize: "0.95rem" }}>
            6.1 Types of Cookies We Use
          </h3>
          <div
            style={{
              overflowX: "auto",
              marginBottom: "1.5rem",
              borderRadius: "8px",
              border: `1px solid ${C.border}`,
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ backgroundColor: C.navyLight }}>
                  <th
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      color: C.coolWhite,
                      fontWeight: 600,
                      borderBottom: `1px solid ${C.border}`,
                    }}
                  >
                    Cookie Type
                  </th>
                  <th
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      color: C.coolWhite,
                      fontWeight: 600,
                      borderBottom: `1px solid ${C.border}`,
                    }}
                  >
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody>
                <TableRow type="Strictly Necessary" purpose="Required for the Site to function. Cannot be disabled." />
                <TableRow type="Analytics" purpose="Collect aggregate data about how visitors use the Site (e.g., Google Analytics)." />
                <TableRow type="Marketing / Advertising" purpose="Track visits across websites to deliver relevant advertising (e.g., Google Tag Manager)." />
                <TableRow type="Functional" purpose="Remember your preferences and settings." />
              </tbody>
            </table>
          </div>

          <h3 style={{ color: C.coolWhite, fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.95rem" }}>
            6.2 Google Analytics
          </h3>
          <p style={{ marginBottom: "1.25rem" }}>
            We use Google Analytics to understand how visitors interact with the Site. This data is aggregated and
            anonymized. You can opt out by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: C.blue, textDecoration: "none" }}
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>

          <h3 style={{ color: C.coolWhite, fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.95rem" }}>
            6.3 Managing Cookies
          </h3>
          <p>
            Most web browsers allow you to control cookies through their settings. Note that disabling certain
            cookies may affect the functionality of the Site.
          </p>
        </Section>

        <Section num="07" title="Data Retention">
          <p style={{ marginBottom: "1rem" }}>
            We retain your personal information for as long as necessary to fulfill the purposes described in this
            Privacy Policy, unless a longer retention period is required or permitted by law. Contact form
            submissions and inquiry records are retained for up to three (3) years from the date of submission, or
            longer if a business relationship is established. Analytics data is retained in accordance with the
            retention settings of the applicable third-party analytics provider. We will delete or anonymize your
            information when it is no longer needed.
          </p>
        </Section>

        <Section num="08" title="Data Security">
          <p>
            We implement reasonable administrative, technical, and physical safeguards to protect your personal
            information from unauthorized access, use, disclosure, alteration, or destruction. However, no method
            of transmission over the internet or method of electronic storage is completely secure. We cannot
            guarantee the absolute security of your information.
          </p>
        </Section>

        <Section num="09" title="Your Rights and Choices">
          <p style={{ marginBottom: "1rem" }}>
            Depending on your location, you may have the right to access, correct, or delete your personal
            information; restrict or object to our processing; receive your data in a portable format; and withdraw
            consent at any time where processing is based on consent. To exercise any of these rights, please
            contact us at{" "}
            <a href="mailto:privacy@opsforce.ai" style={{ color: C.blue, textDecoration: "none" }}>
              privacy@opsforce.ai
            </a>
            . We will respond within the timeframe required by applicable law (generally 30 days) and may need to
            verify your identity before processing your request.
          </p>

          <h3 style={{ color: C.coolWhite, fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.95rem" }}>
            9.1 California Residents (CCPA/CPRA)
          </h3>
          <p>
            If you are a California resident, you have additional rights under the California Consumer Privacy Act
            (CCPA) and the California Privacy Rights Act (CPRA), including the right to know what personal
            information we collect, the right to delete your personal information, the right to opt out of the sale
            or sharing of your personal information, and the right to non-discrimination for exercising your rights.
            We do not sell personal information as defined under the CCPA/CPRA.
          </p>
        </Section>

        <Section num="10" title="Children's Privacy">
          <p>
            The Site is not directed to children under the age of 13, and we do not knowingly collect personal
            information from children under 13. If we become aware that we have collected personal information from
            a child under 13 without parental consent, we will take steps to delete that information promptly.
          </p>
        </Section>

        <Section num="11" title="Links to Third-Party Sites">
          <p>
            The Site may contain links to third-party websites or services that are not operated by us. We are not
            responsible for the privacy practices of those third parties. We encourage you to review the privacy
            policies of any third-party sites you visit.
          </p>
        </Section>

        <Section num="12" title="International Data Transfers">
          <p>
            RevOps, LLC is based in the United States. If you are accessing the Site from outside the United
            States, please be aware that your information may be transferred to, stored, and processed in the
            United States, where data protection laws may differ from those in your country. For transfers of
            personal data from the EEA or UK to the United States, we rely on appropriate safeguards as required
            by applicable law, including standard contractual clauses where applicable.
          </p>
        </Section>

        <Section num="13" title="Changes to This Privacy Policy">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
            legal requirements, or other factors. When we make material changes, we will update the "Last Updated"
            date at the top of this page. We encourage you to review this Privacy Policy periodically. Your
            continued use of the Site after any changes constitutes your acceptance of the updated policy.
          </p>
        </Section>

        <Section num="14" title="Contact Us">
          <p style={{ marginBottom: "1rem" }}>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
            please contact us at:
          </p>
          <div
            style={{
              backgroundColor: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: "8px",
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            <p style={{ color: C.coolWhite, fontWeight: 600, margin: 0 }}>RevOps, LLC (Opsforce.ai)</p>
            <p style={{ margin: 0 }}>
              Email:{" "}
              <a href="mailto:privacy@opsforce.ai" style={{ color: C.blue, textDecoration: "none" }}>
                privacy@opsforce.ai
              </a>
            </p>
            <p style={{ margin: 0 }}>
              Website:{" "}
              <a href="https://opsforce.ai" style={{ color: C.blue, textDecoration: "none" }}>
                opsforce.ai
              </a>
            </p>
          </div>
        </Section>

        {/* Back to site */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: `1px solid ${C.border}`,
            display: "flex",
            justifyContent: "center",
          }}
        >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.75rem",
            backgroundColor: C.amber,
            color: C.navy,
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: "4px",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = "1")}
        >
          <ArrowLeft size={14} />
          Back to Opsforce.ai
        </Link>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          backgroundColor: C.navyMid,
          borderTop: `1px solid ${C.border}`,
          padding: "1.5rem clamp(1.5rem, 5vw, 4rem)",
          textAlign: "center",
          color: C.lightSlate,
          fontSize: "0.8rem",
        }}
      >
        © {new Date().getFullYear()} RevOps, LLC. All rights reserved. Operating as Opsforce.ai.
      </footer>
    </div>
  );
}
