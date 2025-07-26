import React from 'react';
import { Icon } from './Icon';
import type { UiTranslations } from '../types';

interface FooterProps {
  translations: UiTranslations;
}

const SocialLink: React.FC<{ href: string, ariaLabel: string, children: React.ReactNode }> = ({ href, ariaLabel, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-accent-light dark:hover:text-accent-dark"
  >
    {children}
  </a>
);

export const Footer: React.FC<FooterProps> = ({ translations }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-accent-light dark:border-accent-dark py-6 px-4 sm:px-8 mt-12 bg-white/50 dark:bg-zinc-900/50">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
        <div className="text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            &copy; {year} {translations.footerText}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {translations.aiDisclaimer}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <SocialLink href="https://github.com" ariaLabel="صفحه گیت‌هاب">
            <Icon name="github" className="w-6 h-6" />
          </SocialLink>
          <SocialLink href="https://t.me/Kalzareth" ariaLabel="کانال تلگرام">
            <Icon name="telegram" className="w-6 h-6" />
          </SocialLink>
        </div>
      </div>
    </footer>
  );
};