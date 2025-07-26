import React from 'react';
import { Link } from 'react-router-dom';
import type { Theme, UiTranslations } from '../types';
import { Icon } from './Icon';

interface HeaderProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  translations: UiTranslations;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  theme, 
  setTheme, 
  translations, 
  searchTerm, 
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
  onLogoClick
}) => {
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const baseInputStyles = "p-2 bg-white dark:bg-zinc-800 border-2 border-accent-light dark:border-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950 focus:ring-accent-light dark:focus:ring-accent-dark transition-all duration-200";
  const buttonBaseStyles = "border-2 border-accent-light dark:border-accent-dark p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950 focus:ring-accent-light dark:focus:ring-accent-dark";
  const buttonHoverStyles = "hover:bg-accent-light hover:text-white dark:hover:bg-accent-dark dark:hover:text-black";

  return (
    <header className="py-4 px-4 sm:px-8 border-b border-accent-light dark:border-accent-dark bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        <Link to="/" className="flex items-center gap-3 flex-shrink-0" aria-label="بازگشت به صفحه اصلی" onClick={onLogoClick}>
            <img src={theme === 'light' ? '/Logos/logo-globe-light.svg' : '/Logos/logo-globe-dark.svg'} alt="Logo" className="h-14 w-auto"/>
            <span className="text-lg md:text-xl font-bold text-black dark:text-white hidden sm:inline">
            {translations.headerTitle}
            </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {/* Search and Filter */}
          <div className="relative flex-grow">
             <input
              type="search"
              placeholder={translations.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${baseInputStyles} w-full pl-10`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="search" className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`${baseInputStyles} max-w-[150px]`}
          >
            <option value="all">{translations.allCategories}</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`${buttonBaseStyles} ${buttonHoverStyles}`}
            aria-label={translations.themeToggle}
          >
            {theme === 'light' ? <Icon name="moon" className="w-6 h-6" /> : <Icon name="sun" className="w-6 h-6" />}
          </button>
        </nav>
      </div>
    </header>
  );
};
