"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: 'az' | 'ru' | 'en';
  onLanguageChange: (language: 'az' | 'ru' | 'en') => void;
  className?: string;
}

const languageLabels = {
  az: 'AZ',
  ru: 'RU',
  en: 'EN'
};

const languageNames = {
  az: 'Azərbaycan',
  ru: 'Русский',
  en: 'English'
};

export function LanguageSelector({ currentLanguage, onLanguageChange, className = '' }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Globe className="w-4 h-4" />
        {languageLabels[currentLanguage]}
      </Button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
          {Object.entries(languageLabels).map(([lang, label]) => (
            <button
              key={lang}
              onClick={() => {
                onLanguageChange(lang as 'az' | 'ru' | 'en');
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md ${
                currentLanguage === lang ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-xs text-gray-500">{languageNames[lang as keyof typeof languageNames]}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
