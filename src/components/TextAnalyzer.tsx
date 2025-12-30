import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Search, FileText } from "lucide-react";
import { analyzeText, type AnalysisResult } from "@/api/apiConfig";
import { useToast } from "@/hooks/use-toast";

interface TextAnalyzerProps {
  onResult: (result: AnalysisResult) => void;
  onLoading: (loading: boolean) => void;
}


export function TextAnalyzer({ onResult, onLoading }: TextAnalyzerProps) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    // Validate input
    const trimmedText = text.trim();
    if (!trimmedText) {
      toast({
        title: "Empty Input",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      });
      return;
    }

    if (trimmedText.length < 20) {
      toast({
        title: "Text Too Short",
        description: "Please enter at least 20 characters for meaningful analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    onLoading(true);

    try {
      const result = await analyzeText(trimmedText);
      onResult(result);
      toast({
        title: "Analysis Complete",
        description: "Your text has been analyzed successfully.",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error 
          ? error.message 
          : "Unable to analyze text. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      onLoading(false);
    }
  };

  const characterCount = text.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="relative">
        <Textarea
          placeholder="Paste any news article, opinion piece, tweet, or public statement here to analyze bias, framing, and narrative manipulation."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px] resize-none border-border/50 bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
          disabled={isLoading}
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {characterCount.toLocaleString()} characters
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>Enter any text (news, opinions, tweets, or statements) for bias analysis.</span>
        </div>
        <Button
          variant="glow"
          size="lg"
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Analyze Text
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
