import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  DollarSign, 
  BarChart3, 
  Plus, 
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Bell,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { BOOKS } from '../data/mockData';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'books' | 'users'>('overview');

  const stats = [
    { label: 'Total Sales', value: '$12,450', trend: '+12.5%', icon: DollarSign, color: 'text-emerald-600' },
    { label: 'Active Students', value: '1,240', trend: '+5.2%', icon: Users, color: 'text-sky-600' },
    { label: 'Books Published', value: '18', trend: '0', icon: BookOpen, color: 'text-amber-600' },
    { label: 'Engagement', value: '85%', trend: '+2.1%', icon: BarChart3, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your marketplace, users, and content.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Bell className="mr-2 h-4 w-4" /> Notifications</Button>
          <Button className="bg-emerald-600"><Plus className="mr-2 h-4 w-4" /> Add New Product</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <Badge variant="outline" className={`border-none ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50'}`}>
                  {stat.trend}
                </Badge>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Catalog Management</CardTitle>
              <CardDescription>Monitor and edit your e-book inventory.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search catalog..." className="pl-9 h-9" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                <TableRow>
                  <TableHead className="w-[300px]">Book Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BOOKS.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <img src={book.coverImage} className="h-10 w-8 object-cover rounded shadow-sm" alt="" />
                        <span className="line-clamp-1">{book.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">{book.category}</Badge>
                    </TableCell>
                    <TableCell>${book.price}</TableCell>
                    <TableCell>124</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600"><Edit size={16} /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 size={16} /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Real-time transaction history.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {[
                { user: 'John Doe', book: 'Solar Masterclass', amount: '$49.99', time: '12m ago' },
                { user: 'Sarah King', book: 'Off-Grid Secrets', amount: '$44.99', time: '45m ago' },
                { user: 'Mike Chen', book: 'Install Guide', amount: '$39.99', time: '2h ago' },
                { user: 'Elena Ray', book: 'Solar Masterclass', amount: '$49.99', time: '4h ago' },
                { user: 'Alex Watt', book: 'Business Blueprint', amount: '$79.99', time: '5h ago' },
              ].map((sale, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                      {sale.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{sale.user}</div>
                      <div className="text-[10px] text-muted-foreground">{sale.book}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-600">{sale.amount}</div>
                    <div className="text-[10px] text-muted-foreground">{sale.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-emerald-600">
                View Full Sales Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;