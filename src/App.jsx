import { useEffect, useRef, useState } from "react";
import heroImage from "./assets/ducky_money.png";
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
  Minus,
  Plus,
  X,
} from "@phosphor-icons/react";

const LICENSE_LINE =
  "Licensed & Insured NYC General Contractor · Licensed Plumbing & Electrical Trades";

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

const services = [
  {
    title: "Complete Renovations",
    copy: "Full and gut renovations carried end to end, with one team accountable from demolition through final finishes.",
    items: [
      "Full apartment renovations",
      "Gut renovations",
      "Layout changes",
      "Demolition",
      "Framing and drywall",
      "Ceilings and flooring",
      "Painting and finishes",
    ],
  },
  {
    title: "Kitchens",
    copy: "Every trade converging in one room, planned so the cabinetry, infrastructure, and finishes land together.",
    items: [
      "Cabinetry and islands",
      "Countertops and backsplashes",
      "Appliance integration",
      "Plumbing and lighting",
      "Flooring",
      "Custom storage",
    ],
    to: "/kitchens",
    linkLabel: "See kitchen renovations",
  },
  {
    title: "Bathrooms",
    copy: "Waterproofing and mechanical work done properly before a single tile goes on the wall.",
    items: [
      "Tile and stone",
      "Waterproofing",
      "Showers and tubs",
      "Vanities and fixtures",
      "Plumbing",
      "Ventilation and lighting",
    ],
    to: "/bathrooms",
    linkLabel: "See bathroom renovations",
  },
  {
    title: "Custom Millwork & Interior Details",
    copy: "Shop-built and site-fit joinery that makes an apartment feel considered rather than assembled.",
    items: [
      "Built-ins and closets",
      "Custom cabinetry",
      "Wall panels and shelving",
      "Doors and trim",
      "Molding",
      "Architectural details",
    ],
  },
  {
    title: "Mechanical & Technical Work",
    copy: "The systems behind the walls, coordinated early so nothing has to be opened up twice.",
    items: [
      "Electrical",
      "Plumbing",
      "HVAC",
      "Lighting systems",
      "Smart-home integration",
      "Soundproofing and insulation",
      "Ventilation",
    ],
  },
  {
    title: "Project Management & Coordination",
    copy: "The scheduling, paperwork, and building relationships that keep a Manhattan job moving.",
    items: [
      "Scheduling and budgeting",
      "Trade coordination",
      "Architect and designer coordination",
      "Building management and permits",
      "Inspections and purchasing",
      "Punch lists and final handoff",
    ],
  },
];

const processSteps = [
  [
    "Consultation",
    "We walk the apartment with you, listen to how you want to live in it, and talk openly about scope, budget range, and realistic timing before anything is drawn.",
  ],
  [
    "Planning and design coordination",
    "We work alongside your architect or designer, or help you find one, and turn the drawings into a buildable scope with materials and long-lead items identified early.",
  ],
  [
    "Proposal and contract",
    "You receive a line-item proposal that shows the full scope, where the money goes, the construction schedule, and clear payment milestones.",
  ],
  [
    "Building approvals and permits",
    "We prepare the alteration agreement, board package, insurance certificates, and DOB filings, and manage the building requirements on your behalf.",
  ],
  [
    "Construction",
    "Protection and demolition, rough trades, inspections, then finishes. One project lead runs the site daily and keeps you current with photos and an updated schedule.",
  ],
  [
    "Punch list and closeout",
    "We walk the finished apartment together, complete the punch list, clean, and hand over warranties, manuals, and closeout documents.",
  ],
];

const portfolio = [
  {
    id: "tribeca",
    name: "Tribeca",
    type: "Full apartment renovation",
    meta: "Loft conversion · 3 bed · 2.5 bath",
    featured: "Featured: living area with restored steel windows",
    description:
      "A full gut renovation of a converted warehouse loft. We opened the plan, rebuilt the mechanical systems end to end, and detailed the apartment around the original cast columns and steel windows so the new work reads as if it had always been there.",
    scope: [
      "Full demolition and layout reconfiguration",
      "New electrical, plumbing, and HVAC distribution",
      "Custom kitchen millwork and stone fabrication",
      "Two full bathrooms, waterproofed and tiled",
      "Wide-plank flooring and plaster wall finishes",
      "Co-op alteration agreement and DOB filings",
    ],
    gallery: [
      "Living area with restored steel windows",
      "Open kitchen with island and integrated appliances",
      "Custom kitchen millwork detail",
      "Countertop and backsplash junction",
      "Primary bathroom with full-height stone",
      "Shower niche and fixture detail",
      "Secondary bathroom vanity",
      "Entry with built-in storage wall",
      "Bedroom with plaster finish and wide-plank floor",
      "Hallway millwork and door trim detail",
    ],
  },
  {
    id: "chelsea",
    name: "Chelsea",
    type: "Full apartment renovation",
    meta: "Condominium · 2 bed · 2 bath",
    featured: "Featured: living and dining area after completion",
    description:
      "A condominium renovation carried out against a fixed move-in date. The kitchen was opened to the living room, every bathroom was rebuilt, and storage was added throughout without giving up floor area.",
    scope: [
      "Kitchen wall removal and structural coordination",
      "New kitchen with waterfall island and integrated appliances",
      "Primary bathroom and powder room rebuilt",
      "Custom closets and living room built-ins",
      "New lighting layout, dimming, and controls",
      "Building alteration approval and inspections",
    ],
    gallery: [
      "Living and dining area after completion",
      "Open kitchen with waterfall island",
      "Cabinetry and appliance integration",
      "Backsplash and undercabinet lighting",
      "Primary bathroom with double vanity",
      "Walk-in shower with glass enclosure",
      "Powder room stone detail",
      "Custom closet build-out",
      "Bedroom with new lighting layout",
      "Living room built-in shelving",
    ],
  },
  {
    id: "soho",
    name: "SoHo",
    type: "Millwork-led renovation",
    meta: "Cast-iron loft · Kitchen, baths, and millwork",
    featured: "Featured: great room with original cast-iron columns",
    description:
      "A millwork-led renovation of a cast-iron loft. Full-height paneling, concealed doors, and a library wall were built to align with the existing column grid, with the kitchen and bathrooms rebuilt to match.",
    scope: [
      "Full-height wall paneling and concealed doors",
      "Library shelving and integrated storage",
      "Kitchen with paneled appliance integration",
      "Primary bathroom with book-matched stone",
      "Soundproofed bedroom partition and insulation",
      "Trade coordination with the design team throughout",
    ],
    gallery: [
      "Great room with original cast-iron columns",
      "Full-height millwork wall",
      "Library shelving detail",
      "Kitchen with integrated paneling",
      "Island and stone detail",
      "Primary bath with book-matched stone",
      "Vanity and fixture detail",
      "Concealed door and trim alignment",
      "Bedroom with soundproofed partition",
      "Entry and coat closet build-out",
    ],
  },
];

function ImagePlaceholder({ note, size, className = "", src }) {
  return (
    <div
      className={`image-placeholder ${src ? "has-image" : ""} ${className}`}
      role="img"
      aria-label={src ? note : `Image placeholder: ${note}`}
    >
      {src ? <img src={src} alt="" /> : null}
      {src ? null : <span>Image placeholder</span>}
      {src ? null : <strong>{note}</strong>}
      {src || !size ? null : <small>Recommended: {size}</small>}
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
    ["/portfolio", "Portfolio"],
    ["/services", "Services"],
    ["/process", "Process"],
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
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} GB Renovations NYC.</span>
        <nav className="footer-links" aria-label="Footer">
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/services">Services</Link>
          <Link to="/process">Process</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
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
          src={heroImage}
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
        <div className="container trust-inner">
          <p className="trust-title">Every detail lives under one roof.</p>
          <ul className="trust-list">
            <li>Co-op and condo coordination</li>
            <li>Architect and designer collaboration</li>
            <li>Trade and material management</li>
            <li>Final walkthrough and closeout</li>
          </ul>
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
            <Button to="/process">See our process</Button>
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

function Services() {
  return (
    <>
      <section className="simple-hero">
        <div className="container reveal">
          <p className="eyebrow">Services</p>
          <h1>Everything the build requires.</h1>
          <p className="lead">
            We carry the whole renovation, from demolition and infrastructure
            through millwork, finishes, and final handoff, with one team
            accountable for the result.
          </p>
        </div>
      </section>
      <section className="list-page">
        <div className="container service-grid">
          {services.map(({ title, copy, items, to, linkLabel }) => (
            <article className="service-card reveal" key={title}>
              <h2>{title}</h2>
              <p>{copy}</p>
              <ul className="service-items">
                {items.map((item) => (
                  <li key={item}>
                    <Check size={13} weight="bold" />
                    {item}
                  </li>
                ))}
              </ul>
              {to ? (
                <Link className="service-card-link" to={to}>
                  {linkLabel} <ArrowRight size={15} weight="bold" />
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}

function Process() {
  return (
    <>
      <section className="simple-hero">
        <div className="container reveal">
          <p className="eyebrow">Process</p>
          <h1>Six steps, start to finish.</h1>
          <p className="lead">
            Every project follows the same path, so you always know what happens
            next, who is doing it, and what it costs.
          </p>
        </div>
      </section>
      <section className="list-page">
        <div className="container numbered-list">
          {processSteps.map(([title, copy], i) => (
            <article className="numbered-row reveal" key={title}>
              <span className="numbered-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="numbered-body">
                <h2>{title}</h2>
                <p>{copy}</p>
              </div>
            </article>
          ))}
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

function ProjectPanel({ project, onClose }) {
  return (
    <div className="project-panel" id={`project-${project.id}`}>
      <div className="project-panel-head">
        <div>
          <p className="eyebrow">{project.type}</p>
          <h2>{project.name}</h2>
          <p className="project-panel-meta">{project.meta}</p>
        </div>
        <button className="project-close" onClick={onClose}>
          <X size={15} weight="bold" /> Close
        </button>
      </div>
      <div className="project-panel-body">
        <p className="lead">{project.description}</p>
        <div className="project-scope">
          <strong>Project scope</strong>
          <ul>
            {project.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="project-gallery">
        {project.gallery.map((note, i) => (
          <ImagePlaceholder
            key={note}
            className={i === 0 ? "gallery-lead" : ""}
            note={note}
            size={i === 0 ? "2000 × 1400 px" : undefined}
          />
        ))}
      </div>
      <button className="project-close bottom" onClick={onClose}>
        <X size={15} weight="bold" /> Close and return to all projects
      </button>
    </div>
  );
}

function Portfolio() {
  const [openId, setOpenId] = useState(null);
  const panelRef = useRef(null);
  const gridRef = useRef(null);
  const mounted = useRef(false);
  const open = portfolio.find((p) => p.id === openId) || null;

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const target = openId ? panelRef.current : gridRef.current;
    if (!target) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 116,
      behavior: reduced ? "instant" : "smooth",
    });
  }, [openId]);

  return (
    <>
      <section className="simple-hero">
        <div className="container reveal">
          <p className="eyebrow">Portfolio</p>
          <h1>Work that should speak for itself.</h1>
          <p className="lead">
            Select a project to open its full gallery, description, and scope
            without leaving this page.
          </p>
        </div>
      </section>
      <section className="portfolio-page">
        <div className="container">
          <div className="portfolio-grid" ref={gridRef}>
            {portfolio.map((project) => {
              const isOpen = project.id === openId;
              return (
                <article
                  className={`portfolio-item${isOpen ? " is-open" : ""}`}
                  key={project.id}
                >
                  <button
                    className="portfolio-trigger"
                    onClick={() => setOpenId(isOpen ? null : project.id)}
                    aria-expanded={isOpen}
                    aria-controls={`project-${project.id}`}
                  >
                    <ImagePlaceholder note={project.featured} />
                    <span className="portfolio-meta">
                      <span className="portfolio-type">{project.type}</span>
                      <span className="portfolio-name">{project.name}</span>
                      <span className="portfolio-action">
                        {isOpen ? (
                          <>
                            <Minus size={13} weight="bold" /> Close gallery
                          </>
                        ) : (
                          <>
                            <Plus size={13} weight="bold" /> View{" "}
                            {project.gallery.length} photos
                          </>
                        )}
                      </span>
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
          {open ? (
            <div ref={panelRef}>
              <ProjectPanel project={open} onClose={() => setOpenId(null)} />
            </div>
          ) : null}
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
            <p className="credential">
              <Check size={15} weight="bold" />
              <span>{LICENSE_LINE}</span>
            </p>
            <Button>Start a conversation</Button>
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
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/process" element={<Process />} />
        <Route path="/kitchens" element={<ServicePage type="kitchens" />} />
        <Route path="/bathrooms" element={<ServicePage type="bathrooms" />} />
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
