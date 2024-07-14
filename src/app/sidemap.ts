import { MetadataRoute } from "next";
import { createClient } from "@/prismicio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();
  
  // Fetch homepage data synchronously
  const homepage = client.getSingle("homepage");
  
  // Fetch pages, blog posts, and projects asynchronously
  const pagesPromise = client.getAllByType("page");
  const blogPostsPromise = client.getAllByType("blog_post");
  const projectsPromise = client.getAllByType("project");

  // Await all promises concurrently
  const [homepageData, pages, blogPosts, projects] = await Promise.all([
    homepage,
    pagesPromise,
    blogPostsPromise,
    projectsPromise,
  ]);

  const siteRoot = "https://demo.com";

  const homepageRoute = {
    url: siteRoot,
    lastModified: homepageData.last_publication_date,
  };

  const pagesRoutes = pages.map((page) => ({
    url: `${siteRoot}/${page.uid}`,
    lastModified: page.last_publication_date,
  }));

  const blogPostsRoutes = blogPosts.map((post) => ({
    url: `${siteRoot}/blog/${post.uid}`,
    lastModified: post.last_publication_date,
  }));

  const projectsRoutes = projects.map((project) => ({
    url: `${siteRoot}/project/${project.uid}`,
    lastModified: project.last_publication_date,
  }));

  return [homepageRoute, ...pagesRoutes, ...blogPostsRoutes, ...projectsRoutes];
}
