import React from 'react';
import { PromptTemplate, PromptCategory } from '../types';
import * as Icons from 'lucide-react';

interface CategoryCardProps {
  template: PromptTemplate;
  isSelected: boolean;
  onClick: () => void;
}

const CATEGORY_COLORS: Record<PromptCategory, string> = {
  [PromptCategory.SOFTWARE]: 'bg-pop-blue',
  [PromptCategory.INTERFACE]: 'bg-pop-pink',
  [PromptCategory.INTERACTION]: 'bg-pop-yellow',
  [PromptCategory.EMOTIONAL_IP]: 'bg-pop-purple',
  [PromptCategory.GRAPHIC_DESIGN]: 'bg-pop-mint',
  [PromptCategory.PPT]: 'bg-pop-blue',
};

const CATEGORY_ICONS_BG: Record<PromptCategory, string> = {
  [PromptCategory.SOFTWARE]: 'bg-blue-100 text-blue-600',
  [PromptCategory.INTERFACE]: 'bg-pink-100 text-pink-600',
  [PromptCategory.INTERACTION]: 'bg-yellow-100 text-yellow-600',
  [PromptCategory.EMOTIONAL_IP]: 'bg-purple-100 text-purple-600',
  [PromptCategory.GRAPHIC_DESIGN]: 'bg-emerald-100 text-emerald-600',
  [PromptCategory.PPT]: 'bg-blue-100 text-blue-600',
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ template, isSelected, onClick }) => {
  const IconComponent = (Icons as any)[template.icon] || Icons.HelpCircle;
  
  // Determine base color class based on category
  const activeBg = CATEGORY_COLORS[template.id] || 'bg-white';

  return (
    <button
      onClick={onClick}
      className={`
        relative w-full h-full flex flex-col items-center justify-center text-center p-4 rounded-[2rem] transition-all duration-300 group border-4
        ${isSelected 
          ? `${activeBg} border-pop-text text-white shadow-pop-hover scale-[1.02] -rotate-1` 
          : 'bg-white border-transparent shadow-sm hover:shadow-pop hover:border-pop-text/10 hover:-translate-y-1'
        }
      `}
    >
      <div className={`
        p-3 rounded-2xl transition-all duration-300 shadow-inner-light mb-2
        ${isSelected 
          ? 'bg-white/20 text-white' 
          : CATEGORY_ICONS_BG[template.id]
        }
      `}>
        <IconComponent size={26} strokeWidth={2.5} />
      </div>
      
      <h3 className={`font-black text-lg leading-tight ${isSelected ? 'text-white' : 'text-pop-text'}`}>
        {template.label}
      </h3>

      {isSelected && (
         <div className="absolute top-3 right-3 bg-white text-pop-text p-1 rounded-full animate-jelly shadow-pop">
           <Icons.Check size={12} strokeWidth={4} />
         </div>
      )}
    </button>
  );
};