import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import type { Theme, Post, ContentBlock } from './types';
import { UI_TEXT } from './constants';
import { Header } from './components/Header';
import { BlogPost } from './components/BlogPost';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { Pagination } from './components/Pagination';

const POSTS_PER_PAGE = 9;

const Layout: React.FC<{ theme: Theme; setTheme: React.Dispatch<React.SetStateAction<Theme>>; children: React.ReactNode, headerProps: Omit<React.ComponentProps<typeof Header>, 'theme' | 'setTheme' | 'translations'> }> = ({ theme, setTheme, children, headerProps }) => (
  <div className={`min-h-screen bg-gray-100 dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300 flex flex-col`}>
    <Header 
      theme={theme} 
      setTheme={setTheme} 
      translations={UI_TEXT}
      {...headerProps}
    />
    <main className="container mx-auto px-4 sm:px-8 py-8 flex-grow">
      {children}
    </main>
    <Footer translations={UI_TEXT} />
  </div>
);

const HomePage: React.FC<{posts: Post[], loading: boolean, error: string | null}> = ({ posts, loading, error }) => {
  if (loading) {
    return <p className="text-center py-10">{UI_TEXT.loading}</p>;
  }
  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }
  if (posts.length === 0) {
    return <p className="text-center py-10">{UI_TEXT.noResultsFound}</p>;
  }
  return (
    <div>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
}

const getPostTextContent = (post: Post): string => {
  const title = post.title;
  const content = post.content.map((block: ContentBlock) => {
    if ('text' in block) return block.text;
    if (block.type === 'ul' || block.type === 'ol') return block.items.join(' ');
    return '';
  }).join(' ');
  return `${title} ${content}`.toLowerCase();
};


function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }
    return 'light';
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('posts.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const sortedPosts = data.sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(sortedPosts);

        const allTags = new Set<string>();
        sortedPosts.forEach((post: Post) => post.tags.forEach(tag => allTags.add(tag)));
        setCategories(Array.from(allTags));
        
        setError(null);
      } catch (e) {
        console.error("Failed to fetch posts:", e);
        setError(UI_TEXT.error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    setCurrentPage(1); // Reset page on filter change
    return posts
      .filter(post => {
        const categoryMatch = selectedCategory === 'all' || post.tags.includes(selectedCategory);
        if (!categoryMatch) return false;
        
        const term = searchTerm.toLowerCase().trim();
        if (!term) return true;
        
        return getPostTextContent(post).includes(term);
      });
  }, [posts, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage]);


  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.lang = 'fa';
    root.dir = 'rtl';
  }, []);
  
  const headerProps = {
    searchTerm,
    setSearchTerm,
    categories,
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <BrowserRouter>
      <Layout theme={theme} setTheme={setTheme} headerProps={headerProps}>
        <Routes>
          <Route path="/" element={
            <>
              <HomePage posts={paginatedPosts} loading={loading} error={error} />
              {!loading && !error && filteredPosts.length > POSTS_PER_PAGE && (
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  translations={UI_TEXT}
                />
              )}
            </>
          } />
          <Route path="/admin-posts" element={<AdminPanel translations={UI_TEXT} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
