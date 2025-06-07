"use client";

import { useState, useEffect } from 'react';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { LanguageSelector } from '@/components/ui/language-selector';
import { getTranslations, Language, getLanguageFromStorage, saveLanguageToStorage } from '@/lib/localization';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getPublishedBlogPosts, searchBlogPosts, BlogPost } from '@/lib/blog-service';

export default function BlogsPage() {
  // Language state and translations
  const [currentLanguage, setCurrentLanguage] = useState<Language>('az');
  const t = getTranslations(currentLanguage);
  
  // Initialize language from localStorage
  useEffect(() => {
    const savedLanguage = getLanguageFromStorage();
    setCurrentLanguage(savedLanguage);
  }, []);
  
  // Save language to localStorage when it changes
  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    saveLanguageToStorage(language);
  };
  
  // Blog posts state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
    // Load blog posts from Firebase
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let fetchedPosts: BlogPost[];
        
        if (searchQuery.trim()) {
          fetchedPosts = await searchBlogPosts(searchQuery.trim());
        } else {
          fetchedPosts = await getPublishedBlogPosts();
        }
        
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError(err instanceof Error ? err.message : 'Blog yazıları yüklənə bilmədi');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      loadPosts();
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
    // Utility function to highlight search matches
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span 
          key={index} 
          style={{ 
            backgroundColor: '#DBEAFE', // Light blue background
            padding: '2px 4px',
            borderRadius: '3px'
          }}
        >
          {part}
        </span>
      ) : part
    );
  };
  // Function to find matching content snippet
  const findMatchingSnippet = (blog: BlogPost, query: string): string | null => {
    if (!query.trim()) return null;
    
    const searchTerm = query.toLowerCase();
    
    // Get content based on current language
    const content = blog.content[currentLanguage] || blog.content.az;
    
    // Check if match is in content
    const contentMatch = content.toLowerCase().indexOf(searchTerm);
    if (contentMatch !== -1) {
      const start = Math.max(0, contentMatch - 50);
      const end = Math.min(content.length, contentMatch + searchTerm.length + 50);
      return content.slice(start, end) + (end < content.length ? '...' : '');
    }
    
    // Check if match is in sections
    for (const section of blog.sections) {
      const sectionContent = section.content[currentLanguage] || section.content.az;
      const sectionContentMatch = sectionContent.toLowerCase().indexOf(searchTerm);
      if (sectionContentMatch !== -1) {
        const start = Math.max(0, sectionContentMatch - 50);
        const end = Math.min(sectionContent.length, sectionContentMatch + searchTerm.length + 50);
        return sectionContent.slice(start, end) + (end < sectionContent.length ? '...' : '');
      }
    }
    
    return null;
  };
  
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
          <div className="flex items-center gap-2">            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 overflow-hidden" style={{ backgroundColor: WHITE, maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden">
            {/* Page Header */}
          <div className="text-center mb-12">            <h1 
              className={mainHeadingClass}
              style={{ color: FOREGROUND }}
            >
              {t.blog.title}
            </h1>            <p className="text-lg font-light max-w-3xl mx-auto mb-6" style={{ color: FOREGROUND_LIGHT }}>
              {t.blog.subtitle}
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
                placeholder={t.blog.searchPlaceholder}
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                style={{ borderColor: '#E5E7EB' }}
              />
            </div>
          </div>          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p style={{ color: FOREGROUND_LIGHT }}>Blog yazıları yüklənir...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 text-2xl">!</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: FOREGROUND }}>
                Xəta baş verdi
              </h3>
              <p style={{ color: FOREGROUND_LIGHT }}>
                {error}
              </p>
            </div>
          )}

          {/* Blog Grid */}
          {!loading && !error && posts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((blog) => (
                <Link key={blog.id} href={`/blogs/${blog.slug || blog.id}`}>
                  <article 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 group cursor-pointer"
                  >                {/* Blog Image */}
                <div className="w-full h-48 overflow-hidden">
                  {blog.imageUrl ? (                    <img
                      src={blog.imageUrl}
                      alt={blog.title[currentLanguage]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div 
                      className="w-full h-full bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center"
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
                  )}
                </div>

                {/* Blog Content */}
                <div className="p-6">                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="text-sm font-medium px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: PRIMARY_LIGHT, 
                        color: PRIMARY 
                      }}
                    >
                      {blog.category[currentLanguage] || blog.category.az}
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
                    {highlightText(blog.title[currentLanguage] || blog.title.az, searchQuery)}
                  </h3>

                  {/* Blog Excerpt or Matching Content Snippet */}
                  <div 
                    className="text-sm font-light mb-4 line-clamp-3"
                    style={{ color: FOREGROUND_LIGHT }}
                  >
                    {searchQuery.trim() && findMatchingSnippet(blog, searchQuery) ? (
                      <div>
                        <div className="text-xs font-medium mb-1" style={{ color: PRIMARY }}>
                          Məzmunda tapılan:
                        </div>
                        <div>
                          {highlightText(findMatchingSnippet(blog, searchQuery) || '', searchQuery)}
                        </div>
                      </div>
                    ) : (
                      highlightText(blog.excerpt[currentLanguage] || blog.excerpt.az, searchQuery)
                    )}
                  </div>{/* Date & Read More */}
                  <div className="flex items-center justify-between">                    <span className="text-xs" style={{ color: FOREGROUND_LIGHT }}>
                      {blog.createdAt ? (
                        blog.createdAt instanceof Date ? 
                          blog.createdAt.toLocaleDateString('az-AZ', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) :
                          blog.createdAt.toDate().toLocaleDateString('az-AZ', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                      ) : 'Tarix bilinmir'}
                    </span>
                    <Link 
                      href={`/blogs/${blog.slug || blog.id}`}
                      className="flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all"
                      style={{ color: PRIMARY }}
                    >
                      {t.blog.readMore}
                      <ArrowRight className="w-4 h-4" />
                    </Link>                  </div>
                </div>
              </article>
              </Link>
            ))}
            </div>
          )}

          {/* No Results Message */}
          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <Search className="w-16 h-16 mx-auto" style={{ color: FOREGROUND_LIGHT }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: FOREGROUND }}>
                {searchQuery.trim() ? 'Heç bir nəticə tapılmadı' : 'Hələ blog yazısı yoxdur'}
              </h3>
              <p style={{ color: FOREGROUND_LIGHT }}>
                {searchQuery.trim() ? 
                  `"${searchQuery}" sorğusu üçün blog tapılmadı. Başqa açar sözlərlə cəhd edin.` :
                  'Yaxın zamanda blog yazıları əlavə ediləcək.'
                }
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
                {t.blog.backToHome}
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
