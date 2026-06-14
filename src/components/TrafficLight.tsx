import { motion } from "framer-motion";
import type { SignalColor } from "../types";

type TrafficLightProps = {
  activeColor: SignalColor;
  direction?: "vertical" | "horizontal";
  label: string;
};

const colors: SignalColor[] = ["red", "yellow", "green"];

const activeLightClass: Record<SignalColor, string> = {
  red: "bg-red-400 shadow-signalRed ring-red-200/70",
  yellow: "bg-yellow-300 shadow-signalYellow ring-yellow-100/70",
  green: "bg-emerald-400 shadow-signalGreen ring-emerald-100/70",
};

const inactiveLightClass: Record<SignalColor, string> = {
  red: "bg-red-950/70",
  yellow: "bg-yellow-950/70",
  green: "bg-emerald-950/70",
};

function TrafficLight({
  activeColor,
  direction = "vertical",
  label,
}: TrafficLightProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`relative flex rounded-lg border border-white/15 bg-gradient-to-br from-slate-700 via-slate-950 to-black p-1.5 shadow-2xl ${
          direction === "vertical" ? "flex-col" : "flex-row"
        }`}
        aria-label={`${label} signal is ${activeColor}`}
      >
        <span className="absolute inset-1 rounded-md border border-white/5" />
        {colors.map((color) => {
          const isActive = color === activeColor;

          return (
            <motion.span
              key={color}
              className={`relative m-0.5 h-4 w-4 rounded-full border border-white/10 ring-1 sm:h-5 sm:w-5 ${
                isActive ? activeLightClass[color] : inactiveLightClass[color]
              }`}
              layout
              animate={{
                opacity: isActive ? [0.82, 1, 0.82] : 0.28,
                scale: isActive ? [1, 1.12, 1] : 0.92,
              }}
              transition={{
                duration: isActive ? 1.1 : 0.35,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <span className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-white/55" />
            </motion.span>
          );
        })}
      </div>
      <span className="rounded bg-slate-950/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
        {label}
      </span>
    </div>
  );
}

export default TrafficLight;
