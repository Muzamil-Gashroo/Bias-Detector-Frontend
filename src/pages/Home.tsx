import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TextAnalyzer } from "@/components/TextAnalyzer";
import { UrlAnalyzer } from "@/components/UrlAnalyzer";
import { ResultCard } from "@/components/ResultCard";
import { FileText, Link2 } from "lucide-react";
import type { AnalysisResult } from "@/api/apiConfig";

/**
 * Home page - Main entry point for the Media Bias Analyzer
 * Contains tabbed input for text and URL analysis with results display
 */
export function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResult = (newResult: AnalysisResult) => {
    setResult(newResult);
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
    if (loading) {
      setResult(null); // Clear previous results when starting new analysis
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* SEO Meta handled in index.html */}
      <Header />

      <main className="container mx-auto max-w-4xl flex-1 px-4 py-8 sm:py-12">
        {/* Input Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2 bg-secondary/50">
              <TabsTrigger
                value="text"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <FileText className="h-4 w-4" />
                Analyze Text
              </TabsTrigger>
              <TabsTrigger
                value="url"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Link2 className="h-4 w-4" />
                Analyze URL
              </TabsTrigger>
            </TabsList>

            <div className="rounded-xl border border-border/50 bg-card/50 p-6">
              <TabsContent value="text" className="mt-0">
                <TextAnalyzer onResult={handleResult} onLoading={handleLoading} />
              </TabsContent>
              <TabsContent value="url" className="mt-0">
                <UrlAnalyzer onResult={handleResult} onLoading={handleLoading} />
              </TabsContent>
            </div>
          </Tabs>
        </motion.section>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-16"
            >
              {/* Animated loader */}
              <div className="relative flex items-center justify-center">
                {/* Outer spinning ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute h-20 w-20 rounded-full border-4 border-primary/20 border-t-primary"
                />
                
                {/* Middle pulsing ring */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute h-14 w-14 rounded-full border-2 border-primary/40"
                />
                
                {/* Inner pulsing dot */}
                <motion.div
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/30"
                />
              </div>
              
              {/* Loading text with animated dots */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-center"
              >
                <p className="text-lg font-medium text-foreground">
                  Analyzing content for bias
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ...
                  </motion.span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  This may take a few seconds
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {result && !isLoading && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6 text-xl font-semibold text-foreground">
                Analysis Results
              </h2>
              <ResultCard result={result} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
