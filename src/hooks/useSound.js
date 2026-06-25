import { useRef, useEffect, useCallback } from "react";
import openSound from "../assets/open.mp3";
import closeSound from "../assets/close.mp3";
import accordionSound from "../assets/accordion.mp3";
import toggleSound from "../assets/toggle.mp3";

const SOUNDS = {
  open: openSound,
  close: closeSound,
  accordion: accordionSound,
  toggle: toggleSound,
};

// Web Audio API ile sesler: önceden decode edilir, çalma anında sıfır gecikme.
export function useSound() {
  const ctxRef = useRef(null);
  const buffersRef = useRef({});

  useEffect(() => {
    // tek bir AudioContext oluştur
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    ctxRef.current = ctx;

    // her sesi indir + decode edip bellekte tut
    Object.entries(SOUNDS).forEach(async ([key, src]) => {
      try {
        const res = await fetch(src);
        const arrayBuffer = await res.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        buffersRef.current[key] = audioBuffer;
      } catch {
        // sessizce geç
      }
    });

    return () => { ctx.close(); };
  }, []);

  const play = useCallback((name) => {
    const enabled = localStorage.getItem("soundEnabled") !== "false";
    if (!enabled) return;

    const ctx = ctxRef.current;
    const buffer = buffersRef.current[name];
    if (!ctx || !buffer) return;

    // tarayıcı bazen context'i askıya alır; geri aç
    if (ctx.state === "suspended") ctx.resume();

    // her çalışta yeni bir kaynak düğümü (anlık, gecikmesiz)
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gain = ctx.createGain();
    gain.gain.value = 0.4; // ses seviyesi
    source.connect(gain);
    gain.connect(ctx.destination);

    source.start(0);
  }, []);

  return { play };
}