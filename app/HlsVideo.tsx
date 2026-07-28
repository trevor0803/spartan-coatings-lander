"use client";

import Hls from "hls.js";
import { useEffect, useRef } from "react";

const VIDEO_SOURCE = "/vsl/index.m3u8";

export default function HlsVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_SOURCE;
      return;
    }

    if (!Hls.isSupported()) {
      return;
    }

    const hls = new Hls();
    hls.loadSource(VIDEO_SOURCE);
    hls.attachMedia(video);

    return () => hls.destroy();
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
