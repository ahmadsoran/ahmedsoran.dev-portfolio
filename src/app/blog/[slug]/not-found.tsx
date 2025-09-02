import Link from 'next/link'
import { IconArrowLeft, IconSearchOff } from '@tabler/icons-react'

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center'>
      <div className='container mx-auto px-6 text-center'>
        <div className='max-w-md mx-auto'>
          <div className='mb-8'>
            <div className='w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6'>
              <IconSearchOff className='w-10 h-10 text-muted-foreground' />
            </div>

            <h1 className='text-4xl font-bold text-foreground mb-4'>
              Post Not Found
            </h1>

            <p className='text-lg text-muted-foreground mb-8'>
              The blog post you&apos;re looking for doesn&apos;t exist or has
              been moved.
            </p>
          </div>

          <div className='space-y-4'>
            <Link
              href='/blog'
              className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors duration-200 font-medium'>
              <IconArrowLeft className='w-4 h-4' />
              Back to Blog
            </Link>

            <div className='text-sm text-muted-foreground'>
              or{' '}
              <Link
                href='/'
                className='text-primary hover:text-primary/80 transition-colors duration-200'>
                go to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
