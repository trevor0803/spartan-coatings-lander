"use client";

import Hls from "hls.js";
import { useEffect, useRef } from "react";

const VIDEO_SOURCE = "/vsl/index.m3u8";

// Milestones reported to the pixel. Each fires once per page view.
//
// Distinct event names rather than one event with a percent parameter: Custom
// Audiences can filter on parameters, but named events are far easier to pick
// in Ads Manager and they show up in Events Manager without extra setup.
//
// Meta's own video-view audiences only cover videos hosted on Facebook and
// Instagram. A self-hosted VSL is invisible to them, so this is the only way to
// retarget on how much of it someone actually watched.
const MILESTONES: Array<{ at: number; event: string }> = [
  { at: 0.03, event: "VSLPlay" },      // 3% — a real start, not an accidental tap
  { at: 0.25, event: "VSL25" },
  { at: 0.5, event: "VSL50" },
  { at: 0.75, event: "VSL75" },
  { at: 0.95, event: "VSLComplete" },  // 95% — most people never watch the outro
];

type MetaPixel = (...args: unknown[]) => void;

function track(event: string, params: Record<string, unknown>) {
  try {
    const fbq = (window as unknown as { fbq?: MetaPixel }).fbq;
    if (typeof fbq === "function") fbq("trackCustom", event, params);
  } catch {
    /* tracking must never interfere with playback */
  }
}

export default function HlsVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fired = useRef<Set<string>>(new Set());

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    // Progress reporting. timeupdate fires roughly 4x a second, so every
    // milestone is guarded by the fired set or the pixel would be hammered.
    const onTimeUpdate = () => {
      const { currentTime, duration } = video;
      if (!duration || !Number.isFinite(duration)) return;
      const pct = currentTime / duration;
      for (const m of MILESTONES) {
        if (pct >= m.at && !fired.current.has(m.event)) {
          fired.current.add(m.event);
          track(m.event, {
            content_name: "Spartan VSL",
            percent: Math.round(m.at * 100),
            seconds: Math.round(currentTime),
            duration: Math.round(duration),
          });
        }
      }
    };

    // Someone who watches to the actual end still counts as complete even if
    // the 95% tick was missed by a seek.
    const onEnded = () => {
      if (fired.current.has("VSLComplete")) return;
      fired.current.add("VSLComplete");
      track("VSLComplete", {
        content_name: "Spartan VSL",
        percent: 100,
        seconds: Math.round(video.duration || 0),
        duration: Math.round(video.duration || 0),
      });
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    let hls: Hls | undefined;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_SOURCE;
    } else if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(VIDEO_SOURCE);
      hls.attachMedia(video);
    }

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      hls?.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      playsInline
      preload="metadata"
      poster="/spartan-video-thumbnail.webp"
      aria-label="Matt Casey concrete coating buyer guide"
    >
      Your browser does not support embedded video.
    </video>
  );
}
