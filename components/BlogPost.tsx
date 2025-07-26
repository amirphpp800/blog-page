import React from 'react';
import type { Post, ContentBlock } from '../types';

interface BlogPostProps {
  post: Post;
}

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-amber-100 text-amber-900 dark:bg-amber-500/10 dark:text-amber-400 text-xs font-medium px-2 py-1 rtl:ml-2 ltr:mr-2 rounded-sm">
    {children}
  </span>
);

const ContentRenderer: React.FC<{ blocks: ContentBlock[] }> = ({ blocks }) => {
  return (
    <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-300">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return <h3 key={index} className="text-xl md:text-2xl font-bold mt-8 mb-4 text-black dark:text-white">{block.text}</h3>;
          
          case 'paragraph':
            return <p key={index} className="my-4 leading-relaxed">{block.text}</p>;

          case 'image':
            return (
              <div key={index} className="my-6">
                <img 
                    src={block.src} 
                    alt={block.alt} 
                    className="w-full h-auto"
                />
                <p className="text-center text-sm italic mt-2 text-gray-500 dark:text-gray-400">{block.alt}</p>
              </div>
            );

          case 'quote':
            return (
                <blockquote key={index} className="my-6 p-4 border-l-4 border-accent-light dark:border-accent-dark bg-gray-100 dark:bg-zinc-800/80">
                    <p className="italic text-gray-700 dark:text-gray-300">"{block.text}"</p>
                    <cite className="block text-right mt-2 not-italic text-gray-600 dark:text-gray-400">&mdash; {block.author}</cite>
                </blockquote>
            );

          case 'code':
            return (
              <pre key={index} className="bg-gray-100 dark:bg-zinc-800/80 text-black dark:text-gray-300 p-4 my-4 overflow-x-auto text-sm font-mono text-left" dir="ltr">
                <code>{block.text.trim()}</code>
              </pre>
            );
            
          case 'ul':
          case 'ol':
            const ListComponent = block.type;
            const listStyle = block.type === 'ul' ? 'list-disc' : 'list-decimal';
            return (
                <ListComponent key={index} className={`my-4 ltr:pl-6 rtl:pr-6 space-y-2 list-inside ${listStyle}`}>
                    {block.items.map((item, i) => <li key={i}>{item}</li>)}
                </ListComponent>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};


export const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const { title, content, tags } = post;
  
  const cardStyles = "bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800";

  return (
    <article className={`p-6 sm:p-8 my-8 ${cardStyles}`}>
      <header className="mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-2">
          {title}
        </h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </header>
      <div className="border-t-2 border-dashed border-gray-300 dark:border-gray-700 my-4"></div>
      <ContentRenderer blocks={content} />
    </article>
  );
};