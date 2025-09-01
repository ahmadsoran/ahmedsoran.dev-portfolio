# Portfolio Project Structure

This portfolio is built with a clean, modular architecture following React best practices.

## 📁 Folder Structure

```
src/
├── app/
│   ├── components/
│   │   └── provider.tsx          # Hero UI provider wrapper
│   ├── globals.css               # Global styles and Tailwind imports
│   ├── hero.ts                   # Hero UI Tailwind plugin configuration
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Main page component
├── components/
│   ├── Navigation.tsx           # Fixed navigation bar
│   ├── HeroSection.tsx         # Hero/intro section
│   ├── SkillsSection.tsx       # Skills and technologies
│   ├── ProjectsSection.tsx     # Featured projects
│   ├── ExperienceSection.tsx   # Professional experience
│   ├── ContactSection.tsx      # Contact information and form
│   ├── Footer.tsx              # Site footer
│   └── ScrollToTop.tsx         # Scroll to top button
├── constants/
│   ├── data.json               # Portfolio data (personal info, projects, etc.)
│   ├── theme.ts                # Color palette and design tokens
│   └── animations.ts           # Framer Motion animation variants
├── lib/
│   └── utils.ts                # Utility functions
└── types/
    └── index.ts                # TypeScript type definitions
```

## 🎨 Design System

### Colors

- **Primary**: Blue gradient (from blue-600 to purple-600)
- **Background**: White/Gray-50 for light sections, Gray-900/800 for dark
- **Text**: Gray-900 for headings, Gray-600-400 for body text

### Components Architecture

Each section is a separate component with:

- Clean props interface
- Responsive design
- Accessibility features
- Consistent animations
- Proper TypeScript typing

### Data Management

All content is centralized in `constants/data.json` making it easy to:

- Update personal information
- Add new projects
- Modify skills
- Change contact details

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Hero UI
- **Animations**: Framer Motion
- **Icons**: Tabler Icons
- **Package Manager**: Bun

## 🔧 Key Features

- **Responsive Design**: Works on all devices
- **Performance Optimized**: Static generation with Next.js
- **Accessibility**: ARIA labels, keyboard navigation
- **SEO Optimized**: Proper meta tags and OpenGraph
- **Clean Code**: Modular components, TypeScript
- **Easy Maintenance**: Centralized data, reusable utilities

## 📝 Customization

To customize the portfolio:

1. **Personal Info**: Edit `src/constants/data.json`
2. **Colors**: Modify `src/constants/theme.ts`
3. **Animations**: Adjust `src/constants/animations.ts`
4. **Components**: Update individual component files
5. **Styles**: Modify `src/app/globals.css` for global styles

## 🚀 Development

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun build

# Start production server
bun start
```
