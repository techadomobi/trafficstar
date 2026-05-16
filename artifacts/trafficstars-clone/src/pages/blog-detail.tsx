import React, { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { setPageMeta } from "@/lib/seo";
import { ArrowLeft, Clock, User, Tag, Loader, AlertCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { adminViewBlog } from "@/lib/cms-api";

type BlogDetail = {
  _id: string;
  title: string;
  seoTitle?: string;
  metaDescription?: string;
  content: Array<{ type: string; text: string }>;
  excerpt: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  writerName?: string;
  date?: string;
  slug: string;
  focusKeyphrase?: string;
  seoKeywords?: string[];
};

export default function BlogDetailPage() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = (params as any)?.slug || "";
  
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) {
        setError("Blog slug not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await adminViewBlog(slug);
        
        // Extract blog data from response
        const blogData = (response as any)?.data || response;
        
        if (!blogData || typeof blogData !== "object") {
          setError("Invalid blog data received");
          setBlog(null);
        } else {
          setBlog(blogData as BlogDetail);
          
          // Set page meta tags
          const title = (blogData as any).seoTitle || (blogData as any).title || "Blog Article";
          const description = (blogData as any).metaDescription || (blogData as any).excerpt || "";
          setPageMeta(title, description);
        }
        setError("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch blog");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="font-sans antialiased bg-background min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader className="w-8 h-8 animate-spin text-[#F7611E]" />
            <span>Loading article...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="font-sans antialiased bg-background min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center py-20">
            <div className="flex flex-col items-center gap-4">
              <AlertCircle className="w-12 h-12 text-red-500" />
              <h1 className="text-2xl font-black text-foreground">Article Not Found</h1>
              <p className="text-muted-foreground mb-6">{error || "The blog article you're looking for could not be found."}</p>
              <Link href="/blog" className="gradient-bg text-white font-bold px-8 py-3 rounded-full hover:shadow-xl transition-all inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const contentHTML = blog.content
    ?.filter((block) => block.type === "paragraph")
    .map((block) => block.text)
    .join("") || blog.excerpt || "";

  const formattedDate = blog.date
    ? new Date(blog.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="font-sans antialiased bg-background">
      <Navbar />

      {/* Hero / Header */}
      <section className="pt-32 pb-12 bg-background relative overflow-hidden">
        <div className="absolute top-0  right-0 w-150 h-150 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-6 md:px-10 relative z-10 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#F7611E] font-semibold hover:gap-3 transition-all mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {blog.category && (
              <span className="inline-block text-xs font-bold text-[#F7611E] uppercase tracking-widest mb-4 bg-orange-50 px-4 py-1.5 rounded-full">
                {blog.category}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              {blog.writerName && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.writerName}</span>
                </div>
              )}
              {formattedDate && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
              )}
              {blog.focusKeyphrase && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>{blog.focusKeyphrase}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.coverImage && (
        <section className="mb-12">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-border"
            >
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-96 object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="prose prose-sm max-w-none"
          >
            {blog.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 italic border-l-4 border-[#F7611E] pl-6">
                {blog.excerpt}
              </p>
            )}

            <div
              className="text-foreground leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            />
          </motion.article>
        </div>
      </section>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <section className="py-12 bg-secondary/30 border-t border-border">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white border border-border text-foreground text-sm font-medium px-4 py-2 rounded-full hover:border-[#F7611E] hover:text-[#F7611E] transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Back to Blog */}
      <section className="py-12">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
          <Link href="/blog" className="gradient-bg text-white font-bold px-10 py-3.5 rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
