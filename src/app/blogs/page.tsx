"use client";

import { useState } from 'react';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { LanguageSelector } from '@/components/ui/language-selector';
import { getTranslations, Language } from '@/lib/localization';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export default function BlogsPage() {
  // Language state and translations
  const [currentLanguage, setCurrentLanguage] = useState<Language>('az');
  const t = getTranslations(currentLanguage);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Direct color definitions (same as landing page)
  const PRIMARY = "#1A56DB";
  const PRIMARY_LIGHT = "#E6EDFB";
  const PRIMARY_DARK = "#0F3285"; 
  const WHITE = "#FFFFFF";
  const FOREGROUND = "#0F2C71";
  const FOREGROUND_LIGHT = "#526591";
  
  // Standardized button styles (same as landing page)
  const primaryButtonClass = "rounded-full py-4 px-6 text-sm font-medium shadow-sm text-white";
  
  // Heading size and spacing classes (same as landing page - responsive)
  const mainHeadingClass = "text-3xl sm:text-4xl lg:text-5xl leading-tight font-bold mb-6";
  
  // Placeholder blog data
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Qışda İmmuniteti Necə Gücləndirmək Olar",
      excerpt: "Soyuq havalarda bədənimizi xəstəliklərdən qorumaq üçün praktik məsləhətlər və təbii üsullar.",
      date: "2024-12-15",
      readTime: "5 dəq",
      category: "Səhiyyə",
      image: "placeholder"
    },
    {
      id: "2", 
      title: "Onlayn Həkim Məsləhətinin Üstünlükləri",
      excerpt: "Telemedisininin faydaları və nə vaxt onlayn həkim məsləhəti almaq daha məqsədəuyğundur.",
      date: "2024-12-10",
      readTime: "7 dəq",
      category: "Telemedisin",
      image: "placeholder"
    },
    {
      id: "3",
      title: "Stress və Əqli Sağlamlıq",
      excerpt: "Gündəlik həyatda stressi idarə etmək və psixi sağlamlığımızı qorumaq üçün effektiv strategiyalar.",
      date: "2024-12-05",
      readTime: "6 dəq", 
      category: "Psixologiya",
      image: "placeholder"
    },
    {
      id: "4",
      title: "Uşaqlarda Müntəzəm Sağlamlıq Yoxlamaları",
      excerpt: "Uşaqların sağlam böyüməsi üçün nə vaxt və hansı yoxlamaların edilməsi vacibdir.",
      date: "2024-11-28",
      readTime: "4 dəq",
      category: "Pediatriya", 
      image: "placeholder"
    },
    {
      id: "5",
      title: "Kardiovaskulyar Sağlamlıq Məsləhətləri",
      excerpt: "Ürək sağlamlığını qorumaq üçün qida, idman və həyat tərzi dəyişiklikləri haqqında məsləhətlər.",
      date: "2024-11-20",
      readTime: "8 dəq",
      category: "Kardiologiya",
      image: "placeholder"
    },
    {
      id: "6",
      title: "Sağlam Yuxu Vərdişləri",
      excerpt: "Keyfiyyətli yuxu üçün praktik tövsiyələr və yuxusuzluq problemlərinin həlli yolları.",
      date: "2024-11-15",
      readTime: "5 dəq",
      category: "Ümumi Təbabət",
      image: "placeholder"
    }
  ];
  
  // Filter blogs based on search query
  const filteredBlogs = blogPosts.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Same as landing page */}
      <header className="border-b border-border bg-card overflow-hidden" style={{ maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between overflow-hidden">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="TeleTebib Logo" className="h-6 sm:h-8 w-auto" />
              <span className="text-base sm:text-lg font-semibold" style={{ color: PRIMARY }}>TeleTebib</span>
            </Link>
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 overflow-hidden" style={{ backgroundColor: WHITE, maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden">
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 
              className={mainHeadingClass}
              style={{ color: FOREGROUND }}
            >
              Bloqlarımız
            </h1>
            <p className="text-lg font-light max-w-3xl mx-auto" style={{ color: FOREGROUND_LIGHT }}>
              Sağlamlıq, təbabət və wellness mövzularında ən son məqalələr və məsləhətlər
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                style={{ color: FOREGROUND_LIGHT }} 
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Bloqlarda axtar..."
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                style={{ borderColor: '#E5E7EB' }}
              />
            </div>
          </div>          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.id}`}>
                <article 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 group cursor-pointer"
                >
                {/* Blog Image Placeholder */}
                <div 
                  className="w-full h-48 bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center"
                  style={{ backgroundColor: PRIMARY_LIGHT }}
                >
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-sm font-medium" style={{ color: PRIMARY }}>
                      Blog Şəkli
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="text-sm font-medium px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: PRIMARY_LIGHT, 
                        color: PRIMARY 
                      }}
                    >
                      {blog.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs" style={{ color: FOREGROUND_LIGHT }}>
                      <Clock className="w-3 h-3" />
                      {blog.readTime}
                    </div>
                  </div>

                  {/* Blog Title */}
                  <h3 
                    className="text-xl font-bold mb-3 group-hover:text-primary transition-colors"
                    style={{ color: FOREGROUND }}
                  >
                    {blog.title}
                  </h3>

                  {/* Blog Excerpt */}
                  <p 
                    className="text-sm font-light mb-4 line-clamp-3"
                    style={{ color: FOREGROUND_LIGHT }}
                  >
                    {blog.excerpt}
                  </p>                  {/* Date & Read More */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: FOREGROUND_LIGHT }}>
                      {new Date(blog.date).toLocaleDateString('az-AZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <Link 
                      href={`/blogs/${blog.id}`}
                      className="flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all"
                      style={{ color: PRIMARY }}
                    >
                      Oxu
                      <ArrowRight className="w-4 h-4" />
                    </Link>                  </div>
                </div>
              </article>
              </Link>
            ))}
          </div>

          {/* No Results Message */}
          {filteredBlogs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <div className="mb-4">
                <Search className="w-16 h-16 mx-auto" style={{ color: FOREGROUND_LIGHT }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: FOREGROUND }}>
                Heç bir nəticə tapılmadı
              </h3>
              <p style={{ color: FOREGROUND_LIGHT }}>
                "{searchQuery}" sorğusu üçün blog tapılmadı. Başqa açar sözlərlə cəhd edin.
              </p>
            </div>
          )}

          {/* Back to Home Button */}
          <div className="text-center mt-16">
            <Link href="/">
              <Button 
                className={primaryButtonClass}
                style={{ backgroundColor: PRIMARY }}
              >
                Ana Səhifəyə Qayıt
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
