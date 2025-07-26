import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { Theme, Post } from './types';
import { UI_TEXT } from './constants';
import { Header } from './components/Header';
import { BlogPost } from './components/BlogPost';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';

const Layout: React.FC<{ theme: Theme; setTheme: React.Dispatch<React.SetStateAction<Theme>>; children: React.ReactNode }> = ({ theme, setTheme, children }) => (
  <div className={`min-h-screen bg-gray-100 dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300 flex flex-col`}>
    <Header 
      theme={theme} 
      setTheme={setTheme} 
      translations={UI_TEXT}
    />
    <main className="container mx-auto px-4 sm:px-8 py-8 flex-grow">
      {children}
    </main>
    <Footer translations={UI_TEXT} />
  </div>
);

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('posts.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const sortedPosts = data.sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(sortedPosts);
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

  if (loading) {
    return <p className="text-center py-10">{UI_TEXT.loading}</p>;
  }
  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }
  return (
    <div>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }
    // Default to light theme, ignoring system preference.
    return 'light';
  });
  
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

  return (
    <BrowserRouter>
      <Layout theme={theme} setTheme={setTheme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin-posts" element={<AdminPanel translations={UI_TEXT} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
