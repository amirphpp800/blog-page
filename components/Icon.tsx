
import React from 'react';

interface IconProps {
  name: 'sun' | 'moon' | 'language' | 'github' | 'linkedin' | 'twitter' | 'telegram';
  className?: string;
}

const ICONS: Record<IconProps['name'], React.ReactNode> = {
  sun: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  ),
  moon: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  ),
  language: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5h12M9 3v2m0 10V7M5 7h6M5 11h6m-7 8h14a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1zM15 9h-2l-1 4-1-4H9"
    />
  ),
  github: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
    />
  ),
  linkedin: (
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" 
    />
  ),
  twitter: (
     <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" 
    />
  ),
  telegram: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10l-4 4 6 6 4-16-18 7 4 2 2 6 3-4"
    />
  )
};

export const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
    if(name === 'linkedin') { // LinkedIn icon needs a circle bg
        return (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {ICONS[name]}
                <circle cx="4" cy="4" r="2" fill="currentColor" stroke="none" />
            </svg>
        )
    }
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth={2}>
            {ICONS[name]}
        </svg>
    );
};