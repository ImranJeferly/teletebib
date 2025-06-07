import { BlogClient } from '@/components/blog/blog-client';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  
  return <BlogClient slug={slug} />;
}
