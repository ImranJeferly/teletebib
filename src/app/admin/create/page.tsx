"use client";

import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Eye, UserCheck, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/blog/image-upload';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBlogPost, BlogPostInput } from '@/lib/blog-service';

interface BlogSection {
  id: string;
  title: {
    az: string;
    ru: string;
    en: string;
  };
  content: {
    az: string;
    ru: string;
    en: string;
  };
  cta?: {
    type: 'patient' | 'doctor';
    position: 'before' | 'after';
  };
}

export default function CreateBlogPage() {
  const router = useRouter();
  
  // Multi-language form state
  const [title, setTitle] = useState({
    az: '',
    ru: '',
    en: ''
  });
  const [excerpt, setExcerpt] = useState({
    az: '',
    ru: '',
    en: ''
  });
  const [content, setContent] = useState({
    az: '',
    ru: '',
    en: ''
  });
  const [category, setCategory] = useState({
    az: '',
    ru: '',
    en: ''
  });
  
  // Other form state
  const [author, setAuthor] = useState('');
  const [readTime, setReadTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [currentTab, setCurrentTab] = useState<'az' | 'ru' | 'en'>('az');
  
  const [sections, setSections] = useState<BlogSection[]>([
    { 
      id: '1', 
      title: { az: '', ru: '', en: '' },
      content: { az: '', ru: '', en: '' }
    }
  ]);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Direct color definitions
  const PRIMARY = "#1A56DB";
  const FOREGROUND = "#0F2C71";

  const categories = [
    'Səhiyyə',
    'Telemedisin',
    'Psixologiya',
    'Pediatriya',
    'Kardiologiya',
    'Ümumi Təbabət',
    'Qidalanma',
    'Fitnes və İdman'
  ];

  const languageLabels = {
    az: 'Azərbaycan',
    ru: 'Русский',
    en: 'English'
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.az.trim() && !title.ru.trim() && !title.en.trim()) {
      newErrors.title = 'Ən azı bir dildə başlıq tələb olunur';
    }
    if (!excerpt.az.trim() && !excerpt.ru.trim() && !excerpt.en.trim()) {
      newErrors.excerpt = 'Ən azı bir dildə qısa təsvir tələb olunur';
    }
    if (!category.az.trim() && !category.ru.trim() && !category.en.trim()) {
      newErrors.category = 'Ən azı bir dildə kateqoriya tələb olunur';
    }
    if (!author.trim()) newErrors.author = 'Müəllif adı tələb olunur';
    
    const hasValidSection = sections.some(section => 
      (section.title.az.trim() || section.title.ru.trim() || section.title.en.trim()) &&
      (section.content.az.trim() || section.content.ru.trim() || section.content.en.trim())
    );
    
    if (!hasValidSection) {
      newErrors.sections = 'Ən azı bir tam doldurulmuş bölmə tələb olunur';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addSection = () => {
    const newSection: BlogSection = {
      id: Date.now().toString(),
      title: { az: '', ru: '', en: '' },
      content: { az: '', ru: '', en: '' }
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    if (sections.length > 1) {
      setSections(sections.filter(section => section.id !== id));
    }
  };

  const updateSection = (id: string, field: 'title' | 'content', lang: 'az' | 'ru' | 'en', value: string) => {
    setSections(sections.map(section => 
      section.id === id ? { 
        ...section, 
        [field]: { ...section[field], [lang]: value }
      } : section
    ));
    // Clear section errors when user starts typing
    if (errors.sections) {
      setErrors({ ...errors, sections: '' });
    }
  };

  const updateSectionCTA = (id: string, cta: BlogSection['cta']) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, cta } : section
    ));
  };

  const generateSlug = (title: { az: string; ru: string; en: string; }) => {
    // Use the first available title to generate slug
    const titleText = title.az || title.ru || title.en;
    return titleText
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    const finalStatus: 'draft' | 'published' = isDraft ? 'draft' : status;
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      
      const blogData: BlogPostInput = {
        title,
        excerpt,
        content,
        sections: sections.filter(section => 
          (section.title.az.trim() || section.title.ru.trim() || section.title.en.trim()) &&
          (section.content.az.trim() || section.content.ru.trim() || section.content.en.trim())
        ),
        category,
        author: author.trim(),
        readTime: readTime || '5 dəq',
        status: finalStatus,
        slug: generateSlug(title),
        imageUrl
      };

      await createBlogPost(blogData);
      
      alert(finalStatus === 'draft' ? 'Bloq layihə olaraq saxlanıldı!' : 'Bloq uğurla dərc edildi!');
      router.push('/admin');
    } catch (error) {
      console.error('Error creating blog:', error);
      alert(error instanceof Error ? error.message : 'Bloq saxlanırkən xəta baş verdi!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center space-x-2 text-sm hover:opacity-70">
              <ArrowLeft className="w-4 h-4" />
              <span>Geri</span>
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-xl font-semibold" style={{ color: FOREGROUND }}>
              Yeni Bloq Yarat
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline"
              onClick={() => handleSubmit(true)}
              disabled={loading}
            >
              <Save className="w-4 h-4 mr-2" />
              Qaralama olaraq saxla
            </Button>
            <Button 
              onClick={() => handleSubmit(false)}
              style={{ backgroundColor: PRIMARY }}
              disabled={loading}
            >
              <Eye className="w-4 h-4 mr-2" />
              Yayımla
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
            
            {/* Language Tabs */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold" style={{ color: FOREGROUND }}>
                İçerik Dilleri
              </h2>
              
              <div className="flex gap-2 border-b">
                {Object.entries(languageLabels).map(([lang, label]) => (
                  <Button
                    key={lang}
                    variant={currentTab === lang ? "default" : "outline"}
                    onClick={() => setCurrentTab(lang as 'az' | 'ru' | 'en')}
                    style={currentTab === lang ? { backgroundColor: PRIMARY } : {}}
                    className="rounded-b-none"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold" style={{ color: FOREGROUND }}>
                Ana Şəkil
              </h2>
              <ImageUpload
                onImageUploaded={setImageUrl}
                currentImageUrl={imageUrl}
              />
            </div>

            {/* Basic Information - Multi-language */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold" style={{ color: FOREGROUND }}>
                Əsas Məlumatlar ({languageLabels[currentTab]})
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: FOREGROUND }}>
                    Başlıq *
                  </label>
                  <input
                    type="text"
                    value={title[currentTab]}
                    onChange={(e) => {
                      setTitle(prev => ({ ...prev, [currentTab]: e.target.value }));
                      if (errors.title) setErrors({ ...errors, title: '' });
                    }}
                    placeholder="Bloq başlığını daxil edin"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: FOREGROUND }}>
                    Kateqoriya *
                  </label>
                  <input
                    type="text"
                    value={category[currentTab]}
                    onChange={(e) => {
                      setCategory(prev => ({ ...prev, [currentTab]: e.target.value }));
                      if (errors.category) setErrors({ ...errors, category: '' });
                    }}
                    placeholder="Kateqoriya seçin və ya yazın"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: FOREGROUND }}>
                  Qısa Təsvir *
                </label>
                <textarea
                  value={excerpt[currentTab]}
                  onChange={(e) => {
                    setExcerpt(prev => ({ ...prev, [currentTab]: e.target.value }));
                    if (errors.excerpt) setErrors({ ...errors, excerpt: '' });
                  }}
                  placeholder="Bloqla bağlı qısa təsvir"
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                    errors.excerpt ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: FOREGROUND }}>
                  Giriş Məzmunu
                </label>
                <textarea
                  value={content[currentTab]}
                  onChange={(e) => setContent(prev => ({ ...prev, [currentTab]: e.target.value }))}
                  placeholder="Bloqün giriş məzmunu (məcburi deyil)"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>

            {/* Author and Read Time */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold" style={{ color: FOREGROUND }}>
                Əlavə Məlumatlar
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: FOREGROUND }}>
                    Müəllif *
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => {
                      setAuthor(e.target.value);
                      if (errors.author) setErrors({ ...errors, author: '' });
                    }}
                    placeholder="Müəllif adı"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.author ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: FOREGROUND }}>
                    Oxunma Müddəti
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="5 dəq"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Sections - Multi-language */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: FOREGROUND }}>
                    Bloq Bölmələri ({languageLabels[currentTab]})
                  </h2>
                  {errors.sections && <p className="text-red-500 text-sm mt-1">{errors.sections}</p>}
                </div>
                <Button 
                  variant="outline"
                  onClick={addSection}
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Bölmə Əlavə Et
                </Button>
              </div>

              {sections.map((section, index) => (
                <div key={section.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium" style={{ color: FOREGROUND }}>
                      Bölmə {index + 1}
                    </h3>
                    {sections.length > 1 && (
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => removeSection(section.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: FOREGROUND }}>
                      Bölmə Başlığı
                    </label>
                    <input
                      type="text"
                      value={section.title[currentTab]}
                      onChange={(e) => updateSection(section.id, 'title', currentTab, e.target.value)}
                      placeholder="Bölmə başlığı"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: FOREGROUND }}>
                      Bölmə Məzmunu
                    </label>                    <RichTextEditor
                      value={section.content[currentTab]}
                      onChange={(value) => updateSection(section.id, 'content', currentTab, value)}
                      placeholder="Bölmə məzmunu"
                      rows={30}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  {/* CTA Configuration */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium" style={{ color: FOREGROUND }}>
                      CTA (Çağrı) Konfiqurasiyası
                    </label>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`cta-enable-${section.id}`}
                          checked={!!section.cta}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateSectionCTA(section.id, { type: 'patient', position: 'after' });
                            } else {
                              updateSectionCTA(section.id, undefined);
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={`cta-enable-${section.id}`} className="text-sm">
                          CTA əlavə et
                        </label>
                      </div>

                      {section.cta && (
                        <>
                          <div className="flex items-center gap-2">
                            <label className="text-sm" style={{ color: FOREGROUND }}>
                              Tip:
                            </label>
                            <select
                              value={section.cta.type}
                              onChange={(e) => updateSectionCTA(section.id, {
                                ...section.cta!,
                                type: e.target.value as 'patient' | 'doctor'
                              })}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="patient">Xəstə</option>
                              <option value="doctor">Həkim</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-2">
                            <label className="text-sm" style={{ color: FOREGROUND }}>
                              Mövqe:
                            </label>
                            <select
                              value={section.cta.position}
                              onChange={(e) => updateSectionCTA(section.id, {
                                ...section.cta!,
                                position: e.target.value as 'before' | 'after'
                              })}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="before">Əvvəl</option>
                              <option value="after">Sonra</option>
                            </select>
                          </div>

                          <div className="flex items-center text-sm text-gray-600">
                            {section.cta.type === 'patient' ? (
                              <UserCheck className="w-4 h-4 mr-1" />
                            ) : (
                              <Stethoscope className="w-4 h-4 mr-1" />
                            )}
                            {section.cta.type === 'patient' ? 'Xəstə CTA' : 'Həkim CTA'} - 
                            {section.cta.position === 'before' ? ' bölmədən əvvəl' : ' bölmədən sonra'}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Save Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button 
                variant="outline"
                onClick={() => handleSubmit(true)}
                className="flex-1"
                disabled={loading}
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saxlanır...' : 'Qaralama olaraq saxla'}
              </Button>
              <Button 
                onClick={() => handleSubmit(false)}
                style={{ backgroundColor: PRIMARY }}
                className="flex-1"
                disabled={loading}
              >
                <Eye className="w-4 h-4 mr-2" />
                {loading ? 'Yayımlanır...' : 'Yayımla'}
              </Button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
