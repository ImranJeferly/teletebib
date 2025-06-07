import { Metadata } from 'next';
import BlogsClient from '@/components/blogs-client';

export const metadata: Metadata = {
  title: 'Blog Yazıları - TeleTebib | Sağlamlıq və Teletibb Məlumatları',
  description: 'TeleTebib blogunda sağlamlıq, teletibb və onlayn həkim konsultasiyaları haqqında son məqalələri və məsləhətləri oxuyun. Azərbaycanda teletibb xidmətləri haqqında ekspert məsləhətləri.',
  keywords: 'teletibb, onlayn həkim, sağlamlıq blogları, tibbi məsləhət, Azərbaycan teletibb, onlayn konsultasiya, TeleTebib blog',
  openGraph: {
    title: 'Blog Yazıları - TeleTebib',
    description: 'Sağlamlıq və teletibb haqqında son məqalələr və məsləhətlər',
    url: 'https://www.teletebib.com/blogs',
    siteName: 'TeleTebib',
    locale: 'az_AZ',
    type: 'website',
    images: [
      {
        url: 'https://www.teletebib.com/logo.png',
        width: 800,
        height: 600,
        alt: 'TeleTebib Blog Yazıları',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Yazıları - TeleTebib',
    description: 'Sağlamlıq və teletibb haqqında son məqalələr və məsləhətlər',
    images: ['https://www.teletebib.com/logo.png'],
  },
  alternates: {
    canonical: 'https://www.teletebib.com/blogs',
  },
};

export default function BlogsPage() {
  return <BlogsClient />;
}
