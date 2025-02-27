
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedProducts />
      
      {/* Categories Highlight */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-2 text-center">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Find exactly what you're looking for
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Men's Clothing",
                image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
                path: "/products?category=men's clothing"
              },
              {
                name: "Women's Clothing",
                image: "https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
                path: "/products?category=women's clothing"
              },
              {
                name: "Jewelry",
                image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
                path: "/products?category=jewelery"
              }
            ].map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group relative overflow-hidden rounded-lg aspect-[4/3]"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white p-6">
                  <h3 className="text-xl md:text-2xl font-medium mb-3">{category.name}</h3>
                  <Button variant="outline" className="bg-black/30 border-white text-white hover:bg-white hover:text-black">
                    Shop Now
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
              Sign up for our newsletter
            </h2>
            <p className="text-muted-foreground mb-8">
              Be the first to know about new arrivals, special offers and exclusive events.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Button>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
              Our Commitment to Quality
            </h2>
            <p className="text-muted-foreground mb-8">
              We believe in creating products that stand the test of time. Our carefully curated selection
              prioritizes craftsmanship, sustainable materials, and timeless design.
            </p>
            <Button variant="outline" asChild>
              <Link to="/products" className="group">
                Explore Our Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
