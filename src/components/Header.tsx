import { motion } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";

/**
 * Header component with branding and tagline
 */
export function Header() {
  return (
    <header className="relative overflow-hidden border-b border-border/50 bg-card/30">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />
      
      <div className="container relative mx-auto max-w-4xl px-4 py-12 text-center sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary"
        >
          <Sparkles className="h-4 w-4" />
          <span>AI-Powered Analysis (Beta Version)</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 flex items-center justify-center gap-3"
        >
          <div className="rounded-xl bg-primary/20 p-3">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Media Bias{" "}
            <span className="gradient-text">Analyzer</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-muted-foreground"
        >
          Detect bias, identify manipulation techniques, and understand the 
          reliability of news content with advanced AI analysis.
        </motion.p>
      </div>
    </header>
  );
}
