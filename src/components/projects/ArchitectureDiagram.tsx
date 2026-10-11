import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/cn';

const panels = [
  { name: 'Main Panel', who: 'Staff at subscribing companies', stack: ['Next.js 16 · React 19 · Redux Toolkit', 'shadcn/Radix UI · dnd-kit Kanban'], token: 'Org-scoped JWT' },
  { name: 'Master Admin', who: 'OrbitOps operations team', stack: ['Next.js 16 · React 19 · Redux Toolkit', 'Formik + Yup forms'], token: 'Master-scoped JWT' },
];

const modules = [
  { name: 'Auth', detail: 'JWT + rotating refresh tokens', highlight: true },
  { name: 'Operator', detail: 'Organizations, plans, bookings' },
  { name: 'Leads', detail: 'Pipeline stages, activity, notes' },
  { name: 'Contacts', detail: 'Notes, tags, lead conversion' },
  { name: 'Users', detail: '4-role hierarchy, team management' },
];

function Connector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-2 text-muted" aria-hidden="true">
      <span className="h-3 w-px bg-line" />
      <span className="font-mono text-[11px]">{label}</span>
      <ArrowDown className="size-3.5" />
    </div>
  );
}

// Two frontends, one Fastify API, one MySQL database, coloured by stack layer.
export function ArchitectureDiagram() {
  return (
    <figure className="bg-blueprint rounded-2xl border border-line p-4 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {panels.map((p) => (
          <div key={p.name} className="flex flex-col">
            <div className="flex-1 rounded-xl border-2 border-layer-ui bg-surface p-4">
              <p className="font-semibold text-fg">{p.name}</p>
              <p className="text-sm text-muted">{p.who}</p>
              {p.stack.map((line) => (
                <p key={line} className="mt-1 font-mono text-xs text-layer-ui">
                  {line}
                </p>
              ))}
            </div>
            <Connector label={p.token} />
          </div>
        ))}
      </div>

      <div className="rounded-xl border-2 border-layer-api bg-surface p-4">
        <p className="font-semibold text-fg">
          Backend API <span className="font-mono text-xs font-normal text-layer-api">· Fastify 5 modular monolith</span>
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {modules.map((m) => (
            <li
              key={m.name}
              className={cn(
                'rounded-lg border p-2.5 text-center',
                m.highlight ? 'border-layer-api bg-surface-2' : 'border-line',
              )}
            >
              <span className="block text-sm font-semibold text-fg">{m.name}</span>
              <span className="mt-0.5 block text-xs text-muted">{m.detail}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-lg bg-surface-2 px-3 py-2 text-center font-mono text-xs text-muted">
          Zod validation · every query scoped to its organization · rate-limited login
        </p>
      </div>

      <Connector label="Sequelize ORM" />

      <div className="mx-auto max-w-xs rounded-xl border-2 border-layer-data bg-surface p-4 text-center">
        <p className="font-semibold text-fg">MySQL</p>
        <p className="font-mono text-xs text-layer-data">18 models · 19 versioned migrations</p>
      </div>

      <figcaption className="mt-4 text-center text-sm text-muted">
        Two panels share one Fastify API over scope-separated tokens.
      </figcaption>
    </figure>
  );
}
