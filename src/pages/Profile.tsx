import React from 'react';
import { motion } from 'framer-motion';
import { 
  User as UserIcon, 
  Settings, 
  BookOpen, 
  CreditCard, 
  Bell, 
  LogOut, 
  Download,
  Star,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BOOKS } from '../data/mockData';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { purchasedBooks, user, bookmarks } = useApp();
  
  const myBooks = BOOKS.filter(b => purchasedBooks.includes(b.id));

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white dark:bg-slate-900 rounded-3xl border shadow-sm">
        <Avatar className="h-24 w-24 border-4 border-emerald-500/20">
          <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
          <AvatarFallback>SW</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl font-bold">{user?.name || "Guest User"}</h1>
          <p className="text-muted-foreground">{user?.email || "guest@solarwise.com"}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
            <Badge className="bg-emerald-100 text-emerald-700 border-none">Certified Technician</Badge>
            <Badge className="bg-sky-100 text-sky-700 border-none">Premium Member</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Settings className="mr-2 h-4 w-4" /> Edit Profile</Button>
          <Button variant="ghost" className="text-destructive"><LogOut className="mr-2 h-4 w-4" /> Logout</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Library */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My E-Book Library</h2>
              <span className="text-muted-foreground text-sm">{myBooks.length} Books</span>
            </div>

            {myBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myBooks.map((book) => (
                  <Card key={book.id} className="overflow-hidden border-none shadow-sm group">
                    <CardContent className="p-0 flex h-32">
                      <div className="w-24 shrink-0">
                        <img src={book.coverImage} className="w-full h-full object-cover" alt={book.title} />
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-1">
                        <div>
                          <h4 className="font-bold text-sm line-clamp-1 group-hover:text-emerald-600 transition-colors">{book.title}</h4>
                          <p className="text-[10px] text-muted-foreground mt-1">Author: {book.author}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" className="h-8 text-[10px] w-full">Read</Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 shrink-0"><Download size={14} /></Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-100 dark:bg-slate-800 rounded-3xl border-2 border-dashed">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                <h3 className="font-bold">Your library is empty</h3>
                <p className="text-sm text-muted-foreground mb-6">Start your journey by exploring our marketplace.</p>
                <Button className="bg-emerald-600">Browse E-Books</Button>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Saved Items</h2>
            <div className="space-y-3">
              {[
                { title: 'Inverter Sizing Calculator', category: 'Tool', date: '2 days ago' },
                { title: 'Residential Wiring Diagram', category: 'Technical Sheet', date: '1 week ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border shadow-sm hover:border-emerald-500 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-emerald-600">
                      <Star size={18} className="group-hover:fill-current" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{item.title}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.category} • Saved {item.date}</div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Activity & Rewards */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Badges earned through learning</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center ${i < 4 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-300'}`}>
                  {i < 4 ? <Award size={24} /> : <ShieldCheck size={24} />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-gradient-to-br from-sky-600 to-sky-800 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Affiliate Program</h3>
              <p className="text-sky-100 text-sm mb-6">Earn 15% commission on every e-book sold through your link.</p>
              <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex items-center justify-between mb-4">
                <code className="text-xs">SOLARWISE-REF-129</code>
                <Button size="sm" variant="ghost" className="h-7 text-[10px] px-2 hover:bg-white/20 text-white">Copy</Button>
              </div>
              <div className="flex justify-between text-xs font-bold mb-4">
                <span>Earned this month:</span>
                <span>$142.50</span>
              </div>
              <Button className="w-full bg-white text-sky-800 hover:bg-sky-50">View Affiliate Dashboard</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-between">
                Two-Factor Auth
                <Badge className="bg-emerald-100 text-emerald-600 border-none">Enabled</Badge>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" /> Payment Methods
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" /> Notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;