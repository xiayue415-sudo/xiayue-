import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Star, Heart } from 'lucide-react';

interface OutputSectionProps {
  content: string;
  categoryLabel: string;
  onReset?: () => void;
}

export const OutputSection: React.FC<OutputSectionProps> = ({ content, categoryLabel, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="flex flex-col h-full animate-in zoom-in-95 duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
         <div className="flex items-center gap-2">
            <div className="bg-pop-yellow text-pop-text px-3 py-1 rounded-full border-2 border-pop-text font-black text-sm shadow-pop flex items-center gap-2">
               <Star size={14} fill="currentColor" />
               <span>就绪！</span>
            </div>
            <span className="text-sm font-bold text-pop-text/50">适用于 {categoryLabel}</span>
         </div>
         
         <div className="flex gap-2">
            {onReset && (
               <button 
                onClick={onReset}
                className="p-3 rounded-xl bg-white border-2 border-gray-200 text-gray-400 hover:text-pop-pink hover:border-pop-pink transition-all"
                title="重新开始"
               >
                 <RefreshCw size={20} strokeWidth={3} />
               </button>
            )}
            <button
              onClick={handleCopy}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm transition-all border-2
                ${copied 
                  ? 'bg-pop-mint border-pop-text text-pop-text' 
                  : 'bg-pop-text text-white border-pop-text hover:bg-purple-800 shadow-pop hover:-translate-y-1'
                }
              `}
            >
              {copied ? <Check size={18} strokeWidth={4} /> : <Copy size={18} strokeWidth={3} />}
              {copied ? '已复制！' : '复制'}
            </button>
         </div>
      </div>

      {/* Content */}
      <div className="relative flex-grow group mb-6">
        {/* Decorative background elements */}
        <div className="absolute -top-2 -right-2 w-16 h-16 bg-pop-pink rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-pop-blue rounded-full opacity-20 blur-xl"></div>

        <div className="relative h-full w-full rounded-[2.5rem] bg-white border-4 border-pop-text/5 shadow-pop overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-8 bg-purple-50 border-b-2 border-purple-100 flex items-center gap-2 px-4">
             <div className="w-3 h-3 rounded-full bg-pop-pink"></div>
             <div className="w-3 h-3 rounded-full bg-pop-yellow"></div>
             <div className="w-3 h-3 rounded-full bg-pop-mint"></div>
          </div>
          <div className="absolute inset-0 top-8 overflow-auto p-6 custom-scrollbar">
            <pre className="whitespace-pre-wrap font-mono text-sm text-pop-text font-medium leading-relaxed">
              {content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};