'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Calendar, User, ArrowLeft, Share2, Heart, MessageCircle } from 'lucide-react'

// Mock blog post data - in a real app, this would be fetched based on the slug
const getBlogPost = (slug: string) => {
  const posts = {
    'magical-birthday-memories': {
      title: 'Creating Magical Birthday Memories with Face Painting',
      content: `
# Creating Magical Birthday Memories with Face Painting

Face painting has become one of the most popular birthday party activities, and for good reason! It transforms children into their favorite characters, sparks imagination, and creates lasting memories that both kids and parents treasure.

## Why Face Painting Makes Birthdays Special

There's something truly magical about watching a child's face light up as they see themselves transformed into a superhero, princess, or their favorite animal. Face painting isn't just about the final result—it's about the entire experience:

### The Transformation Process
- **Excitement builds** as children wait in line, watching their friends get painted
- **Personal attention** as each child gets one-on-one time with the artist
- **Creative collaboration** as kids share their vision and see it come to life
- **Confidence boost** as they show off their new look to friends and family

## Popular Birthday Party Designs

Over the years, we've painted thousands of faces at birthday parties. Here are some of the most requested designs:

### For the Little Ones (Ages 3-6)
- **Butterflies** - Always a classic favorite
- **Flowers** - Simple but beautiful
- **Hearts and stars** - Quick and adorable
- **Simple animals** - Cats, dogs, and bunnies

### For School-Age Kids (Ages 7-12)
- **Superheroes** - Spider-Man, Batman, Wonder Woman
- **Fantasy creatures** - Dragons, unicorns, fairies
- **Sports themes** - Team logos and face designs
- **Movie characters** - Current popular films

### For Tweens and Teens
- **Geometric patterns** - Modern and sophisticated
- **Glow-in-the-dark designs** - Perfect for evening parties
- **Tribal patterns** - Cool and age-appropriate
- **Temporary tattoo style** - Edgy but fun

## Planning Tips for Parents

To make the most of face painting at your child's birthday party, consider these tips:

### Timing is Everything
- Schedule face painting for **mid-party** when energy is high but before cake
- Allow **5-10 minutes per child** for detailed designs
- Consider having face painting as an **arrival activity** to entertain early guests

### Set Expectations
- Show kids **design options** beforehand to avoid disappointment
- Have a **backup plan** for children who change their minds
- Consider **allergies and sensitivities** - always inform your artist

### Create the Perfect Environment
- Provide **good lighting** - natural light is best
- Set up **comfortable seating** for both artist and children
- Have **wet wipes** available for any touch-ups
- Designate a **photo area** for showcasing the finished designs

## Making It Educational

Face painting can be more than just entertainment—it's an opportunity for learning:

- **Cultural exploration** through traditional designs from different countries
- **Color theory** as children learn about mixing and matching
- **Art appreciation** by discussing different artistic styles
- **Self-expression** as kids articulate their vision to the artist

## The Social Media Factor

In today's digital age, face painting creates perfect social media moments:

- **Instagram-worthy photos** that parents love to share
- **Memorable content** that captures the joy of childhood
- **Party documentation** that families will treasure for years
- **Viral potential** with unique or impressive designs

## Safety Considerations

Professional face painters prioritize safety above all else:

### Quality Materials
- **FDA-approved paints** that are safe for skin contact
- **Hypoallergenic options** for sensitive skin
- **High-quality brushes** that are gentle and precise
- **Sanitization protocols** between each child

### Health Precautions
- **Individual sponges** for each child to prevent cross-contamination
- **Allergy screening** before beginning any design
- **Gentle removal** instructions for parents
- **Professional training** in safety protocols

## Creating Lasting Memories

The goal of any birthday celebration is to create memories that last a lifetime. Face painting contributes to this in unique ways:

- **Photo opportunities** that capture the magic of childhood
- **Storytelling elements** as children create narratives around their characters
- **Confidence building** as shy children come out of their shells
- **Artistic inspiration** that may spark a lifelong interest in art

## Beyond the Party

The impact of face painting extends beyond the party itself:

### Inspiring Creativity
- Children often want to **draw their designs** later
- **Interest in art classes** may develop
- **Costume ideas** for Halloween or dress-up play
- **Storytelling inspiration** based on their character

### Building Memories
- **Photo albums** filled with painted faces become treasured keepsakes
- **Annual traditions** may develop around certain designs
- **Family stories** that get retold for years to come
- **Special bonds** between children and the art of transformation

## Conclusion

Face painting at birthday parties is more than just entertainment—it's an investment in childhood magic. The joy, creativity, and memories created during those few minutes of transformation can last a lifetime. Whether your child dreams of being a fierce tiger or a delicate butterfly, professional face painting brings those dreams to colorful, vibrant life.

Ready to add some artistic magic to your child's next birthday party? Contact us to discuss how we can make their special day even more memorable with the transformative power of face painting.
      `,
      author: 'Sarah Heart',
      date: '2024-01-15',
      category: 'Birthday Parties',
      readTime: '8 min read'
    }
  }
  
  return posts[slug as keyof typeof posts] || null
}

interface BlogPostProps {
  params: {
    slug: string
  }
}

export default function BlogPost({ params }: BlogPostProps) {
  const post = getBlogPost(params.slug)
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog" className="text-pink-500 font-semibold hover:text-pink-600">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center text-pink-500 hover:text-pink-600 font-medium transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="text-sm font-semibold text-pink-500 mb-4 uppercase tracking-wide">
              {post.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
              <div className="flex items-center">
                <User size={18} className="mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div>{post.readTime}</div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Share:</span>
              <div className="flex gap-2">
                <button className="p-2 bg-white rounded-lg border border-pink-200 hover:bg-pink-50 transition-colors duration-200">
                  <Share2 size={18} className="text-pink-500" />
                </button>
                <button className="p-2 bg-white rounded-lg border border-pink-200 hover:bg-pink-50 transition-colors duration-200">
                  <Heart size={18} className="text-pink-500" />
                </button>
                <button className="p-2 bg-white rounded-lg border border-pink-200 hover:bg-pink-50 transition-colors duration-200">
                  <MessageCircle size={18} className="text-pink-500" />
                </button>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="aspect-video bg-gradient-to-br from-rose-200 to-pink-200 rounded-2xl flex items-center justify-center">
              <span className="text-gray-500 text-lg">Featured Image</span>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-lg max-w-none mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/\n/g, '<br />').replace(/#{3}\s/g, '<h3>').replace(/#{2}\s/g, '<h2>').replace(/#{1}\s/g, '<h1>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/- \*\*(.*?)\*\*/g, '<li><strong>$1</strong>') 
                }}
              />
            </div>
          </motion.article>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100 mb-12"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">About {post.author}</h3>
                <p className="text-gray-600">
                  Sarah is the founder of Heart & Hand and a professional face painting artist with over 5 years of experience 
                  bringing joy to children and families through art. She specializes in creating magical experiences at birthday 
                  parties and special events.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Safety First: What Parents Need to Know About Face Paint',
                  excerpt: 'Learn about the importance of using safe, high-quality face paints...',
                  slug: 'safety-first-face-paint'
                },
                {
                  title: 'Top 10 Most Requested Face Painting Designs for Kids',
                  excerpt: 'From superheroes to butterflies, discover the most popular designs...',
                  slug: 'top-10-face-painting-designs'
                }
              ].map((relatedPost, index) => (
                <Link key={index} href={`/blog/${relatedPost.slug}`}>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-pink-600 transition-colors duration-200">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{relatedPost.excerpt}</p>
                    <div className="flex items-center text-pink-500 font-semibold">
                      Read More <ArrowLeft size={16} className="ml-1 rotate-180" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
