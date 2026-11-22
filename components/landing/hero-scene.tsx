"use client";

import { motion } from "motion/react";

/**
 * The hero's scene: a student sits on a hill and looks up, and the sky draws
 * itself into a map of what they are learning. One of its stars is theirs,
 * warm and alive, joined to them by a quiet thread: Ambrace is about how
 * *this* student learns.
 *
 * By day it is a clear, soft sky; by night, only stars over the same hill.
 * Colours come from the theme tokens (--hill-back, --graph and so on),
 * so one drawing serves both. The stars themselves are drawn by <NightSky>.
 */

type Node = { x: number; y: number; label: string; labelY: number };

const NODES: readonly Node[] = [
  { x: 200, y: 210, label: "FRACTIONS", labelY: 236 },
  { x: 350, y: 130, label: "RATIOS", labelY: 114 },
  { x: 510, y: 220, label: "LIGHT", labelY: 246 },
  { x: 650, y: 120, label: "REFLECTION", labelY: 104 },
  { x: 800, y: 240, label: "REFRACTION", labelY: 266 },
  { x: 930, y: 150, label: "LENSES", labelY: 134 },
  { x: 1190, y: 150, label: "EXAMPLES THAT CLICK", labelY: 134 },
];

/** The student's own star. */
const YOU = { x: 1080, y: 230 };

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

const at = (i: number) => (i === -1 ? YOU : NODES[i]);
const EASE = [0.2, 0.8, 0.2, 1] as const;
const START = 0.7; // seconds, after the headline has arrived
const STEP = 0.28;

export function HeroScene() {
  return (
    <svg
      viewBox="0 0 1440 560"
      // The scene sits below the hero's words (never behind them) and keeps
      // its shape as the screen widens, so nothing is cropped from the top.
      // On a phone it keeps a minimum height and crops from the left instead:
      // the student and their star always stay in view.
      preserveAspectRatio="xMaxYMax slice"
      role="img"
      aria-label="A student sits on a hill under the sky, where a map of what they are learning draws itself, with their own warm star among the others."
      className="relative mt-6 block aspect-[1440/560] min-h-[380px] w-full"
    >
      {/* Drawn on a 620-tall canvas; the empty top 60 units are trimmed. */}
      <g transform="translate(0 -60)">
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
              transition={{
                duration: 1.1,
                delay: START + i * STEP,
                ease: EASE,
              }}
            />
          ))}
        </g>

        <g fill="var(--node)">
          {NODES.map((node, i) => (
            <motion.circle
              key={node.label}
              cx={node.x}
              cy={node.y}
              r="3.5"
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
          ))}
        </g>

        <g
          fontFamily="var(--font-jetbrains), monospace"
          fontSize="12"
          letterSpacing="1"
          fill="var(--muted-foreground)"
        >
          {NODES.map((node, i) => (
            <motion.text
              key={node.label}
              x={node.x}
              y={node.labelY}
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: START + 0.2 + i * STEP }}
            >
              {node.label}
            </motion.text>
          ))}
        </g>

        {/* Hills */}
        <path
          d="M0 470 C 220 418 470 424 720 456 S 1200 418 1440 446 L1440 620 L0 620 Z"
          fill="var(--hill-back)"
        />
        <path
          d="M0 548 C 300 500 560 502 820 530 S 1250 560 1440 520 L1440 620 L0 620 Z"
          fill="var(--hill-front)"
        />

        {/* A lone tree on the far hill */}
        <g fill="var(--figure)">
          <rect x="1238" y="404" width="4" height="40" rx="2" />
          <circle cx="1240" cy="398" r="18" />
          <circle cx="1226" cy="410" r="12" />
          <circle cx="1254" cy="410" r="12" />
        </g>

        {/* The student, sitting, looking up */}
        <g fill="var(--figure)">
          <circle cx="1046" cy="486" r="9" />
          <path d="M1038 497 C 1034 507 1034 518 1038 526 L1064 526 C 1064 514 1060 503 1053 497 Z" />
          <path d="M1040 520 L1078 518 C 1082 518 1084 522 1082 526 L1040 528 Z" />
          <rect x="1076" y="518" width="5" height="12" rx="2" />
        </g>

        {/* Their star, and the thread between them */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: START + 6 * STEP }}
        >
          <line
            className="tether"
            x1="1048"
            y1="474"
            x2="1078"
            y2="240"
            stroke="var(--ember)"
            strokeOpacity="0.55"
            strokeWidth="1.25"
          />
          <circle
            className="breathe"
            cx={YOU.x}
            cy={YOU.y}
            r="7"
            fill="var(--ember)"
          />
          <text
            x={YOU.x}
            y={YOU.y + 32}
            textAnchor="middle"
            fontFamily="var(--font-jetbrains), monospace"
            fontSize="12"
            letterSpacing="1"
            fill="var(--ember-text)"
          >
            HOW YOU LEARN
          </text>
        </motion.g>
      </g>
    </svg>
  );
}
