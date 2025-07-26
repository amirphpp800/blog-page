import React from 'react';
import type { UiTranslations } from '../types';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    translations: UiTranslations;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, translations }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };
    
    const buttonStyles = "px-4 py-2 border-2 border-accent-light dark:border-accent-dark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950 focus:ring-accent-light dark:focus:ring-accent-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-400";
    const hoverStyles = "hover:bg-accent-light hover:text-white dark:hover:bg-accent-dark dark:hover:text-black";

    return (
        <div className="flex justify-center items-center gap-4 mt-12">
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`${buttonStyles} ${hoverStyles}`}
            >
                {translations.paginationNext}
            </button>
            <span className="text-gray-700 dark:text-gray-300">
                صفحه {currentPage} از {totalPages}
            </span>
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`${buttonStyles} ${hoverStyles}`}
            >
                {translations.paginationPrevious}
            </button>
        </div>
    );
};
