"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, Copy, Check, Calendar, Clock, User } from 'lucide-react';
import { LanguageSelector } from '@/components/ui/language-selector';
import { RichTextRenderer } from '@/components/ui/rich-text-renderer';
import { getTranslations, Language, getLanguageFromStorage, saveLanguageToStorage } from '@/lib/localization';
import { Button } from '@/components/ui/button';
import NextLink from 'next/link';
import { DoctorCTA } from '@/components/blog/doctor-cta';
import { PatientCTA } from '@/components/blog/patient-cta';
import { CTARenderer } from '@/components/blog/cta-renderer';
import { getBlogPostBySlug, getPublishedBlogPosts, BlogPost } from '@/lib/blog-service';

interface BlogClientProps {
  slug: string;
}

export function BlogClient({ slug }: BlogClientProps) {
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
  
  // Blog data state
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for copied status and highlighted section
  const [copiedSection, setCopiedSection] = useState<string>('');
  const [highlightedSection, setHighlightedSection] = useState<string>('');
  
  // Direct color definitions (same as landing page)
  const PRIMARY = "#1A56DB";
  const PRIMARY_LIGHT = "#E6EDFB";
  const PRIMARY_DARK = "#0F3285"; 
  const WHITE = "#FFFFFF";
  const FOREGROUND = "#0F2C71";
  const FOREGROUND_LIGHT = "#526591";
  
  // Standardized button styles
  const primaryButtonClass = "rounded-full py-4 px-6 text-sm font-medium shadow-sm text-white";
    // Load blog post and featured blogs from Firebase (only once on mount)
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to get blog by slug first, then by ID if slug fails
        let post = await getBlogPostBySlug(slug);        if (!post) {
          // If no blog found by slug, try by ID (for backward compatibility)
          const allPosts = await getPublishedBlogPosts();
          post = allPosts.find((p: BlogPost) => p.id === slug) || null;
        }
        
        if (!post) {
          setError('Blog yazısı tapılmadı');
          return;
        }
        
        setBlogPost(post);
        
        // Load featured blogs (latest 3 excluding current post) - fetch all and filter
        const allBlogs = await getPublishedBlogPosts();
        const otherBlogs = allBlogs.filter((blog: BlogPost) => blog.id !== post.id);
        setFeaturedBlogs(otherBlogs.slice(0, 3));
        
      } catch (err) {
        console.error('Error loading blog:', err);
        setError(err instanceof Error ? err.message : 'Blog yüklənə bilmədi');
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, [slug]); // Removed currentLanguage from dependencies

  // Copy section link function
  const copySectionLink = async (sectionId: string) => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
      await navigator.clipboard.writeText(url);
      setCopiedSection(sectionId);
      setTimeout(() => setCopiedSection(''), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  // Check for hash in URL on component mount and highlight section
  useEffect(() => {
    if (!blogPost || !blogPost.sections) return;
    
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash && blogPost.sections.some(section => section.id === hash)) {
      setHighlightedSection(hash);
      // Scroll to the section
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      // Keep highlight permanently - no timeout to remove it
    }
  }, [blogPost]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p style={{ color: FOREGROUND_LIGHT }}>Blog yazısı yüklənir...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 text-2xl">!</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: FOREGROUND }}>
            Blog yazısı tapılmadı
          </h3>
          <p className="mb-4" style={{ color: FOREGROUND_LIGHT }}>
            {error || 'Axtardığınız blog yazısı mövcud deyil.'}
          </p>
          <NextLink href="/blogs">
            <Button 
              className={primaryButtonClass}
              style={{ backgroundColor: PRIMARY }}
            >
              {t.blog.backToBlogs}
            </Button>
          </NextLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40" style={{ backgroundColor: WHITE }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <NextLink href="/blogs" className="flex items-center space-x-2 text-sm hover:opacity-70">
              <ChevronLeft className="w-4 h-4" />
              <span>{t.blog.backToBlogs}</span>
            </NextLink>
            <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
            <NextLink href="/" className="hidden sm:flex items-center space-x-2">
              <img src="/logo.png" alt="TeleTebib Logo" className="h-6 w-auto" />
              <span className="text-lg font-semibold" style={{ color: PRIMARY }}>TeleTebib</span>
            </NextLink>
          </div>
            <div className="flex items-center gap-2">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto px-4 py-8">          {/* Hero Image */}
          <div className="w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-8">            {blogPost.imageUrl ? (
              <img
                src={blogPost.imageUrl}
                alt={blogPost.title[currentLanguage]}
                className="w-full h-full object-cover"
              />
            ) : (
              <div 
                className="w-full h-full bg-gradient-to-r from-blue-100 to-indigo-200 flex items-center justify-center"
                style={{ backgroundColor: PRIMARY_LIGHT }}
              >
                <div className="text-center">
                  <div 
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    <Calendar className="w-10 h-10 text-white" />
                  </div>
                  <span className="text-lg font-medium" style={{ color: PRIMARY }}>
                    Blog Şəkli
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Article Header */}
          <header className="mb-8">
            {/* Category and Language Selector */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span 
                className="inline-block text-sm font-medium px-4 py-2 rounded-full w-fit"
                style={{ 
                  backgroundColor: PRIMARY_LIGHT, 
                  color: PRIMARY 
                }}
              >                {blogPost.category[currentLanguage]}
              </span>
                {/* Language Selector */}
              <div className="flex items-center gap-1">
                {(['az', 'ru', 'en'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                      currentLanguage === lang
                        ? 'text-white'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: currentLanguage === lang ? PRIMARY : 'transparent'
                    }}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ color: FOREGROUND }}            >
              {blogPost.title[currentLanguage]}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: FOREGROUND_LIGHT }}>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{blogPost.author || 'TeleTebib'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {blogPost.createdAt ? (
                    blogPost.createdAt instanceof Date ? 
                      blogPost.createdAt.toLocaleDateString('az-AZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) :
                      blogPost.createdAt.toDate().toLocaleDateString('az-AZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                  ) : 'Tarix bilinmir'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{blogPost.readTime || '5 dəq'}</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}            <p className="text-lg leading-relaxed mb-8" style={{ color: FOREGROUND_LIGHT }}>
              {blogPost.content[currentLanguage]}
            </p>{/* Sections */}
            {blogPost.sections && blogPost.sections.map((section, index) => (
              <section 
                key={section.id}
                className="mb-10"
                id={section.id}
              >
                {/* Render CTA before section if configured */}
                {section.cta && section.cta.position === 'before' && (
                  <CTARenderer type={section.cta.type} position="before" />
                )}
                
                <div className="flex items-center gap-3 mb-4">
                  <h2 
                    className={`text-2xl md:text-3xl font-bold transition-all duration-500 ${
                      highlightedSection === section.id 
                        ? 'bg-blue-100 px-3 py-1 rounded-lg shadow-sm border-l-4 border-blue-500' 
                        : ''
                    }`}
                    style={{ color: FOREGROUND }}                  >
                    {section.title[currentLanguage]}
                  </h2>
                  <button
                    onClick={() => copySectionLink(section.id)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title="Bölməyə link kopyala"
                  >
                    {copiedSection === section.id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </button>                </div>
                <RichTextRenderer 
                  content={section.content[currentLanguage]}
                  className="text-base leading-relaxed"
                />
                
                {/* Render CTA after section if configured */}
                {section.cta && section.cta.position === 'after' && (
                  <CTARenderer type={section.cta.type} position="after" />
                )}
              </section>
            ))}
          </div>

          {/* Featured Blogs Section */}
          {featuredBlogs.length > 0 && (
            <section className="mt-16 pt-16 border-t border-gray-200">
              <h3 
                className="text-2xl md:text-3xl font-bold mb-8 text-center"
                style={{ color: FOREGROUND }}
              >
                Tövsiyə olunan məqalələr
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredBlogs.map((blog) => (
                  <article 
                    key={blog.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >                    {/* Blog Image */}
                    <div className="w-full h-32 overflow-hidden">
                      {blog.imageUrl ? (                        <img
                          src={blog.imageUrl}
                          alt={blog.title[currentLanguage]}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div 
                          className="w-full h-full bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center"
                          style={{ backgroundColor: PRIMARY_LIGHT }}
                        >
                          <Calendar className="w-8 h-8" style={{ color: PRIMARY }} />
                        </div>
                      )}
                    </div>

                    {/* Blog Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: PRIMARY_LIGHT, 
                            color: PRIMARY 
                          }}                        >
                          {blog.category[currentLanguage]}
                        </span>
                        <span className="text-xs" style={{ color: FOREGROUND_LIGHT }}>
                          {blog.readTime || '5 dəq'}
                        </span>
                      </div>

                      <h4 
                        className="text-lg font-bold mb-2 line-clamp-2"
                        style={{ color: FOREGROUND }}                      >
                        {blog.title[currentLanguage]}
                      </h4>

                      <p 
                        className="text-sm mb-3 line-clamp-2"
                        style={{ color: FOREGROUND_LIGHT }}                      >
                        {blog.excerpt[currentLanguage]}
                      </p>

                      <NextLink 
                        href={`/blogs/${blog.slug || blog.id}`}
                        className="text-sm font-medium hover:underline"
                        style={{ color: PRIMARY }}
                      >
                        Oxu →
                      </NextLink>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Back to Blogs */}
          <div className="text-center mt-12">
            <NextLink href="/blogs">
              <Button 
                className={primaryButtonClass}
                style={{ backgroundColor: PRIMARY }}
              >
                {t.blog.viewAllBlogs}
              </Button>
            </NextLink>
          </div>
        </article>
      </main>
    </div>
  );
}
