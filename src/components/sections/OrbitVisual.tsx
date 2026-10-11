import type { CSSProperties } from 'react';
import { tech, type TechId } from '@/data/tech';
import { TechIcon } from '../ui/TechIcon';

type Ring = { size: number; duration: string; items: { id: TechId; angle: number; color: string }[] };

// Decorative: the stack "orbiting" the product. The real explanation lives in the Stack section.
const rings: Ring[] = [
  {
    size: 66,
    duration: '40s',
    items: [
      { id: 'nextjs', angle: 20, color: 'text-layer-ui' },
      { id: 'react', angle: 140, color: 'text-layer-ui' },
      { id: 'typescript', angle: 260, color: 'text-layer-ui' },
    ],
  },
  {
    size: 94,
    duration: '60s',
    items: [
      { id: 'fastify', angle: 80, color: 'text-layer-api' },
      { id: 'sequelize', angle: 200, color: 'text-layer-data' },
      { id: 'postgresql', angle: 320, color: 'text-layer-data' },
    ],
  },
];

export function OrbitVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-105">
      <div className="absolute inset-[32%] grid place-items-center rounded-full border border-line bg-surface shadow-card">
        <div className="text-center">
          <p className="font-logo text-base text-brand-strong sm:text-xl">OrbitOps</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted sm:text-xs">multi-tenant CRM</p>
        </div>
      </div>
      {rings.map((ring) => {
        const spin = { '--d': ring.duration } as CSSProperties;
        return (
          <div
            key={ring.size}
            className="absolute rounded-full border border-dashed border-line motion-safe:animate-[spin_var(--d)_linear_infinite]"
            style={{ ...spin, inset: `${(100 - ring.size) / 2}%` }}
          >
            {ring.items.map((item) => {
              const rad = (item.angle * Math.PI) / 180;
              return (
                <span
                  key={item.id}
                  className={`absolute grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border border-line bg-surface shadow-card sm:size-12 ${item.color}`}
                  style={{ left: `${50 + 50 * Math.sin(rad)}%`, top: `${50 - 50 * Math.cos(rad)}%` }}
                >
                  {/* Counter-rotates so the logo stays upright while the ring turns. */}
                  <span className="motion-safe:animate-[spin_var(--d)_linear_infinite_reverse]" style={spin}>
                    <TechIcon icon={tech[item.id].icon} className="size-5 sm:size-6" />
                  </span>
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
