import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  ChevronRight, 
  X,
  CreditCard,
  Building2,
  Wallet,
  Download,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BOOKS, CATEGORIES, Book } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

const Marketplace = () => {
  const { addToCart, cart, purchasedBooks, purchaseBook } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const filteredBooks = BOOKS.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCheckout = () => {
    // Simulate payment process
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Processing payment...',
        success: () => {
          cart.forEach(id => purchaseBook(id));
          setIsCheckoutOpen(false);
          return 'Purchase successful! Books added to your library.';
        },
        error: 'Payment failed. Please try again.',
      }
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Solar E-Book Marketplace</h1>
          <p className="text-muted-foreground">Premium technical guides for solar professionals.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search books..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {cart.length > 0 && (
            <Button className="bg-emerald-600" onClick={() => setIsCheckoutOpen(true)}>
              Checkout ({cart.length})
            </Button>
          )}
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            className={selectedCategory === cat ? 'bg-emerald-600' : ''}
            onClick={() => setSelectedCategory(cat)}
            size="sm"
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden h-full flex flex-col group cursor-pointer border-none shadow-sm hover:shadow-md transition-all"
                    onClick={() => setSelectedBook(book)}>
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white/90 text-slate-900 border-none backdrop-blur-sm">
                      ${book.price}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <Badge variant="outline" className="mb-2 w-fit text-[10px] uppercase tracking-wider">{book.category}</Badge>
                  <h3 className="font-bold text-base mb-1 group-hover:text-emerald-600 transition-colors line-clamp-2">{book.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4">By {book.author}</p>
                  
                  <div className="mt-auto pt-4 flex gap-2">
                    {purchasedBooks.includes(book.id) ? (
                      <Button variant="secondary" className="w-full text-emerald-600" onClick={(e) => {
                        e.stopPropagation();
                        toast.info('Downloading book...');
                      }}>
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    ) : (
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={(e) => {
                        e.stopPropagation();
                        addToCart(book.id);
                      }}>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Book Details Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-4xl sm:p-0 overflow-hidden">
          {selectedBook && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[3/4] md:aspect-auto bg-slate-100 dark:bg-slate-800">
                <img src={selectedBook.coverImage} className="w-full h-full object-cover" alt={selectedBook.title} />
              </div>
              <div className="p-6 md:p-10 flex flex-col">
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2 text-emerald-600 font-semibold uppercase text-xs tracking-widest">
                    {selectedBook.category}
                  </div>
                  <DialogTitle className="text-3xl font-bold leading-tight">{selectedBook.title}</DialogTitle>
                  <DialogDescription className="text-lg">Written by {selectedBook.author}</DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="font-bold text-sm uppercase text-muted-foreground mb-2">Description</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedBook.description}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm uppercase text-muted-foreground mb-2">What's Inside?</h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {selectedBook.preview.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-4 py-4 border-y">
                    <div className="text-center px-4 border-r">
                      <div className="text-sm text-muted-foreground">Pages</div>
                      <div className="font-bold">{selectedBook.pages}</div>
                    </div>
                    <div className="text-center px-4 border-r">
                      <div className="text-sm text-muted-foreground">Format</div>
                      <div className="font-bold">PDF/ePub</div>
                    </div>
                    <div className="text-center px-4">
                      <div className="text-sm text-muted-foreground">Language</div>
                      <div className="font-bold">English</div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Price</div>
                    <div className="text-3xl font-bold">${selectedBook.price}</div>
                  </div>
                  {purchasedBooks.includes(selectedBook.id) ? (
                    <Button size="lg" className="flex-1 bg-emerald-600">Read Now</Button>
                  ) : (
                    <Button size="lg" className="flex-1 bg-emerald-600" onClick={() => {
                      addToCart(selectedBook.id);
                      setSelectedBook(null);
                    }}>Add to Cart</Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Choose your preferred payment method below.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="bank">Bank</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="card" className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Card Information</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="0000 0000 0000 0000" className="pl-9" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVC" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bank" className="space-y-4 py-4">
              <div className="rounded-lg border p-4 bg-slate-50 dark:bg-slate-900">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="font-bold">Direct Bank Transfer</div>
                    <div className="text-xs text-muted-foreground">Available for GTB, Zenith, Stanbic</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Select Bank</Button>
              </div>
            </TabsContent>

            <TabsContent value="mobile" className="space-y-4 py-4">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-between h-14">
                  <div className="flex items-center gap-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Paystack_Logo.png" className="h-4" alt="Paystack" />
                    <span>Pay with Paystack</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between h-14">
                  <div className="flex items-center gap-3">
                    <Wallet className="h-5 w-5 text-sky-500" />
                    <span>Pay with Flutterwave</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground">Total to pay:</span>
              <span className="text-2xl font-bold">
                ${cart.reduce((sum, id) => sum + (BOOKS.find(b => b.id === id)?.price || 0), 0).toFixed(2)}
              </span>
            </div>
            <Button className="w-full bg-emerald-600 h-12 text-lg" onClick={handleCheckout}>
              Pay Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;