import { startTransition, useEffect, useState } from "react";

const stats = [
  { label: "followers", value: "6k+", detail: "littlemen toys audience" },
  { label: "sales", value: "250+", detail: "littlemen toys orders" },
  { label: "hollow", value: "$85", detail: "made so far" },
  { label: "ap cs", value: "4", detail: "java exam score" },
];

const moneyTracker = {
  amount: "$1961.94",
  label: "money tracker",
  current: 1961.94,
  goal: 1000000000,
};

const ventures = [
  {
    id: "little-men-toys",
    title: "LittleMenToys",
    eyebrow: "2024-2026",
    summary: "first time i saw attention actually turn into demand.",
    metric: "first traction",
    detail:
      "3d printed toy brand. this was one of the first things that made me feel like ok yeah i can actually make something people want and buy.",
    notes: ["3d printed", "audience growth", "founder led"],
  },
  {
    id: "hollow",
    title: "Hollow",
    eyebrow: "2025-now",
    summary: "probably the biggest long term bet for me.",
    metric: "core future bet",
    detail:
      "built around the 0W watch and zero, the software side behind it. its paused cause of money rn but im definitely not done with it.",
    notes: ["watch + software", "paused not dead", "long term priority"],
  },
  {
    id: "neuto",
    title: "Neuto",
    eyebrow: "paused concept",
    summary: "idea around ai and not letting it make your brain worse.",
    metric: "mind x ai",
    detail:
      "more about attention and training your mind instead of just outsourcing everything. not active rn but i still care about the idea.",
    notes: ["cognition", "mental training", "maybe later"],
  },
  {
    id: "nomax-games",
    title: "Nomax Games / Keratin",
    eyebrow: "current build",
    summary: "roblox studio im building around an original world and power system.",
    metric: "in development",
    detail:
      "keratin came from an anime idea i had when i was younger. its part game part worldbuilding and part me figuring out how to turn ideas into real stuff.",
    notes: ["roblox studio", "original ip", "worldbuilding"],
  },
];

const journalBits = [
  {
    title: "why im even doing this",
    body: "i dont just want one cool project. i want the reps, the judgment, and eventually the system behind a lot of things.",
    tone: "rainbow",
  },
  {
    title: "what still matters to me",
    body: "hollow is still one of the biggest ones in my head. even if its paused rn, it still feels real to me.",
    tone: "cool",
  },
  {
    title: "where this goes later",
    body: "everything is the long-term holding company idea. thats the structure above all the brands, apps, games, and future companies.",
    tone: "warm",
  },
];

const blogPlaceholder = {
  title: "keratin getting close",
  date: "april 21",
  summary: "beta soon maybe. traction feels real and people are actually liking it.",
  body:
    "[keratin] is coming to a finish in its development stage soon, hoping to launch the beta by the end of this week. i have one potential influencer who seems to be actually interested in the game, so maybe discounted advertisement?\n\n{solid organic growth} so far, glad to see people are liking the game",
};

const sectionLabelClass =
  "font-mono text-[0.7rem] tracking-[0.18em] text-white/42";

function SectionLabel({ children }) {
  return <p className={sectionLabelClass}>{children}</p>;
}

function AccentText({ children, tone = "rainbow" }) {
  const toneClass =
    tone === "warm"
      ? "text-[#ff8f7a]"
      : tone === "cool"
        ? "text-[#7ab6ff]"
        : tone === "gold"
          ? "gold-text"
        : "[background-image:var(--rainbow-accent)] bg-clip-text text-transparent";

  return <span className={toneClass}>{children}</span>;
}

function FlagWord({ word, colors }) {
  return (
    <span aria-label={word} role="text">
      {word.split("").map((letter, index) => (
        <span key={`${word}-${index}`} style={{ color: colors[index % colors.length] }}>
          {letter}
        </span>
      ))}
    </span>
  );
}

function formatDisplayDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

function renderInlineSyntax(text) {
  const tokens = [];
  const pattern = /(\[[^[\]]+\]|\{[^{}]+\}|<[^<>]+>)/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("[")) {
      tokens.push(
        <strong key={`${token}-${match.index}`} className="font-semibold text-white">
          {token.slice(1, -1)}
        </strong>
      );
    } else if (token.startsWith("{")) {
      tokens.push(
        <AccentText key={`${token}-${match.index}`} tone="rainbow">
          {token.slice(1, -1)}
        </AccentText>
      );
    } else {
      tokens.push(
        <AccentText key={`${token}-${match.index}`} tone="gold">
          {token.slice(1, -1)}
        </AccentText>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }

  return tokens;
}

function BlogBody({ content }) {
  return content.split("\n\n").map((paragraph, index) => (
    <p key={`${paragraph.slice(0, 12)}-${index}`} className="text-[0.98rem] leading-8 text-white/60">
      {renderInlineSyntax(paragraph)}
    </p>
  ));
}

function StatCell({ stat }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <p className="font-mono text-[0.7rem] tracking-[0.18em] text-white/38">
        {stat.label}
      </p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.08em] text-white sm:text-4xl">
        {stat.value}
      </p>
      <p className="mt-2 text-sm leading-6 text-white/52">{stat.detail}</p>
    </div>
  );
}

function VentureRow({ venture, isExpanded, onToggle }) {
  return (
    <article className="border-t border-white/10 first:border-t-0 transition duration-300 hover:border-white/18">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="group w-full py-6 text-left transition duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/12"
      >
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="font-mono text-[0.68rem] tracking-[0.18em] text-white/36">
                  {venture.eyebrow}
                </p>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <p className="font-mono text-[0.68rem] tracking-[0.18em] text-white/36">
                  {venture.metric}
                </p>
              </div>
              <div className="space-y-2.5">
                <h3 className="text-[1.7rem] font-semibold tracking-[-0.06em] text-white sm:text-[2rem]">
                  {venture.title}
                </h3>
                <p className="max-w-2xl text-base leading-7 text-white/58 sm:text-[1.04rem]">
                  {venture.summary}
                </p>
              </div>
            </div>

            <div className="hidden shrink-0 items-center gap-3 sm:flex">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition duration-200 ${
                  isExpanded
                    ? "border-white/22 bg-white/[0.05] text-white shadow-[0_0_30px_rgba(140,108,255,0.12)]"
                    : "border-white/10 bg-transparent text-white/42 group-hover:border-white/20 group-hover:text-white/70"
                }`}
              >
                <span
                  className={`block text-lg leading-none transition duration-200 ${
                    isExpanded ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </span>
            </div>
          </div>

          <div className="sm:hidden">
            <p className="font-mono text-[0.68rem] tracking-[0.18em] text-white/36">
              tap to expand
            </p>
          </div>
        </div>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="grid gap-6 border-t border-white/8 pt-5 text-white/58 sm:grid-cols-[minmax(0,1fr)_15rem] sm:gap-10">
            <p className="max-w-2xl text-[0.98rem] leading-7">{venture.detail}</p>

            <ul className="space-y-2 font-mono text-[0.72rem] tracking-[0.18em] text-white/36">
              {venture.notes.map((note) => (
                <li key={note} className="flex items-start gap-3">
                  <span className="mt-[0.38rem] h-1.5 w-1.5 rounded-full [background-image:var(--rainbow-accent)]" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

function JournalCard({ item }) {
  return (
    <article className="group rounded-[1.4rem] border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.04] hover:shadow-[0_12px_50px_rgba(116,89,255,0.09)]">
      <p className="font-mono text-[0.7rem] tracking-[0.18em] text-white/38">
        journal bit
      </p>
      <h3 className="mt-4 text-[1.15rem] font-medium tracking-[-0.05em] text-white">
        <AccentText tone={item.tone}>{item.title}</AccentText>
      </h3>
      <p className="mt-3 text-[0.98rem] leading-7 text-white/56">{item.body}</p>
    </article>
  );
}

export default function App() {
  const [expandedVentureId, setExpandedVentureId] = useState(ventures[0].id);
  const [activeJournalIndex, setActiveJournalIndex] = useState(0);
  const [route, setRoute] = useState(
    window.location.hash === "#secret" ? "secret" : "home"
  );
  const currentPageDate = formatDisplayDate(new Date().toISOString());
  const moneyProgress = Math.min(
    (moneyTracker.current / moneyTracker.goal) * 100,
    100
  );

  const toggleVenture = (ventureId) => {
    startTransition(() => {
      setExpandedVentureId((currentId) =>
        currentId === ventureId ? null : ventureId
      );
    });
  };

  useEffect(() => {
    const handlePointerMove = (event) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      startTransition(() => {
        setActiveJournalIndex((currentIndex) =>
          (currentIndex + 1) % journalBits.length
        );
      });
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const syncRoute = () => {
      setRoute(window.location.hash === "#secret" ? "secret" : "home");
    };

    window.addEventListener("hashchange", syncRoute);

    return () => {
      window.removeEventListener("hashchange", syncRoute);
    };
  }, []);

  if (route === "secret") {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="absolute left-6 top-6 font-mono text-[0.72rem] tracking-[0.18em] text-white/28">
            page date / {currentPageDate}
          </p>
          <a
            href="#"
            className="absolute right-6 top-6 font-mono text-[0.72rem] tracking-[0.18em] text-white/28 transition hover:text-white/52"
          >
            back
          </a>
          <p className="text-4xl font-semibold tracking-[-0.08em] text-white sm:text-6xl">
            ill make it.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="pointer-events-none fixed inset-0 opacity-70 [background:radial-gradient(28rem_28rem_at_var(--mx,50%)_var(--my,20%),rgba(255,255,255,0.12),transparent_70%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-50 [background:radial-gradient(42rem_18rem_at_50%_-8%,rgba(255,255,255,0.04),transparent_72%)]" />
      <main className="relative mx-auto flex max-w-[52rem] flex-col gap-20 px-5 pb-24 pt-8 sm:px-8 sm:pt-10 lg:px-10 lg:pt-12">
        <header className="flex items-center justify-between gap-4 text-[0.8rem]">
          <div className="flex items-center gap-3">
            <p className="font-mono font-medium text-white/74">svanski</p>
            <a
              href="#secret"
              aria-label="secret"
              className="h-2 w-2 rounded-full bg-transparent transition hover:bg-white/0 focus-visible:bg-white/0"
            />
          </div>
          <nav className="flex items-center gap-4 font-mono text-[0.72rem] tracking-[0.16em] text-white/42">
            <a href="#about" className="transition hover:text-white">
              about
            </a>
            <a href="#blog" className="transition hover:text-white">
              blog
            </a>
            <a href="#ventures" className="transition hover:text-white">
              ventures
            </a>
            <a href="#vision" className="transition hover:text-white">
              vision
            </a>
            <a
              href="https://x.com/svanski_"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              x
            </a>
          </nav>
        </header>

        <section className="pt-4 sm:pt-6">
          <div className="mt-16 max-w-4xl space-y-6 sm:space-y-7">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.08em] text-white sm:text-7xl lg:text-[5.6rem] lg:leading-[0.95]">
              Luka Liparteliani
            </h1>

            <div className="max-w-2xl space-y-5">
              <p className="text-xl leading-8 text-white/82 sm:text-[1.85rem] sm:leading-10">
                just me <AccentText tone="warm">building stuff</AccentText> and
                trying to <AccentText tone="rainbow">play long term</AccentText>
              </p>
              <p className="text-base leading-8 text-white/56 sm:text-lg">
                <FlagWord
                  word="georgian"
                  colors={["#ffffff", "#ff4d4d", "#ffffff", "#ff4d4d"]}
                />{" "}
                roots. born in{" "}
                <FlagWord
                  word="spain"
                  colors={["#c60b1e", "#ffc400", "#c60b1e"]}
                />
                . raised in{" "}
                <FlagWord
                  word="america"
                  colors={["#b22234", "#ffffff", "#3c3b6e"]}
                />
                . started with code and stayed for building
              </p>
              <p className="max-w-xl text-base leading-8 text-white/44 sm:text-[1.02rem]">
                this is more like my journal than a portfolio. just the early
                signs that something real might happen. and all of it is pointing
                toward <AccentText tone="gold">everything</AccentText>.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-4xl" id="about">
          <SectionLabel>context</SectionLabel>

          <div className="mt-8 space-y-7">
            <p className="max-w-3xl text-lg leading-8 text-white/62 sm:text-[1.18rem]">
              im 16 and still early on purpose. this isnt supposed to feel like a
              resume. its more like a record of the first real signs of motion
              while im still figuring things out and building bigger stuff.
            </p>

            <p className="max-w-2xl text-base leading-8 text-white/46 sm:text-[1.02rem]">
              some of this is traction. some of it is unfinished. some of it is
              just me knowing what i want to come back to.
            </p>

            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {stats.map((stat) => (
                <StatCell key={stat.label} stat={stat} />
              ))}
            </div>

            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.72rem] tracking-[0.18em] text-white/38">
                    {moneyTracker.label}
                  </p>
                  <p className="mt-3 text-4xl font-semibold tracking-[-0.08em] text-white sm:text-5xl">
                    {moneyTracker.amount}
                  </p>
                </div>
                <p className="font-mono text-[0.72rem] tracking-[0.18em] text-white/30">
                  goal / $1,000,000,000
                </p>
              </div>

              <div className="mt-6">
                <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full [background-image:var(--rainbow-accent)] shadow-[0_0_26px_rgba(255,255,255,0.12)] transition-all duration-700"
                    style={{ width: `${Math.max(moneyProgress, 0.18)}%` }}
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[0.68rem] tracking-[0.18em] text-white/30">
                  <span>0</span>
                  <span>{moneyProgress.toFixed(6)}%</span>
                  <span>1b</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl">
          <SectionLabel>current focus</SectionLabel>

          <div className="mt-8 border-t border-white/10 pt-9">
            <p className="max-w-3xl text-3xl font-semibold tracking-[-0.08em] text-white sm:text-[2.8rem] sm:leading-[1.02]">
              building <AccentText tone="cool">nomax games</AccentText>,
              keeping <AccentText tone="rainbow">hollow</AccentText> alive, and
              getting better at the actual game behind products leverage and
              execution
            </p>
          </div>
        </section>

        <section className="max-w-5xl">
          <SectionLabel>journal</SectionLabel>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {journalBits.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onMouseEnter={() => setActiveJournalIndex(index)}
                onFocus={() => setActiveJournalIndex(index)}
                onClick={() => setActiveJournalIndex(index)}
                className={`text-left transition duration-300 ${
                  activeJournalIndex === index ? "scale-[1.01]" : ""
                }`}
              >
                <JournalCard item={item} />
              </button>
            ))}
          </div>

          <div className="mt-5 flex gap-2">
            {journalBits.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-label={`show journal bit ${index + 1}`}
                onClick={() => setActiveJournalIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeJournalIndex === index
                    ? "w-12 gold-pill"
                    : "w-6 bg-white/12 hover:bg-white/20"
                }`}
              />
            ))}
          </div>
        </section>

        <section className="max-w-5xl" id="blog">
          <SectionLabel>blog</SectionLabel>

          <div className="mt-8">
            <article className="rounded-[1.4rem] border border-white/10 bg-white/[0.02] p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-[0.72rem] tracking-[0.18em] text-white/34">
                  entry / 001
                </p>
                <span className="h-1 w-1 rounded-full bg-white/18" />
                <p className="font-mono text-[0.72rem] tracking-[0.18em] text-white/34">
                  {blogPlaceholder.date}
                </p>
              </div>

              <h3 className="mt-5 text-[1.8rem] font-semibold tracking-[-0.07em] text-white sm:text-[2.3rem]">
                {blogPlaceholder.title}
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/50">
                {blogPlaceholder.summary}
              </p>

              <div className="mt-7 space-y-5">
                <BlogBody content={blogPlaceholder.body} />
              </div>
            </article>
          </div>
        </section>

        <section className="max-w-4xl" id="ventures">
          <SectionLabel>ventures</SectionLabel>

          <div className="mt-6 border-b border-white/10">
            {ventures.map((venture) => (
              <VentureRow
                key={venture.id}
                venture={venture}
                isExpanded={expandedVentureId === venture.id}
                onToggle={() => toggleVenture(venture.id)}
              />
            ))}
          </div>
        </section>

        <section className="max-w-4xl">
          <SectionLabel>everything</SectionLabel>

          <div className="group mt-8 border-t border-white/10 pt-9">
            <p className="max-w-3xl text-3xl font-semibold tracking-[-0.08em] text-white sm:text-[2.8rem] sm:leading-[1.02]">
              <AccentText tone="gold">everything</AccentText> is the long game
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/58 sm:text-lg">
              thats the holding company idea above all of this. littlemen toys,
              hollow, neuto, nomax games, and whatever comes later all point back
              to <AccentText tone="gold">everything</AccentText>, that bigger
              thing in my head.
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-white/42">
              i want <AccentText tone="gold">everything</AccentText> to be the
              thing that holds companies in a lot of markets eventually, not just
              one lane.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="gold-pill h-2.5 w-2.5 rounded-full" />
              <p className="font-mono text-[0.74rem] tracking-[0.18em] text-white/38">
                the endgame
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl" id="vision">
          <SectionLabel>vision</SectionLabel>

          <div className="mt-8 border-t border-white/10 pt-9">
            <p className="text-2xl font-semibold tracking-[-0.08em] text-white sm:text-[2.4rem] sm:leading-[1.05]">
              its bigger than <AccentText tone="rainbow">one company</AccentText>
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/58 sm:text-lg">
              get sharper. build more leverage. build across markets. whats here
              rn is really just the start before
              <span> </span>
              <AccentText tone="gold">everything</AccentText>
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-white/42">
              i want this to feel like looking at the notebook before the whole
              thing gets big.
            </p>
          </div>
        </section>

        <footer className="pt-2">
          <div className="max-w-3xl border-t border-white/10 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-[0.72rem] tracking-[0.18em] text-white/32">
                2026 / live document
              </p>
              <a
                href="https://x.com/svanski_"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[0.72rem] tracking-[0.18em] text-white/38 transition hover:text-white"
              >
                x / svanski_
              </a>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/38">
              if you found this early then you found it at the right time
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
