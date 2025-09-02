import Script from 'next/script'

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://ahmedsoran.dev/#person',
        name: 'Ahmed Soran',
        alternateName: 'Ahmad Soran',
        description:
          'Full-Stack Developer specializing in JavaScript, TypeScript, Node.js, React, Next.js, Go, PostgreSQL, and MongoDB',
        url: 'https://ahmedsoran.dev',
        image: 'https://ahmedsoran.dev/ahmedweb-desktop.png',
        sameAs: [
          'https://github.com/ahmadsoran',
          'https://linkedin.com/in/ahmadsoran',
        ],
        jobTitle: 'Full-Stack Developer',
        worksFor: {
          '@type': 'Organization',
          name: 'Ruyat Technology',
          url: 'https://ruyat.tech',
        },
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'University of Raparin',
        },
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Kurdistan',
          addressCountry: 'IQ',
        },
        knowsAbout: [
          'JavaScript',
          'TypeScript',
          'Node.js',
          'React',
          'Next.js',
          'Go',
          'PostgreSQL',
          'MongoDB',
          'Full-Stack Development',
          'Web Development',
          'Software Engineering',
          'Database Design',
          'API Development',
          'CRM Systems',
          'ERP Solutions',
        ],
        hasSkill: [
          'JavaScript Programming',
          'TypeScript Development',
          'Node.js Backend Development',
          'React Frontend Development',
          'Next.js Framework',
          'Go Programming',
          'PostgreSQL Database',
          'MongoDB Database',
          'RESTful API Design',
          'Full-Stack Architecture',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://ahmedsoran.dev/#website',
        url: 'https://ahmedsoran.dev',
        name: 'Ahmed Soran - Full-Stack Developer Portfolio',
        description:
          'Portfolio showcasing full-stack development projects, skills, and experience in JavaScript, Node.js, React, Next.js, Go, and database technologies',
        inLanguage: 'en-US',
        isPartOf: {
          '@id': 'https://ahmedsoran.dev/#website',
        },
        about: {
          '@id': 'https://ahmedsoran.dev/#person',
        },
        author: {
          '@id': 'https://ahmedsoran.dev/#person',
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://ahmedsoran.dev/?s={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://ahmedsoran.dev/#webpage',
        url: 'https://ahmedsoran.dev',
        name: 'Ahmed Soran - Full-Stack Developer Portfolio',
        description:
          'Professional portfolio showcasing expertise in JavaScript, TypeScript, Node.js, React, Next.js, Go programming, and database technologies',
        inLanguage: 'en-US',
        isPartOf: {
          '@id': 'https://ahmedsoran.dev/#website',
        },
        about: {
          '@id': 'https://ahmedsoran.dev/#person',
        },
        mainEntity: {
          '@id': 'https://ahmedsoran.dev/#person',
        },
        datePublished: '2024-01-01',
        dateModified: '2025-01-01',
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://ahmedsoran.dev/#service',
        name: 'Full-Stack Development Services',
        description:
          'Professional web development services including custom software development, CRM systems, ERP solutions, and modern web applications',
        provider: {
          '@id': 'https://ahmedsoran.dev/#person',
        },
        areaServed: {
          '@type': 'Place',
          name: 'Global',
        },
        serviceType: [
          'Full-Stack Web Development',
          'Custom Software Development',
          'CRM System Development',
          'ERP Solution Development',
          'API Development',
          'Database Design',
          'Frontend Development',
          'Backend Development',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Development Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Full-Stack Web Application Development',
                description:
                  'Complete web application development using modern technologies',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom CRM System Development',
                description:
                  'Tailored customer relationship management systems',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Enterprise ERP Solutions',
                description:
                  'Comprehensive enterprise resource planning systems',
              },
            },
          ],
        },
      },
    ],
  }

  return (
    <Script
      id='structured-data'
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
