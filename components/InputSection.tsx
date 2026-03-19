import React from 'react';
import { Send, Loader2, Sparkles, Smile, X } from 'lucide-react';
import { ToneType, LangType } from '../types';
import { TONE_OPTIONS, LANG_OPTIONS } from '../constants';

interface InputSectionProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  placeholder: string;
  tone: ToneType;
  setTone: (t: ToneType) => void;
  lang: LangType;
  setLang: (l: LangType) => void;
  examples?: string[];
}

export const InputSection: React.FC<InputSectionProps> = ({ 
  value, 
  onChange, 
  onSubmit, 
  isLoading,
  placeholder,
  tone,
  setTone,
  lang,
  setLang,
  examples = []
}) => {
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      {/* Examples Chips */}
      {examples.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-black text-pop-text/30 uppercase tracking-widest pt-1.5 mr-1">
            试试这些:
          </span>
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => onChange(ex)}
              className="px-3 py-1.5 rounded-full bg-white border-2 border-purple-50 text-xs font-bold text-pop-text/60 hover:border-pop-purple hover:text-pop-purple transition-all shadow-sm active:scale-95"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {/* Input Area container */}
      <div className="relative flex-grow group">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full h-full min-h-[250px] p-6 rounded-[2rem] border-4 border-purple-100 bg-white text-lg font-bold text-pop-text placeholder-purple-200 resize-none focus:outline-none focus:border-pop-purple transition-colors shadow-inner-light"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Smile size={24} className="text-purple-200 group-focus-within:text-pop-purple transition-colors mx-auto" />
          {value && !isLoading && (
            <button 
              onClick={() => onChange('')}
              className="p-1.5 rounded-full bg-gray-100 text-gray-400 hover:bg-pop-pink hover:text-white transition-all shadow-sm"
              title="清空输入"
            >
              <X size={14} strokeWidth={3} />
            </button>
          )}
        </div>
      </div>

      {/* Controls & Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
           {/* Tone Selector */}
           <div className="relative">
             <select 
               value={tone}
               onChange={(e) => setTone(e.target.value as ToneType)}
               className="appearance-none pl-4 pr-10 py-3 rounded-2xl bg-white border-2 border-purple-100 font-bold text-pop-text text-sm cursor-pointer hover:border-pop-purple focus:border-pop-purple focus:outline-none transition-colors shadow-pop active:shadow-pop-active active:translate-y-1"
             >
               {Object.entries(TONE_OPTIONS).map(([key, label]) => (
                 <option key={key} value={key}>{label}</option>
               ))}
             </select>
             <Sparkles size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-pop-purple pointer-events-none" />
           </div>

           {/* Lang Selector */}
           <div className="flex gap-1 bg-white p-1.5 rounded-2xl border-2 border-purple-100 shadow-sm">
             {Object.entries(LANG_OPTIONS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setLang(key as LangType)}
                  className={`
                    px-4 py-1.5 rounded-xl text-sm font-extrabold transition-all
                    ${lang === key 
                      ? 'bg-pop-mint text-pop-text shadow-sm' 
                      : 'text-gray-400 hover:text-pop-purple hover:bg-purple-50'
                    }
                  `}
                >
                  {label.split(' ')[0]}
                </button>
             ))}
           </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className={`
            w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-white text-lg transition-all border-b-4
            ${isLoading || !value.trim() 
              ? 'bg-gray-300 border-gray-400 cursor-not-allowed opacity-50' 
              : 'bg-pop-purple border-purple-700 hover:bg-purple-500 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:border-b-0 active:mt-1'
            }
          `}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={24} strokeWidth={3} />
          ) : (
            <Send size={24} strokeWidth={3} />
          )}
          <span>{isLoading ? '思考中...' : '开始生成！'}</span>
        </button>
      </div>
      <div className="text-center md:text-right">
        <span className="text-xs font-bold text-pop-text/30 tracking-widest uppercase">
          提示：按住 ⌘ + Enter 快速生成
        </span>
      </div>
    </div>
  );
};