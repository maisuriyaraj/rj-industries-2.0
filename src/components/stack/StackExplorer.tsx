'use client';

import { Play, RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { flowSteps, layers, type LayerId } from '@/data/stack';
import { tech } from '@/data/tech';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { buttonClass } from '../ui/Button';
import { TechBadge, TechIcon } from '../ui/TechIcon';

const STEP_MS = 1300;

const layerTone: Record<LayerId, { text: string; border: string; bg: string; ring: string }> = {
  ui: { text: 'text-layer-ui', border: 'border-layer-ui', bg: 'bg-layer-ui', ring: 'ring-layer-ui/25' },
  api: { text: 'text-layer-api', border: 'border-layer-api', bg: 'bg-layer-api', ring: 'ring-layer-api/25' },
  data: { text: 'text-layer-data', border: 'border-layer-data', bg: 'bg-layer-data', ring: 'ring-layer-data/25' },
};

export function StackExplorer() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<LayerId>('ui');
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [packetY, setPacketY] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<LayerId, HTMLButtonElement | null>>({ ui: null, api: null, data: null });

  const current = step >= 0 ? flowSteps[step] : undefined;
  const flowLayer = current?.layer;
  const selectedLayer = layers.find((l) => l.id === selected) ?? layers[0]!;

  // Walk through the request one step at a time; each step also opens that layer's details.
  useEffect(() => {
    if (!running) return;
    if (step >= flowSteps.length - 1) {
      setRunning(false);
      return;
    }
    const timer = window.setTimeout(() => setStep((s) => s + 1), step < 0 ? 0 : STEP_MS);
    return () => window.clearTimeout(timer);
  }, [running, step]);

  useEffect(() => {
    if (flowLayer) setSelected(flowLayer);
  }, [flowLayer]);

  const measure = useCallback(() => {
    const rail = railRef.current;
    const tab = flowLayer ? tabRefs.current[flowLayer] : null;
    if (!rail || !tab) return setPacketY(null);
    const r = rail.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    setPacketY(t.top - r.top + t.height / 2);
  }, [flowLayer]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const start = () => {
    if (reduced) {
      setRunning(false);
      setStep(flowSteps.length - 1);
      return;
    }
    setStep(-1);
    setRunning(true);
  };

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const delta = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 0;
    let nextIndex = index + delta;
    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = layers.length - 1;
    else if (!delta) return;
    event.preventDefault();
    const next = layers[(nextIndex + layers.length) % layers.length]!;
    setSelected(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
      {/* Diagram */}
      <div data-reveal className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <p className="font-mono text-xs text-muted">
            <span aria-hidden="true">● ● ● </span>request-flow.ts
          </p>
          <button type="button" onClick={start} disabled={running} className={buttonClass('primary', 'min-h-9 shrink-0 whitespace-nowrap px-3 py-1.5 text-xs')}>
            {step === flowSteps.length - 1 && !running ? (
              <RotateCcw className="size-3.5" aria-hidden="true" />
            ) : (
              <Play className="size-3.5" aria-hidden="true" />
            )}
            {running ? 'Sending…' : step === flowSteps.length - 1 ? 'Send again' : 'Send a request'}
          </button>
        </div>

        <div className="bg-blueprint p-4 sm:p-6">
          <div ref={railRef} className="relative pl-10 sm:pl-12">
            <div aria-hidden="true" className="absolute bottom-6 left-4 top-6 border-l-2 border-dashed border-line sm:left-5" />
            {packetY !== null && flowLayer && (
              <span
                aria-hidden="true"
                style={{ top: packetY }}
                className={cn(
                  'absolute left-4 z-10 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-surface transition-[top,background-color] duration-500 ease-out-soft sm:left-5',
                  layerTone[flowLayer].bg,
                )}
              />
            )}

            <div role="tablist" aria-label="Stack layers" aria-orientation="vertical" className="space-y-3">
              {layers.map((layer, index) => {
                const tone = layerTone[layer.id];
                const isSelected = selected === layer.id;
                const isFlowing = flowLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    ref={(el) => {
                      tabRefs.current[layer.id] = el;
                    }}
                    id={`layer-tab-${layer.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls="layer-panel"
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelected(layer.id)}
                    onKeyDown={(e) => onTabKey(e, index)}
                    className={cn(
                      'group relative block w-full rounded-xl border-2 bg-surface p-4 text-left transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5',
                      isSelected ? tone.border : 'border-line hover:border-[color-mix(in_srgb,var(--text-muted)_40%,transparent)]',
                      isFlowing && cn('shadow-card ring-4', tone.ring),
                    )}
                  >
                    <span className={cn('font-mono text-[11px] font-medium uppercase tracking-[0.1em]', tone.text)}>
                      {String(index + 1).padStart(2, '0')} · {layer.label}
                    </span>
                    <span className="mt-1 block font-semibold text-fg">{layer.caption}</span>
                    <span className="mt-3 flex gap-2" aria-hidden="true">
                      {layer.tech.map((id) => (
                        <span key={id} className={cn('grid size-8 place-items-center rounded-lg bg-surface-2', tone.text)}>
                          <TechIcon icon={tech[id].icon} className="size-4" />
                        </span>
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <ol className="mt-6 space-y-2" aria-label="Example request, step by step">
            {flowSteps.map((s, i) => {
              const done = i <= step;
              const isCurrent = i === step;
              return (
                <li
                  key={s.code}
                  className={cn(
                    'flex gap-3 rounded-lg border px-3 py-2 transition-colors duration-200',
                    isCurrent ? 'border-brand-strong bg-surface' : 'border-transparent',
                    !done && step >= 0 && 'opacity-60',
                  )}
                >
                  <span className={cn('font-mono text-xs leading-6', layerTone[s.layer].text)}>{i + 1}.</span>
                  <span className="min-w-0">
                    <code className="block break-words font-mono text-[13px] text-fg">{s.code}</code>
                    <span className="block text-sm text-muted">{s.note}</span>
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="sr-only" aria-live="polite">
            {current ? `Step ${step + 1} of ${flowSteps.length}: ${current.note}` : ''}
          </p>
        </div>
      </div>

      {/* Selected layer details */}
      <div
        id="layer-panel"
        role="tabpanel"
        aria-labelledby={`layer-tab-${selectedLayer.id}`}
        data-reveal
        className={cn('self-start rounded-2xl border-2 bg-surface p-6 shadow-card transition-colors duration-200 sm:p-8 lg:sticky lg:top-24', layerTone[selectedLayer.id].border)}
      >
        <p className={cn('font-mono text-xs font-medium uppercase tracking-[0.1em]', layerTone[selectedLayer.id].text)}>
          {selectedLayer.label}
        </p>
        <h3 className="mt-2 text-2xl font-bold">{selectedLayer.caption}</h3>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools in this layer">
          {selectedLayer.tech.map((id) => (
            <li key={id}>
              <TechBadge id={id} />
            </li>
          ))}
        </ul>
        <h4 className="mt-8 font-semibold text-fg">What I’ve built with it</h4>
        <ul className="mt-3 space-y-3">
          {selectedLayer.built.map((item) => (
            <li key={item} className="flex gap-3 text-muted">
              <span aria-hidden="true" className={cn('mt-2.5 size-1.5 shrink-0 rounded-full', layerTone[selectedLayer.id].bg)} />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 border-t border-line pt-4 text-sm text-muted">
          The request on the left is a simplified example of how a call moves through OrbitOps.
        </p>
      </div>
    </div>
  );
}
