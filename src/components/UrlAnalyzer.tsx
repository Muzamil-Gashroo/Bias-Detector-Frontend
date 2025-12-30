import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Link2, Globe } from "lucide-react";
import { analyzeUrl, type AnalysisResult } from "@/api/apiConfig";
import { useToast } from "@/hooks/use-toast";

interface UrlAnalyzerProps {
  onResult: (result: AnalysisResult) => void;
  onLoading: (loading: boolean) => void;
}


export function UrlAnalyzer({ onResult, onLoading }: UrlAnalyzerProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simple URL validation
  const isValidUrl = (string: string) => {
    try {
      const urlObj = new URL(string);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    const trimmedUrl = url.trim();

    // Validate input
    if (!trimmedUrl) {
      toast({
        title: "Empty URL",
        description: "Please enter a URL to analyze.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid HTTP or HTTPS URL.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    onLoading(true);

    try {
      const result = await analyzeUrl(trimmedUrl);
      onResult(result);
      toast({
        title: "Analysis Complete",
        description: "The article has been analyzed successfully.",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error 
          ? error.message 
          : "Unable to analyze URL. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      onLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading && url.trim()) {
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Globe className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="url"
          // placeholder="https://example.com/news-article"
          placeholder="! The URL parser is currently under maintenance. We are actively improving it. Text analysis remains fully available !"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-14 border-border/50 bg-secondary/30 pl-11 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link2 className="h-4 w-4" />
          <span>Paste an article URL to analyze</span>
        </div>
        <Button
          variant="glow"
          size="lg"
          // onClick={handleSubmit}
          onClick={ () =>{ alert("! The URL parser is currently under maintenance. We are actively improving it. Text analysis remains fully available ! ") } }

          disabled={isLoading || !url.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              Analyze URL
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
