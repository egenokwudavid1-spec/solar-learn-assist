import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  purchasedBooks: string[];
  purchaseBook: (bookId: string) => void;
  bookmarks: string[];
  toggleBookmark: (bookId: string) => void;
  progress: Record<string, number>;
  updateProgress: (courseId: string, value: number) => void;
  cart: string[];
  addToCart: (bookId: string) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('solar_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [purchasedBooks, setPurchasedBooks] = useState<string[]>(() => {
    const saved = localStorage.getItem('solar_purchased');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('solar_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [progress, setProgress] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('solar_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [cart, setCart] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('solar_theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('solar_user', JSON.stringify(user));
    localStorage.setItem('solar_purchased', JSON.stringify(purchasedBooks));
    localStorage.setItem('solar_bookmarks', JSON.stringify(bookmarks));
    localStorage.setItem('solar_progress', JSON.stringify(progress));
    localStorage.setItem('solar_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user, purchasedBooks, bookmarks, progress, isDarkMode]);

  const purchaseBook = (bookId: string) => {
    if (!purchasedBooks.includes(bookId)) {
      setPurchasedBooks(prev => [...prev, bookId]);
      toast.success('Book added to your library!');
    }
  };

  const toggleBookmark = (bookId: string) => {
    setBookmarks(prev => 
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const updateProgress = (courseId: string, value: number) => {
    setProgress(prev => ({ ...prev, [courseId]: value }));
  };

  const addToCart = (bookId: string) => {
    if (!cart.includes(bookId)) {
      setCart(prev => [...prev, bookId]);
      toast.success('Added to cart');
    }
  };

  const removeFromCart = (bookId: string) => {
    setCart(prev => prev.filter(id => id !== bookId));
  };

  const clearCart = () => setCart([]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <AppContext.Provider value={{
      user, setUser, purchasedBooks, purchaseBook, bookmarks, toggleBookmark,
      progress, updateProgress, cart, addToCart, removeFromCart, clearCart,
      isDarkMode, toggleDarkMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};