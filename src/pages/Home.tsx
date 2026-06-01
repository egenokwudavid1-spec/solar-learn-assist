import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Cpu, 
  ShieldCheck, 
  Zap,
  Star,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BOOKS } from '../data/mockData';

const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-sky-700 p-8 md:p-20 text-white">
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-emerald-500/20 text-white border-white/20 px-3 py-1">
              #1 Solar Learning Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Master Solar Technology with <span className="text-emerald-300">AI Intelligence</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-emerald-50/90 leading-relaxed">
              Unlock the secrets of renewable energy. Buy premium e-books, access professional courses, and chat with our expert AI solar assistant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/marketplace">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 w-full sm:w-auto font-bold">
                  Explore E-Books
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/ai">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto font-bold">
                  Talk to AI Assistant
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4 hidden lg:block">
          <Zap className="h-96 w-96 text-white" />
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Solar Wise?</h2>
          <p className="text-muted-foreground">Comprehensive resources for every step of your solar journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Expert E-Books',
              desc: 'Premium digital library covering everything from basics to advanced engineering.',
              icon: BookOpen,
              color: 'text-emerald-600'
            },
            {
              title: 'AI Support',
              desc: 'Get instant answers, calculations, and troubleshooting steps from our trained AI.',
              icon: Cpu,
              color: 'text-sky-600'
            },
            {
              title: 'Certified Learning',
              desc: 'Earn certificates upon completion of our structured courses and assessments.',
              icon: ShieldCheck,
              color: 'text-amber-500'
            }
          ].map((feature, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className={`mb-4 inline-block p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 ${feature.color}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured E-Books</h2>
            <p className="text-muted-foreground">Our most popular technical guides.</p>
          </div>
          <Link to="/marketplace" className="text-emerald-600 font-semibold flex items-center gap-1 hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOOKS.slice(0, 3).map((book) => (
            <motion.div key={book.id} whileHover={{ y: -5 }}>
              <Card className="overflow-hidden h-full border-none shadow-sm">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-emerald-100 text-emerald-700 border-none hover:bg-emerald-100">{book.category}</Badge>
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">{book.title}</h3>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-xs text-muted-foreground ml-1">(4.9)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${book.price}</span>
                    <Link to="/marketplace">
                      <Button size="sm">Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-12 border shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-emerald-600 mb-2">15k+</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Users className="h-4 w-4" /> Students
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-600 mb-2">50+</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <BookOpen className="h-4 w-4" /> E-Books
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-600 mb-2">98%</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Star className="h-4 w-4" /> Satisfaction
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Cpu className="h-4 w-4" /> AI Help
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-4">Start Your Solar Career Today</h2>
          <p className="text-slate-400 max-w-md">Join thousands of technicians and engineers learning the future of energy with Solar Wise Academy.</p>
        </div>
        <div className="flex gap-4">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500">Sign Up Now</Button>
          <Button size="lg" variant="outline" className="border-slate-700 hover:bg-slate-800">Learn More</Button>
        </div>
      </section>
    </div>
  );
};

export default Home;