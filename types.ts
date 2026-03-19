export enum PromptCategory {
  SOFTWARE = 'SOFTWARE',
  INTERFACE = 'INTERFACE',
  INTERACTION = 'INTERACTION',
  EMOTIONAL_IP = 'EMOTIONAL_IP',
  GRAPHIC_DESIGN = 'GRAPHIC_DESIGN',
  PPT = 'PPT',
}

export interface PromptTemplate {
  id: PromptCategory;
  label: string;
  icon: string; // Lucide icon name
  description: string;
  placeholder: string;
  systemInstruction: string;
  examples?: string[];
}

export type ToneType = 'PROFESSIONAL' | 'FRIENDLY' | 'CONCISE';
export type LangType = 'ZH' | 'EN';

export interface OptimizationOptions {
  tone: ToneType;
  lang: LangType;
}

export interface OptimizationResult {
  original: string;
  optimized: string;
  category: PromptCategory;
  timestamp: number;
}
