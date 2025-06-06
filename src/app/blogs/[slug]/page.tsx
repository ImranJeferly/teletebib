"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Copy, Check, Calendar, Clock, User } from 'lucide-react';
import { LanguageSelector } from '@/components/ui/language-selector';
import { getTranslations, Language } from '@/lib/localization';
import { Button } from '@/components/ui/button';
import NextLink from 'next/link';
import { DoctorCTA } from '@/components/blog/doctor-cta';
import { PatientCTA } from '@/components/blog/patient-cta';

interface BlogSection {
  id: string;
  title: string;
  content: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  sections: BlogSection[];
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
}

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  // Language state and translations
  const [currentLanguage, setCurrentLanguage] = useState<Language>('az');
  const t = getTranslations(currentLanguage);
  
  // State for active section and copied status
  const [activeSection, setActiveSection] = useState<string>('');
  const [copiedSection, setCopiedSection] = useState<string>('');
  
  // Refs for section elements
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  
  // Direct color definitions (same as landing page)
  const PRIMARY = "#1A56DB";
  const PRIMARY_LIGHT = "#E6EDFB";
  const PRIMARY_DARK = "#0F3285"; 
  const WHITE = "#FFFFFF";
  const FOREGROUND = "#0F2C71";
  const FOREGROUND_LIGHT = "#526591";
  
  // Standardized button styles
  const primaryButtonClass = "rounded-full py-4 px-6 text-sm font-medium shadow-sm text-white";
    // Sample blog data (in real app, this would come from API/CMS)
  const blogPost: BlogPost = {
    id: slug,
    title: "Qışda İmmuniteti Necə Gücləndirmək Olar",
    excerpt: "Soyuq havalarda bədənimizi xəstəliklərdən qorumaq üçün praktik məsləhətlər və təbii üsullar.",
    content: "Qış ayları yaxınlaşdıqca, immuniteti güclə çdirmək və sağlam qalmaq hər kəsin prioriteti olur.",
    date: "2024-12-15",
    readTime: "8 dəq",
    category: "Səhiyyə",
    author: "Dr. Aynur Məmmədova",
    image: "placeholder",
    sections: [
      {
        id: "giris",
        title: "Giriş: İmmunitetin Əhəmiyyəti",
        content: "İmmun sistem bədənimizi xarici təhdidlərdən qoruyan ən güclü müdafiə sistemidir. Qış aylarında bu sistem xüsusilə aktiv olmalıdır çünki soyuq hava, quru havanın təsiri və kapalı məkanlarda vaxt keçirmək immuniteti zəiflədə bilər."
      },
      {
        id: "qida",
        title: "Düzgün Qidalanma və Vitaminlər",
        content: "İmmuniteti güclə çdirmək üçün düzgün qidalanma əsasdır. C vitamini ilə zəngin meyvələr (portağal, limon, kivi), sink mənbəyi olan quru meyvələr və balıq, eləcə də probiotik qidalar (kefir, yoğurt) immun sistemi dəstəkləyir. Həmçinin D vitamini qəbulu da qış aylarında çox vacibdir."
      },
      {
        id: "idman",
        title: "Fiziki Aktivlik və İdman",
        content: "Mütəmadi fiziki aktivlik immun sistemi güclə çdirir. Gündə 30 dəqiqə orta səviyyədə idman etmək, məsələn sürətli yerimək, velosiped sürmək və ya ev şəraitində məşqlər immuniteti artırır. Lakin həddindən artıq intensiv idman əksinə immuniteti zəiflədə bilər."
      },
      {
        id: "yuxu",
        title: "Keyfiyyətli Yuxu və İstirahət",
        content: "Gecədə 7-9 saat keyfiyyətli yuxu immun sistemin normal işləməsi üçün vacibdir. Yuxusuzluq stress hormonlarının artmasına və immuniteti zəiflə ən güləra səbəb olur. Mütəmadi yuxu rejimi saxlamaq və gecə vaxtı ekran işığından qaçınmaq tövsiyə olunur."
      },
      {
        id: "stress",
        title: "Stress İdarəetməsi",
        content: "Uzunmüddətli stress immun sistemi ciddi şəkildə zəiflə ər. Stress idarəetmə üsulları - meditasiya, dərin nəfəsalma, yoga və ya hobbilərlə məşğul olmaq immuniteti güclə ndirməkdə kömək edir. Həmçinin sosial əlaqələr saxlamaq da stressi azaldır."
      },
      {
        id: "gigiyena",
        title: "Şəxsi Gigiyena və Tədbir ər",
        content: "Əllərin tez-tez yuyulması, maskadan istifadə, sağlam məsafə saxlanılması və qapalı məkanların havalandırılması xəstəliklərin yayılmasının qarşısını alır. Bu sadə tədbirlər immun sistemə köməklik edir və virus və bakteriyaların bədənə daxil olma ehtimalını azaldır."
      }
    ]
  };

  // Featured blogs for the end section
  const featuredBlogs = [
    {
      id: "2",
      title: "Onlayn Həkim Məsləhətinin Üstünlükləri",
      excerpt: "Telemedisininin faydaları və nə vaxt onlayn həkim məsləhəti almaq daha məqsədəuyğundur.",
      date: "2024-12-10",
      readTime: "7 dəq",
      category: "Telemedisin"
    },
    {
      id: "3",
      title: "Stress və Əqli Sağlamlıq",
      excerpt: "Gündəlik həyatda stressi idarə etmək və psixi sağlamlığımızı qorumaq üçün effektiv strategiyalar.",
      date: "2024-12-05",
      readTime: "6 dəq",
      category: "Psixologiya"
    },
    {
      id: "4",
      title: "Uşaqlarda Müntəzəm Sağlamlıq Yoxlamaları",
      excerpt: "Uşaqların sağlam böyüməsi üçün nə vaxt və hansı yoxlamaların edilməsi vacibdir.",
      date: "2024-11-28",
      readTime: "4 dəq",
      category: "Pediatriya"
    }
  ];
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

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let current = '';
      
      Object.entries(sectionRefs.current).forEach(([id, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = id;
          }
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40" style={{ backgroundColor: WHITE }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">          <div className="flex items-center space-x-4">
            <NextLink href="/blogs" className="flex items-center space-x-2 text-sm hover:opacity-70">
              <ChevronLeft className="w-4 h-4" />
              <span>Bloqlara qayıt</span>
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
              onLanguageChange={setCurrentLanguage}
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Table of Contents - Visible only on large screens */}
        <aside className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 w-64 z-30">
          <div className="bg-white rounded-lg shadow-lg border p-4 max-h-96 overflow-y-auto">
            <h4 className="font-semibold text-sm mb-3" style={{ color: FOREGROUND }}>
              Bu məqalədə
            </h4>
            <nav className="space-y-2">
              {blogPost.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full text-left text-xs py-2 px-3 rounded-md transition-colors ${
                    activeSection === section.id 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72">
          <article className="max-w-4xl mx-auto px-4 py-8">
            {/* Hero Image */}
            <div className="w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-8">
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
            </div>

            {/* Article Header */}
            <header className="mb-8">
              {/* Category */}
              <div className="mb-4">
                <span 
                  className="inline-block text-sm font-medium px-4 py-2 rounded-full"
                  style={{ 
                    backgroundColor: PRIMARY_LIGHT, 
                    color: PRIMARY 
                  }}
                >
                  {blogPost.category}
                </span>
              </div>

              {/* Title */}
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
                style={{ color: FOREGROUND }}
              >
                {blogPost.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: FOREGROUND_LIGHT }}>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blogPost.date).toLocaleDateString('az-AZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <p className="text-lg leading-relaxed mb-8" style={{ color: FOREGROUND_LIGHT }}>
                {blogPost.content}
              </p>

              {/* Sections */}
              {blogPost.sections.map((section, index) => (
                <section 
                  key={section.id}
                  ref={(el) => { sectionRefs.current[section.id] = el; }}
                  className="mb-10"
                  id={section.id}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <h2 
                      className="text-2xl md:text-3xl font-bold"
                      style={{ color: FOREGROUND }}
                    >
                      {section.title}
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
                    </button>
                  </div>
                  <p 
                    className="text-base leading-relaxed"
                    style={{ color: FOREGROUND_LIGHT }}
                  >
                    {section.content}
                  </p>
                  
                  {/* Add CTAs after specific sections */}
                  {index === 2 && <DoctorCTA />}
                  {index === 4 && <PatientCTA />}
                </section>
              ))}
            </div>

            {/* Featured Blogs Section */}
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
                  >
                    {/* Blog Image Placeholder */}
                    <div 
                      className="w-full h-32 bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center"
                      style={{ backgroundColor: PRIMARY_LIGHT }}
                    >
                      <Calendar className="w-8 h-8" style={{ color: PRIMARY }} />
                    </div>

                    {/* Blog Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: PRIMARY_LIGHT, 
                            color: PRIMARY 
                          }}
                        >
                          {blog.category}
                        </span>
                        <span className="text-xs" style={{ color: FOREGROUND_LIGHT }}>
                          {blog.readTime}
                        </span>
                      </div>

                      <h4 
                        className="text-lg font-bold mb-2 line-clamp-2"
                        style={{ color: FOREGROUND }}
                      >
                        {blog.title}
                      </h4>

                      <p 
                        className="text-sm mb-3 line-clamp-2"
                        style={{ color: FOREGROUND_LIGHT }}
                      >
                        {blog.excerpt}
                      </p>                      <NextLink 
                        href={`/blogs/${blog.id}`}
                        className="text-sm font-medium hover:underline"
                        style={{ color: PRIMARY }}
                      >
                        Oxu →
                      </NextLink>
                    </div>
                  </article>
                ))}
              </div>
            </section>            {/* Back to Blogs */}
            <div className="text-center mt-12">
              <NextLink href="/blogs">
                <Button 
                  className={primaryButtonClass}
                  style={{ backgroundColor: PRIMARY }}
                >
                  Bütün bloqlara bax
                </Button>
              </NextLink>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
