import React from 'react';
import { Link } from 'react-router-dom';
import type { Theme, UiTranslations } from '../types';
import { Icon } from './Icon';

interface HeaderProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  translations: UiTranslations;
}

export const Header: React.FC<HeaderProps> = ({ theme, setTheme, translations }) => {
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const buttonBaseStyles = "border-2 border-accent-light dark:border-accent-dark p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950 focus:ring-accent-light dark:focus:ring-accent-dark";
  const buttonHoverStyles = "hover:bg-accent-light hover:text-white dark:hover:bg-accent-dark dark:hover:text-black";

  return (
    <header className="py-4 px-4 sm:px-8 border-b border-accent-light dark:border-accent-dark bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3" aria-label="بازگشت به صفحه اصلی">
            <img src={theme === 'light' ? 'Logos/logo-globe-light.svg' : 'Logos/logo-globe-dark.svg'} alt="Logo" className="h-14 w-auto"/>
            <span className="text-lg md:text-xl font-bold text-black dark:text-white hidden sm:inline">
            {translations.headerTitle}
            </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
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
