import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface UseHlsVideoOptions {
  src: string;
  autoplay?: boolean;
}

export function useHlsVideo({ src, autoplay = true }: UseHlsVideoOptions) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoplay && !prefersReducedMotion) {
          video.play().catch(() => {
            // Autoplay policy prevented playback, muted handles it usually
          });
        }
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari iOS / macOS)
      video.src = src;
      if (autoplay && !prefersReducedMotion) {
        video.play().catch(() => {});
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, autoplay]);

  return videoRef;
}
