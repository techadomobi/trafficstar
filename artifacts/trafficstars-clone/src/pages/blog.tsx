import React, { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { setPageMeta } from "@/lib/seo";
import { ArrowRight, Clock, BookOpen, TrendingUp, Search, ChevronRight, BadgeCheck, Loader } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { adminListBlogs, normalizeBlogCards, type CmsBlogCard } from "@/lib/cms-api";

const BLOG_META = {
  title: "AdoMobi Blog | Digital Advertising & Programmatic Marketing Insights",
  description:
    "Explore the latest insights on programmatic advertising, DSP, PPC, ad tech, performance marketing, and digital advertising trends with AdoMobi Blog.",
} as const;

const CATEGORIES = ["All", "Guides", "Industry News", "Case Studies", "Tips & Tricks", "Product Updates"];

const TAG_COLORS: Record<string, string> = {
  "Guides": "bg-blue-50 text-blue-600",
  "Industry News": "bg-green-50 text-green-600",
  "Case Studies": "bg-purple-50 text-purple-600",
  "Tips & Tricks": "bg-yellow-50 text-yellow-700",
  "Product Updates": "bg-orange-50 text-[#F7611E]",
};

export default function BlogPage() {
  useEffect(() => {
    setPageMeta(BLOG_META.title, BLOG_META.description);
  }, []);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<CmsBlogCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await adminListBlogs({
          page: 1,
          search: "",
          category: "",
          websiteName: "adomobi.net",
          location: "",
        });
        const normalized = normalizeBlogCards(response);
        setPosts(normalized);
        setError("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch blogs");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filtered = useMemo(
    () => posts.filter((p) => {
      const matchCat = category === "All" || p.tag === category;
      const matchQ = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.desc.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    }),
    [category, posts, query],
  );

  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => !p.featured);

  return (
    <div className="font-sans antialiased bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-16 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-150 h-150 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-6 md:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">
              Programmatic Advertising & <span className="gradient-text">Digital Marketing Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8">
              Explore expert articles on DSP, PPC, ad tech, performance marketing, media buying, and the latest digital advertising trends from AdoMobi.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <input
                data-testid="input-search"
                type="text"
                aria-label="Search articles"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-5 py-3.5 rounded-full border-2 border-border bg-white focus:border-[#F7611E] focus:outline-none text-sm transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured post */}
      {featured && category === "All" && !query && !loading && (
        <section className="pb-8">
          <div className="container mx-auto px-6 md:px-10">
            <Link href={featured.slug ? `/blog/${featured.slug}` : "/blog"} className="block no-underline cursor-pointer" aria-label={`Read ${featured.title}`} title={featured.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="block bg-white rounded-3xl border border-border overflow-hidden hover:shadow-2xl hover:border-[#F7611E]/20 transition-all group"
                data-testid="card-blog-featured"
              >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 aspect-video md:aspect-auto bg-linear-to-br from-orange-50 via-red-50 to-orange-100 flex items-center justify-center min-h-70 relative overflow-hidden">
                  <div className="w-24 h-24 gradient-bg rounded-3xl flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity group-hover:scale-110 duration-500 overflow-hidden">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <span className="absolute top-5 left-5 bg-[#F7611E] text-white text-xs font-bold px-3 py-1.5 rounded-full">Featured</span>
                </div>
                <div className="md:w-1/2 p-10 flex flex-col justify-center">
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit ${TAG_COLORS[featured.tag] || ""}`}>{featured.tag}</span>
                  <h2 className="text-3xl font-black text-foreground mb-4 group-hover:text-[#F7611E] transition-colors">{featured.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{featured.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm">
                        {featured.author[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground">{featured.author}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {featured.date} · {featured.readTime}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#F7611E] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </section>
      )}

      {/* Category filter */}
      <section className="py-6 bg-white border-y border-border sticky top-16 z-40 overflow-x-auto">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                data-testid={`button-category-${cat.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className={`px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                  category === cat
                    ? "gradient-bg text-white border-transparent shadow-md"
                    : "border-border text-muted-foreground hover:border-[#F7611E] hover:text-foreground bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-10">
          {error && (
            <div className="mb-8 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          {loading && rest.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Loader className="w-8 h-8 animate-spin text-[#F7611E]" />
                <span>Loading articles...</span>
              </div>
            </div>
          ) : rest.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No articles match your search or category.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {rest.map((post, i) => (
                <Link
                  key={i}
                  href={post.slug ? `/blog/${post.slug}` : "/blog"}
                  className="block no-underline cursor-pointer"
                  aria-label={`Read ${post.title}`}
                  title={post.title}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-[#F7611E]/20 transition-all group cursor-pointer h-full"
                    data-testid={`card-blog-${i}`}
                  >
                    <div className="aspect-video bg-linear-to-br from-orange-50 to-red-50 flex items-center justify-center relative overflow-hidden">
                      <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center opacity-25 group-hover:opacity-50 group-hover:scale-110 transition-all duration-400 overflow-hidden">
                        <TrendingUp className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${TAG_COLORS[post.tag] || "bg-secondary text-muted-foreground"}`}>
                        {post.tag}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-[#F7611E] transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.desc}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-[10px]">
                            {post.author[0]}
                          </div>
                          <span>{post.author}</span>
                        </div>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.date}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block text-xs font-bold text-[#F7611E] uppercase tracking-widest mb-4 bg-orange-50 px-4 py-1.5 rounded-full">Newsletter</span>
            <h2 className="text-4xl font-black text-foreground mb-4">Stay Ahead of the Curve</h2>
            <p className="text-muted-foreground mb-8">Get the latest performance marketing insights, platform updates, and industry news delivered weekly.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                data-testid="input-newsletter"
                type="email"
                aria-label="Newsletter email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full border-2 border-border focus:border-[#F7611E] focus:outline-none text-sm"
              />
              <button
                type="button"
                data-testid="button-newsletter-subscribe"
                className="gradient-bg text-white font-bold px-7 py-3 rounded-full hover:shadow-lg transition-all"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
