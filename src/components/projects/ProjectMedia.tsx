'use client';

import { Play, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/data/projects';

type Props = { project: Project & { media: NonNullable<Project['media']> }; hovering: boolean };

// Mouse users get a silent preview on hover; everyone gets a "Watch demo" button that opens
// the full recording in a modal. The poster is a lazy image and the <video> elements are only
// created on demand, so no video bytes are downloaded until someone asks for them.
export function ProjectMedia({ project, hovering }: Props) {
  const [previewing, setPreviewing] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const canPreview =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (hovering && canPreview) setPreviewing(true);
    const video = previewRef.current;
    if (!video) return;
    if (hovering && canPreview) video.play().catch(() => {});
    else video.pause();
  }, [hovering, previewing]);

  useEffect(() => {
    if (playerOpen) dialogRef.current?.showModal();
  }, [playerOpen]);

  return (
    <>
      <div className="relative aspect-video overflow-hidden border-b border-line bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export: images are pre-optimised */}
        <img
          src={project.media.poster}
          alt=""
          width={960}
          height={540}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-top"
        />
        {previewing && (
          <video
            ref={previewRef}
            src={project.media.video}
            muted
            loop
            playsInline
            aria-hidden="true"
            tabIndex={-1}
            className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-300 ${hovering ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        <button
          type="button"
          onClick={() => setPlayerOpen(true)}
          className="absolute bottom-3 left-3 inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[rgb(2_6_23/0.75)] px-3 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-[rgb(2_6_23/0.9)]"
        >
          <Play className="size-3.5 fill-current" aria-hidden="true" />
          Watch demo<span className="sr-only">: {project.title}</span>
        </button>
      </div>

      {playerOpen && (
        <dialog
          ref={dialogRef}
          aria-label={`${project.title} demo video`}
          onClose={() => setPlayerOpen(false)}
          onClick={(e) => {
            if (e.target === dialogRef.current) dialogRef.current?.close();
          }}
          className="m-auto w-[min(960px,calc(100vw-2rem))] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-[rgb(2_6_23/0.8)]"
        >
          <div className="relative pt-14">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="absolute right-0 top-0 grid size-11 place-items-center rounded-full bg-surface text-fg"
              aria-label="Close video"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <video
              src={project.media.video}
              poster={project.media.poster}
              controls
              autoPlay
              muted
              playsInline
              className="aspect-video w-full rounded-xl bg-black"
            />
          </div>
        </dialog>
      )}
    </>
  );
}
