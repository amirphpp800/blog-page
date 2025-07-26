import type { UiTranslations, ContentBlock } from './types';

export const UI_TEXT: UiTranslations = {
  headerTitle: 'وبلاگ شخصی',
  footerText: 'تمام حقوق محفوظ است.',
  aiDisclaimer: 'برای نشان دادن قدرت Ai، این وب‌سایت کاملاً با Ai توسعه داده می‌شود.',
  themeToggle: 'تغییر پوسته',
  loading: 'در حال بارگذاری پست‌ها...',
  error: 'خطا در بارگذاری پست‌ها. لطفاً بعداً دوباره تلاش کنید.',
  // Search, Filter, Pagination
  searchPlaceholder: 'جستجو در مقالات...',
  allCategories: 'همه دسته‌بندی‌ها',
  noResultsFound: 'هیچ مقاله‌ای با این مشخصات یافت نشد.',
  paginationPrevious: 'قبلی',
  paginationNext: 'بعدی',
  paginationPageInfo: (currentPage, totalPages) => `صفحه ${currentPage} از ${totalPages}`,
  // Post Page
  backToHome: 'بازگشت به لیست مقالات',
  // Admin Panel Translations
  adminPanelTitle: 'پنل مدیریت: افزودن پست جدید',
  adminPanelInstructions: 'برای شروع یک الگو انتخاب کنید یا بلوک‌های محتوای خود را بسازید. پس از تکمیل، کد JSON را تولید و در فایل `public/posts.json` کپی کنید.',
  titleLabel: 'عنوان پست',
  tagsLabel: 'تگ‌ها (با ویرگول جدا کنید)',
  tagsPlaceholder: 'مثال: طراحی, وب, ری‌اکت',
  contentLabel: 'محتوای پست',
  addBlock: 'افزودن بلوک محتوا',
  removeBlock: 'حذف این بلوک',
  generateJson: 'تولید JSON',
  copyJson: 'کپی JSON',
  copied: 'کپی شد!',
  jsonOutput: 'خروجی JSON:',
  paragraph: 'پاراگراف',
  heading: 'تیتر',
  image: 'تصویر',
  quote: 'نقل قول',
  code: 'کد',
  unorderedList: 'لیست نامرتب (ul)',
  orderedList: 'لیست مرتب (ol)',
  addListItem: 'افزودن آیتم',
  removeListItem: 'حذف',
  // New Admin Panel Features
  selectTemplate: 'یک الگو انتخاب کنید...',
  template: 'الگو',
  standardPost: 'پست استاندارد',
  technicalTutorial: 'آموزش فنی',
  listPost: 'پست لیستی',
  moveBlockUp: 'انتقال به بالا',
  moveBlockDown: 'انتقال به پایین',
  uploadImage: 'آپلود تصویر',
};

// Post Templates for Admin Panel
export const POST_TEMPLATES = [
    {
        name: 'standardPost',
        content: [
            { type: 'paragraph', text: 'این یک پاراگراف مقدمه است.' },
            { type: 'heading', text: 'این یک تیتر است' },
            { type: 'paragraph', text: 'این یک پاراگراف دیگر برای توضیح بیشتر است.' },
            { type: 'image', src: '', alt: '' },
        ]
    },
    {
        name: 'technicalTutorial',
        content: [
            { type: 'paragraph', text: 'در این آموزش، ما به بررسی موضوع فنی زیر خواهیم پرداخت.' },
            { type: 'heading', text: 'مرحله ۱: تنظیمات اولیه' },
            { type: 'paragraph', text: 'ابتدا باید محیط کاری خود را آماده کنیم.' },
            { type: 'code', text: 'npm install my-package' },
            { type: 'heading', text: 'مرحله ۲: اجرای کد' },
            { type: 'paragraph', text: 'حالا کد زیر را اجرا کنید.' },
        ]
    },
    {
        name: 'listPost',
        content: [
            { type: 'paragraph', text: 'در این پست، چند نکته مهم را لیست کرده‌ایم.' },
            { type: 'ol', items: ['آیتم اول', 'آیتم دوم', 'آیتم سوم'] },
            { type: 'quote', text: 'یک نقل قول مرتبط.', author: 'منبع' }
        ]
    }
] as const;
