import React, { useState, useEffect } from 'react';
import { CATEGORIES } from './constants';
import { PromptCategory, ToneType, LangType } from './types';
import { CategoryCard } from './components/CategoryCard';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { generateOptimizedPrompt } from './services/geminiService';
import { 
  Cloud, 
  Flame, 
  Zap, 
  Command, 
  Stars, 
  Loader2,
  Layout,
  Code,
  MousePointerClick,
  Sparkles,
  Palette,
  Presentation
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast, Toaster } from 'sonner';
import * as Icons from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Layout,
  Code,
  MousePointerClick,
  Sparkles,
  Palette,
  Presentation
};

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory>(PromptCategory.INTERFACE);
  const [inputText, setInputText] = useState('');
  
  const [tone, setTone] = useState<ToneType>('FRIENDLY');
  const [lang, setLang] = useState<LangType>('ZH');

  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streak, setStreak] = useState(5);
  const [progress, setProgress] = useState(0);
  const [isLanding, setIsLanding] = useState(true);

  // Progress bar simulation
  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => (prev < 90 ? prev + Math.random() * 10 : prev));
      }, 400);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const optimizedText = await generateOptimizedPrompt(selectedCategory, inputText, { tone, lang });
      setResult(optimizedText);
      setStreak(s => s + 1);
      toast.success('好感度 +1', {
        icon: '❤️',
        style: {
          borderRadius: '1.5rem',
          border: '2px solid #141414',
          background: '#F5F5F0',
          fontWeight: '900',
          fontSize: '1rem',
        }
      });
    } catch (err: any) {
      setError(err.message || "Oops! Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setInputText('');
    setError(null);
  };

  const springTransition = { type: "spring", stiffness: 300, damping: 30, mass: 1 };

  if (isLanding) {
    return (
      <div className="min-h-screen bg-pop-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <Toaster position="top-center" expand={false} richColors />
        {/* Decorative Blobs */}
        <div className="blob w-96 h-96 bg-pop-pink top-[-100px] left-[-100px] rounded-full mix-blend-multiply opacity-20 animate-float"></div>
        <div className="blob w-96 h-96 bg-pop-purple top-[20%] right-[-100px] rounded-full mix-blend-multiply opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springTransition}
          className="max-w-4xl w-full text-center z-10"
        >
          <div className="inline-block mb-6 px-4 py-1.5 bg-white rounded-full border-2 border-pop-text/10 shadow-sm font-black text-pop-text/40 text-sm tracking-widest uppercase">
            提示词工坊 v2.0
          </div>
          
          <h1 className="text-6xl sm:text-8xl font-black text-pop-text mb-8 leading-tight">
            连接 <span className="text-pop-pink">好奇心</span><br />
            与 <span className="text-pop-blue">创造力</span>
          </h1>
          
          <p className="text-xl sm:text-2xl font-bold text-pop-text/60 mb-12 max-w-2xl mx-auto">
            从界面设计到演示文稿，Mochi 助你将模糊的想法转化为精准的 AI 提示词。
          </p>

          <div className="w-full overflow-hidden mb-16 py-4 relative">
            {/* Gradient Masks for smooth fade */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-pop-bg to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-pop-bg to-transparent z-10 pointer-events-none"></div>

            <motion.div 
              className="flex gap-6 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 30, 
                ease: "linear", 
                repeat: Infinity 
              }}
            >
              {/* Double the categories for a seamless loop */}
              {[...(Object.keys(CATEGORIES) as PromptCategory[]), ...(Object.keys(CATEGORIES) as PromptCategory[])].map((catKey, i) => {
                const cat = CATEGORIES[catKey];
                const Icon = ICON_MAP[cat.icon] || Stars;
                return (
                  <div 
                    key={`${catKey}-${i}`}
                    className="bg-white px-8 py-5 rounded-[2rem] border-2 border-pop-text/5 shadow-sm flex items-center gap-4 min-w-[200px]"
                  >
                    <div className="p-3 bg-gray-50 rounded-2xl">
                      <Icon size={24} className="text-pop-text" />
                    </div>
                    <span className="font-black text-lg text-pop-text/80">{cat.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: ["0 10px 30px -10px rgba(20,20,20,0.3)", "0 15px 40px -5px rgba(20,20,20,0.5)", "0 10px 30px -10px rgba(20,20,20,0.3)"]
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            onClick={() => setIsLanding(false)}
            className="group relative px-14 py-7 bg-pop-text text-white rounded-[2.5rem] font-black text-3xl shadow-pop hover:shadow-pop-hover transition-all flex items-center gap-4 overflow-hidden"
          >
            <span className="relative z-10">开启工坊</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              <Icons.Sparkles className="text-pop-yellow" size={28} fill="currentColor" />
            </motion.div>
            
            {/* Shine effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              style={{ skewX: -20 }}
            />

            <div className="absolute -top-2 -right-2 bg-pop-yellow text-pop-text text-sm px-3 py-1 rounded-full rotate-12 group-hover:rotate-0 transition-transform font-black shadow-sm">
              免费
            </div>
          </motion.button>
        </motion.div>

        {/* Removed Scroll down text */}
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto flex flex-col gap-6 relative overflow-hidden">
      <Toaster position="top-center" expand={false} richColors />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
        <motion.div 
          className="h-full bg-pop-pink shadow-[0_0_10px_rgba(255,133,161,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Decorative Blobs */}
      <div className="blob w-96 h-96 bg-pop-pink top-[-100px] left-[-100px] rounded-full mix-blend-multiply opacity-30 animate-float"></div>
      <div className="blob w-96 h-96 bg-pop-purple top-[20%] right-[-100px] rounded-full mix-blend-multiply opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="blob w-80 h-80 bg-pop-yellow bottom-[-50px] left-[20%] rounded-full mix-blend-multiply opacity-30 animate-float" style={{animationDelay: '4s'}}></div>

      {/* Main Grid (Bento) */}
      <main className="grid grid-cols-1 gap-6 items-start">
        
        {/* Workspace */}
        <div className="flex flex-col h-full gap-6">
           
           {/* Category Selection (Top Bar) */}
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(Object.keys(CATEGORIES) as PromptCategory[]).map((catKey, index) => (
                 <motion.div 
                   key={catKey} 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ ...springTransition, delay: index * 0.1 }}
                   className="h-[110px]"
                 >
                    <CategoryCard
                       template={CATEGORIES[catKey]}
                       isSelected={selectedCategory === catKey}
                       onClick={() => setSelectedCategory(catKey)}
                     />
                 </motion.div>
              ))}
           </div>
           
           {/* Canvas Container */}
           <div className="bg-white/50 backdrop-blur-sm p-2 rounded-[3rem] border-2 border-white shadow-xl min-h-[600px] flex flex-col relative">
              
              {/* Toolbar */}
              <div className="px-6 py-4 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      <Command size={18} className="text-pop-text" />
                    </div>
                    <span className="font-extrabold text-pop-text/70 text-sm tracking-wide uppercase">
                      工作台
                    </span>
                 </div>
                 <div className="flex items-center gap-1 text-xs font-bold text-pop-text/40 bg-white/50 px-3 py-1 rounded-full">
                    <Zap size={12} fill="currentColor" className="text-pop-yellow" />
                    由 GEMINI 提供动力
                 </div>
              </div>

              {/* Dynamic Content */}
              <div className="flex-grow bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-sm border border-white/50 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col items-center justify-center gap-6 py-12"
                      >
                        <div className="w-full max-w-2xl space-y-8 animate-pulse">
                          <div className="h-10 bg-gray-100 rounded-full w-1/3"></div>
                          <div className="space-y-4">
                            <div className="h-4 bg-gray-100 rounded-full w-full"></div>
                            <div className="h-4 bg-gray-100 rounded-full w-5/6"></div>
                            <div className="h-4 bg-gray-100 rounded-full w-4/6"></div>
                          </div>
                          <div className="h-64 bg-gray-50 rounded-[2rem] w-full border-2 border-dashed border-gray-200 flex items-center justify-center">
                             <div className="flex flex-col items-center gap-3 text-pop-text/20">
                                <Loader2 size={48} className="animate-spin" />
                                <span className="font-black text-xl">Mochi 正在思考中...</span>
                             </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : !result ? (
                     <motion.div 
                        key="input"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={springTransition}
                        className="h-full flex flex-col"
                      >
                        <div className="mb-6">
                           <h1 className="text-3xl sm:text-4xl font-black text-pop-text mb-2 flex items-center gap-3">
                             {CATEGORIES[selectedCategory].label}
                             <Stars className="text-pop-yellow animate-pulse" fill="currentColor" />
                           </h1>
                           <p className="text-lg font-bold text-pop-text/50">
                             告诉 Mochi 你的想法，见证魔法发生！
                           </p>
                        </div>
                        <InputSection
                            value={inputText}
                            onChange={setInputText}
                            onSubmit={handleGenerate}
                            isLoading={isLoading}
                            placeholder={CATEGORIES[selectedCategory].placeholder}
                            tone={tone}
                            setTone={setTone}
                            lang={lang}
                            setLang={setLang}
                            examples={CATEGORIES[selectedCategory].examples}
                          />
                     </motion.div>
                  ) : (
                     <motion.div 
                        key="output"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={springTransition}
                        className="h-full flex flex-col"
                      >
                        <OutputSection 
                           content={result} 
                           categoryLabel={CATEGORIES[selectedCategory].label} 
                           onReset={handleReset}
                        />
                     </motion.div>
                  )}
                  </AnimatePresence>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
};

export default App;