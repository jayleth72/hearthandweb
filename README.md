# Heart & Hand - Face Painting & Henna Art Website

A professional Next.js website for Heart & Hand, a face painting and henna tattooing business. Built with modern web technologies and designed to be mobile-friendly and accessible.

## 🎨 Features

- **Beautiful Landing Page** with fade-in logo animation
- **Mobile-Responsive Design** optimized for all devices
- **Blog System** with markdown support for content management
- **Service Pages** showcasing face painting and henna art offerings
- **Contact Form** for booking inquiries and customer communication
- **About Page** telling the business story and showcasing expertise
- **Professional Navigation** with smooth animations and mobile menu
- **SEO Optimized** with proper meta tags and structured content

## 🛠️ Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **Gray Matter** - Markdown frontmatter parsing
- **MDX** - Markdown with JSX components

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hearthandweb
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
hearthandweb/
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── services/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navigation.tsx
│   │   └── Hero.tsx
│   └── lib/
│       └── blog.ts
├── content/
│   └── blog/
│       ├── magical-birthday-memories.md
│       ├── art-history-henna.md
│       └── safety-first-face-paint.md
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## 📝 Content Management

### Adding Blog Posts

1. Create a new markdown file in `content/blog/`
2. Add frontmatter with required fields:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2024-01-01"
   author: "Author Name"
   excerpt: "Brief description of the post"
   category: "Category Name"
   readTime: "5 min read"
   ---
   
   Your markdown content here...
   ```

3. The blog will automatically display the new post

### Customizing Content

- **Landing Page**: Edit `src/app/page.tsx`
- **About Page**: Edit `src/app/about/page.tsx`
- **Services Page**: Edit `src/app/services/page.tsx`
- **Contact Page**: Edit `src/app/contact/page.tsx`
- **Navigation**: Edit `src/components/Navigation.tsx`

## 🎨 Design System

### Colors
- **Primary**: Rose/Pink gradient (`from-rose-500 to-pink-500`)
- **Secondary**: Purple accent (`purple-500`)
- **Background**: Soft gradient (`from-rose-50 via-pink-50 to-purple-50`)
- **Text**: Gray scale (`gray-900`, `gray-600`)

### Typography
- **Headings**: Bold, gradient text for emphasis
- **Body**: Clean, readable fonts with proper line spacing
- **Interactive**: Hover effects and smooth transitions

### Components
- **Cards**: White background with pink borders and shadows
- **Buttons**: Gradient backgrounds with hover animations
- **Navigation**: Glass morphism effect with backdrop blur

## 📱 Mobile Optimization

The website is built with a mobile-first approach:

- **Responsive Grid**: Adapts to all screen sizes
- **Touch-Friendly**: Large tap targets and easy navigation
- **Fast Loading**: Optimized images and minimal JavaScript
- **Accessible**: Proper ARIA labels and keyboard navigation

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy automatically on git push

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

### Manual Deployment

1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Deploy the `.next` folder to your hosting provider

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add other environment variables as needed
```

## 🎯 SEO & Performance

- **Meta Tags**: Proper title, description, and Open Graph tags
- **Structured Data**: Schema markup for business information
- **Image Optimization**: Next.js automatic image optimization
- **Performance**: Lighthouse score optimization
- **Accessibility**: WCAG 2.1 compliance

## 📄 License

This project is created for Heart & Hand face painting business. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions about this website or the Heart & Hand business:

- Email: hello@heartandhand.com
- Phone: (555) 123-4567
- Website: [heartandhand.com](https://heartandhand.com)

---

Built with ❤️ for Heart & Hand Face Painting & Henna Art
