import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

/* ─────────────── ASCII ART ─────────────── */
const ASCII_ART = [
  '██╗   ██╗██╗███╗   ██╗██╗████████╗',
  '██║   ██║██║████╗  ██║██║╚══██╔══╝',
  '██║   ██║██║██╔██╗ ██║██║   ██║   ',
  '╚██╗ ██╔╝██║██║╚██╗██║██║   ██║   ',
  ' ╚████╔╝ ██║██║ ╚████║██║   ██║   ',
  '  ╚═══╝  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝  ',
];

/* ─────────────── PROMPT COMPONENT ─────────────── */
const Prompt = () => (
  <span className="prompt">
    <span className="p-bracket">[</span>
    <span className="p-user">visitor</span>
    <span className="p-at">@</span>
    <span className="p-host">vinit.dev</span>
    <span className="p-bracket">]</span>
    <span className="p-dir"> ~</span>
    <span className="p-sym">$ </span>
  </span>
);

/* ─────────────── COMMAND DEFINITIONS ─────────────── */
const COMMANDS = {
  help: () => ({
    type: 'help',
    items: [
      { cmd: 'about',    desc: '— who i am' },
      { cmd: 'projects', desc: '— my projects' },
      { cmd: 'stack',    desc: '— tech stack' },
      { cmd: 'contact',  desc: '— how to reach me' },
      { cmd: 'all',      desc: '— show everything at once' },
      { cmd: 'github',   desc: '— open github profile' },
      { cmd: 'whoami',   desc: '— quick intro' },
      { cmd: 'banner',   desc: '— show ascii art' },
      { cmd: 'clear',    desc: '— clear terminal' },
    ],
  }),

  about: () => ({
    type: 'text',
    lines: [
      { text: '# about vinit yadav', heading: true },
      { text: '' },
      { text: "I'm a highly driven developer passionate about building" },
      { text: 'apps that solve real problems.' },
      { text: '' },
      { text: 'From Flutter mobile apps and Unity game development' },
      { text: 'to full-stack web projects — I love shipping products' },
      { text: 'that feel great to use.' },
      { text: '' },
      { text: 'Currently exploring backend engineering & cybersecurity.' },
      { text: 'Based in India. Open to remote freelance & contract work.' },
    ],
  }),

  projects: () => ({
    type: 'projects',
    items: [
      { num: '01', name: 'Proximity',    desc: 'Location-based app with real-time discovery', tech: 'Flutter', year: '2024', url: 'https://github.com/Shamstir/proximity' },
      { num: '02', name: 'Ember Grants', desc: 'Grant management platform for fund tracking',  tech: 'JavaScript', year: '2024', url: 'https://github.com/Shamstir/Ember-Grants' },
      { num: '03', name: 'Paryatak',     desc: 'Travel app for discovering destinations',       tech: 'JavaScript', year: '2023', url: 'https://github.com/Shamstir/paryatak' },
      { num: '04', name: 'Insta Clone',  desc: 'Full Instagram clone with real-time chat',      tech: 'Flutter', year: '2023', url: 'https://github.com/Shamstir/insta' },
      { num: '05', name: 'Educat',       desc: 'Education platform with interactive content',   tech: 'Flutter', year: '2023', url: 'https://github.com/Shamstir/Educat' },
      { num: '06', name: 'FleetIQ',      desc: 'Fleet management with vehicle tracking',        tech: 'Flutter', year: '2022', url: 'https://github.com/Shamstir/fleetIQ' },
      { num: '07', name: "Let's Talk",   desc: 'Real-time chat with media sharing',             tech: 'Flutter', year: '2022', url: 'https://github.com/Shamstir/Let-s_Talk' },
    ],
  }),

  stack: () => ({
    type: 'stack',
    items: [
      { cat: 'Mobile',   tools: ['Flutter', 'Dart'] },
      { cat: 'Web',      tools: ['React', 'JavaScript'] },
      { cat: 'Backend',  tools: ['Node.js', 'Firebase'] },
      { cat: 'Game Dev', tools: ['Unity', 'C#'] },
      { cat: 'Systems',  tools: ['C++'] },
      { cat: 'Tooling',  tools: ['Git', 'GitHub'] },
    ],
  }),

  contact: () => ({
    type: 'contact',
    items: [
      { label: 'email',    value: 'vyadav1267354@gmail.com',     url: 'mailto:vyadav1267354@gmail.com' },
      { label: 'github',   value: 'github.com/shamstir',          url: 'https://github.com/shamstir' },
      { label: 'linkedin', value: 'in/vinit-yadav-1bb36728b',     url: 'https://linkedin.com/in/vinit-yadav-1bb36728b/' },
    ],
  }),

  whoami: () => ({
    type: 'whoami',
    items: [
      { key: 'name',       val: 'Vinit Yadav' },
      { key: 'role',       val: 'App Developer' },
      { key: 'location',   val: 'India' },
      { key: 'stack',      val: 'Flutter · React · Unity' },
      { key: 'status',     val: 'available for work ✓' },
    ],
  }),

  banner: () => ({
    type: 'banner',
    lines: ASCII_ART,
  }),

  github: () => {
    setTimeout(() => window.open('https://github.com/shamstir', '_blank'), 300);
    return {
      type: 'text',
      lines: [{ text: 'opening github.com/shamstir ...' }],
    };
  },

  all: () => ({
    type: 'all',
    sections: [
      COMMANDS.about(),
      COMMANDS.projects(),
      COMMANDS.stack(),
      COMMANDS.contact(),
    ],
  }),
};

const CMD_KEYS = Object.keys(COMMANDS);

/* ─────────────── OUTPUT ENTRY RENDERER ─────────────── */
function OutputEntry({ entry }) {
  const { type } = entry;

  if (type === 'banner') {
    return (
      <div className="te-banner">
        {entry.lines.map((l, i) => <pre key={i} className="te-ascii">{l}</pre>)}
      </div>
    );
  }

  if (type === 'boot-line') {
    return <div className={`te-line${entry.dim ? ' te-dim' : entry.muted ? ' te-muted' : ''}`}>{entry.text}</div>;
  }

  if (type === 'input-echo') {
    return (
      <div className="te-input-echo">
        <Prompt />
        <span className="te-cmd">{entry.cmd}</span>
      </div>
    );
  }

  if (type === 'error') {
    return <div className="te-output te-error">{entry.text}</div>;
  }

  if (type === 'help') {
    return (
      <div className="te-help">
        <div className="te-section-label">Available commands:</div>
        <div className="te-help-grid">
          {entry.items.map(({ cmd, desc }) => (
            <div key={cmd} className="te-help-row">
              <span className="te-help-cmd">{cmd}</span>
              <span className="te-help-desc">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'projects') {
    return (
      <div className="te-projects">
        <div className="te-section-label">projects  <span style={{ color: 'var(--surface2)', fontWeight: 400 }}>({entry.items.length} found)</span></div>
        {entry.items.map(p => (
          <div key={p.num} className="te-project-row">
            <span className="te-proj-num">{p.num}</span>
            <span className="te-proj-name">
              <a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a>
            </span>
            <span className="te-proj-desc">{p.desc}</span>
            <span className="te-proj-tech">[{p.tech}]</span>
            <span className="te-proj-year">{p.year}</span>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'stack') {
    return (
      <div className="te-stack">
        <div className="te-section-label">tech stack</div>
        {entry.items.map(({ cat, tools }) => (
          <div key={cat} className="te-stack-row">
            <span className="te-stack-cat">{cat}</span>
            <span className="te-stack-items">{tools.join('  ·  ')}</span>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'contact') {
    return (
      <div className="te-contact">
        <div className="te-section-label">contact</div>
        {entry.items.map(({ label, value, url }) => (
          <div key={label} className="te-contact-row">
            <span className="te-contact-label">{label}</span>
            <a href={url} target="_blank" rel="noopener noreferrer" className="te-contact-link">{value}</a>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'whoami') {
    return (
      <div className="te-whoami">
        {entry.items.map(({ key, val }) => (
          <div key={key} className="te-whoami-line">
            <span className="te-whoami-key">{key}</span>
            <span className="te-whoami-value">{val}</span>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className="te-text">
        {entry.lines.map((l, i) => (
          <div key={i} className={`te-line${l.heading ? ' te-heading' : ''}`}>
            {l.heading ? l.text.replace(/^# /, '') : l.text}
          </div>
        ))}
      </div>
    );
  }

  if (type === 'all') {
    return (
      <div className="te-all">
        {entry.sections.map((section, i) => (
          <div key={i} className="te-all-section">
            {i > 0 && <div className="te-divider" />}
            <OutputEntry entry={{ ...section, id: `all-${i}` }} />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

/* ─────────────── APP ─────────────── */
export default function App() {
  const [bootEntries, setBootEntries] = useState([]);  // permanent — never cleared
  const [entries,     setEntries]     = useState([]);  // session — cleared by 'clear'
  const [input,       setInput]       = useState('');
  const [cmdHistory,  setCmdHistory]  = useState([]);
  const [histIdx,     setHistIdx]     = useState(-1);
  const [booted,      setBooted]      = useState(false);

  const bodyRef  = useRef(null);
  const inputRef = useRef(null);
  let   idSeq    = useRef(0);

  const nextId = () => ++idSeq.current;

  const bootStarted = useRef(false);

  /* ── Boot sequence ── */
  useEffect(() => {
    if (bootStarted.current) return;
    bootStarted.current = true;
    const bootLines = [
      { type: 'banner', lines: ASCII_ART },
      { type: 'boot-line', text: '' },
      { type: 'boot-line', text: 'vinit.dev  —  Portfolio Shell v1.0', dim: true },
      { type: 'boot-line', text: 'App Developer  ·  Flutter  ·  React  ·  Unity', dim: true },
      { type: 'boot-line', text: '' },
      { type: 'boot-line', text: "type 'help' and press Enter to see available commands.", muted: true },
      { type: 'boot-line', text: '' },
    ];

    bootLines.forEach((line, i) => {
      setTimeout(() => {
        setBootEntries(prev => [...prev, { ...line, id: nextId() }]);
        if (i === bootLines.length - 1) setBooted(true);
      }, i * 60);
    });
  }, []);

  /* ── Auto-run 'all' once boot completes ── */
  useEffect(() => {
    if (!booted) return;
    const t = setTimeout(() => {
      const echoEntry = { id: nextId(), type: 'input-echo', cmd: 'all' };
      const result    = COMMANDS.all();
      setEntries(prev => [...prev, echoEntry, { id: nextId(), ...result }]);
    }, 300);
    return () => clearTimeout(t);
  }, [booted]);

  /* ── Auto-scroll ── */
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  /* ── Focus input on any click ── */
  const focusInput = useCallback((e) => {
    // don't steal focus from links
    if (e.target.tagName === 'A') return;
    inputRef.current?.focus();
  }, []);

  /* ── Run command ── */
  const runCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();

    const echoEntry = { id: nextId(), type: 'input-echo', cmd: raw.trim() || '' };

    if (cmd === 'clear') {
      setEntries([]);
      return;
    }

    if (!cmd) {
      setEntries(prev => [...prev, echoEntry]);
      return;
    }

    setCmdHistory(h => [cmd, ...h]);
    setHistIdx(-1);

    const handler = COMMANDS[cmd];
    if (handler) {
      const result = handler();
      setEntries(prev => [...prev, echoEntry, { id: nextId(), ...result }]);
    } else {
      // fuzzy hint
      const close = CMD_KEYS.find(k => k.startsWith(cmd[0]));
      const hint  = close ? `  did you mean '${close}'?` : "  type 'help' to see available commands.";
      setEntries(prev => [...prev, echoEntry, {
        id: nextId(), type: 'error',
        text: `command not found: ${cmd}.${hint}`,
      }]);
    }
  }, []);

  /* ── Key handling ── */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistIdx(i => {
        const next = Math.min(i + 1, cmdHistory.length - 1);
        setInput(cmdHistory[next] ?? '');
        return next;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistIdx(i => {
        const next = Math.max(i - 1, -1);
        setInput(next < 0 ? '' : cmdHistory[next] ?? '');
        return next;
      });
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (!input) return;
      const match = CMD_KEYS.find(k => k.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  }, [input, cmdHistory, runCommand]);

  return (
    <div className="terminal-page" onClick={focusInput}>
      {/* ── Title Bar ── */}
      <div className="terminal-titlebar">
        <span className="terminal-title">visitor@vinit.dev — zsh</span>
      </div>

      {/* ── Body ── */}
      <div className="terminal-body" ref={bodyRef}>
      {/* ── Permanent boot section ── */}
        {bootEntries.map(entry => (
          <OutputEntry key={entry.id} entry={entry} />
        ))}

        {/* ── Clearable session history ── */}
        {entries.map(entry => (
          <OutputEntry key={entry.id} entry={entry} />
        ))}

        {/* Active prompt */}
        {booted && (
          <div className="terminal-prompt-line">
            <Prompt />
            <input
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        )}
      </div>
    </div>
  );
}