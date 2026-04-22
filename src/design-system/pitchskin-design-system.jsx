import React, { useState } from "react";

// ─────────────────────────────────────────────────────────────
//  PITCH SKIN — DESIGN SYSTEM CANVAS
//  Brand: pitchskin.com
//  Vibe: Clean clinical skincare · Sunshine yellow CTAs ·
//        Soft pastel section blocks · Bold sans headlines
// ─────────────────────────────────────────────────────────────

const TOKENS = {
  color: {
    // Core
    "brand/yellow":        { hex: "#FFC629", rgb: "255, 198, 41",  note: "Primary CTA · announcement bar" },
    "brand/yellow-deep":   { hex: "#F2B705", rgb: "242, 183, 5",   note: "Hover / active CTA" },
    "brand/ink":           { hex: "#111111", rgb: "17, 17, 17",    note: "Headlines · body · nav" },
    "brand/ink-soft":      { hex: "#2A2A2A", rgb: "42, 42, 42",    note: "Secondary body copy" },

    // Pastel section backgrounds (from PDP + homepage)
    "surface/cream":       { hex: "#FAF6EE", rgb: "250, 246, 238", note: "Default page warm wash" },
    "surface/stone":       { hex: "#E8E6E1", rgb: "232, 230, 225", note: "Hero + testimonial block" },
    "surface/butter":      { hex: "#FCE9AE", rgb: "252, 233, 174", note: "'Best Used For' header strip" },
    "surface/peach":       { hex: "#FCE3B5", rgb: "252, 227, 181", note: "'Our Toner Serum' block" },
    "surface/wheat":       { hex: "#FEEDAF", rgb: "254, 237, 175", note: "'Let nature do the work'" },
    "surface/sky":         { hex: "#CFE0F7", rgb: "207, 224, 247", note: "'Why it Works' block" },
    "surface/mint":        { hex: "#BFE0D9", rgb: "191, 224, 217", note: "Product label accent · packaging" },
    "surface/white":       { hex: "#FFFFFF", rgb: "255, 255, 255", note: "Cards · PDP background" },

    // Semantic
    "semantic/success":    { hex: "#2EA36B", rgb: "46, 163, 107",  note: "Verified badge · check marks" },
    "semantic/error":      { hex: "#D94F3A", rgb: "217, 79, 58",   note: "Sale price · urgency" },
    "semantic/sale":       { hex: "#E04F3A", rgb: "224, 79, 58",   note: "Strikethrough promo red" },
    "semantic/badge-blue": { hex: "#2E8B8B", rgb: "46, 139, 139",  note: "'Most Popular' / '60 Day'" },

    // Neutrals
    "neutral/900":         { hex: "#0E0E0E", rgb: "14, 14, 14" },
    "neutral/700":         { hex: "#3D3D3D", rgb: "61, 61, 61" },
    "neutral/500":         { hex: "#7A7A7A", rgb: "122, 122, 122" },
    "neutral/300":         { hex: "#C9C7C2", rgb: "201, 199, 194" },
    "neutral/200":         { hex: "#E5E3DE", rgb: "229, 227, 222" },
    "neutral/100":         { hex: "#F2F0EA", rgb: "242, 240, 234" },
  },

  font: {
    display:
      '"Roobert", "Neue Haas Grotesk Display", "Inter", system-ui, sans-serif',
    body:
      '"Roobert", "Neue Haas Grotesk Text", "Inter", system-ui, sans-serif',
    serif:
      '"Tiempos Headline", "GT Sectra", Georgia, serif', // italic accents (“reduce pimples…”)
  },

  type: {
    H1:       { size: 56, lh: 1.05, weight: 700, ls: "-0.02em", mobile: 36 },
    H2:       { size: 40, lh: 1.1,  weight: 700, ls: "-0.015em", mobile: 28 },
    H3:       { size: 28, lh: 1.2,  weight: 700, ls: "-0.01em",  mobile: 22 },
    H4:       { size: 20, lh: 1.3,  weight: 600, ls: "-0.005em", mobile: 18 },
    BodyLg:   { size: 18, lh: 1.5,  weight: 400, ls: "0",        mobile: 16 },
    Body:    { size: 16, lh: 1.55, weight: 400, ls: "0",        mobile: 15 },
    BodySm:   { size: 14, lh: 1.55, weight: 400, ls: "0",        mobile: 13 },
    Caption:  { size: 12, lh: 1.4,  weight: 500, ls: "0.02em",   mobile: 12 },
    Button:   { size: 14, lh: 1.0,  weight: 700, ls: "0.08em",   mobile: 14 },
    EyebrowItalic:{ size: 16, lh: 1.4, weight: 400, ls: "0", mobile: 14, family: "serif" },
  },

  space: { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64, 9: 96 },

  radius: { none: 0, sm: 4, md: 8, lg: 12, xl: 20, pill: 999 },

  shadow: {
    card:    "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
    modal:   "0 10px 40px rgba(0,0,0,0.12)",
    focus:   "0 0 0 3px rgba(255,198,41,0.45)",
  },

  grid: {
    breakpoints: { xs: 360, sm: 480, md: 768, lg: 1024, xl: 1440 },
    container: 1280,
    columns: 12,
    gutter: 24,
  },
};

// ─────────────────────────────────────────────────────────────
//  UI PRIMITIVES (preview only — scoped styles)
// ─────────────────────────────────────────────────────────────

const Section = ({ title, subtitle, bg = "#fff", children, id }) => (
  <section id={id} style={{ background: bg, padding: "64px 48px", borderBottom: "1px solid #E5E3DE" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: TOKENS.font.body, fontSize: 11, letterSpacing: "0.18em", color: "#7A7A7A", fontWeight: 600, textTransform: "uppercase" }}>{id}</div>
        <h2 style={{ fontFamily: TOKENS.font.display, fontSize: 36, fontWeight: 700, letterSpacing: "-0.015em", color: "#111", margin: "6px 0 4px" }}>{title}</h2>
        {subtitle && <p style={{ fontFamily: TOKENS.font.body, fontSize: 15, color: "#3D3D3D", maxWidth: 640, margin: 0 }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);

const Swatch = ({ name, data }) => (
  <div style={{ fontFamily: TOKENS.font.body }}>
    <div style={{
      height: 96, borderRadius: 12, background: data.hex,
      border: data.hex === "#FFFFFF" ? "1px solid #E5E3DE" : "none",
      marginBottom: 10
    }} />
    <div style={{ fontWeight: 700, fontSize: 13, color: "#111" }}>{name}</div>
    <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12, color: "#3D3D3D", marginTop: 2 }}>{data.hex}</div>
    <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 11, color: "#7A7A7A" }}>rgb({data.rgb})</div>
    {data.note && <div style={{ fontSize: 11, color: "#7A7A7A", marginTop: 4, fontStyle: "italic" }}>{data.note}</div>}
  </div>
);

const Btn = ({ variant = "primary", size = "md", children, state }) => {
  const sizes = {
    sm: { padding: "10px 18px", fontSize: 12 },
    md: { padding: "14px 28px", fontSize: 13 },
    lg: { padding: "18px 40px", fontSize: 14 },
  };
  const variants = {
    primary: {
      background: state === "hover" ? "#F2B705" : state === "disabled" ? "#F5E9B0" : "#FFC629",
      color: "#111",
      border: "none",
      boxShadow: state === "focus" ? TOKENS.shadow.focus : "none",
      opacity: state === "disabled" ? 0.6 : 1,
    },
    secondary: {
      background: "transparent",
      color: "#111",
      border: "1.5px solid #111",
    },
    ghost: {
      background: "transparent",
      color: "#111",
      border: "none",
      textDecoration: "underline",
      textUnderlineOffset: 4,
    },
    dark: { background: "#111", color: "#fff", border: "none" },
  };
  return (
    <button style={{
      ...sizes[size], ...variants[variant],
      fontFamily: TOKENS.font.body, fontWeight: 700, letterSpacing: "0.08em",
      textTransform: "uppercase", borderRadius: 4, cursor: "pointer",
    }}>{children}</button>
  );
};

const Pill = ({ children, tone = "dark" }) => {
  const tones = {
    dark: { bg: "#111", color: "#fff" },
    yellow: { bg: "#FFC629", color: "#111" },
    teal: { bg: "#2E8B8B", color: "#fff" },
    success: { bg: "#2EA36B", color: "#fff" },
    error: { bg: "#D94F3A", color: "#fff" },
    verified: { bg: "#FFC629", color: "#111" },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: "inline-block", padding: "4px 10px", borderRadius: 3,
      background: t.bg, color: t.color, fontSize: 10, fontWeight: 700,
      letterSpacing: "0.08em", textTransform: "uppercase",
      fontFamily: TOKENS.font.body,
    }}>{children}</span>
  );
};

const Rating = ({ n = 5 }) => (
  <span style={{ color: "#FFC629", letterSpacing: 1, fontSize: 14 }}>
    {"★".repeat(n)}<span style={{ color: "#E5E3DE" }}>{"★".repeat(5 - n)}</span>
  </span>
);

// ─────────────────────────────────────────────────────────────
//  CANVAS
// ─────────────────────────────────────────────────────────────

export default function PitchSkinDesignSystem() {
  const [tab, setTab] = useState("tokens");

  const tabs = [
    { id: "tokens", label: "01 — Tokens" },
    { id: "type", label: "02 — Typography" },
    { id: "components", label: "03 — Components" },
    { id: "patterns", label: "04 — Patterns" },
    { id: "pages", label: "05 — Page Frames" },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "#FAF6EE",
      fontFamily: TOKENS.font.body, color: "#111",
    }}>
      {/* ── Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "#111", color: "#fff",
        padding: "14px 48px", borderBottom: "1px solid #000",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: TOKENS.font.display, fontWeight: 800, fontSize: 20, letterSpacing: "-0.02em" }}>
              Pitch. Skin
            </span>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#FFC629", textTransform: "uppercase", fontWeight: 600 }}>
              Design System · v1.0
            </span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: tab === t.id ? "#FFC629" : "transparent",
                color: tab === t.id ? "#111" : "#fff",
                border: "none", padding: "8px 14px", fontSize: 12, fontWeight: 600,
                letterSpacing: "0.04em", cursor: "pointer", borderRadius: 3,
                fontFamily: TOKENS.font.body,
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Cover */}
      <div style={{ background: "#FAF6EE", padding: "80px 48px 40px", borderBottom: "1px solid #E5E3DE" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "end" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A7A7A", fontWeight: 600, marginBottom: 16 }}>
              Brand · E-commerce · Shopify
            </div>
            <h1 style={{ fontFamily: TOKENS.font.display, fontSize: 88, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0 }}>
              Pitch Skin<br />Design System.
            </h1>
            <p style={{ fontFamily: TOKENS.font.serif, fontSize: 20, fontStyle: "italic", color: "#3D3D3D", marginTop: 20, maxWidth: 520 }}>
              Clean, clinical Korean skincare — sunshine CTAs, soft pastel washes, and serious science.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {["#FFC629","#111111","#FCE9AE","#BFE0D9","#FCE3B5","#CFE0F7","#FAF6EE","#E04F3A"].map(c => (
              <div key={c} style={{ aspectRatio: "1", background: c, borderRadius: 6, border: c === "#FFFFFF" ? "1px solid #E5E3DE" : "none" }} />
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
         01 — TOKENS
         ═══════════════════════════════════════════════════════ */}
      {tab === "tokens" && (
        <>
          <Section id="01.1 · Color / Core" title="Core Brand" subtitle="The yellow drives every CTA, promo bar and sale marker. Ink is your body + nav. Everything else plays support." bg="#FFFFFF">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              {Object.entries(TOKENS.color).filter(([k]) => k.startsWith("brand/")).map(([k, v]) => (
                <Swatch key={k} name={k} data={v} />
              ))}
            </div>
          </Section>

          <Section id="01.2 · Color / Surfaces" title="Pastel Section Washes" subtitle="Each homepage + PDP block lives inside one of these washes. They alternate to segment long-scroll storytelling." bg="#FAF6EE">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              {Object.entries(TOKENS.color).filter(([k]) => k.startsWith("surface/")).map(([k, v]) => (
                <Swatch key={k} name={k} data={v} />
              ))}
            </div>
          </Section>

          <Section id="01.3 · Color / Semantic" title="Semantic & Neutrals" bg="#FFFFFF">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              {Object.entries(TOKENS.color).filter(([k]) => k.startsWith("semantic/") || k.startsWith("neutral/")).map(([k, v]) => (
                <Swatch key={k} name={k} data={v} />
              ))}
            </div>
          </Section>

          <Section id="01.4 · Radius" title="Border Radius" bg="#FAF6EE">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
              {Object.entries(TOKENS.radius).map(([k, v]) => (
                <div key={k}>
                  <div style={{ height: 96, background: "#fff", border: "1px solid #E5E3DE", borderRadius: v }} />
                  <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700 }}>radius/{k}</div>
                  <div style={{ fontSize: 12, color: "#7A7A7A", fontFamily: "ui-monospace, monospace" }}>{v === 999 ? "9999px" : `${v}px`}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="01.5 · Spacing" title="8pt Spacing Scale" bg="#FFFFFF">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(TOKENS.space).map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 80, fontSize: 13, fontWeight: 700 }}>space/{k}</div>
                  <div style={{ width: 60, fontSize: 12, color: "#7A7A7A", fontFamily: "ui-monospace, monospace" }}>{v}px</div>
                  <div style={{ width: v, height: 16, background: "#FFC629", borderRadius: 2 }} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="01.6 · Shadows" title="Elevation" bg="#FAF6EE">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {Object.entries(TOKENS.shadow).map(([k, v]) => (
                <div key={k}>
                  <div style={{ height: 120, background: "#fff", borderRadius: 8, boxShadow: v }} />
                  <div style={{ marginTop: 12, fontWeight: 700, fontSize: 13 }}>shadow/{k}</div>
                  <div style={{ fontSize: 11, color: "#7A7A7A", fontFamily: "ui-monospace, monospace", marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="01.7 · Grid" title="Layout Grid" bg="#FFFFFF">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24, background: "#FAF6EE", padding: 24, borderRadius: 8 }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{ height: 120, background: "rgba(255,198,41,0.4)", borderRadius: 2 }} />
              ))}
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 32, fontSize: 13, color: "#3D3D3D" }}>
              <div><b>Max:</b> 1280px</div>
              <div><b>Columns:</b> 12</div>
              <div><b>Gutter:</b> 24px</div>
              <div><b>Breakpoints:</b> 360 · 480 · 768 · 1024 · 1440</div>
            </div>
          </Section>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════
         02 — TYPOGRAPHY
         ═══════════════════════════════════════════════════════ */}
      {tab === "type" && (
        <>
          <Section id="02.1 · Families" title="Font Families" bg="#FFFFFF">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {[
                { k: "Display", v: TOKENS.font.display, sample: "Fade Dark Spots in 6 Days", note: "Headlines · nav · hero" },
                { k: "Body", v: TOKENS.font.body, sample: "Gentle on skin, tough on pimples.", note: "Paragraph · UI · product copy" },
                { k: "Serif Italic", v: TOKENS.font.serif, sample: "reduce pimples, dark spots", note: "Eyebrow accents · elegance" },
              ].map(f => (
                <div key={f.k} style={{ background: "#FAF6EE", padding: 24, borderRadius: 8 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "#7A7A7A", fontWeight: 600, textTransform: "uppercase" }}>{f.k}</div>
                  <div style={{ fontFamily: f.v, fontSize: 28, fontStyle: f.k.includes("Italic") ? "italic" : "normal", margin: "12px 0 16px", lineHeight: 1.15, fontWeight: f.k === "Display" ? 700 : 400 }}>{f.sample}</div>
                  <div style={{ fontSize: 11, fontFamily: "ui-monospace, monospace", color: "#3D3D3D", wordBreak: "break-word" }}>{f.v}</div>
                  <div style={{ fontSize: 12, color: "#7A7A7A", marginTop: 8, fontStyle: "italic" }}>{f.note}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="02.2 · Scale" title="Type Scale" subtitle="Mobile sizes in parentheses. All weights use Roobert." bg="#FAF6EE">
            <div style={{ background: "#fff", borderRadius: 8, overflow: "hidden" }}>
              {Object.entries(TOKENS.type).map(([k, v], i) => (
                <div key={k} style={{
                  display: "grid", gridTemplateColumns: "140px 1fr 260px",
                  padding: "20px 24px", alignItems: "center",
                  borderTop: i === 0 ? "none" : "1px solid #F2F0EA",
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em" }}>{k}</div>
                  <div style={{
                    fontFamily: v.family === "serif" ? TOKENS.font.serif : TOKENS.font.display,
                    fontSize: Math.min(v.size, 44),
                    lineHeight: v.lh,
                    fontWeight: v.weight,
                    letterSpacing: v.ls,
                    fontStyle: v.family === "serif" ? "italic" : "normal",
                    color: "#111",
                  }}>
                    {k.includes("Button") ? "ADD TO CART" : "Say Goodbye to Pimples"}
                  </div>
                  <div style={{ fontSize: 11, color: "#7A7A7A", fontFamily: "ui-monospace, monospace", textAlign: "right" }}>
                    {v.size}px ({v.mobile}px) / {v.lh} / {v.weight}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════
         03 — COMPONENTS
         ═══════════════════════════════════════════════════════ */}
      {tab === "components" && (
        <>
          <Section id="03.1 · Buttons" title="Buttons" subtitle="Yellow primary drives every conversion. Uppercase, tight letter-spacing, square corners." bg="#FFFFFF">
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "#7A7A7A", fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>Primary · States</div>
                <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                  <Btn size="lg">Shop Now</Btn>
                  <Btn size="lg" state="hover">Hover</Btn>
                  <Btn size="lg" state="focus">Focus</Btn>
                  <Btn size="lg" state="disabled">Disabled</Btn>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "#7A7A7A", fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>Sizes</div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <Btn size="sm">Small</Btn>
                  <Btn size="md">Medium</Btn>
                  <Btn size="lg">Large · Add To Cart</Btn>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "#7A7A7A", fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>Variants</div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <Btn variant="primary">Primary</Btn>
                  <Btn variant="secondary">Secondary</Btn>
                  <Btn variant="dark">Submit</Btn>
                  <Btn variant="ghost">Learn more →</Btn>
                </div>
              </div>
            </div>
          </Section>

          <Section id="03.2 · Badges & Pills" title="Badges & Pills" bg="#FAF6EE">
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Pill tone="dark">Before</Pill>
              <Pill tone="yellow">After</Pill>
              <Pill tone="teal">Most Popular</Pill>
              <Pill tone="teal">Best Deal</Pill>
              <Pill tone="success">Verified</Pill>
              <Pill tone="error">33% Off</Pill>
              <Pill tone="yellow">Option 1</Pill>
              <Pill tone="yellow">Option 2</Pill>
            </div>

            <div style={{ marginTop: 40, display: "flex", gap: 24, alignItems: "center" }}>
              {/* 60 day guarantee circle badge */}
              <div style={{
                width: 90, height: 90, borderRadius: "50%",
                background: "#2E8B8B", color: "#fff",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                fontFamily: TOKENS.font.display, textAlign: "center", lineHeight: 1.1,
              }}>
                <div style={{ fontSize: 10, letterSpacing: "0.1em", fontWeight: 600 }}>MONEY BACK</div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>60</div>
                <div style={{ fontSize: 9, letterSpacing: "0.1em", fontWeight: 600 }}>DAY</div>
              </div>
              <div style={{ fontSize: 13, color: "#3D3D3D", maxWidth: 300 }}>
                <b>Circular Guarantee Badge</b> — sits over PDP gallery top-left. Teal (#2E8B8B) reinforces trust at the moment of decision.
              </div>
            </div>
          </Section>

          <Section id="03.3 · Product Card" title="Product Card" bg="#FFFFFF">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {[
                { name: "Korean Toner Pads", price: "$39.95", badge: null },
                { name: "Redness Toner Pads", price: "$39.95", badge: "MOST POPULAR" },
                { name: "Bundle · 6 Month", price: "$119.85", badge: "BEST DEAL" },
              ].map((p, i) => (
                <div key={i} style={{ border: "1px solid #E5E3DE", borderRadius: 8, overflow: "hidden", background: "#fff" }}>
                  <div style={{ position: "relative", aspectRatio: "1", background: "#FAF6EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {p.badge && <div style={{ position: "absolute", top: 12, left: 12 }}><Pill tone="teal">{p.badge}</Pill></div>}
                    <div style={{ width: 120, height: 120, background: "#BFE0D9", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TOKENS.font.display, fontWeight: 700, fontSize: 11, color: "#111" }}>
                      Blemish<br />Toner Pad
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <Rating n={5} />
                    <div style={{ fontFamily: TOKENS.font.display, fontSize: 16, fontWeight: 700, marginTop: 6 }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: "#7A7A7A", margin: "4px 0 12px" }}>200mL · 120 pads</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontFamily: TOKENS.font.display, fontWeight: 700, fontSize: 18, color: "#D94F3A" }}>{p.price}</div>
                      <Btn size="sm">Add</Btn>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="03.4 · Bundle Selector" title="Bundle Selector (PDP)" subtitle="The single biggest conversion element on the site. Radio-style cards with 'Most Popular' + 'Best Deal' flags." bg="#FAF6EE">
            <div style={{ maxWidth: 520, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Buy 1", sub: "1 Month Supply", price: "$39.95", perDay: "$1.33 per day", badge: null, selected: true },
                { label: "Buy 3 & Save 25%", sub: "3 Month Supply", price: "$79.90", perDay: "$0.88 per day", badge: "MOST POPULAR", selected: false },
                { label: "Buy 6 & Save 33%", sub: "6 Month Supply, Free Shipping", price: "$119.85", perDay: "$0.66 per day", badge: "BEST DEAL", selected: false },
              ].map((o, i) => (
                <div key={i} style={{
                  position: "relative", background: "#fff",
                  border: `2px solid ${o.selected ? "#2E8B8B" : "#E5E3DE"}`,
                  borderRadius: 8, padding: "16px 20px",
                  display: "flex", alignItems: "center", gap: 16,
                }}>
                  {o.badge && (
                    <div style={{ position: "absolute", top: -10, right: 16 }}>
                      <Pill tone="teal">{o.badge}</Pill>
                    </div>
                  )}
                  <div style={{ width: 48, height: 48, background: "#BFE0D9", borderRadius: 4, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: TOKENS.font.display, fontWeight: 700, fontSize: 15 }}>{o.label}</div>
                    <div style={{ fontSize: 12, color: "#7A7A7A" }}>{o.sub}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: TOKENS.font.display, fontWeight: 700, fontSize: 16 }}>{o.price}</div>
                    <div style={{ fontSize: 11, color: "#7A7A7A" }}>{o.perDay}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="03.5 · Inputs" title="Form Inputs" bg="#FFFFFF">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, maxWidth: 720 }}>
              {[
                { label: "Default", state: "default" },
                { label: "Focus", state: "focus" },
                { label: "Filled", state: "filled" },
                { label: "Error", state: "error" },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7A7A7A", fontWeight: 600 }}>{f.label}</label>
                  <input
                    defaultValue={f.state === "filled" ? "hello@pitchskin.com" : ""}
                    placeholder="Email"
                    style={{
                      marginTop: 6, width: "100%", padding: "12px 14px",
                      border: `1px solid ${f.state === "focus" ? "#111" : f.state === "error" ? "#D94F3A" : "#C9C7C2"}`,
                      borderRadius: 4, fontSize: 14, fontFamily: TOKENS.font.body,
                      outline: "none", background: "#fff",
                      boxShadow: f.state === "focus" ? TOKENS.shadow.focus : "none",
                    }}
                  />
                  {f.state === "error" && <div style={{ fontSize: 11, color: "#D94F3A", marginTop: 4 }}>Please enter a valid email.</div>}
                </div>
              ))}
            </div>
          </Section>

          <Section id="03.6 · Announcement Bar" title="Announcement Bar" bg="#FAF6EE">
            <div style={{ background: "#FFC629", padding: "10px 16px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#111", borderRadius: 4 }}>
              ⚡ Up to 33% off when you bundle!
            </div>
            <div style={{ marginTop: 12, background: "#111", padding: "10px 16px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#fff", borderRadius: 4 }}>
              Free Shipping on Orders Over $79 — 60-Day Money Back Guarantee
            </div>
          </Section>

          <Section id="03.7 · Navigation" title="Navigation Bar (Desktop)" bg="#FFFFFF">
            <div style={{ border: "1px solid #E5E3DE", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ background: "#FFC629", textAlign: "center", fontSize: 12, fontWeight: 600, padding: 8 }}>⚡ Up to 33% off when you bundle!</div>
              <div style={{ background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px" }}>
                <div style={{ display: "flex", gap: 28, fontSize: 13 }}>
                  <a style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: 4 }}>Skincare</a>
                  <a style={{ color: "#111" }}>Shop</a>
                  <a style={{ color: "#111" }}>FAQs</a>
                  <a style={{ color: "#111" }}>Contact Us</a>
                </div>
                <div style={{ fontFamily: TOKENS.font.display, fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>Pitch. Skin</div>
                <div style={{ display: "flex", gap: 20, fontSize: 14 }}>
                  <span>🔍</span><span>👤</span><span style={{ position: "relative" }}>🛒<span style={{ position: "absolute", top: -4, right: -8, background: "#FFC629", borderRadius: "50%", width: 16, height: 16, fontSize: 10, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>0</span></span>
                </div>
              </div>
            </div>
          </Section>

          <Section id="03.8 · Accordion" title="Accordion (FAQ / PDP details)" bg="#FAF6EE">
            <div style={{ maxWidth: 640, background: "#fff", borderRadius: 8, overflow: "hidden", border: "1px solid #E5E3DE" }}>
              {[
                { q: "How quickly should I expect to see results?", open: true, a: "Most users notice calmer skin within the first week. Visible dark-spot improvement begins within 5–7 days with consistent AM/PM use." },
                { q: "Return Policy: What if I don't see results?", open: false },
                { q: "Can I use these pads if I have sensitive skin?", open: false },
                { q: "Are the Pitch Blemish Toner Pads suitable for rosacea?", open: false },
              ].map((item, i) => (
                <div key={i} style={{ borderTop: i === 0 ? "none" : "1px solid #F2F0EA" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 20px", cursor: "pointer" }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{item.q}</span>
                    <span style={{ fontSize: 18, color: "#7A7A7A" }}>{item.open ? "−" : "+"}</span>
                  </div>
                  {item.open && item.a && (
                    <div style={{ padding: "0 20px 20px", fontSize: 13, color: "#3D3D3D", lineHeight: 1.6 }}>{item.a}</div>
                  )}
                </div>
              ))}
            </div>
          </Section>

          <Section id="03.9 · Review Card" title="Review Card" bg="#FFFFFF">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              {[
                { name: "Sarah, 24", verified: true, q: "Pitch Pads cleared up my skin in just a few weeks! My acne has almost disappeared." },
                { name: "Hayley, 21", verified: true, q: "These toner pads are a game changer! After just 4 weeks, my acne is fading." },
              ].map((r, i) => (
                <div key={i} style={{ background: "#FAF6EE", padding: 24, borderRadius: 8 }}>
                  <Rating n={5} />
                  <p style={{ fontSize: 15, lineHeight: 1.55, margin: "12px 0 16px", color: "#111" }}>"{r.q}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#E5E3DE" }} />
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{r.name}</div>
                    {r.verified && <Pill tone="verified">Verified</Pill>}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="03.10 · Stat Block" title="Statistic Block" subtitle="Used for the 88% / 71% / 93% clinical result section." bg="#FCE3B5">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }}>
              {[
                { n: "88%", txt: "would recommend Pitch Skin toner pads to a friend" },
                { n: "71%", txt: "said their skin looked visibly clearer after 5 days" },
                { n: "93%", txt: "said their breakouts became less frequent after 6 weeks" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: TOKENS.font.display, fontSize: 64, fontWeight: 800, letterSpacing: "-0.03em", color: "#111", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 14, color: "#2A2A2A", marginTop: 8, maxWidth: 260 }}>{s.txt}</div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════
         04 — PATTERNS
         ═══════════════════════════════════════════════════════ */}
      {tab === "patterns" && (
        <>
          <Section id="04.1 · Hero" title="Hero Pattern" subtitle="Stone wash background, 50/50 split, serif italic eyebrow tagline, yellow CTA, social proof row." bg="#FFFFFF">
            <div style={{ background: "#E8E6E1", borderRadius: 12, padding: "64px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
              <div>
                <h1 style={{ fontFamily: TOKENS.font.display, fontSize: 48, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05, margin: 0 }}>
                  Pitch Toner Pads<br />Say Goodbye to Pimples<br />for Good.
                </h1>
                <p style={{ fontFamily: TOKENS.font.serif, fontStyle: "italic", fontSize: 17, color: "#3D3D3D", margin: "20px 0 28px" }}>
                  reduce pimples, dark spots<br />and uneven texture
                </p>
                <Btn size="lg">Shop Now</Btn>
                <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                  <span>100+ 5 star reviews</span>
                  <Rating n={5} />
                </div>
              </div>
              <div style={{ height: 320, background: "#fff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#7A7A7A", fontSize: 13 }}>
                [ Product stack image ]
              </div>
            </div>
          </Section>

          <Section id="04.2 · Section Intro" title="Centered Section Header" bg="#FCE9AE">
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontFamily: TOKENS.font.display, fontSize: 36, fontWeight: 700, letterSpacing: "-0.015em", margin: 0 }}>Our new & improved Toner Serum</h2>
              <p style={{ fontSize: 15, color: "#2A2A2A", maxWidth: 540, margin: "14px auto 0", lineHeight: 1.55 }}>
                Gentle on skin, tough on pimples. Formulated with higher concentrations of active ingredients for maximum efficacy.
              </p>
            </div>
          </Section>

          <Section id="04.3 · Feature List" title="Icon Feature List" bg="#FCE3B5">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32, maxWidth: 720 }}>
              {[
                { icon: "🌿", t: "Dual-Power Centella Asiatica", d: "Infused with 0.5% Centella Asiatica for potent skin healing and calming." },
                { icon: "●", t: "Niacinamide", d: "4% Niacinamide (Vitamin B3) that visibly fades pimples and revitalizes skin complexion." },
                { icon: "⟡", t: "Micro-Madecassoside", d: "Specially formulated particles that penetrate deeply to rapidly soothe and clear skin imperfections." },
                { icon: "✦", t: "Liposome Technology", d: "Active ingredients are encapsulated in liposomes, delivering prolonged benefits throughout the day." },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 16 }}>
                  <div style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontFamily: TOKENS.font.display, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{f.t}</div>
                    <div style={{ fontSize: 13, color: "#2A2A2A", lineHeight: 1.55 }}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="04.4 · Before/After" title="Before · After Pattern" bg="#FAF6EE">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 640 }}>
              {["Before", "After"].map(label => (
                <div key={label} style={{ position: "relative", aspectRatio: "4/5", background: "#E5E3DE", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 12, right: 12 }}>
                    <Pill tone="yellow">{label}</Pill>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="04.5 · Compare Table" title="Comparison Table" subtitle="Pitch Skin vs competitors — yellow check circles for yes, thin × for no." bg="#FCE3B5">
            <div style={{ background: "#fff", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", padding: "16px 20px", borderBottom: "1px solid #F2F0EA" }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Benefits</div>
                <div style={{ textAlign: "center", fontWeight: 700, fontSize: 12 }}>PITCH SKIN</div>
                <div style={{ textAlign: "center", fontSize: 12, color: "#7A7A7A" }}>Other Toners</div>
                <div style={{ textAlign: "center", fontSize: 12, color: "#7A7A7A" }}>Other Skincare</div>
              </div>
              {[
                ["Results in 5 Days", true, false, false],
                ["Made in Korea", true, "Made in China", "Made in Other"],
                ["4% Niacinamide", true, "1%", false],
                ["Reduces Redness", true, false, false],
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", padding: "14px 20px", borderTop: "1px solid #F9F5EB", fontSize: 13 }}>
                  <div>{row[0]}</div>
                  {row.slice(1).map((cell, j) => (
                    <div key={j} style={{ textAlign: "center" }}>
                      {cell === true ? (
                        <span style={{ display: "inline-block", width: 22, height: 22, borderRadius: "50%", background: "#FFC629", color: "#111", lineHeight: "22px", fontSize: 13, fontWeight: 700 }}>✓</span>
                      ) : cell === false ? (
                        <span style={{ color: "#C9C7C2", fontSize: 16 }}>×</span>
                      ) : (
                        <span style={{ fontSize: 12, color: "#7A7A7A" }}>{cell}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Section>

          <Section id="04.6 · Footer" title="Footer" bg="#111">
            <div style={{ background: "#F2F0EA", padding: 40, borderRadius: 8 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 32 }}>
                <div>
                  <div style={{ fontFamily: TOKENS.font.display, fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>Pitch. Skin</div>
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "#7A7A7A", marginTop: 20, fontWeight: 600 }}>Country/region</div>
                  <div style={{ marginTop: 6, padding: "8px 12px", background: "#fff", borderRadius: 4, fontSize: 13, border: "1px solid #E5E3DE", display: "inline-block" }}>AUD $ | Australia ⌄</div>
                  <div style={{ marginTop: 28, fontWeight: 700, fontSize: 14 }}>Stay in the loop</div>
                  <div style={{ fontSize: 12, color: "#3D3D3D", marginTop: 4 }}>Get 10% Off your first order by signing up.</div>
                </div>
                {[
                  { h: "Shop", links: ["Shop All", "Skincare", "New Arrivals", "Sale"] },
                  { h: "About", links: ["About Us", "Toner Pads", "Toner Sheets"] },
                  { h: "Customer Help", links: ["FAQs", "Shipping & Returns", "Contact Us", "Terms of Service", "Payment Policy"] },
                ].map(col => (
                  <div key={col.h}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{col.h}</div>
                    {col.links.map(l => (
                      <div key={l} style={{ fontSize: 13, color: "#2A2A2A", marginBottom: 8 }}>{l}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════
         05 — PAGE FRAMES
         ═══════════════════════════════════════════════════════ */}
      {tab === "pages" && (
        <Section id="05 · Page Frames" title="Page Architecture" subtitle="Section-by-section breakdown for every major page. Desktop 1440 · Mobile 390." bg="#FFFFFF">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {[
              {
                name: "01 · Homepage",
                sections: [
                  "Announcement Bar (yellow, 40px)",
                  "Navigation (white, 64px)",
                  "Hero — stone bg, product stack right (auto ~520px)",
                  "TikTok Social Proof — 6 vertical video cards",
                  "Real Customer Results — before/after carousel (stone bg)",
                  "Best Used For — horizontal category cards (butter bg)",
                  "Toner Serum Features — 4 icon-feature list (peach bg)",
                  "Dermatologist Recommended — quote + portrait",
                  "Let Nature Do the Work — product + badges (wheat bg)",
                  "How to Use — 3-step with lifestyle photo (wheat bg)",
                  "Before/After Testimonials (cream bg)",
                  "Why it Works — 3 ingredient bullets (sky bg)",
                  "What's Inside — 3 product photo columns (cream)",
                  "Clinical Stats — 88% / 71% / 93% (peach bg)",
                  "PDP Preview (embedded product card)",
                  "Footer (stone bg)",
                ],
              },
              {
                name: "02 · PDP (Product Detail)",
                sections: [
                  "Announcement Bar + Nav",
                  "Gallery (thumbs left, main image, 60-day badge)",
                  "Product Info — title, rating, eyebrow italic, highlights grid",
                  "Bundle Selector — 3 radio cards (1/3/6 month)",
                  "Add to Cart CTA (full-width yellow)",
                  "Accordion — Description / How to Use / Ingredients / Shipping",
                  "Real Customer Results carousel",
                  "How Pitch Skin Stacks Up — comparison table",
                  "TikTok proof strip",
                  "Restore Calm Skin — 4 benefits (wheat)",
                  "Therapeutic Formula — 4 ingredients (peach)",
                  "Easy, Fast & Fun — Option 1 / Option 2 usage",
                  "FAQ accordion",
                  "Customer Reviews — aggregate bar + photos + individual reviews",
                  "Footer",
                ],
              },
              {
                name: "03 · Collection / Shop",
                sections: [
                  "Nav + announcement",
                  "Collection hero (title + description, pastel wash)",
                  "Filter bar (desktop: horizontal | mobile: drawer)",
                  "Product grid — 3 col desktop, 2 col mobile",
                  "Pagination or Load More button",
                  "Footer",
                ],
              },
              {
                name: "04 · Cart Drawer",
                sections: [
                  "Slide-in panel 420px right",
                  "Header: 'Your Cart' + close",
                  "Free shipping progress bar (yellow fill)",
                  "Line items (thumb, title, qty stepper, price)",
                  "Upsell: 'You might also like' (1 card)",
                  "Subtotal row",
                  "Checkout CTA (full-width yellow)",
                  "Payment method icons",
                ],
              },
              {
                name: "05 · About",
                sections: [
                  "Hero — brand story headline, serif italic lede",
                  "Founder portrait + quote block",
                  "Values grid (3 columns, icon + title + para)",
                  "Press/dermatologist trust row",
                  "Ingredients philosophy (wheat wash)",
                  "CTA block — 'Shop the range' (yellow)",
                  "Footer",
                ],
              },
              {
                name: "06 · Contact",
                sections: [
                  "Hero — 'We're here to help'",
                  "2-col: contact form (left) + FAQ shortcut links (right)",
                  "Support email + response time",
                  "Footer",
                ],
              },
              {
                name: "07 · Checkout (Shopify)",
                sections: [
                  "Logo-only header",
                  "Express checkout buttons (Shop Pay, Apple Pay, G Pay)",
                  "Contact + shipping form",
                  "Order summary rail (sticky right, 380px)",
                  "Yellow 'Continue to Shipping' CTA",
                ],
              },
              {
                name: "08 · 404",
                sections: [
                  "Centered layout on cream bg",
                  "Large display numeral '404'",
                  "'Lost your glow?' headline + serif italic subhead",
                  "Two CTAs: Shop All (primary) + Home (secondary)",
                  "Product suggestion strip (3 cards)",
                ],
              },
            ].map(p => (
              <div key={p.name} style={{ background: "#FAF6EE", border: "1px solid #E5E3DE", borderRadius: 8, padding: 24 }}>
                <div style={{ fontFamily: TOKENS.font.display, fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{p.name}</div>
                <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#2A2A2A", lineHeight: 1.75 }}>
                  {p.sections.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Footer */}
      <footer style={{ background: "#111", color: "#E5E3DE", padding: "32px 48px", textAlign: "center", fontSize: 12, letterSpacing: "0.06em" }}>
        Pitch Skin · Design System · v1.0 · Built for Figma handoff
      </footer>
    </div>
  );
}
