# Ahmed Soran - Portfolio

A responsive portfolio website for Ahmed Soran, a full-stack developer from Kurdistan. Built with Next.js, TypeScript, Tailwind CSS, Hero UI, and Framer Motion.

## Features

- **Responsive Design**: Optimized for all devices
- **Modern UI**: Clean and professional design using Hero UI components
- **Animations**: Smooth animations with Framer Motion
- **Sections**:
  - Introduction
  - Skills (JavaScript, Node.js, Go, SQL/NoSQL)
  - Projects (CRM, ERP, Landing Page, Microfrontend)
  - Current Job Details
  - Contact Information

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Library**: Hero UI
- **Animations**: Framer Motion
- **Icons**: Tabler Icons
- **Package Manager**: Bun

## RTL Support

The portfolio includes automatic RTL (Right-to-Left) text direction detection for blog content. For Ghost CMS integration:

### Ghost Blog RTL Configuration

When writing RTL content in Ghost blog, add in the **Code Injection** section of your Ghost admin panel Post header {{ghost_head}}:
x-content-dir=rtl

This text will override the default text direction and ensure proper RTL rendering for Arabic, Hebrew, or other right-to-left languages.

## Getting Started

First, install dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

```bash
bun run build
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Hero UI Documentation](https://www.heroui.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check Out GhostBlog Setup Doc [here](./BLOG_SETUP.md).
