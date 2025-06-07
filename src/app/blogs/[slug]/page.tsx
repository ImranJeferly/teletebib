import { Metadata } from 'next';
import { BlogClient } from '@/components/blog/blog-client';
import { getBlogPostBySlug } from '@/lib/blog-service';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const blog = await getBlogPostBySlug(slug);
    
    if (!blog) {
      return {
        title: 'Blog Tapılmadı - TeleTebib',
        description: 'Axtardığınız blog yazısı tapılmadı.',
      };
    }

    // Get Azerbaijani content or fallback
    const title = blog.title.az || blog.title.en || blog.title.ru || 'TeleTebib Blog';
    const excerpt = blog.excerpt.az || blog.excerpt.en || blog.excerpt.ru || 'TeleTebib blog yazısı';
    const category = blog.category.az || blog.category.en || blog.category.ru || 'Sağlamlıq';

    // Create a shorter description for metadata (max ~160 characters)
    const description = excerpt.length > 160 ? excerpt.substring(0, 157) + '...' : excerpt;

    const metadata: Metadata = {
      title: `${title} - TeleTebib Blog`,
      description: description,
      keywords: `teletibb, onlayn həkim, ${category.toLowerCase()}, sağlamlıq, tibbi məsləhət, Azərbaycan, TeleTebib`,
      openGraph: {
        title: title,
        description: description,
        url: `https://www.teletebib.com/blogs/${slug}`,
        siteName: 'TeleTebib',
        locale: 'az_AZ',
        type: 'article',
        publishedTime: blog.createdAt ? (blog.createdAt instanceof Date ? blog.createdAt.toISOString() : blog.createdAt.toDate().toISOString()) : undefined,
        modifiedTime: blog.updatedAt ? (blog.updatedAt instanceof Date ? blog.updatedAt.toISOString() : blog.updatedAt.toDate().toISOString()) : undefined,
        section: category,
        tags: [category, 'teletibb', 'sağlamlıq', 'onlayn həkim'],
        images: blog.imageUrl ? [
          {
            url: blog.imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          }
        ] : [
          {
            url: 'https://www.teletebib.com/logo.png',
            width: 800,
            height: 600,
            alt: title,
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        images: blog.imageUrl ? [blog.imageUrl] : ['https://www.teletebib.com/logo.png'],
      },
      alternates: {
        canonical: `https://www.teletebib.com/blogs/${slug}`,
      },
    };

    return metadata;
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'TeleTebib Blog',
      description: 'Sağlamlıq və teletibb haqqında məqalələr',
    };
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  
  return <BlogClient slug={slug} />;
}
