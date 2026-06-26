
"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://www.rcsradio.it/wp-json/wp/v2/posts?_embed&per_page=3&categories=1'); // Assumiamo ID 1 o filtriamo dopo
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching WP posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full py-12 flex justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section className="w-full py-20 px-6 bg-white/5">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold tracking-tighter uppercase">
              <Newspaper size={20} /> Blog & Notizie
            </div>
            <h2 className="text-4xl font-black">Ultime dal Blog</h2>
          </div>
          <a href="https://www.rcsradio.it/category/blog-rcs-radio/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="rounded-full border-primary/20 hover:bg-primary/10">
              Vedi tutto <ExternalLink size={16} className="ml-2" />
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => {
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://picsum.photos/seed/news/800/600';
            const cleanTitle = post.title.rendered.replace(/&#8211;/g, '-').replace(/&#8217;/g, "'");
            const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').substring(0, 120) + '...';

            return (
              <Card key={post.id} className="glass-morphism border-none overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={featuredImage} 
                    alt={cleanTitle} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="p-6">
                  <div className="text-xs text-muted-foreground mb-2">
                    {new Date(post.date).toLocaleDateString('it-IT')}
                  </div>
                  <CardTitle className="line-clamp-2 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {cleanTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {cleanExcerpt}
                  </p>
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="p-0 text-primary h-auto font-bold group">
                      Leggi di più <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
