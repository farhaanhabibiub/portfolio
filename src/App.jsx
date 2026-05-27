import { useState, useEffect, useRef } from "react";

const SECTIONS = ["about", "projects", "skills", "certifications", "experience", "contact"];

const ALL_PROJECTS = [
  {
    year: 2026, category: "data",
    title: "NYC Taxi Manhattan Analysis Dashboard",
    desc: "End-to-end data engineering pipeline analyzing NYC Yellow Taxi & HVFHV trip patterns. ETL with Prefect, DuckDB warehouse, XGBoost demand prediction, and weather data integration from Open-Meteo API.",
    tech: ["Python", "DuckDB", "XGBoost", "Prefect", "Streamlit", "ETL"],
    github: "https://github.com/farhaanhabibiub/rdv-taxi-analysis",
    live: "https://rdv-taxi-analysis.streamlit.app/",
    color: "#818CF8",
  },
  {
    year: 2025, category: "data",
    title: "Heart Disease ML Analysis",
    desc: "Applied ML project analyzing heart disease patient data from Kaggle. Built and compared Classification models (Logistic Regression, KNN, SVM, Random Forest) and Clustering algorithms for patient segmentation.",
    tech: ["Python", "Scikit-Learn", "Classification", "Clustering", "Data Analysis"],
    github: "https://github.com/farhaanhabibiub/machine-learning-project",
    color: "#34D399",
  },
  {
    year: 2026, category: "data",
    title: "Indonesian Information Retrieval System",
    desc: "Full-pipeline IR system for Indonesian documents. Implemented TF-IDF weighting, inverted index, cosine similarity search, and automatic text summarization deployed via Streamlit.",
    tech: ["Python", "NLP", "TF-IDF", "Text Mining", "Streamlit"],
    github: "https://github.com/yoshiabp/TugasAkhirPIPT",
    live: "https://tugas-akhir-pipt-klp6.streamlit.app/",
    color: "#FB923C",
  },
  {
    year: 2025, category: "data",
    title: "Dental Age Estimation with Deep Learning",
    desc: "CNN-based model predicting human age from panoramic dental X-ray images. Trained on 296 images (ages 9–19) using ensemble strategies and age-range-specialized models to improve prediction accuracy.",
    tech: ["Python", "Deep Learning", "CNN", "Computer Vision", "Google Colab"],
    github: "https://github.com/riprhmn/deep-learning-final-project",
    color: "#F472B6",
  },
  {
    year: 2025, category: "software",
    title: "FinAI Financial Education Android App",
    desc: "A financial literacy Android application built with Kotlin and Jetpack Compose. Features Firebase Authentication, Firestore for real-time data, course progress tracking, interactive quiz system, and profile photo upload to Firebase Storage.",
    tech: ["Kotlin", "Jetpack Compose", "Firebase", "Firestore", "Android"],
    github: "https://github.com/farhaanhabibiub/project-akhir-papb",
    color: "#FBBF24",
  },
  {
    year: 2025, category: "software",
    title: "Interactive Earth Layers Visualization",
    desc: "An interactive visualization of Earth's geological layers (crust, mantle, outer core, inner core) for Computer Graphics coursework. Features clickable layer exploration with audio narration for each geological layer.",
    tech: ["HTML5", "CSS3", "JavaScript", "WebGL", "Computer Graphics"],
    github: "https://github.com/riprhmn/uni-komgraf",
    color: "#A3E635",
  },
  {
    year: 2026, category: "software",
    title: "Majadigi Cross-Platform Super App",
    desc: "Capstone super app built with Flutter for Android, iOS, and Web. Features Firebase Auth, Firestore, Node.js + Fastify backend, and Flutter Deferred Components for on-demand module loading across 12 integrated features.",
    tech: ["Flutter", "Dart", "Firebase", "Node.js", "Fastify"],
    github: "https://github.com/farhaanhabibiub/capstone-majadigi",
    color: "#60A5FA",
  },
];

function Badge({ label, color }) {
  return (
    <span style={{
      fontSize: 11, padding: "3px 10px", borderRadius: 20,
      background: color + "22", color, border: `1px solid ${color}44`,
      fontWeight: 600, whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function SectionTitle({ title, from, to }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <span style={{
        fontSize: 28, fontWeight: 800, display: "inline-block",
        background: `linear-gradient(135deg, ${from}, ${to})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
      }}>{title}</span>
      <div style={{ height: 3, width: 48, borderRadius: 4, background: `linear-gradient(90deg, ${from}, ${to})`, marginTop: 8 }} />
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderLeft: `4px solid ${p.color}`,
      borderRadius: 12, padding: "22px 24px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, flexWrap: "wrap" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F1F5F9", margin: 0 }}>{p.title}</h3>
          <span style={{ fontSize: 11, fontWeight: 700, color: p.color, background: p.color + "18", border: `1px solid ${p.color}33`, padding: "2px 9px", borderRadius: 20 }}>{p.year}</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          {p.live && (
            <a href={p.live} style={{ fontSize: 11, color: "#34D399", textDecoration: "none", border: "1px solid #34D39944", padding: "4px 10px", borderRadius: 6, fontWeight: 700 }}>Live ↗</a>
          )}
          <a href={p.github} style={{ fontSize: 11, color: "#94A3B8", textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: 6 }}>GitHub ↗</a>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.75, margin: "0 0 14px" }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {p.tech.map(t => <Badge key={t} label={t} color={p.color} />)}
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [yearFilter, setYearFilter] = useState("all");
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const navHeight = 50;
      let current = SECTIONS[0];
      let minDistance = Infinity;

      SECTIONS.forEach(s => {
        const el = sectionRefs.current[s];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - navHeight);
        if (rect.top - navHeight <= 80 && distance < minDistance) {
          minDistance = distance;
          current = s;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  const filtered = ALL_PROJECTS.filter(p => yearFilter === "all" || p.year === parseInt(yearFilter));
  const dataProjects = filtered.filter(p => p.category === "data").sort((a, b) => b.year - a.year);
  const softwareProjects = filtered.filter(p => p.category === "software").sort((a, b) => b.year - a.year);

  return (
    <div style={{ background: "#080B14", color: "#E2E8F0", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden", padding: "72px 32px 56px", textAlign: "center", background: "linear-gradient(160deg, #0D0620 0%, #080B14 60%, #041A0E 100%)" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "15%", left: "8%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "10%", right: "8%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.10) 0%, transparent 70%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg, #818CF8, #34D399)",
            margin: "0 auto 20px", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 26, fontWeight: 800, color: "#0D0620",
          }}>FH</div>
          <h1 style={{ margin: "0 0 10px", fontSize: 46, fontWeight: 900, letterSpacing: -1 }}>
            <span style={{ background: "linear-gradient(135deg, #A5B4FC, #6EE7B7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Farhaan Habibi
            </span>
          </h1>
          <p style={{ fontSize: 17, color: "#94A3B8", margin: "0 0 6px", fontWeight: 500 }}>Data Engineering · Data Science</p>
          <p style={{ fontSize: 13, color: "#475569", margin: "0 0 32px" }}>Universitas Brawijaya · GPA 3.78 · Open to Internship (July 2026)</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "GitHub", href: "https://github.com/farhaanhabibiub", c: "#818CF8" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/farhaan-habibi/", c: "#34D399" },
              { label: "Live Project ↗", href: "https://rdv-taxi-analysis.streamlit.app/", c: "#FB923C" },
            ].map(btn => (
              <a key={btn.label} href={btn.href} style={{
                padding: "9px 22px", borderRadius: 8, textDecoration: "none",
                fontWeight: 700, fontSize: 13,
                background: `${btn.c}22`, border: `1px solid ${btn.c}55`, color: btn.c,
              }}>{btn.label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* ── STICKY NAV ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(8,11,20,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.07)", overflowX: "auto" }}>
        <div style={{ display: "flex", maxWidth: 960, margin: "0 auto", padding: "0 16px" }}>
          {SECTIONS.map(s => (
            <button key={s} onClick={() => scrollTo(s)} style={{
              padding: "15px 18px", background: "none", border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: activeSection === s ? 700 : 400, whiteSpace: "nowrap",
              color: activeSection === s ? "#A5B4FC" : "#64748B",
              borderBottom: activeSection === s ? "2px solid #818CF8" : "2px solid transparent",
              textTransform: "capitalize", transition: "all 0.2s",
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* ── ALL SECTIONS ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>

        {/* ABOUT */}
        <section ref={el => { sectionRefs.current.about = el; }} id="about" style={{ padding: "64px 0 48px" }}>
          <SectionTitle title="About Me" from="#A5B4FC" to="#6EE7B7" />
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "28px 32px", marginBottom: 24 }}>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "#CBD5E1", margin: 0 }}>
              I'm an Informatics student at Universitas Brawijaya with a strong focus on Data Engineering and Data Science. I believe good decisions should be driven by data, not assumptions. Across my projects, I've built end-to-end data pipelines, trained machine learning models, developed information retrieval systems for Indonesian text, and explored deep learning for medical imaging. I enjoy working across the full stack of a data project — from raw ingestion and warehousing to modeling and visualization.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
            {[
              { label: "GPA", value: "3.78 / 4.00", color: "#818CF8" },
              { label: "University", value: "Universitas Brawijaya", color: "#34D399" },
              { label: "Available", value: "July 2026", color: "#FB923C" },
              { label: "Focus", value: "Data Engineering", color: "#F472B6" },
            ].map(card => (
              <div key={card.label} style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${card.color}33`, borderTop: `3px solid ${card.color}`, borderRadius: 12, padding: "18px 16px" }}>
                <p style={{ fontSize: 11, color: "#475569", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 1 }}>{card.label}</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#E2E8F0", margin: 0 }}>{card.value}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* PROJECTS */}
        <section ref={el => { sectionRefs.current.projects = el; }} id="projects" style={{ padding: "64px 0 48px" }}>
          <SectionTitle title="Projects" from="#60A5FA" to="#A5B4FC" />

          {/* Year Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "#475569", marginRight: 4 }}>Filter by year:</span>
            {["all", "2025", "2026"].map(y => (
              <button key={y} onClick={() => setYearFilter(y)} style={{
                padding: "6px 18px", borderRadius: 20, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 700,
                background: yearFilter === y ? "#818CF8" : "rgba(255,255,255,0.06)",
                color: yearFilter === y ? "#080B14" : "#94A3B8",
                transition: "all 0.2s",
              }}>{y === "all" ? "All Years" : y}</button>
            ))}
          </div>

          {/* Data & Analytics category */}
          {dataProjects.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#818CF8", textTransform: "uppercase", letterSpacing: 1.5, whiteSpace: "nowrap" }}>Data & Analytics</span>
                <div style={{ flex: 1, height: 1, background: "rgba(129,140,248,0.2)" }} />
                <span style={{ fontSize: 11, color: "#475569", whiteSpace: "nowrap" }}>{dataProjects.length} projects</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {dataProjects.map((p, i) => <ProjectCard key={i} p={p} />)}
              </div>
            </div>
          )}

          {/* Software Development category */}
          {softwareProjects.length > 0 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#34D399", textTransform: "uppercase", letterSpacing: 1.5, whiteSpace: "nowrap" }}>Software Development</span>
                <div style={{ flex: 1, height: 1, background: "rgba(52,211,153,0.2)" }} />
                <span style={{ fontSize: 11, color: "#475569", whiteSpace: "nowrap" }}>{softwareProjects.length} projects</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {softwareProjects.map((p, i) => <ProjectCard key={i} p={p} />)}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "#475569", padding: "48px 0" }}>No projects found for this filter.</p>
          )}
        </section>

        <Divider />

        {/* SKILLS */}
        <section ref={el => { sectionRefs.current.skills = el; }} id="skills" style={{ padding: "64px 0 48px" }}>
          <SectionTitle title="Skills" from="#34D399" to="#60A5FA" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
            {[
              { cat: "Data & Analytics", color: "#818CF8", items: ["Python", "SQL", "Pandas", "NumPy", "Data Visualization"] },
              { cat: "Machine Learning", color: "#34D399", items: ["Scikit-Learn", "XGBoost", "Deep Learning", "CNN", "NLP & Text Mining"] },
              { cat: "Data Engineering", color: "#FB923C", items: ["DuckDB", "ETL / ELT", "Prefect", "Apache Hive", "Big Data"] },
              { cat: "Cloud & Tools", color: "#60A5FA", items: ["AWS (Glue, Athena)", "Streamlit", "Google Colab", "Git & GitHub"] },
            ].map(({ cat, color, items }) => (
              <div key={cat} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "22px 20px" }}>
                <p style={{ fontSize: 11, fontWeight: 800, color, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: 1.2 }}>{cat}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {items.map(s => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: "#CBD5E1" }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* CERTIFICATIONS */}
        <section ref={el => { sectionRefs.current.certifications = el; }} id="certifications" style={{ padding: "64px 0 48px" }}>
          <SectionTitle title="Certifications" from="#FB923C" to="#F472B6" />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { name: "AWS Academy Graduate - Data Engineering", issuer: "Amazon Web Services", date: "May 2026", color: "#FB923C", url: "https://www.credly.com/go/jJ1H9JCX" },
              { name: "Machine Learning A-Z: AI, Python & R + ChatGPT Prize", issuer: "Udemy", date: "December 2025", color: "#818CF8", url: "https://ude.my/UC-8388c726-1163-43fc-8b3c-bfcddf76fc8d" },
              { name: "Microsoft Excel dari Dasar hingga Pakar", issuer: "Udemy", date: "May 2026", color: "#34D399", url: "https://ude.my/UC-4bde1ea5-47c4-4d0c-8b93-775f224a1231" },
            ].map((c, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "22px 24px", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, flexShrink: 0, background: `${c.color}22`, border: `1px solid ${c.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏅</div>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#F1F5F9", margin: "0 0 4px" }}>{c.name}</p>
                  <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>{c.issuer} · {c.date}</p>
                </div>
                <a href={c.url} style={{ fontSize: 12, padding: "7px 16px", borderRadius: 8, whiteSpace: "nowrap", background: `${c.color}22`, border: `1px solid ${c.color}44`, color: c.color, textDecoration: "none", fontWeight: 700 }}>Verify ↗</a>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* EXPERIENCE */}
        <section ref={el => { sectionRefs.current.experience = el; }} id="experience" style={{ padding: "64px 0 48px" }}>
          <SectionTitle title="Experience" from="#A5B4FC" to="#F472B6" />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { role: "Software Developer Intern", company: "PT Penta Media Informasi", period: "Jan 2026 – Feb 2026", type: "Internship", color: "#818CF8", url: "https://pentasystem.id/services/", desc: "Contributed to software modernization at a banking software vendor serving Bank BPR clients. Assisted in migrating a legacy desktop-based system to a web-based platform using Python and Django." },
              { role: "Private Math Tutor", company: "Eduprima (Freelance)", period: "Jan 2024 – Present", type: "Part-time", color: "#34D399", desc: "Providing private mathematics tutoring for junior and senior high school students, delivering personalized learning approaches to help improve understanding and academic performance." },
            ].map((e, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "26px 28px", display: "flex", gap: 18 }}>
                <div style={{ paddingTop: 4 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: e.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9", margin: 0 }}>{e.role}</h3>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      {e.url && <a href={e.url} style={{ fontSize: 11, color: e.color, textDecoration: "none", border: `1px solid ${e.color}44`, padding: "4px 10px", borderRadius: 6, fontWeight: 700 }}>Visit Site ↗</a>}
                      <Badge label={e.type} color={e.color} />
                    </div>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: e.color, margin: "0 0 3px" }}>{e.company}</p>
                  <p style={{ fontSize: 12, color: "#475569", margin: "0 0 12px" }}>{e.period}</p>
                  <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.75, margin: 0 }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* CONTACT */}
        <section ref={el => { sectionRefs.current.contact = el; }} id="contact" style={{ padding: "64px 0 80px" }}>
          <SectionTitle title="Contact" from="#6EE7B7" to="#A5B4FC" />
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
            <p style={{ fontSize: 32, margin: "0 0 12px" }}>👋</p>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#F1F5F9", margin: "0 0 12px" }}>Let's Work Together</h3>
            <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.8, margin: "0 auto 36px", maxWidth: 480 }}>
              Actively looking for internship opportunities in Data Engineering or Data Science starting July 2026. Feel free to reach out!
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="mailto:farhaanhabibi21@gmail.com" style={{ padding: "12px 28px", borderRadius: 10, background: "linear-gradient(135deg, #818CF8, #34D399)", color: "#080B14", textDecoration: "none", fontWeight: 800, fontSize: 14 }}>Email Me</a>
              <a href="https://www.linkedin.com/in/farhaan-habibi/" style={{ padding: "12px 28px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#E2E8F0", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>LinkedIn ↗</a>
              <a href="https://github.com/farhaanhabibiub" style={{ padding: "12px 28px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#E2E8F0", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>GitHub ↗</a>
            </div>
            <p style={{ fontSize: 13, color: "#334155", marginTop: 28 }}>farhaanhabibi21@gmail.com</p>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "24px 32px", borderTop: "1px solid rgba(255,255,255,0.05)", color: "#334155", fontSize: 12 }}>
        Farhaan Habibi · Built with React · 2026
      </div>
    </div>
  );
}
