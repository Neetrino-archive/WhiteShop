'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { LANGUAGES, type LanguageCode, getStoredLanguage, setStoredLanguage } from '../lib/language';

const ChevronDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Language icons/flags
const getLanguageIcon = (code: LanguageCode): React.ReactNode => {
  const icons: Record<LanguageCode, React.ReactNode> = {
    en: (
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1024px-Flag_of_the_United_Kingdom_%283-5%29.svg.png"
        alt="English"
        width={25}
        height={25}
        className="rounded"
        unoptimized
      />
    ),
    hy: (
      <Image
        src="https://janarmenia.com/uploads/0000/83/2022/04/28/anthem-armenia.jpg"
        alt="Armenian"
        width={25}
        height={25}
        className="rounded"
        unoptimized
      />
    ),
    ru: (
      <Image
        src="https://flagfactoryshop.com/image/cache/catalog/products/flags/national/mockups/russia_coa-600x400.jpg"
        alt="Russian"
        width={25}
        height={25}
        className="rounded"
        unoptimized
      />
    ),
    ka: '🌐', // Georgian - fallback icon since it's not displayed in header
  };
  return icons[code] || '🌐';
};

// Language colors for better visual distinction
const getLanguageColor = (code: LanguageCode, isActive: boolean): string => {
  if (isActive) {
    const colors: Record<LanguageCode, string> = {
      en: 'bg-blue-50 border-blue-200',
      hy: 'bg-orange-50 border-orange-200',
      ru: 'bg-red-50 border-red-200',
      ka: 'bg-gray-100 border-gray-200', // Georgian - fallback color since it's not displayed in header
    };
    return colors[code] || 'bg-gray-100 border-gray-200';
  }
  return 'bg-white border-transparent';
};

/**
 * Language Switcher Component for Header
 * Uses only locales-based translations, no Google Translate
 */
export function LanguageSwitcherHeader() {
  const [showMenu, setShowMenu] = useState(false);
  // Start with 'en' to avoid hydration mismatch, then update in useEffect
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const menuRef = useRef<HTMLDivElement>(null);

  // Update current language on mount and when it changes
  useEffect(() => {
    // Update on mount to ensure we have the latest language from localStorage
    const storedLang = getStoredLanguage();
    // If stored language is 'ka' (Georgian), fallback to 'en' for header display
    const displayLang = storedLang === 'ka' ? 'en' : storedLang;
    // Only update if different to avoid unnecessary re-renders
    if (displayLang !== currentLang) {
      setCurrentLang(displayLang);
    }

    const handleLanguageUpdate = () => {
      const newLang = getStoredLanguage();
      // If new language is 'ka' (Georgian), fallback to 'en' for header display
      const displayLang = newLang === 'ka' ? 'en' : newLang;
      setCurrentLang(displayLang);
    };

    window.addEventListener('language-updated', handleLanguageUpdate);
    return () => {
      window.removeEventListener('language-updated', handleLanguageUpdate);
    };
  }, [currentLang]); // Include currentLang to check for changes

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Switches the page language using our i18n system
   */
  const changeLanguage = (langCode: LanguageCode) => {
    if (typeof window !== 'undefined' && currentLang !== langCode) {
      console.info('[LanguageSwitcher] Changing language', {
        from: currentLang,
        to: langCode,
      });

      // Close menu first
      setShowMenu(false);
      
      // Immediately update the UI state to prevent showing 'en' during reload
      const displayLang = langCode === 'ka' ? 'en' : langCode;
      setCurrentLang(displayLang);
      
      // Update language - this will reload the page after a small delay
      // The delay ensures the UI state is updated before reload
      setStoredLanguage(langCode);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        aria-expanded={showMenu}
        className="flex items-center gap-1 sm:gap-2 bg-transparent md:bg-white px-2 sm:px-3 py-1.5 sm:py-2 text-gray-800 transition-colors"
      >
        <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center text-base sm:text-lg leading-none">
          {getLanguageIcon(currentLang)}
        </span>
        <span className="text-xs sm:text-sm font-medium">{LANGUAGES[currentLang].name}</span>
        <ChevronDownIcon />
      </button>
      {showMenu && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {Object.values(LANGUAGES)
            .filter((lang) => lang.code !== 'ka') // Exclude Georgian (ka) from header
            .map((lang) => {
            const isActive = currentLang === lang.code;
            const icon = getLanguageIcon(lang.code);
            const colorClass = getLanguageColor(lang.code, isActive);
            
            return (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                disabled={isActive}
                className={`w-full text-left px-4 py-3 text-sm transition-all duration-150 border-l-4 ${
                  isActive
                    ? `${colorClass} text-gray-900 font-semibold cursor-default`
                    : 'text-gray-700 hover:bg-gray-50 cursor-pointer border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl flex-shrink-0">{icon}</span>
                  <div className="flex-1 flex items-center justify-between">
                    <span className={isActive ? 'font-semibold' : 'font-medium'}>
                      {lang.nativeName}
                    </span>
                    <span className={`text-xs ml-2 ${isActive ? 'text-gray-700 font-semibold' : 'text-gray-500'}`}>
                      {lang.code.toUpperCase()}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

