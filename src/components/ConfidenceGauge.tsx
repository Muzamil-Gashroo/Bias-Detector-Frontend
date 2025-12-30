import { motion } from "framer-motion";

interface ConfidenceGaugeProps {
  value: number; // 0-100
  size?: number;
}

/**
 * Circular progress gauge for displaying confidence scores
 * Animates on mount with a smooth fill effect
 */
export function ConfidenceGauge({ value, size = 120 }: ConfidenceGaugeProps) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  // Color based on confidence level
  const getColor = () => {
    if (value >= 70) return "hsl(var(--bias-low))";
    if (value >= 40) return "hsl(var(--bias-medium))";
    return "hsl(var(--bias-high))";
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-2xl font-bold text-foreground"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {value}%
        </motion.span>
        <span className="text-xs text-muted-foreground">Confidence</span>
      </div>
    </div>
  );
}
