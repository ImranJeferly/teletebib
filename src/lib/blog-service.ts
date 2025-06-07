// Blog service for Firebase Firestore operations
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './firebase';

export interface BlogPost {
  id: string;
  title: {
    az: string;
    ru: string;
    en: string;
  };
  excerpt: {
    az: string;
    ru: string;
    en: string;
  };
  content: {
    az: string;
    ru: string;
    en: string;
  };
  sections: Array<{
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
  }>;
  date: string;
  readTime: string;
  category: {
    az: string;
    ru: string;
    en: string;
  };
  author: string;
  status: 'draft' | 'published';
  slug: string;
  image?: string;
  imageUrl?: string; // Firebase Storage URL
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface BlogPostInput {
  title: {
    az: string;
    ru: string;
    en: string;
  };
  excerpt: {
    az: string;
    ru: string;
    en: string;
  };
  content: {
    az: string;
    ru: string;
    en: string;
  };
  sections: Array<{
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
  }>;
  readTime: string;
  category: {
    az: string;
    ru: string;
    en: string;
  };
  author: string;
  status: 'draft' | 'published';
  slug: string;
  image?: string;
  imageUrl?: string;
}

const COLLECTION_NAME = 'blog_posts';

// Get all blog posts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      } as BlogPost;
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Blog yazıları yüklənə bilmədi');
  }
};

// Get published blog posts only
export const getPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // Temporary workaround: fetch all posts and filter client-side
    // This avoids the need for a composite index while the Firebase index is being created
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const allPosts = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      } as BlogPost;
    });

    // Filter published posts client-side
    return allPosts.filter(post => post.status === 'published');
  } catch (error) {
    console.error('Error fetching published blog posts:', error);
    throw new Error('Dərc olunmuş blog yazıları yüklənə bilmədi');
  }
};

// Get a single blog post by ID
export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        date: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      } as BlogPost;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw new Error('Blog yazısı yüklənə bilmədi');
  }
};

// Get a blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('slug', '==', slug),
      where('status', '==', 'published')
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      } as BlogPost;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    throw new Error('Blog yazısı tapılmadı');
  }
};

// Create a new blog post
export const createBlogPost = async (postData: BlogPostInput): Promise<string> => {
  try {
    // Generate a unique slug if not provided or if it already exists
    let finalSlug = postData.slug;
    const existingPost = await getBlogPostBySlug(finalSlug);
    if (existingPost) {
      finalSlug = `${postData.slug}-${Date.now()}`;
    }

    // Clean the data to remove undefined values
    const cleanData: any = {
      ...postData,
      slug: finalSlug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Remove undefined fields that Firestore doesn't accept
    Object.keys(cleanData).forEach(key => {
      if (cleanData[key] === undefined) {
        delete cleanData[key];
      }
    });

    const docRef = await addDoc(collection(db, COLLECTION_NAME), cleanData);
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw new Error('Blog yazısı yaradıla bilmədi');
  }
};

// Update an existing blog post
export const updateBlogPost = async (id: string, postData: Partial<BlogPostInput>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...postData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw new Error('Blog yazısı yenilənə bilmədi');
  }
};

// Delete a blog post
export const deleteBlogPost = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw new Error('Blog yazısı silinə bilmədi');
  }
};

// Search blog posts by title or content
export const searchBlogPosts = async (searchQuery: string): Promise<BlogPost[]> => {
  try {
    // Since Firestore doesn't support full-text search natively,
    // we'll fetch all posts and filter client-side
    // For production, consider using Algolia or similar service
    const allPosts = await getAllBlogPosts();
    
    const searchLower = searchQuery.toLowerCase();
    return allPosts.filter(post => {
      // Search in all language versions
      const searchableFields = [
        // Titles
        post.title.az, post.title.ru, post.title.en,
        // Excerpts
        post.excerpt.az, post.excerpt.ru, post.excerpt.en,
        // Content
        post.content.az, post.content.ru, post.content.en,
        // Categories
        post.category.az, post.category.ru, post.category.en,
        // Author
        post.author,
        // Section titles and content
        ...post.sections.flatMap(section => [
          section.title.az, section.title.ru, section.title.en,
          section.content.az, section.content.ru, section.content.en
        ])
      ];
      
      return searchableFields.some(field => 
        field && field.toLowerCase().includes(searchLower)
      );
    });
  } catch (error) {
    console.error('Error searching blog posts:', error);
    throw new Error('Axtarış həyata keçirilə bilmədi');
  }
};

// Create sample blog posts (for development/testing)
export const createSampleBlogPosts = async (): Promise<void> => {
  try {
    const samplePosts: BlogPostInput[] = [
      {
        title: {
          az: 'Telemedisin: Gələcəyin Səhiyyəsi',
          ru: 'Телемедицина: Здравоохранение будущего',
          en: 'Telemedicine: Healthcare of the Future'
        },
        excerpt: {
          az: 'Telemedisin texnologiyasının müasir səhiyyə sistemindəki rolu və faydaları haqqında ətraflı məlumat.',
          ru: 'Подробная информация о роли и преимуществах технологии телемедицины в современной системе здравоохранения.',
          en: 'Detailed information about the role and benefits of telemedicine technology in modern healthcare systems.'
        },
        content: {
          az: 'Telemedisin müasir dövrdə səhiyyə xidmətlərinin təqdim edilməsində inqilabi dəyişikliklər yaradır.',
          ru: 'Телемедицина создает революционные изменения в предоставлении медицинских услуг в современную эпоху.',
          en: 'Telemedicine creates revolutionary changes in the delivery of healthcare services in the modern era.'
        },
        sections: [
          {
            id: 'telemedisin-nedir',
            title: {
              az: 'Telemedisin nədir?',
              ru: 'Что такое телемедицина?',
              en: 'What is telemedicine?'
            },
            content: {
              az: 'Telemedisin uzaqdan tibbi xidmət göstərmə texnologiyasıdır ki, bu da həkimlərin xəstələrlə video və ya audio rabitə vasitəsilə əlaqə saxlamasına imkan verir.',
              ru: 'Телемедицина - это технология предоставления медицинских услуг на расстоянии, которая позволяет врачам общаться с пациентами посредством видео- или аудиосвязи.',
              en: 'Telemedicine is a technology for providing remote medical services that allows doctors to communicate with patients via video or audio communication.'
            },
            cta: {
              type: 'doctor',
              position: 'after'
            }
          },
          {
            id: 'faydalar',
            title: {
              az: 'Telemedisin faydaları',
              ru: 'Преимущества телемедицины',
              en: 'Benefits of telemedicine'
            },
            content: {
              az: 'Vaxt qənaəti, maliyyə qənaəti, əlçatan tibbi xidmət və xəstəlik yayılmasının qarşısının alınması kimi çoxsaylı faydaları vardır.',
              ru: 'Имеет множество преимуществ, таких как экономия времени, экономия денег, доступные медицинские услуги и предотвращение распространения заболеваний.',
              en: 'It has numerous benefits such as time savings, cost savings, accessible medical services and prevention of disease spread.'
            },
            cta: {
              type: 'patient',
              position: 'after'
            }
          }
        ],
        category: {
          az: 'Telemedisin',
          ru: 'Телемедицина',
          en: 'Telemedicine'
        },
        author: 'Dr. Aysel Məmmədova',
        readTime: '5 dəq',
        status: 'published' as const,
        slug: 'telemedisin-gelecek-sehiyye',
        image: '/api/placeholder/800/400'
      },
      {
        title: {
          az: 'Uşaqlarda Qidalanma və Sağlam Böyümə',
          ru: 'Питание детей и здоровый рост',
          en: 'Child Nutrition and Healthy Growth'
        },
        excerpt: {
          az: 'Uşaqların sağlam böyüməsi üçün düzgün qidalanmanın əhəmiyyəti və tövsiyələr.',
          ru: 'Важность правильного питания для здорового роста детей и рекомендации.',
          en: 'The importance of proper nutrition for healthy growth of children and recommendations.'
        },
        content: {
          az: 'Uşaq yaşlarında düzgün qidalanma gələcək sağlamlığın əsasını qoyur.',
          ru: 'Правильное питание в детском возрасте закладывает основу будущего здоровья.',
          en: 'Proper nutrition in childhood lays the foundation for future health.'
        },
        sections: [
          {
            id: 'qidalanma-esaslari',
            title: {
              az: 'Qidalanmanın əsasları',
              ru: 'Основы питания',
              en: 'Nutrition fundamentals'
            },
            content: {
              az: 'Uşaqlar üçün zəruri olan vitaminlər, mineraller və makronutrientlər haqqında məlumat.',
              ru: 'Информация о витаминах, минералах и макронутриентах, необходимых для детей.',
              en: 'Information about vitamins, minerals and macronutrients essential for children.'
            },
            cta: {
              type: 'patient',
              position: 'before'
            }
          },
          {
            id: 'yas-qruplari',
            title: {
              az: 'Yaş qruplarına görə tövsiyələr',
              ru: 'Рекомендации по возрастным группам',
              en: 'Age group recommendations'
            },
            content: {
              az: '0-6 ay, 6-12 ay, 1-3 yaş və 3-6 yaş dövrləri üçün xüsusi qidalanma tövsiyələri.',
              ru: 'Специальные рекомендации по питанию для периодов 0-6 месяцев, 6-12 месяцев, 1-3 года и 3-6 лет.',
              en: 'Special nutrition recommendations for 0-6 months, 6-12 months, 1-3 years and 3-6 years periods.'
            }
          }
        ],
        category: {
          az: 'Pediatriya',
          ru: 'Педиатрия',
          en: 'Pediatrics'
        },
        author: 'Dr. Kamran Əliyev',
        readTime: '7 dəq',
        status: 'published' as const,
        slug: 'usaqlarda-qidalanma-saglam-boyume',
        image: '/api/placeholder/800/400'
      },
      {
        title: {
          az: 'Stress və Ürək Sağlamlığı',
          ru: 'Стресс и здоровье сердца',
          en: 'Stress and Heart Health'
        },
        excerpt: {
          az: 'Stressin ürək sağlamlığına təsiri və stress idarəetmə üsulları.',
          ru: 'Влияние стресса на здоровье сердца и методы управления стрессом.',
          en: 'The impact of stress on heart health and stress management methods.'
        },
        content: {
          az: 'Müasir həyatda stress ürək xəstəliklərinin əsas səbəblərindən biridir.',
          ru: 'В современной жизни стресс является одной из основных причин сердечных заболеваний.',
          en: 'In modern life, stress is one of the main causes of heart disease.'
        },
        sections: [
          {
            id: 'stress-urek-tesiri',
            title: {
              az: 'Stressin ürəyə təsiri',
              ru: 'Влияние стресса на сердце',
              en: 'Impact of stress on the heart'
            },
            content: {
              az: 'Stress hormonlarının ürək və damar sisteminə necə təsir etdiği haqqında elmi məlumatlar.',
              ru: 'Научная информация о том, как гормоны стресса влияют на сердечно-сосудистую систему.',
              en: 'Scientific information about how stress hormones affect the cardiovascular system.'
            }
          },
          {
            id: 'stress-idareetme',
            title: {
              az: 'Stress idarəetmə texnikaları',
              ru: 'Техники управления стрессом',
              en: 'Stress management techniques'
            },
            content: {
              az: 'Meditasiya, nəfəs texnikaları və fiziki aktivlik vasitəsilə stresi azaltmaq yolları.',
              ru: 'Способы снижения стресса через медитацию, дыхательные техники и физическую активность.',
              en: 'Ways to reduce stress through meditation, breathing techniques and physical activity.'
            },
            cta: {
              type: 'doctor',
              position: 'after'
            }
          }
        ],
        category: {
          az: 'Kardiologiya',
          ru: 'Кардиология',
          en: 'Cardiology'
        },
        author: 'Dr. Nigar Hüseynova',
        readTime: '6 dəq',
        status: 'draft' as const,
        slug: 'stress-urek-saglamligi',
        image: '/api/placeholder/800/400'
      }
    ];

    // Create all sample posts
    const promises = samplePosts.map(post => createBlogPost(post));
    await Promise.all(promises);
    
    console.log('Sample blog posts created successfully');
  } catch (error) {
    console.error('Error creating sample blog posts:', error);
    throw new Error('Nümunə blog yazıları yaradıla bilmədi');
  }
};

// Upload image to Firebase Storage
export const uploadBlogImage = async (file: File, blogId?: string): Promise<string> => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const folderPath = blogId ? `blog-images/${blogId}` : 'blog-images/temp';
    const imagePath = `${folderPath}/${fileName}`;
    
    // Create storage reference
    const imageRef = ref(storage, imagePath);
    
    // Upload file
    const snapshot = await uploadBytes(imageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Şəkil yüklənə bilmədi');
  }
};

// Delete image from Firebase Storage
export const deleteBlogImage = async (imageUrl: string): Promise<void> => {
  try {
    // Extract path from URL
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw error as the main operation might still succeed
  }
};

// Get blog posts by language
export const getBlogPostsByLanguage = async (language: 'az' | 'ru' | 'en'): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('language', '==', language),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      } as BlogPost;
    });  } catch (error) {
    console.error('Error fetching blog posts by language:', error);
    // Since we now have multi-language posts, return all posts
    // The language filtering will be done on the frontend
    const allPosts = await getAllBlogPosts();
    return allPosts;
  }
};

// Get published blog posts by language
export const getPublishedBlogPostsByLanguage = async (language: 'az' | 'ru' | 'en'): Promise<BlogPost[]> => {
  try {
    // First try to get by language, then filter by status
    const languagePosts = await getBlogPostsByLanguage(language);
    return languagePosts.filter(post => post.status === 'published');
  } catch (error) {
    console.error('Error fetching published blog posts by language:', error);
    throw new Error('Dərc olunmuş blog yazıları yüklənə bilmədi');
  }
};
