import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Users, 
  Star,
  BookOpen,
  Award,
  ChevronRight,
  TrendingUp,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { COURSES, Course } from '../data/mockData';
import { useApp } from '../context/AppContext';

const LearningCenter = () => {
  const { progress } = useApp();
  const [selectedTab, setSelectedTab] = useState<'courses' | 'tutorials' | 'quizzes'>('courses');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Learning Center</h1>
          <p className="text-muted-foreground">Master solar energy with professional courses and certifications.</p>
        </div>
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {(['courses', 'tutorials', 'quizzes'] as const).map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              size="sm"
              className={`rounded-lg capitalize ${selectedTab === tab ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {selectedTab === 'courses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COURSES.map((course) => (
                <CourseCard key={course.id} course={course} progress={progress[course.id] || 0} />
              ))}
            </div>
          )}

          {selectedTab === 'tutorials' && (
            <div className="space-y-4">
              {[
                { title: 'Installing MC4 Connectors', type: 'Video', time: '12 min', level: 'Beginner' },
                { title: 'Testing Battery Specific Gravity', type: 'Article', time: '8 min', level: 'Intermediate' },
                { title: 'Configuring Hybrid Inverters', type: 'Video', time: '45 min', level: 'Advanced' },
                { title: 'Cleaning Solar Panels Safely', type: 'Article', time: '5 min', level: 'Beginner' },
              ].map((item, i) => (
                <Card key={i} className="group cursor-pointer hover:border-emerald-500 transition-colors border-none shadow-sm">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${item.type === 'Video' ? 'bg-sky-100 text-sky-600' : 'bg-amber-100 text-amber-600'}`}>
                        {item.type === 'Video' ? <Play size={20} /> : <FileText size={20} />}
                      </div>
                      <div>
                        <h4 className="font-bold group-hover:text-emerald-600 transition-colors">{item.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1"><Clock size={12} /> {item.time}</span>
                          <span className="flex items-center gap-1"><TrendingUp size={12} /> {item.level}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedTab === 'quizzes' && (
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-emerald-600 text-white overflow-hidden border-none">
                <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <Badge className="bg-white/20 text-white border-white/20 mb-4">Certified Program</Badge>
                    <h2 className="text-3xl font-bold mb-2">Solar PV Technician Level 1</h2>
                    <p className="text-emerald-50">Complete 20 questions to earn your foundational certification.</p>
                  </div>
                  <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 shrink-0">
                    Start Assessment
                  </Button>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Basic Electricity Quiz', questions: 10, attempts: 2400 },
                  { title: 'Safety & Protection Quiz', questions: 15, attempts: 1200 },
                  { title: 'Panel Mounting Quiz', questions: 12, attempts: 850 },
                  { title: 'Inverter Basics Quiz', questions: 10, attempts: 1800 },
                ].map((q, i) => (
                  <Card key={i} className="border-none shadow-sm">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{q.title}</CardTitle>
                      <CardDescription className="flex justify-between items-center mt-2">
                        <span>{q.questions} Questions</span>
                        <span className="flex items-center gap-1"><Users size={12} /> {q.attempts} taken</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <Button variant="outline" className="w-full">Take Quiz</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>My Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">Overall Mastery</span>
                  <span className="text-sm font-bold text-emerald-600">32%</span>
                </div>
                <Progress value={32} className="h-2 bg-emerald-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 border rounded-xl">
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-[10px] text-muted-foreground uppercase">Courses</div>
                </div>
                <div className="text-center p-3 border rounded-xl">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-[10px] text-muted-foreground uppercase">Lessons</div>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                <Award className="mr-2 h-4 w-4" /> View Certificates
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-slate-900 text-white">
            <CardContent className="p-6">
              <Star className="text-amber-400 mb-4 h-8 w-8 fill-current" />
              <h3 className="text-xl font-bold mb-2">Go Premium</h3>
              <p className="text-slate-400 text-sm mb-6">Unlock exclusive video lessons, offline mode, and 1-on-1 mentorship sessions.</p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-500 border-none">Upgrade Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ course, progress }: { course: Course; progress: number }) => (
  <Card className="overflow-hidden group border-none shadow-sm hover:shadow-md transition-all">
    <div className="aspect-video relative overflow-hidden">
      <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Button size="sm" className="bg-white text-black hover:bg-white/90">
          <Play size={16} className="mr-2 fill-current" /> Continue
        </Button>
      </div>
    </div>
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-2">
        <Badge variant="secondary" className="text-[10px]">{course.difficulty}</Badge>
        <span className="text-[10px] text-muted-foreground font-medium uppercase">{course.duration}</span>
      </div>
      <h3 className="font-bold mb-2 group-hover:text-emerald-600 transition-colors">{course.title}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] font-bold">
          <span className="text-muted-foreground">{course.lessons} Lessons</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-1" />
      </div>
    </CardContent>
  </Card>
);

export default LearningCenter;