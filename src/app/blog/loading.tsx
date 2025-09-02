import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function Loading() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background to-secondary/20'>
      {/* Header Skeleton */}
      <div className='border-b border-border/50 bg-background/80 backdrop-blur-sm'>
        <div className='container mx-auto px-6 py-16'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='animate-pulse'>
              <div className='w-16 h-16 bg-muted rounded-xl mx-auto mb-6' />
              <div className='h-8 bg-muted rounded-lg mb-4 mx-auto max-w-md' />
              <div className='h-4 bg-muted rounded mb-2 mx-auto max-w-2xl' />
              <div className='h-4 bg-muted rounded mb-8 mx-auto max-w-xl' />
              <div className='h-10 bg-muted rounded-lg mx-auto max-w-xs' />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className='container mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-3'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='animate-pulse'>
                  <div className='bg-card border border-border/50 rounded-xl overflow-hidden'>
                    <div className='h-48 bg-muted' />
                    <div className='p-6'>
                      <div className='h-4 bg-muted rounded mb-3 w-32' />
                      <div className='h-6 bg-muted rounded mb-3' />
                      <div className='h-4 bg-muted rounded mb-2' />
                      <div className='h-4 bg-muted rounded mb-4 w-3/4' />
                      <div className='flex gap-2 mb-4'>
                        <div className='h-6 bg-muted rounded-full w-16' />
                        <div className='h-6 bg-muted rounded-full w-20' />
                      </div>
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                          <div className='w-6 h-6 bg-muted rounded-full' />
                          <div className='h-4 bg-muted rounded w-20' />
                        </div>
                        <div className='h-4 bg-muted rounded w-16' />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <div className='space-y-8'>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className='animate-pulse bg-card border border-border/50 rounded-xl p-6'>
                  <div className='h-5 bg-muted rounded mb-4 w-32' />
                  <div className='space-y-3'>
                    <div className='h-4 bg-muted rounded' />
                    <div className='h-4 bg-muted rounded w-3/4' />
                    <div className='h-4 bg-muted rounded w-1/2' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loading Spinner Overlay */}
      <div className='fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50'>
        <div className='bg-card border border-border/50 rounded-xl p-8 text-center'>
          <LoadingSpinner size='lg' className='mb-4' />
          <p className='text-muted-foreground'>Loading blog posts...</p>
        </div>
      </div>
    </div>
  )
}
