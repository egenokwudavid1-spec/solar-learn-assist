import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  BookOpen, 
  MessageSquare, 
  GraduationCap, 
  User, 
  Settings,
  Menu,
  X,
  ShoppingCart,
  Sun,
  Moon
} from 'lucide-react';
import { useApp, AppProvider } from './context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import LearningCenter from './pages/LearningCenter';
import AIService from './pages/AIService';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { Toaster } from '@/components/ui/sonner';
import { AnimatePresence, motion } from 'framer-motion';

const Navigation = () => {
  const { cart, isDarkMode, toggleDarkMode, user } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: HomeIcon, path: '/' },
    { label: 'Marketplace', icon: BookOpen, path: '/marketplace' },
    { label: 'Learning', icon: GraduationCap, path: '/learning' },
    { label: 'AI Assistant', icon: MessageSquare, path: '/ai' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ label: 'Admin', icon: Settings, path: '/admin' });
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-600 p-1.5 text-white">
              <Sun className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
              Solar Wise
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-emerald-600 ${
                  location.pathname === item.path ? 'text-emerald-600' : 'text-muted-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/marketplace" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full bg-emerald-600 p-0 text-[10px] text-white">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background md:hidden pt-20"
          >
            <nav className="container mx-auto flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 rounded-lg p-3 text-lg font-semibold transition-colors ${
                    location.pathname === item.path
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20'
                      : 'hover:bg-accent'
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-foreground font-sans">
        <Navigation />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/learning" element={<LearningCenter />} />
            <Route path="/ai" element={<AIService />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <footer className="border-t py-12 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <Sun className="h-6 w-6 text-emerald-600" />
                <span className="text-xl font-bold">Solar Wise</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering the world through solar knowledge. The #1 destination for solar education.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/learning">Tutorials</Link></li>
                <li><Link to="/learning">Quizzes</Link></li>
                <li><Link to="/ai">AI Assistant</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Marketplace</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/marketplace">E-Books</Link></li>
                <li><Link to="/marketplace">Calculators</Link></li>
                <li><Link to="/profile">My Library</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Solar Wise Academy. All rights reserved.
          </div>
        </footer>
        <Toaster position="top-center" richColors />
      </div>
    </AppProvider>
  );
}

export default App;