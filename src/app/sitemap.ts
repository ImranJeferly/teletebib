import { MetadataRoute } from 'next'
import { getPublishedBlogPosts } from '@/lib/blog-service'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.teletebib.com'
  
  // Base URLs
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  try {
    // Get all published blog posts
    const blogs = await getPublishedBlogPosts()
      // Add blog posts to sitemap
    const blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug || blog.id}`,
      lastModified: blog.updatedAt ? 
        (blog.updatedAt instanceof Date ? blog.updatedAt : blog.updatedAt.toDate()) : 
        blog.createdAt ? 
          (blog.createdAt instanceof Date ? blog.createdAt : blog.createdAt.toDate()) :
          new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...routes, ...blogRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return base routes if there's an error fetching blogs
    return routes
  }
}
