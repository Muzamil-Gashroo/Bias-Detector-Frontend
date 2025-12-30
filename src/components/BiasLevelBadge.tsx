import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import type { AnalysisResult } from "@/api/apiConfig";

interface BiasLevelBadgeProps {
  level: AnalysisResult["bias_level"];
  showIcon?: boolean;
}

/**
 * Semantic badge for displaying bias level with color coding
 * Low = Green, Medium = Amber, High = Red
 */
export function BiasLevelBadge({ level, showIcon = true }: BiasLevelBadgeProps) {
  const getVariant = () => {
    switch (level) {
      case "Low":
        return "bias-low" as const;
      case "Medium":
        return "bias-medium" as const;
      case "High":
        return "bias-high" as const;
    }
  };

  const getIcon = () => {
    switch (level) {
      case "Low":
        return <CheckCircle className="h-3.5 w-3.5" />;
      case "Medium":
        return <AlertCircle className="h-3.5 w-3.5" />;
      case "High":
        return <AlertTriangle className="h-3.5 w-3.5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Badge variant={getVariant()} className="gap-1.5 px-4 py-1.5 text-sm">
        {showIcon && getIcon()}
        {level} Bias
      </Badge>
    </motion.div>
  );
}
