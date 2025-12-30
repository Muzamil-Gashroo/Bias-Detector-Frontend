import { Github, AlertCircle, Linkedin } from "lucide-react";

/**
 * Footer component with developer credits, GitHub link, LinkedIn, and legal disclaimer
 */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-card/30">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Disclaimer */}
        <div className="mb-6 rounded-lg border border-border/50 bg-secondary/20 p-4">
          <div className="flex gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground/80">Disclaimer</p>
              <p className="leading-relaxed">
                This is an open-source AI research project. The analysis is generated 
                using Large Language Models (LLMs) and may contain inaccuracies. This 
                tool is not a legal authority, does not provide legal advice, and should 
                not be used as the sole basis for legal, political, or journalistic decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Credits and Links */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Developed by{" "}
            <span className="font-medium text-foreground">Muzamil Gashroo</span>
          </p>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Muzamil-Gashroo?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/muzamil-bashir-gashroo-8268b4228/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Media Bias Analyzer. Open source under MIT License.
        </div>
      </div>
    </footer>
  );
}
