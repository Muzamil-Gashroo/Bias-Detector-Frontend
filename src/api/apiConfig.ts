
export const API_CONFIG = {
  BASE_URL: 'https://bias-detector-6qsq.onrender.com',
  
  ENDPOINTS: {
   
    ANALYZE_TEXT: '/analyze',
    
    
    ANALYZE_URL: '/analyze-url',
  },
} as const;


export interface AnalysisResult {
  bias_level: 'Low' | 'Medium' | 'High';
  confidence: number; // 0-100
  biased_sentences: string[];
  techniques: string[];
  explanation: string;
}


export interface AnalyzeTextRequest {
  text: string;
}

export interface AnalyzeUrlRequest {
  url: string;
}


export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};


export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ANALYZE_TEXT), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const analyzeUrl = async (url: string): Promise<AnalysisResult> => {
  const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ANALYZE_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
