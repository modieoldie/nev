import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  List,
  X,
} from "@phosphor-icons/react";

const serviceData = {
  kitchens: {
    eyebrow: "Kitchen renovations",
    title: "A kitchen built around Manhattan life.",
    intro:
      "From compact galley kitchens to open entertaining spaces, we coordinate cabinetry, stone, lighting, appliances, plumbing, and every finish as one construction scope.",
    heroNote: "Completed Manhattan kitchen with custom millwork",
    details: [
      [
        "Layout and infrastructure",
        "Wall changes, plumbing, gas, electrical, ventilation, and appliance planning coordinated from the start.",
      ],
      [
        "Custom cabinetry",
        "Millwork engineered for the room, with purposeful storage and clean integration at every edge.",
      ],
      [
        "Stone and surfaces",
        "Template coordination, fabrication, installation, backsplash details, and finish protection.",
      ],
      [
        "Building logistics",
        "Alteration requirements, work hours, deliveries, elevator access, protection, and trade scheduling.",
      ],
    ],
  },
  bathrooms: {
    eyebrow: "Bathroom renovations",
    title: "Technical work with a refined finish.",
    intro:
      "A Manhattan bathroom concentrates multiple trades into a small footprint. We manage waterproofing, plumbing, tile, stone, glass, millwork, lighting, and inspections in the right sequence.",
    heroNote: "Completed primary bathroom with stone and custom vanity",
    details: [
      [
        "Waterproofing and tile",
        "Substrate preparation, slopes, membranes, layout, grout, and movement joints handled as one system.",
      ],
      [
        "Plumbing coordination",
        "Fixture locations, valve rough-ins, riser conditions, shutoffs, inspections, and finish installation.",
      ],
      [
        "Custom details",
        "Vanities, medicine cabinets, niches, shower glass, lighting, hardware, and finish transitions.",
      ],
      [
        "Site protection",
        "Careful access, dust control, debris removal, and coordination with building staff throughout the work.",
      ],
    ],
  },
};

const projects = [
  [
    "Upper West Side residence",
    "Full apartment",
    "Completed living room and adjoining dining area",
    "1800 × 2200 px",
  ],
  [
    "Downtown kitchen",
    "Kitchen",
    "Wide kitchen with custom cabinetry and stone island",
    "1600 × 1100 px",
  ],
  [
    "Pre-war primary bath",
    "Bathroom",
    "Full-room bathroom showing tile and vanity details",
    "1600 × 1100 px",
  ],
  [
    "Chelsea apartment",
    "Full apartment",
    "Architectural wide shot of finished apartment",
    "1600 × 1100 px",
  ],
  [
    "Tribeca millwork",
    "Custom millwork",
    "Close detail of cabinetry, hardware, and finish alignment",
    "1600 × 1100 px",
  ],
  [
    "Upper East Side kitchen",
    "Kitchen",
    "Finished galley or open kitchen photograph",
    "1600 × 1100 px",
  ],
];

function ImagePlaceholder({ note, size, className = "" }) {
  return (
    <div
      className={`image-placeholder ${className}`}
      role="img"
      aria-label={`Image placeholder: ${note}`}
    >
      <span>Image placeholder</span>
      <strong>{note}</strong>
      <small>Recommended: {size}</small>
    </div>
  );
}

function Button({ to = "/contact", children, secondary = false }) {
  return (
    <Link className={`button${secondary ? " secondary" : ""}`} to={to}>
      {children}
      <ArrowUpRight size={18} weight="bold" />
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);
  const nav = [
    ["/", "Home"],
    ["/kitchens", "Kitchens"],
    ["/bathrooms", "Bathrooms"],
    ["/portfolio", "Portfolio"],
    ["/about", "About"],
  ];
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" to="/" aria-label="GB Renovations home">
          <span className="brand-mark">GB</span>
          <span className="brand-copy">
            <b>GB Renovations</b>
            <small>Manhattan, New York</small>
          </span>
        </Link>
        <nav
          className={`links${open ? " open" : ""}`}
          aria-label="Main navigation"
        >
          {nav.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
          <Button>Plan your renovation</Button>
        </nav>
        <button
          className="menu"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={25} /> : <List size={25} />}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-main">
        <div>
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark">GB</span>
            <span className="brand-copy">
              <b>GB Renovations</b>
              <small>Manhattan, New York</small>
            </span>
          </Link>
          <p>
            Full-service interior general contracting for Manhattan apartments.
          </p>
        </div>
        <div>
          <strong>Explore</strong>
          <Link to="/kitchens">Kitchens</Link>
          <Link to="/bathrooms">Bathrooms</Link>
          <Link to="/portfolio">Portfolio</Link>
        </div>
        <div>
          <strong>Company</strong>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/contact">Plan a renovation</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} GB Renovations NYC.</span>
        <span>Verified business contact details to be added.</span>
      </div>
    </footer>
  );
}

function PageShell({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = `${pathname === "/" ? "Manhattan Apartment Renovations" : pathname.slice(1).replace("-", " ")} | GB Renovations`;
  }, [pathname]);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll(".reveal");
    if (reduced) {
      items.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <ImagePlaceholder
          className="hero-backdrop"
          note="Signature completed Manhattan apartment interior"
          size="2400 × 1600 px"
        />
        <div className="hero-shade" />
        <div className="container hero-content reveal">
          <p className="eyebrow">Interior general contracting in Manhattan</p>
          <h1>
            Exceptional spaces. <strong>Built precisely.</strong>
          </h1>
          <p className="lead">
            One experienced team for full apartment, kitchen, and bathroom
            renovations, from demolition through final finishes.
          </p>
          <div className="hero-actions">
            <Button>Discuss your project</Button>
            <Button to="/portfolio" secondary>
              View our work
            </Button>
          </div>
        </div>
      </section>
      <div className="trust">
        <div className="container trust-grid">
          <b>Every detail lives under one roof.</b>
          <span>Co-op and condo coordination</span>
          <span>Architect and designer collaboration</span>
          <span>Trade and material management</span>
          <span>Final walkthrough and closeout</span>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="intro reveal">
            <h2>Specialists in the rooms that demand the most.</h2>
            <p className="lead">
              Kitchens and bathrooms bring every trade together. Our planning
              keeps the design, infrastructure, materials, and building
              requirements aligned.
            </p>
          </div>
          <div className="home-services">
            <Link to="/kitchens">
              <ImagePlaceholder
                note="Featured completed kitchen"
                size="1600 × 1200 px"
              />
              <div>
                <p className="eyebrow">Kitchens</p>
                <h3>Designed for daily life. Built as one system.</h3>
                <ArrowRight size={28} />
              </div>
            </Link>
            <Link to="/bathrooms">
              <ImagePlaceholder
                note="Featured completed bathroom"
                size="1600 × 1200 px"
              />
              <div>
                <p className="eyebrow">Bathrooms</p>
                <h3>Technical precision behind every surface.</h3>
                <ArrowRight size={28} />
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="process-preview">
        <div className="container process-preview-grid">
          <div className="reveal">
            <p className="eyebrow">How we work</p>
            <h2>A controlled path from plans to completion.</h2>
            <p className="lead">
              We manage the construction side of the renovation, including
              scheduling, materials, subcontractors, building coordination, and
              quality control.
            </p>
            <Button to="/about">See our approach</Button>
          </div>
          <ImagePlaceholder
            className="reveal"
            note="Project manager reviewing plans on site"
            size="1500 × 1200 px"
          />
        </div>
      </section>
      <CTA />
    </>
  );
}

function ServicePage({ type }) {
  const data = serviceData[type];
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="reveal">
            <p className="eyebrow">{data.eyebrow}</p>
            <h1>{data.title}</h1>
            <p className="lead">{data.intro}</p>
            <Button>
              Plan your {type === "kitchens" ? "kitchen" : "bathroom"}
            </Button>
          </div>
          <ImagePlaceholder
            className="reveal"
            note={data.heroNote}
            size="1800 × 1500 px"
          />
        </div>
      </section>
      <section>
        <div className="container">
          <div className="work-head reveal">
            <p className="eyebrow">What we manage</p>
            <h2>Complete coordination, down to the finish.</h2>
          </div>
          <div className="detail-grid">
            {data.details.map(([title, copy]) => (
              <article className="reason reveal" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="feature">
        <div className="container feature-grid">
          <ImagePlaceholder
            note={`${type === "kitchens" ? "Kitchen" : "Bathroom"} construction detail in progress`}
            size="1600 × 1200 px"
          />
          <div className="feature-copy">
            <p className="eyebrow">Manhattan coordination</p>
            <h2>The building is part of the project.</h2>
            <p className="lead">
              We plan around alteration agreements, service access, permitted
              hours, protection, deliveries, inspections, and the people who
              keep your building running.
            </p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

function Portfolio() {
  return (
    <>
      <section className="simple-hero">
        <div className="container reveal">
          <p className="eyebrow">Portfolio</p>
          <h1>Work that should speak for itself.</h1>
          <p className="lead">
            This page is structured for real GB Renovations photography. Replace
            each labeled placeholder with a completed project image.
          </p>
        </div>
      </section>
      <section className="portfolio-page">
        <div className="container portfolio-grid">
          {projects.map(([title, type, note, size]) => (
            <article className="portfolio-item reveal" key={title}>
              <ImagePlaceholder note={note} size={size} />
              <div>
                <span>{type}</span>
                <h3>{title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}

function About() {
  const values = [
    [
      "One accountable team",
      "A single construction lead coordinates trades, materials, schedule, building staff, and day-to-day execution.",
    ],
    [
      "Design-minded execution",
      "We work with architects and interior designers to preserve intent while resolving the realities discovered in the field.",
    ],
    [
      "Manhattan fluency",
      "Co-op rules, condo requirements, freight schedules, service access, neighbors, and constrained jobsites are planned into the work.",
    ],
    [
      "Clear communication",
      "Decisions, dependencies, and changes are surfaced early so the client and design team can act with confidence.",
    ],
  ];
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="reveal">
            <p className="eyebrow">About GB Renovations</p>
            <h1>We manage the build, not just the trades.</h1>
            <p className="lead">
              GB Renovations exists to make complex apartment construction feel
              controlled, legible, and professionally managed from demolition to
              handover.
            </p>
          </div>
          <ImagePlaceholder
            className="reveal"
            note="GB Renovations team or founder portrait on a project site"
            size="1800 × 1500 px"
          />
        </div>
      </section>
      <section>
        <div className="container">
          <div className="work-head reveal">
            <p className="eyebrow">What guides the work</p>
            <h2>Good construction is organized before it is visible.</h2>
          </div>
          <div className="detail-grid">
            {values.map(([title, copy]) => (
              <article className="reason reveal" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    window.location.href = `mailto:?subject=${encodeURIComponent(`Renovation inquiry: ${d.get("neighborhood") || "Manhattan project"}`)}&body=${encodeURIComponent(`Name: ${d.get("name")}\nEmail: ${d.get("email")}\nPhone: ${d.get("phone")}\nNeighborhood: ${d.get("neighborhood")}\nScope: ${d.get("scope")}\n\nProject details:\n${d.get("details")}`)}`;
    setSent(true);
  };
  if (sent)
    return (
      <div className="form-success">
        <Check size={32} />
        <h3>Your email is ready.</h3>
        <p>
          Add the verified company address in your email app, then send your
          project details.
        </p>
        <button onClick={() => setSent(false)}>Start another inquiry</button>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-grid">
        <label>
          Name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" required type="email" autoComplete="email" />
        </label>
      </div>
      <div className="field-grid">
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          Neighborhood
          <input name="neighborhood" placeholder="Upper West Side" />
        </label>
      </div>
      <label>
        Project scope
        <select name="scope" defaultValue="">
          <option value="" disabled>
            Select a scope
          </option>
          <option>Full apartment renovation</option>
          <option>Kitchen</option>
          <option>Bathroom</option>
          <option>Millwork and finishes</option>
        </select>
      </label>
      <label>
        Project details
        <textarea
          name="details"
          rows="5"
          required
          placeholder="Apartment type, target timing, design status, and what you want to change"
        />
      </label>
      <button className="button submit">
        Prepare inquiry <ArrowUpRight size={18} />
      </button>
    </form>
  );
}

function Contact() {
  return (
    <section className="contact-page">
      <div className="container contact-grid">
        <div className="reveal">
          <p className="eyebrow">Plan a renovation</p>
          <h1>Tell us about your apartment.</h1>
          <p className="lead">
            Share the neighborhood, scope, timeline, and whether architectural
            or design plans already exist.
          </p>
          <div className="contact-facts">
            <span>Manhattan apartment renovations</span>
            <span>Architect and designer collaboration</span>
            <span>Verified phone and email to be added</span>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta-band">
      <div className="container">
        <div>
          <p className="eyebrow">Start a project</p>
          <h2>Ready to discuss your apartment?</h2>
        </div>
        <Button>Plan your renovation</Button>
      </div>
    </section>
  );
}
function NotFound() {
  return (
    <section className="simple-hero">
      <div className="container">
        <p className="eyebrow">Page not found</p>
        <h1>This page does not exist.</h1>
        <Button to="/">Return home</Button>
      </div>
    </section>
  );
}

function AppRoutes() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kitchens" element={<ServicePage type="kitchens" />} />
        <Route path="/bathrooms" element={<ServicePage type="bathrooms" />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageShell>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
