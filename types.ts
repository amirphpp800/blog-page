export type Theme = 'light' | 'dark';

// --- Content Block Types for Richer Posts ---

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface CodeBlock {
  type: 'code';
  text: string;
}

export interface HeadingBlock {
  type: 'heading';
  text: string;
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
}

export interface QuoteBlock {
  type: 'quote';
  text: string;
  author: string;
}

export interface ListBlock {
  type: 'ul' | 'ol';
  items: string[];
}

export type ContentBlock = 
  | ParagraphBlock 
  | CodeBlock 
  | HeadingBlock 
  | ImageBlock
  | QuoteBlock
  | ListBlock;

// --- Main Post and UI Translation Types ---

export interface Post {
  id: number;
  date: string;
  tags: string[];
  title: string;
  content: ContentBlock[];
}

export interface UiTranslations {
  headerTitle: string;
  footerText: string;
  aiDisclaimer: string;
  themeToggle: string;
  loading: string;
  error: string;
  // Search, Filter, Pagination
  searchPlaceholder: string;
  allCategories: string;
  noResultsFound: string;
  paginationPrevious: string;
  paginationNext: string;
  // Admin Panel
  adminPanelTitle: string;
  adminPanelInstructions: string;
  titleLabel: string;
  tagsLabel: string;
  tagsPlaceholder: string;
  contentLabel: string;
  addBlock: string;
  removeBlock: string;
  generateJson: string;
  copyJson: string;
  copied: string;
  jsonOutput: string;
  // Block types
  paragraph: string;
  heading: string;
  image: string;
  quote: string;
  code: string;
  unorderedList: string;
  orderedList: string;
  addListItem: string;
  removeListItem: string;
  // New Admin Panel Features
  selectTemplate: string;
  template: string;
  standardPost: string;
  technicalTutorial: string;
  listPost: string;
  moveBlockUp: string;
  moveBlockDown: string;
  uploadImage: string;
}
