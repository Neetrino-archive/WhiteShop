'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { LANGUAGES, type LanguageCode } from '../lib/language';

const ChevronDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Language icons/emojis
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
    ka: (
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRqHb4LNq5xqV85VxehTa7JFyB4SVIQqrWtA&s"
        alt="Georgian"
        width={25}
        height={25}
         className="rounded"
        unoptimized
      />
    ),
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
      ka: 'bg-white border-gray-300',
    };
    return colors[code] || 'bg-gray-100 border-gray-200';
  }
  return 'bg-white border-transparent';
};

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (
            // eslint-disable-next-line no-unused-vars
            options: {
              pageLanguage: string;
              includedLanguages: string;
              layout: number;
            },
            // eslint-disable-next-line no-unused-vars
            elementId: string
          ): void;
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
  }
}

export function GoogleTranslate() {
  const [showMenu, setShowMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const menuRef = useRef<HTMLDivElement>(null);
  const hiddenElementRef = useRef<HTMLDivElement>(null);

  // Initialize Google Translate
  useEffect(() => {
    const initTranslate = () => {
      if (
        typeof window !== 'undefined' && 
        window.google?.translate && 
        window.google.translate.TranslateElement?.InlineLayout &&
        hiddenElementRef.current
      ) {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,hy,ru,ka',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            'google_translate_element'
          );
        } catch (error) {
          console.error('Error initializing Google Translate:', error);
        }
      }
    };

    // Wait for Google Translate to load
    if (typeof window !== 'undefined') {
      if (window.google?.translate) {
        initTranslate();
      } else {
        // Wait for script to load
        const checkInterval = setInterval(() => {
          if (
            window.google?.translate && 
            window.google.translate.TranslateElement?.InlineLayout
          ) {
            initTranslate();
            clearInterval(checkInterval);
          }
        }, 100);
        
        // Очистка интервала после 10 секунд, чтобы избежать бесконечного ожидания
        setTimeout(() => {
          clearInterval(checkInterval);
        }, 10000);

        return () => clearInterval(checkInterval);
      }
    }

    // Hide Google Translate banner and elements - AGGRESSIVE HIDING
    const style = document.createElement('style');
    style.id = 'google-translate-styles';
    style.textContent = `
      /* Hide Google Translate banners and UI frames, but keep hidden element for functionality */
      .goog-te-banner-frame,
      .goog-te-banner-frame *,
      iframe.goog-te-banner-frame,
      .goog-te-menu-frame,
      .goog-te-menu-frame *,
      .goog-te-balloon-frame,
      .goog-te-balloon-frame *,
      iframe#goog-gt-tt,
      iframe#goog-gt-tt *,
      .goog-tooltip,
      .goog-tooltip *,
      .skiptranslate,
      .skiptranslate *,
      iframe[src*="translate.googleapis.com"]:not([id*="google_translate_element"]),
      iframe[src*="translate.google.com"]:not([id*="google_translate_element"]),
      iframe[class*="goog-te"]:not([id*="google_translate_element"]),
      iframe[id*="goog"]:not([id*="google_translate_element"]) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        max-height: 0 !important;
        max-width: 0 !important;
        overflow: hidden !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        pointer-events: none !important;
        z-index: -9999 !important;
      }
      
      /* Hide visible Google Translate gadgets but keep hidden element */
      .goog-te-gadget:not(#google_translate_element),
      .goog-te-gadget-simple:not(#google_translate_element),
      div[id*="google_translate"]:not(#google_translate_element),
      div[class*="goog-te"]:not(#google_translate_element):not(.goog-te-combo) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        pointer-events: none !important;
        z-index: -9999 !important;
      }
      
      /* Keep hidden translate element but hide it visually */
      #google_translate_element {
        position: absolute !important;
        left: -9999px !important;
        opacity: 0 !important;
        pointer-events: none !important;
        height: 0 !important;
        width: 0 !important;
        visibility: hidden !important;
      }
      
      /* Reset body top offset */
      body {
        top: 0 !important;
        margin-top: 0 !important;
        padding-top: 0 !important;
      }
      
      /* Hide any Google Translate related divs at the top */
      body > div:first-child[class*="goog"],
      body > iframe:first-child[src*="translate"],
      html > body > div:first-child[class*="goog"],
      html > body > iframe:first-child[src*="translate"] {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        max-height: 0 !important;
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById('google-translate-styles');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  // Force-hide Google banner/balloon even when language changes - AGGRESSIVE REMOVAL
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hideGoogleElements = () => {
      // Only hide banner and UI elements, NOT the hidden translate element
      const selectorsToRemove = [
        '.goog-te-banner-frame',
        '.goog-te-menu-frame',
        '.goog-te-balloon-frame',
        '#goog-gt-tt',
        '.skiptranslate',
        'iframe.goog-te-banner-frame',
      ];
      
      // Selectors to hide but NOT remove (keep for functionality)
      const selectorsToHide = [
        '.goog-te-gadget:not(#google_translate_element)',
        '.goog-te-gadget-simple:not(#google_translate_element)',
        'div[id*="google_translate"]:not(#google_translate_element)',
        'div[class*="goog-te"]:not(#google_translate_element):not(.goog-te-combo)',
      ];
      
      // Remove banner elements completely
      selectorsToRemove.forEach((selector) => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el) => {
            if (el && el.parentElement) {
              try {
                el.parentElement.removeChild(el);
              } catch (e) {
                // If removal fails, hide it with CSS
                (el as HTMLElement).style.display = 'none';
                (el as HTMLElement).style.visibility = 'hidden';
                (el as HTMLElement).style.height = '0';
                (el as HTMLElement).style.width = '0';
                (el as HTMLElement).style.opacity = '0';
                (el as HTMLElement).style.position = 'absolute';
                (el as HTMLElement).style.left = '-9999px';
                (el as HTMLElement).style.top = '-9999px';
                (el as HTMLElement).style.pointerEvents = 'none';
                (el as HTMLElement).style.zIndex = '-9999';
              }
            }
          });
        } catch (e) {
          console.warn('[GoogleTranslate] Error hiding element:', selector, e);
        }
      });
      
      // Hide UI elements but keep them in DOM (for functionality)
      selectorsToHide.forEach((selector) => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el) => {
            // Only hide, don't remove
            (el as HTMLElement).style.display = 'none';
            (el as HTMLElement).style.visibility = 'hidden';
            (el as HTMLElement).style.opacity = '0';
            (el as HTMLElement).style.height = '0';
            (el as HTMLElement).style.width = '0';
            (el as HTMLElement).style.position = 'absolute';
            (el as HTMLElement).style.left = '-9999px';
            (el as HTMLElement).style.top = '-9999px';
            (el as HTMLElement).style.pointerEvents = 'none';
            (el as HTMLElement).style.zIndex = '-9999';
          });
        } catch (e) {
          console.warn('[GoogleTranslate] Error hiding element:', selector, e);
        }
      });
      
      // Reset body styles
      document.body.style.top = '0px';
      document.body.style.marginTop = '0px';
      document.body.style.paddingTop = '0px';
      
      // Remove banner iframes only (not the hidden translate element)
      const allIframes = document.querySelectorAll('iframe');
      allIframes.forEach((iframe) => {
        const src = iframe.getAttribute('src') || '';
        const id = iframe.getAttribute('id') || '';
        const className = iframe.getAttribute('class') || '';
        
        // Only remove banner iframes, not the hidden translate element
        if ((src.includes('translate.googleapis.com') || src.includes('translate.google.com')) 
            && !id.includes('google_translate_element')
            && !className.includes('goog-te-combo')) {
          try {
            // Check if it's a banner frame
            if (className.includes('banner') || src.includes('banner')) {
              if (iframe.parentElement) {
                iframe.parentElement.removeChild(iframe);
              }
            } else {
              // Just hide non-banner iframes
              iframe.style.display = 'none';
              iframe.style.visibility = 'hidden';
              iframe.style.height = '0';
              iframe.style.width = '0';
            }
          } catch (e) {
            iframe.style.display = 'none';
            iframe.style.visibility = 'hidden';
            iframe.style.height = '0';
            iframe.style.width = '0';
          }
        }
      });
    };

    // Run immediately
    hideGoogleElements();
    
    // Run after a short delay to catch dynamically added elements
    setTimeout(hideGoogleElements, 100);
    setTimeout(hideGoogleElements, 500);
    setTimeout(hideGoogleElements, 1000);
    
    // Observe DOM changes - but be careful not to interfere with Google Translate functionality
    const observer = new MutationObserver((mutations) => {
      // Only hide elements if they are banner-related, not the hidden translate element
      let shouldHide = false;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const el = node as HTMLElement;
            // Convert className to string (it can be DOMTokenList or string)
            const className = typeof el.className === 'string' 
              ? el.className 
              : String(el.className || '');
            const id = el.id || '';
            const tagName = el.tagName?.toLowerCase() || '';
            
            // Only hide if it's a banner or UI element, not the hidden translate element
            if ((className.includes('banner') || className.includes('balloon') || className.includes('menu-frame'))
                && !id.includes('google_translate_element')
                && !className.includes('goog-te-combo')) {
              shouldHide = true;
            }
            
            // Check iframes
            if (tagName === 'iframe') {
              const src = el.getAttribute('src') || '';
              if ((src.includes('translate.googleapis.com') || src.includes('translate.google.com'))
                  && (src.includes('banner') || className.includes('banner'))
                  && !id.includes('google_translate_element')) {
                shouldHide = true;
              }
            }
          }
        });
      });
      
      if (shouldHide) {
        hideGoogleElements();
      }
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: false // Don't observe attributes to avoid interfering
    });

    return () => observer.disconnect();
  }, []);

  // Detect current language from Google Translate
  useEffect(() => {
    const checkLanguage = () => {
      if (typeof window !== 'undefined') {
        // Check cookie first
        const cookieLang = document.cookie
          .split('; ')
          .find(row => row.startsWith('googtrans='));
        
        if (cookieLang) {
          const langValue = cookieLang.split('=')[1];
          const langCode = langValue.split('/').pop()?.split('-')[0] as LanguageCode;
          if (langCode && langCode in LANGUAGES) {
            setCurrentLang(langCode);
            return;
          }
        }

        // Fallback to html lang attribute
        const lang = document.documentElement.lang || 'en';
        const langCode = lang.split('-')[0] as LanguageCode;
        if (langCode in LANGUAGES) {
          setCurrentLang(langCode);
        }
      }
    };

    checkLanguage();
    const interval = setInterval(checkLanguage, 1000);
    
    return () => clearInterval(interval);
  }, []);

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
   * Switches the page language via Google Translate and logs the change.
   */
  const changeLanguage = (langCode: LanguageCode) => {
    if (typeof window !== 'undefined' && currentLang !== langCode) {
      console.info('[Header][LangCurrency] Changing language', {
        from: currentLang,
        to: langCode,
      });

      const langMap: Record<LanguageCode, string> = {
        en: 'en',
        hy: 'hy',
        ru: 'ru',
        ka: 'ka',
      };

      const langValue = langMap[langCode];
      setCurrentLang(langCode);
      setShowMenu(false);
      
      // Try to find and use Google Translate select
      // Wait a bit for Google Translate to initialize
      const findAndChangeSelect = (attempts = 0) => {
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        
        if (select) {
          console.info('[GoogleTranslate] Found select element, changing language');
          if (select.value !== langValue) {
            select.value = langValue;
            const event = new Event('change', { bubbles: true });
            select.dispatchEvent(event);
          }
        } else if (attempts < 10) {
          // Retry up to 10 times (1 second total)
          console.debug('[GoogleTranslate] Select not found, retrying...', attempts);
          setTimeout(() => findAndChangeSelect(attempts + 1), 100);
        } else {
          // Fallback: set cookie directly and reload
          console.warn('[GoogleTranslate] Select not found after retries, using cookie fallback');
          document.cookie = `googtrans=/en/${langValue}; path=/; max-age=31536000`;
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
      };
      
      // Start trying to find select
      findAndChangeSelect();
    }
  };

  return (
    <>
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
            {Object.values(LANGUAGES).map((lang) => {
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
      
      {/* Hidden element for Google Translate */}
      <div ref={hiddenElementRef} id="google_translate_element" className="absolute -left-[9999px] opacity-0 pointer-events-none"></div>
      
      <Script
        id="google-translate-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              if (window.google && window.google.translate) {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,hy,ru,ka',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
              }
            }
          `,
        }}
      />
      <Script
        id="google-translate-script"
        strategy="afterInteractive"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />
    </>
  );
}

