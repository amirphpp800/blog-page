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
    <div className="prose md:prose-lg dark:prose-invert max-w-none">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return <h3 key={index}>{block.text}</h3>;
          
          case 'paragraph':
            return <p key={index}>{block.text}</p>;

          case 'image':
            return (
              <figure key={index}>
                <img 
                    src={block.src} 
                    alt={block.alt}
                />
                <figcaption>{block.alt}</figcaption>
              </figure>
            );

          case 'quote':
            return (
                <blockquote key={index}>
                    <p>"{block.text}"</p>
                    <cite className="block text-right not-italic">&mdash; {block.author}</cite>
                </blockquote>
            );

          case 'code':
            return (
              <pre key={index} className="text-left" dir="ltr">
                <code>{block.text.trim()}</code>
              </pre>
            );
            
          case 'ul':
          case 'ol':
            const ListComponent = block.type;
            return (
                <ListComponent key={index}>
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