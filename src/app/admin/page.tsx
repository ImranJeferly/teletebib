"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, RefreshCw, Users, UserCheck, Mail, Phone, User as UserIcon, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  getAllBlogPosts, 
  deleteBlogPost, 
  searchBlogPosts, 
  createSampleBlogPosts,
  BlogPost 
} from '@/lib/blog-service';
import {
  getAllWaitlistEntries,
  getPatientWaitlistEntries,
  getDoctorWaitlistEntries,
  deleteWaitlistEntry
} from '@/lib/firebase-services';
import { 
  signInAdmin, 
  signOutAdmin, 
  onAdminAuthStateChanged 
} from '@/lib/admin-auth';
import { User } from 'firebase/auth';

function AdminPage() {
  // Blog management state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Waitlist management state
  const [waitlistEntries, setWaitlistEntries] = useState<any[]>([]);
  const [waitlistFilter, setWaitlistFilter] = useState<'all' | 'patients' | 'doctors'>('all');
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  
  // Tab management
  const [activeTab, setActiveTab] = useState<'blogs' | 'waitlist'>('blogs');
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [displayLanguage, setDisplayLanguage] = useState<'az' | 'ru' | 'en'>('az');

  // Direct color definitions
  const PRIMARY = "#1A56DB";
  const PRIMARY_LIGHT = "#E6EDFB";
  const WHITE = "#FFFFFF";
  const FOREGROUND = "#0F2C71";
  const FOREGROUND_LIGHT = "#526591";  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAdminAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user);
      setAuthLoading(false);
      
      if (user) {
        loadPosts();
        // Load waitlist only when on waitlist tab
        if (activeTab === 'waitlist') {
          loadWaitlistEntries();
        }
      }
    });

    return () => unsubscribe();
  }, [activeTab]);
  // Load posts when search query changes
  useEffect(() => {
    if (isAuthenticated) {
      const timeoutId = setTimeout(() => {
        loadPosts();
      }, 500); // Debounce search

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, isAuthenticated]);

  // Load waitlist when filter changes
  useEffect(() => {
    if (isAuthenticated && activeTab === 'waitlist') {
      loadWaitlistEntries();
    }
  }, [waitlistFilter, isAuthenticated, activeTab]);

  const handleAuth = async () => {
    try {
      setAuthError(null);
      setAuthLoading(true);
      await signInAdmin(email, password);
      // Auth state change will be handled by useEffect
    } catch (err) {
      console.error('Authentication error:', err);
      setAuthError(err instanceof Error ? err.message : 'Giriş xətası baş verdi!');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutAdmin();
      // Auth state change will be handled by useEffect
    } catch (err) {
      console.error('Sign out error:', err);
      setError(err instanceof Error ? err.message : 'Çıxış xətası baş verdi!');
    }
  };
  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let fetchedPosts: BlogPost[];
      
      if (searchQuery.trim()) {
        fetchedPosts = await searchBlogPosts(searchQuery.trim());
      } else {
        fetchedPosts = await getAllBlogPosts();
      }
      
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError(err instanceof Error ? err.message : 'Blog yazıları yüklənə bilmədi');
    } finally {
      setLoading(false);
    }
  };

  const loadWaitlistEntries = async () => {
    try {
      setWaitlistLoading(true);
      setError(null);
      
      let fetchedEntries: any[];
      
      switch (waitlistFilter) {
        case 'patients':
          fetchedEntries = await getPatientWaitlistEntries();
          break;
        case 'doctors':
          fetchedEntries = await getDoctorWaitlistEntries();
          break;
        default:
          fetchedEntries = await getAllWaitlistEntries();
      }
      
      setWaitlistEntries(fetchedEntries);
    } catch (err) {
      console.error('Error loading waitlist entries:', err);
      setError(err instanceof Error ? err.message : 'Gözləmə siyahısı yüklənə bilmədi');
    } finally {
      setWaitlistLoading(false);
    }
  };

  const handleCreateSampleData = async () => {
    try {
      setLoading(true);
      setError(null);
      await createSampleBlogPosts();
      await loadPosts();
      alert('Nümunə məlumatlar yaradıldı!');
    } catch (err) {
      console.error('Error creating sample data:', err);
      setError(err instanceof Error ? err.message : 'Nümunə məlumatlar yaradıla bilmədi');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (confirm('Bu bloqu silməyə əminsiniz?')) {
      try {
        setLoading(true);
        setError(null);
        await deleteBlogPost(id);
        await loadPosts();
      } catch (err) {
        console.error('Error deleting post:', err);
        setError(err instanceof Error ? err.message : 'Blog yazısı silinə bilmədi');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteWaitlistEntry = async (id: string, entryType: string, entryEmail?: string) => {
    const entryDescription = entryEmail || 'Bu qeyd';
    const confirmMessage = `${entryDescription} (${entryType === 'doctor' ? 'Həkim' : 'Xəstə'}) gözləmə siyahısından silməyə əminsiniz?`;
    
    if (confirm(confirmMessage)) {
      try {
        setWaitlistLoading(true);
        setError(null);
        const result = await deleteWaitlistEntry(id);
        
        if (result.success) {
          await loadWaitlistEntries();
          alert('Qeyd uğurla silindi!');
        } else {
          setError(result.error || 'Qeyd silinə bilmədi');
        }
      } catch (err) {
        console.error('Error deleting waitlist entry:', err);
        setError(err instanceof Error ? err.message : 'Qeyd silinə bilmədi');
      } finally {
        setWaitlistLoading(false);
      }
    }
  };

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin w-8 h-8 mx-auto mb-4" style={{ color: PRIMARY }} />
          <p style={{ color: FOREGROUND }}>Yüklənir...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: FOREGROUND }}>
            Admin Girişi
          </h1>
          
          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{authError}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: FOREGROUND }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@teletebib.az"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: FOREGROUND }}>
                Şifrə
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrənizi daxil edin"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              />
            </div>
            
            <Button 
              onClick={handleAuth}
              className="w-full py-3"
              style={{ backgroundColor: PRIMARY }}
              disabled={authLoading}
            >
              {authLoading ? 'Giriş edilir...' : 'Daxil ol'}
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-gray-600 text-center">
            <p>Demo üçün:</p>
            <p>Email: admin@teletebib.az</p>
            <p>Şifrə: teletebib2024admin</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="TeleTebib Logo" className="h-8 w-auto" />
              <span className="text-xl font-semibold" style={{ color: PRIMARY }}>
                TeleTebib Admin
              </span>
            </Link>
            {currentUser && (
              <div className="text-sm text-gray-600">
                Giriş: {currentUser.email}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/blogs">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Saytı görüntülə
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSignOut}
            >
              Çıxış
            </Button>
          </div>
        </div>
      </header>      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('blogs')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'blogs'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Edit className="w-4 h-4 inline mr-2" />
                Bloq İdarəsi
              </button>
              <button
                onClick={() => setActiveTab('waitlist')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'waitlist'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Gözləmə Siyahısı
              </button>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: FOREGROUND }}>
              {activeTab === 'blogs' ? 'Bloq İdarəsi' : 'Gözləmə Siyahısı'}
            </h1>
            <p className="text-lg mt-2" style={{ color: FOREGROUND_LIGHT }}>
              {activeTab === 'blogs' 
                ? 'Bloqları yaradın, redaktə edin və idarə edin' 
                : 'Xəstə və həkim qeydiyyat sorğularını görüntüləyin'
              }
            </p>
          </div>
          
          <div className="flex gap-2 mt-4 sm:mt-0">
            {activeTab === 'blogs' ? (
              <>
                <Button 
                  onClick={loadPosts}
                  variant="outline"
                  disabled={loading}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Yenilə
                </Button>
                <Link href="/admin/create">
                  <Button 
                    style={{ backgroundColor: PRIMARY }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Bloq
                  </Button>
                </Link>
              </>
            ) : (
              <Button 
                onClick={loadWaitlistEntries}
                variant="outline"
                disabled={waitlistLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${waitlistLoading ? 'animate-spin' : ''}`} />
                Yenilə
              </Button>
            )}
          </div>
        </div>        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'blogs' ? (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Bloqlarda axtar..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-2">
                <Button 
                  onClick={handleCreateSampleData}
                  variant="outline"
                  disabled={loading}
                >
                  Nümunə məlumatlar yarat
                </Button>
              </div>
              
              {/* Language Display Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Görüntü dili:</span>
                <div className="flex rounded-md border border-gray-300">
                  {(['az', 'ru', 'en'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setDisplayLanguage(lang)}
                      className={`px-3 py-1 text-xs font-medium first:rounded-l-md last:rounded-r-md ${
                        displayLanguage === lang
                          ? 'text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      style={{
                        backgroundColor: displayLanguage === lang ? PRIMARY : 'white'
                      }}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Başlıq
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kateqoriya
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Müəllif
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tarix
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Əməliyyatlar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          <RefreshCw className="animate-spin w-6 h-6 mx-auto mb-2" />
                          Yüklənir...
                        </td>
                      </tr>
                    ) : posts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          {searchQuery ? 'Heç bir nəticə tapılmadı' : 'Hələ heç bir bloq yoxdur'}
                        </td>
                      </tr>
                    ) : (
                      posts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {post.title[displayLanguage]}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {post.excerpt[displayLanguage]}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span 
                              className="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                              style={{ 
                                backgroundColor: PRIMARY_LIGHT, 
                                color: PRIMARY 
                              }}
                            >
                              {post.category[displayLanguage]}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {post.author}
                          </td>
                          <td className="px-6 py-4">
                            <span 
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                post.status === 'published' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {post.status === 'published' ? 'Yayımlandı' : 'Qaralama'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(post.date).toLocaleDateString('az-AZ')}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Link href={`/blogs/${post.slug}`}>
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </Link>
                              <Link href={`/admin/edit/${post.id}`}>
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </Link>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeletePost(post.id)}
                                className="text-red-600 hover:text-red-700"
                                disabled={loading}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Waitlist Filter */}
            <div className="mb-6 flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Filtr:</span>
              <div className="flex rounded-md border border-gray-300">
                {[
                  { key: 'all', label: 'Hamısı', icon: Users },
                  { key: 'patients', label: 'Xəstələr', icon: UserIcon },
                  { key: 'doctors', label: 'Həkimlər', icon: UserCheck }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setWaitlistFilter(key as 'all' | 'patients' | 'doctors')}
                    className={`px-4 py-2 text-sm font-medium first:rounded-l-md last:rounded-r-md flex items-center gap-2 ${
                      waitlistFilter === key
                        ? 'text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    style={{
                      backgroundColor: waitlistFilter === key ? PRIMARY : 'white'
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                ({waitlistEntries.length} nəticə)
              </div>
            </div>

            {/* Waitlist Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>                      {waitlistFilter === 'doctors' ? (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <UserIcon className="w-4 h-4 inline mr-2" />
                            Ad Soyad
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <Phone className="w-4 h-4 inline mr-2" />
                            Mobil
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <UserCheck className="w-4 h-4 inline mr-2" />
                            Lisenziya
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Tarix
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Əməliyyatlar
                          </th>
                        </>
                      ) : (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <Mail className="w-4 h-4 inline mr-2" />
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <UserIcon className="w-4 h-4 inline mr-2" />
                            Tip
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Tarix
                          </th>
                          {waitlistFilter === 'all' && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Əlavə məlumat
                            </th>
                          )}                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Əməliyyatlar
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">                    {waitlistLoading ? (
                      <tr>
                        <td colSpan={waitlistFilter === 'doctors' ? 5 : (waitlistFilter === 'all' ? 5 : 4)} className="px-6 py-12 text-center text-gray-500">
                          <RefreshCw className="animate-spin w-6 h-6 mx-auto mb-2" />
                          Yüklənir...
                        </td>
                      </tr>
                    ) : waitlistEntries.length === 0 ? (
                      <tr>
                        <td colSpan={waitlistFilter === 'doctors' ? 5 : (waitlistFilter === 'all' ? 5 : 4)} className="px-6 py-12 text-center text-gray-500">
                          Gözləmə siyahısında heç kim yoxdur
                        </td>
                      </tr>
                    ) : (waitlistEntries.map((entry, index) => (
                        <tr key={entry.id || index} className="hover:bg-gray-50">
                          {waitlistFilter === 'doctors' ? (
                            <>
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {entry.name} {entry.surname}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">
                                {entry.mobileNumber}
                              </td>
                              <td className="px-6 py-4">
                                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                  {entry.licenseNumber}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {entry.timestamp ? new Date(entry.timestamp).toLocaleDateString('az-AZ') : 'N/A'}
                              </td>
                              <td className="px-6 py-4">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDeleteWaitlistEntry(entry.id, entry.type || 'doctor', `${entry.name} ${entry.surname}`)}
                                  className="text-red-600 hover:text-red-700"
                                  disabled={waitlistLoading}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {entry.email}
                              </td>
                              <td className="px-6 py-4">
                                <span 
                                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                    entry.type === 'doctor' 
                                      ? 'bg-blue-100 text-blue-800' 
                                      : 'bg-green-100 text-green-800'
                                  }`}
                                >
                                  {entry.type === 'doctor' ? 'Həkim' : 'Xəstə'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {entry.timestamp ? new Date(entry.timestamp).toLocaleDateString('az-AZ') : 'N/A'}
                              </td>
                              {waitlistFilter === 'all' && (
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  {entry.type === 'doctor' && (
                                    <div className="space-y-1">
                                      <div>📱 {entry.mobileNumber}</div>
                                      <div>🏥 {entry.licenseNumber}</div>
                                    </div>
                                  )}
                                </td>
                              )}
                              <td className="px-6 py-4">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDeleteWaitlistEntry(entry.id, entry.type || 'patient', entry.email)}
                                  className="text-red-600 hover:text-red-700"
                                  disabled={waitlistLoading}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminPage;
