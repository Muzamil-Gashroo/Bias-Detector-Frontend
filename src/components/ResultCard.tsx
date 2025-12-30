import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfidenceGauge } from "./ConfidenceGauge";
import { BiasLevelBadge } from "./BiasLevelBadge";
import { AlertTriangle, Lightbulb, Quote, Tag } from "lucide-react";
import type { AnalysisResult } from "@/api/apiConfig";

interface ResultCardProps {
  result: AnalysisResult;
}

/**
 * Main results display component
 * Shows bias level, confidence, biased sentences, techniques, and explanation
 */
export function ResultCard({ result }: ResultCardProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header with Bias Level and Confidence */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              {/* Bias Level */}
              <div className="flex flex-col items-center gap-2 sm:items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  Detected Bias Level
                </span>
                <BiasLevelBadge level={result.bias_level} />
              </div>

              {/* Confidence Gauge */}
              <ConfidenceGauge value={result.confidence} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Biased Sentences */}
      {result.biased_sentences.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Quote className="h-5 w-5 text-bias-medium" />
                Biased Sentences Detected
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.biased_sentences.map((sentence, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="rounded-lg border border-bias-medium/30 bg-bias-medium-bg p-4"
                >
                  <div className="flex gap-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-bias-medium" />
                    <p className="text-sm leading-relaxed text-foreground/90">
                      "{sentence}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Techniques Used */}
      {result.techniques.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Tag className="h-5 w-5 text-primary" />
                Techniques Identified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.techniques.map((technique, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Badge variant="technique" className="text-sm">
                      {technique}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Explanation */}
      {result.explanation && (
        <motion.div variants={itemVariants}>
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5 text-primary" />
                Analysis Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                {result.explanation}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
