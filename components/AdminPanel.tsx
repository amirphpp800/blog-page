import React, { useState } from 'react';
import type { UiTranslations, ContentBlock, Post } from '../types';

interface AdminPanelProps {
  translations: UiTranslations;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ translations }) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState<ContentBlock[]>([]);
  const [generatedJson, setGeneratedJson] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAddBlock = (type: ContentBlock['type']) => {
    let newBlock: ContentBlock;
    switch (type) {
      case 'heading':
        newBlock = { type: 'heading', text: '' };
        break;
      case 'image':
        newBlock = { type: 'image', src: '', alt: '' };
        break;
      case 'quote':
        newBlock = { type: 'quote', text: '', author: '' };
        break;
      case 'code':
        newBlock = { type: 'code', text: '' };
        break;
      case 'ul':
      case 'ol':
        newBlock = { type, items: [''] };
        break;
      case 'paragraph':
      default:
        newBlock = { type: 'paragraph', text: '' };
    }
    setContent([...content, newBlock]);
  };
  
  const handleBlockUpdate = (index: number, updatedBlock: ContentBlock) => {
    const newContent = [...content];
    newContent[index] = updatedBlock;
    setContent(newContent);
  };

  const handleListItemChange = (blockIndex: number, itemIndex: number, value: string) => {
    const block = content[blockIndex];
    if (block.type === 'ul' || block.type === 'ol') {
        const newItems = [...block.items];
        newItems[itemIndex] = value;
        handleBlockUpdate(blockIndex, { ...block, items: newItems });
    }
  };

  const handleAddListItem = (blockIndex: number) => {
    const block = content[blockIndex];
    if (block.type === 'ul' || block.type === 'ol') {
        const newItems = [...block.items, ''];
        handleBlockUpdate(blockIndex, { ...block, items: newItems });
    }
  };
  
  const handleRemoveListItem = (blockIndex: number, itemIndex: number) => {
    const block = content[blockIndex];
    if (block.type === 'ul' || block.type === 'ol') {
        const newItems = block.items.filter((_, i) => i !== itemIndex);
        handleBlockUpdate(blockIndex, { ...block, items: newItems });
    }
  };

  const handleRemoveBlock = (index: number) => {
      setContent(content.filter((_, i) => i !== index));
  };

  const handleGenerateJson = () => {
    const newPost: Post = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: title.trim(),
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      content: content,
    };
    setGeneratedJson(JSON.stringify(newPost, null, 2));
  };
  
  const handleCopy = () => {
      if (generatedJson) {
          navigator.clipboard.writeText(generatedJson);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
      }
  };

  const baseInputStyles = "w-full p-2 bg-white dark:bg-zinc-800 border border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-dark";
  const baseButtonStyles = "p-2 transition-colors duration-200 border border-accent-dark text-accent-dark hover:bg-accent-dark hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950 focus:ring-accent-dark";
  const dangerButtonStyles = "p-1 text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300";

  const renderBlockInputs = (block: ContentBlock, index: number) => {
    const blockWrapperStyles = "p-4 my-4 border border-gray-300 dark:border-gray-700 relative";
    return (
        <div key={index} className={blockWrapperStyles}>
             <button onClick={() => handleRemoveBlock(index)} className={`${dangerButtonStyles} absolute top-2 left-2`}>{translations.removeBlock}</button>
             <h4 className='font-bold mb-2'>{translations[block.type === 'ul' ? 'unorderedList' : block.type === 'ol' ? 'orderedList' : block.type]}</h4>
            {(() => {
                switch(block.type) {
                    case 'paragraph':
                    case 'heading':
                    case 'code':
                        return <textarea value={block.text} onChange={(e) => handleBlockUpdate(index, { ...block, text: e.target.value })} className={baseInputStyles} rows={block.type === 'code' ? 5 : 2} />;
                    case 'image':
                        return <>
                            <input type="text" value={block.src} placeholder="Image URL" onChange={(e) => handleBlockUpdate(index, { ...block, src: e.target.value })} className={`${baseInputStyles} mb-2`} />
                            <input type="text" value={block.alt} placeholder="Alt Text" onChange={(e) => handleBlockUpdate(index, { ...block, alt: e.target.value })} className={baseInputStyles} />
                        </>;
                    case 'quote':
                        return <>
                            <textarea value={block.text} placeholder="Quote Text" onChange={(e) => handleBlockUpdate(index, { ...block, text: e.target.value })} className={`${baseInputStyles} mb-2`} />
                            <input type="text" value={block.author} placeholder="Author" onChange={(e) => handleBlockUpdate(index, { ...block, author: e.target.value })} className={baseInputStyles} />
                        </>;
                    case 'ul':
                    case 'ol':
                        return (
                            <div>
                                {block.items.map((item, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row items-center gap-2 mb-2">
                                        <input type="text" value={item} onChange={(e) => handleListItemChange(index, i, e.target.value)} className={`${baseInputStyles} flex-grow`} />
                                        <button onClick={() => handleRemoveListItem(index, i)} className={`${dangerButtonStyles} self-end sm:self-auto`}>{translations.removeListItem}</button>
                                    </div>
                                ))}
                                <button onClick={() => handleAddListItem(index)} className="text-sm text-accent-dark hover:underline mt-1">{translations.addListItem}</button>
                            </div>
                        )
                    default: return null;
                }
            })()}
        </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{translations.adminPanelTitle}</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-400 text-sm">{translations.adminPanelInstructions}</p>
      
      <div className="space-y-4">
        <div>
            <label htmlFor="title" className="block mb-1 font-medium">{translations.titleLabel}</label>
            <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={baseInputStyles} />
        </div>
        <div>
            <label htmlFor="tags" className="block mb-1 font-medium">{translations.tagsLabel}</label>
            <input id="tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder={translations.tagsPlaceholder} className={baseInputStyles} />
        </div>
      </div>
      
      <div className="my-6 border-t border-gray-300 dark:border-gray-700"></div>

      <div>
        <h3 className="text-xl font-bold mb-2">{translations.contentLabel}</h3>
        {content.map(renderBlockInputs)}
        <div className='flex flex-wrap gap-2'>
            <button onClick={() => handleAddBlock('paragraph')} className={baseButtonStyles}>{translations.paragraph}</button>
            <button onClick={() => handleAddBlock('heading')} className={baseButtonStyles}>{translations.heading}</button>
            <button onClick={() => handleAddBlock('image')} className={baseButtonStyles}>{translations.image}</button>
            <button onClick={() => handleAddBlock('quote')} className={baseButtonStyles}>{translations.quote}</button>
            <button onClick={() => handleAddBlock('code')} className={baseButtonStyles}>{translations.code}</button>
            <button onClick={() => handleAddBlock('ul')} className={baseButtonStyles}>{translations.unorderedList}</button>
            <button onClick={() => handleAddBlock('ol')} className={baseButtonStyles}>{translations.orderedList}</button>
        </div>
      </div>

      <div className="my-8 border-t border-gray-300 dark:border-gray-700"></div>

      <button onClick={handleGenerateJson} className={`${baseButtonStyles} w-full text-lg font-bold`}>{translations.generateJson}</button>

      {generatedJson && (
        <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">{translations.jsonOutput}</h3>
            <div className="relative">
                <button onClick={handleCopy} className={`${baseButtonStyles} absolute top-2 left-2 text-xs px-2 py-1`}>
                    {copied ? translations.copied : translations.copyJson}
                </button>
                <pre className="bg-gray-100 dark:bg-zinc-800 text-black dark:text-gray-300 p-4 mt-2 overflow-x-auto text-sm font-mono text-left" dir="ltr">
                    <code>{generatedJson}</code>
                </pre>
            </div>
        </div>
      )}
    </div>
  );
};
