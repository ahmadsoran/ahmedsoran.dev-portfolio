# Blog Setup with Ghost CMS

This portfolio includes a modern blog powered by Ghost CMS with advanced features like caching, SEO optimization, and responsive design.

## Features

- **Ghost CMS Integration**: Uses Ghost's Content API to fetch blog posts
- **Next.js Caching**: Implements ISR (Incremental Static Regeneration) and caching strategies
- **Modern UI/UX**: Beautiful, responsive design with animations
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, structured data
- **RSS Feed**: Auto-generated RSS feed at `/rss.xml`
- **Sitemap**: Dynamic sitemap including all blog posts
- **Search & Filtering**: Search posts and filter by tags
- **Pagination**: Efficient pagination for large numbers of posts
- **Featured Posts**: Highlight important posts
- **Author Profiles**: Display author information and bios
- **Social Sharing**: Built-in sharing functionality
- **Typography**: Beautiful typography with Tailwind CSS Typography plugin

## Ghost CMS Setup

### 1. Set up Ghost

You can use Ghost in several ways:

#### Option A: Ghost(Pro) - Managed Hosting

1. Sign up at [ghost.org](https://ghost.org)
2. Create a new publication
3. Get your Content API URL and Key

#### Option B: Self-hosted Ghost

1. Install Ghost on your server following [Ghost's documentation](https://ghost.org/docs/install/)
2. Set up your Ghost site
3. Create a Custom Integration to get API credentials

#### Option C: Use Demo Ghost (for testing)

The project comes pre-configured with Ghost's demo site for testing purposes.

### 2. Get API Credentials

1. Log in to your Ghost Admin panel
2. Go to **Settings** → **Integrations**
3. Click **Add custom integration**
4. Name it (e.g., "Portfolio Blog")
5. Copy the **Content API Key** and **API URL**

### 3. Configure Environment Variables

Create/update `.env.local` with your Ghost credentials:

```bash
# Ghost CMS Configuration
GHOST_API_URL=https://your-ghost-site.com
GHOST_CONTENT_API_KEY=your_content_api_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Blog Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # Main blog listing page
│   │   └── [slug]/
│   │       ├── page.tsx          # Individual blog post page
│   │       └── not-found.tsx     # 404 page for missing posts
│   ├── rss.xml/
│   │   └── route.ts              # RSS feed generation
│   └── sitemap.ts                # Dynamic sitemap
├── components/
│   ├── blog/
│   │   ├── BlogHeader.tsx        # Blog page header with search
│   │   ├── FeaturedPosts.tsx     # Featured posts section
│   │   ├── BlogGrid.tsx          # Posts grid with pagination
│   │   ├── BlogSidebar.tsx       # Sidebar with tags and trending
│   │   └── BlogPostContent.tsx   # Individual post content
│   └── ui/
│       └── LoadingSpinner.tsx    # Loading spinner component
├── lib/
│   └── ghost.ts                  # Ghost API integration
└── types/
    └── ghost.d.ts                # TypeScript definitions
```

## Caching Strategy

The blog implements multiple caching layers:

1. **Next.js ISR**: Pages are statically generated and revalidated

   - Blog listing: Every 30 minutes (`revalidate = 1800`)
   - Individual posts: Every hour (`revalidate = 3600`)

2. **API Response Caching**: Ghost API responses are cached in memory

3. **CDN Caching**: Static assets and pages are cached at the CDN level

## Customization

### Styling

- Modify Tailwind classes in components
- Update theme colors in `tailwind.config.js`
- Customize typography in blog post content

### Features

- Add/remove sections in `BlogSidebar.tsx`
- Modify post layout in `BlogGrid.tsx`
- Update metadata in page components

### Ghost Content

- Create custom tags in Ghost admin
- Set featured posts in Ghost admin
- Customize author profiles in Ghost admin

## Performance

The blog is optimized for performance:

- **Static Generation**: Most pages are pre-rendered
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Components are loaded on demand
- **Minimal JavaScript**: Client-side JS is minimized
- **Efficient Pagination**: Large post lists are paginated

## SEO Features

- **Meta Tags**: Complete meta tag support
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Auto-generated XML sitemap
- **RSS Feed**: Full-content RSS feed
- **Canonical URLs**: Proper canonical URL handling

## Development

To develop the blog locally:

1. Install dependencies: `bun install`
2. Set up environment variables in `.env.local`
3. Run development server: `bun run dev`
4. Visit `http://localhost:3000/blog`

## Deployment

The blog works with any Next.js deployment platform:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Self-hosted with Docker**

Make sure to set environment variables in your deployment platform.

## Troubleshooting

### Common Issues

1. **No posts loading**

   - Check Ghost API URL and key
   - Verify Ghost site is accessible
   - Check network connectivity

2. **Images not loading**

   - Ensure Ghost images are publicly accessible
   - Check Content Security Policy settings

3. **Build failures**
   - Verify all environment variables are set
   - Check Ghost API is responding during build

### Debug Mode

Add this to `.env.local` for debugging:

```bash
DEBUG=ghost:*
```
