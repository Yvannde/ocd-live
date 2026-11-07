"use client";

import { useState } from "react";
import { IconPlay } from "@/components/icons";
import { brand } from "@/config/site";
import { copy } from "@/config/copy.fr";

export function HeroVideo() {
  const [playing, setPlaying] = useState(false);
  const { src, poster, label } = brand.video;
  const hasSrc = Boolean(src);
  const { video: videoCopy } = copy.hero;

  if (playing && hasSrc) {
    return (
      <div className="relative aspect-video w-full border border-line bg-dark-bg">
        <video
          className="h-full w-full object-cover"
          src={src}
          poster={poster || undefined}
          controls
          autoPlay
          playsInline
        >
          <track kind="captions" />
        </video>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full border border-line bg-dark-bg">
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element -- remote poster URL from config
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
      ) : (
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--mode-a) 0%, transparent 45%, var(--mode-b) 100%)",
          }}
          aria-hidden
        />
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <button
          type="button"
          disabled={!hasSrc}
          onClick={() => hasSrc && setPlaying(true)}
          aria-label={hasSrc ? label || videoCopy.play : videoCopy.placeholderTitle}
          className="flex h-16 w-16 items-center justify-center bg-bg text-ink transition-opacity duration-150 enabled:hover:opacity-90 disabled:cursor-default disabled:opacity-70"
        >
          <IconPlay size={28} className="ml-0.5" />
        </button>
        <div>
          <p className="font-mono text-[13px] text-dark-text">
            {hasSrc ? label || videoCopy.play : videoCopy.placeholderTitle}
          </p>
          {!hasSrc ? (
            <p className="mt-1 max-w-[28ch] text-[13px] text-dark-muted">
              {videoCopy.placeholderHint}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
