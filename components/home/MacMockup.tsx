"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

type Props = {
  src: string;
  alt: string;
};

const SPRING = { stiffness: 90, damping: 18, mass: 0.6 };

export function MacMockup({ src, alt }: Props) {
  const reduceMotion = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, SPRING);
  const smoothY = useSpring(pointerY, SPRING);

  const rotateY = useTransform(smoothX, [-1, 1], [-9, 9]);
  const rotateX = useTransform(smoothY, [-1, 1], [6, -6]);
  const glowX = useTransform(smoothX, [-1, 1], [-40, 40]);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={areaRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="absolute inset-0 flex items-start justify-center overflow-hidden"
      style={{ perspective: 1600 }}
    >
      <motion.div
        aria-hidden
        style={{ x: glowX }}
        className="absolute left-1/2 top-[14%] h-[380px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(84,150,249,0.85),rgba(130,80,255,0.4)_55%,transparent)] blur-[60px]"
      />

      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity }}
        className="relative mt-8 w-[min(88%,580px)] md:mt-10"
      >
        <motion.div
          style={reduceMotion ? undefined : { rotateX, rotateY }}
          className="relative [transform-style:preserve-3d]"
        >
          <div className="relative rounded-[18px] bg-[linear-gradient(145deg,#3a3d45,#16171b_45%,#26282e)] p-[7px] shadow-[0_40px_90px_-20px_rgba(20,10,80,0.9),0_0_0_1px_rgba(255,255,255,0.08)_inset] md:rounded-[22px] md:p-[9px]">
            <div className="relative overflow-hidden rounded-[11px] bg-black md:rounded-[14px]">
              <span
                aria-hidden
                className="absolute left-1/2 top-0 z-10 h-[10px] w-[64px] -translate-x-1/2 rounded-b-[8px] bg-black md:h-[14px] md:w-[88px]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="block aspect-[16/10] w-full scale-[1.035] object-cover object-top"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.14),transparent_32%)]"
              />
            </div>
          </div>

          <div
            aria-hidden
            className="relative mx-auto -mt-px h-[11px] w-[112%] -translate-x-[5.35%] rounded-b-[20px] bg-[linear-gradient(to_bottom,#c9ccd3,#8c9099_70%,#5b5e66)] shadow-[0_24px_60px_-10px_rgba(20,10,80,0.85)] md:h-[14px]"
          >
            <span className="absolute left-1/2 top-0 h-[4px] w-[16%] -translate-x-1/2 rounded-b-[6px] bg-[#6f737c]" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
