"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * The hero's scene: a student sits on a hill and looks up, and the sky draws
 * itself into a map of what they are learning. One of its stars is theirs,
 * warm and alive, joined to them by a quiet thread: Ambrace is about how
 * *this* student learns.
 *
 * By day it is a clear, soft sky; by night, only stars over the same hill.
 * Colours come from the theme tokens (--hill-back, --graph and so on), so one
 * drawing serves both. The stars themselves are drawn by <NightSky>.
 *
 * Layout, from first principles. The scene is not one picture scaled to fit
 * (that shrinks the map to a sliver on a short laptop screen). It is measured,
 * and laid out in real pixels:
 *   1. The ground takes a band along the bottom and runs the full width.
 *   2. The map spreads across the same width, in the sky between the top of
 *      the box and the student.
 *   3. Text, dots, the student and the tree stay a readable, fixed size at
 *      every screen size; only the spacing changes.
 * On a narrow screen the drawing keeps a minimum width and the left of the
 * map is cropped, never the student and their star.
 */

/* ---- The drawing, in design units: 1440 wide ------------------------------ */

const DESIGN_WIDTH = 1440;
/** The narrowest the drawing gets, as a share of its design size. */
const MIN_STRETCH = 0.62;

type Node = { x: number; y: number; label: string; below?: boolean };

/** The map. y runs from 0 (top of the map) to 1 (bottom). */
const NODES: readonly Node[] = [
  { x: 200, y: 0.75, label: "FRACTIONS", below: true },
  { x: 350, y: 0.08, label: "RATIOS" },
  { x: 510, y: 0.83, label: "LIGHT", below: true },
  { x: 650, y: 0, label: "REFLECTION" },
  { x: 800, y: 1, label: "REFRACTION", below: true },
  { x: 930, y: 0.25, label: "LENSES" },
  { x: 1190, y: 0.25, label: "EXAMPLES THAT CLICK" },
];

/** The student's own star, on the same map. */
const YOU = { x: 1080, y: 0.92 };

// Edges, as node indexes (6 = examples). -1 is the student's star.
const EDGES: readonly [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [2, 4],
  [4, 5],
  [5, -1],
  [-1, 6],
  [5, 6],
];

/*
 * The hills, drawn at full height between y = 418 (the far hill's crest) and
 * y = 620 (the ground line). They are stretched to whatever ground band the
 * screen allows, so both keep their shapes and their ratio to each other.
 */
const HILLS_TOP = 418;
const HILLS_BOTTOM = 620;
const FAR_HILL =
  "M-4000 470 L0 470 C 220 418 470 424 720 456 S 1200 418 1440 446 L5440 446 L5440 620 L-4000 620 Z";
const NEAR_HILL =
  "M-4000 548 L0 548 C 300 500 560 502 820 530 S 1250 560 1440 520 L5440 520 L5440 620 L-4000 620 Z";

/** Where the student sits on the near hill, and where the tree stands. */
const SEAT = { x: 1058, y: 549 };
const TREE_BASE = { x: 1240, y: 442 };

/* ---- Fixed sizes, in screen pixels ---------------------------------------- */

const LABEL_PX = 12;
const NODE_R = 4;
const STAR_R = 7;
const SKY_TOP = 44; // room above the highest label, clear of the button
const STAR_CLEARANCE = 64; // sky between the student's head and their star

const EASE = [0.2, 0.8, 0.2, 1] as const;
const START = 0.7; // seconds, after the headline has arrived
const STEP = 0.28;

type Size = { w: number; h: number };
const DESIGN_SIZE: Size = { w: DESIGN_WIDTH, h: 560 };

/** The box's size in pixels, kept current as the window changes. */
function useSize(ref: RefObject<Element | null>): Size {
  const [size, setSize] = useState(DESIGN_SIZE);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setSize((prev) =>
          prev.w === width && prev.h === height
            ? prev
            : { w: width, h: height },
        );
      }
    };
    // The observer reports later changes; the first frame catches the size
    // on load, which an observer's first report can miss when React mounts
    // the scene twice in development.
    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [ref]);
  return size;
}

/** Turns design units into pixels for a box of this size. */
function layout({ w, h }: Size) {
  const stretch = Math.max(w / DESIGN_WIDTH, MIN_STRETCH);
  // Right-aligned: when the drawing is wider than the box, the left is cut.
  const offsetX = w - DESIGN_WIDTH * stretch;
  const ground = Math.min(Math.max(h * 0.3, 64), 130);
  const figure = Math.min(Math.max(stretch * 1.1, 0.8), 1.2);

  const toX = (x: number) => offsetX + x * stretch;
  const hillY = (y: number) =>
    h - ground + ((y - HILLS_TOP) / (HILLS_BOTTOM - HILLS_TOP)) * ground;

  const seat = { x: toX(SEAT.x), y: hillY(SEAT.y) };
  const headY = seat.y - 52 * figure;
  const skyBottom = Math.max(
    SKY_TOP + 60,
    Math.min(headY - STAR_CLEARANCE, h - ground - 24),
  );
  const toY = (y: number) => SKY_TOP + y * (skyBottom - SKY_TOP);

  return {
    stretch,
    offsetX,
    ground,
    figure,
    seat,
    headY,
    tree: { x: toX(TREE_BASE.x), y: hillY(TREE_BASE.y) },
    point: (n: { x: number; y: number }) => ({ x: toX(n.x), y: toY(n.y) }),
  };
}

export function HeroScene({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const size = useSize(ref);
  const L = layout(size);
  const at = (i: number) => L.point(i === -1 ? YOU : NODES[i]);
  const you = L.point(YOU);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${size.w} ${size.h}`}
      preserveAspectRatio="xMaxYMax slice"
      role="img"
      aria-label="A student sits on a hill under the sky, where a map of what they are learning draws itself, with their own warm star among the others."
      className={className}
    >
      {/* The map: edges draw one after another */}
      <g
        fill="none"
        stroke="var(--graph)"
        strokeWidth="1.25"
        strokeLinecap="round"
      >
        {EDGES.map(([a, b], i) => (
          <motion.line
            key={`${a}-${b}`}
            x1={at(a).x}
            y1={at(a).y}
            x2={at(b).x}
            y2={at(b).y}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: START + i * STEP, ease: EASE }}
          />
        ))}
      </g>

      {NODES.map((node, i) => {
        const p = L.point(node);
        // A label the box would cut in half is left out; its dot stays.
        const halfLabel = (node.label.length * (LABEL_PX * 0.6 + 1)) / 2;
        const labelFits = p.x - halfLabel >= 8 && p.x + halfLabel <= size.w - 8;
        return (
          <g key={node.label}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={NODE_R}
              fill="var(--node)"
              style={{
                transformBox: "fill-box",
                originX: "50%",
                originY: "50%",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 16,
                delay: START - 0.1 + i * STEP,
              }}
            />
            {labelFits && (
              <motion.text
                x={p.x}
                y={node.below ? p.y + 22 : p.y - 12}
                textAnchor="middle"
                fontFamily="var(--font-jetbrains), monospace"
                fontSize={LABEL_PX}
                letterSpacing="1"
                fill="var(--muted-foreground)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: START + 0.2 + i * STEP }}
              >
                {node.label}
              </motion.text>
            )}
          </g>
        );
      })}

      {/* Hills: stretched to the ground band, shapes and ratio kept */}
      <g
        transform={`translate(${L.offsetX} ${size.h - L.ground}) scale(${L.stretch} ${L.ground / (HILLS_BOTTOM - HILLS_TOP)}) translate(0 ${-HILLS_TOP})`}
      >
        <path d={FAR_HILL} fill="var(--hill-back)" />
        <path d={NEAR_HILL} fill="var(--hill-front)" />
      </g>

      {/* A lone tree on the far hill, drawn about its base */}
      <g
        fill="var(--figure)"
        transform={`translate(${L.tree.x} ${L.tree.y}) scale(${L.figure})`}
      >
        <rect x="-2" y="-40" width="4" height="42" rx="2" />
        <circle cx="0" cy="-46" r="18" />
        <circle cx="-14" cy="-34" r="12" />
        <circle cx="14" cy="-34" r="12" />
      </g>

      {/* The student, sitting on the near hill, looking up; drawn about the seat */}
      <g
        fill="var(--figure)"
        transform={`translate(${L.seat.x} ${L.seat.y}) scale(${L.figure})`}
      >
        <circle cx="-12" cy="-43" r="9" />
        <path d="M-20 -32 C -24 -22 -24 -11 -20 -3 L6 -3 C 6 -15 2 -26 -5 -32 Z" />
        <path d="M-18 -9 L20 -11 C 24 -11 26 -7 24 -3 L-18 -1 Z" />
        <rect x="18" y="-11" width="5" height="12" rx="2" />
      </g>

      {/* Their star, and the thread between them */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: START + 6 * STEP }}
      >
        <line
          className="tether"
          x1={L.seat.x - 10 * L.figure}
          y1={L.headY}
          x2={you.x}
          y2={you.y + STAR_R}
          stroke="var(--ember)"
          strokeOpacity="0.6"
          strokeWidth="1.25"
        />
        <circle
          className="breathe"
          cx={you.x}
          cy={you.y}
          r={STAR_R}
          fill="var(--ember)"
        />
        <text
          x={you.x}
          y={you.y + 26}
          textAnchor="middle"
          fontFamily="var(--font-jetbrains), monospace"
          fontSize={LABEL_PX}
          letterSpacing="1"
          fill="var(--ember-text)"
        >
          HOW YOU LEARN
        </text>
      </motion.g>
    </svg>
  );
}
