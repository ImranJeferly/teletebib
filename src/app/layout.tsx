import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"], // Use only Latin subset for now
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TeleTebib - Onlayn Tibbi Məsləhətlər və Psixoloji Dəstək",
  description: "Sertifikatlı həkimlərlə və psixoloqlarla onlayn əlaqə saxlayın. Evdən tibbi məsləhətlər, terapiya seansları və dərman idarəetməsi alın. Azərbaycanda 24/7 əlçatan - Təhlükəsiz, rahat və münasib qiymətli səhiyyə.",
  keywords: [
    "telemedicine", "onlayn həkim", "psixoloji sağlamlıq", "terapiya", "tibbi məsləhət", 
    "psixiatr", "psixoloq", "telehealth", "Azərbaycan", "onlayn səhiyyə",
    "dərman idarəetməsi", "cütlük terapiyası", "fərdi terapiya", "tibbi məsləhət",
    "digital sağlamlıq", "virtual məsləhət", "səhiyyə tətbiqi", "teletibib",
    "sağlamlıq", "həkim", "məsləhət", "tibbi xidmət", "psixoloji dəstək"
  ],
  authors: [{ name: "TeleTebib Komandası" }],
  creator: "TeleTebib",
  publisher: "TeleTebib Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/ico.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/ico.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'az_AZ',
    url: 'https://teletebib.com',
    siteName: 'TeleTebib',
    title: 'TeleTebib - Onlayn Tibbi Məsləhətlər və Psixoloji Dəstək',
    description: 'Sertifikatlı həkimlərlə və psixoloqlarla onlayn əlaqə saxlayın. Evdən tibbi məsləhətlər, terapiya seansları və dərman idarəetməsi alın. Azərbaycanda 24/7 əlçatan.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TeleTebib - Onlayn Səhiyyə Platforması',
      },
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'TeleTebib Loqosu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TeleTebib - Onlayn Tibbi Məsləhətlər və Psixoloji Dəstək',
    description: 'Sertifikatlı həkimlərlə və psixoloqlarla onlayn əlaqə saxlayın. Azərbaycanda 24/7 əlçatan.',
    images: ['/og-image.png'],
    creator: '@teletebib',
    site: '@teletebib',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://teletebib.com',
  },
  category: 'Səhiyyə və Tibb',
  classification: 'Səhiyyə Texnologiyası',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'TeleTebib',
    description: 'Onlayn tibbi məsləhətlər və psixoloji dəstək platforması',
    url: 'https://teletebib.com',
    logo: 'https://teletebib.com/logo.png',
    image: 'https://teletebib.com/og-image.png',
    telephone: '+994-XX-XXX-XXXX',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AZ',
      addressLocality: 'Bakı',
      addressRegion: 'Bakı',
    },
    medicalSpecialty: [
      'Psixiatriya',
      'Psixologiya', 
      'Daxili xəstəliklər',
      'Kardiologiya',
      'Dermatologiya',
      'Ginekologiya',
      'Pediatriya'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tibbi Xidmətlər',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalTherapy',
            name: 'Onlayn Tibbi Məsləhət',
            description: 'Sertifikatlı həkimlərlə video məsləhətlər'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalTherapy', 
            name: 'Psixoloji Sağlamlıq Terapiyası',
            description: 'Fərdi və cütlük terapiya seansları'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalTherapy',
            name: 'Dərman İdarəetməsi',
            description: 'Resept və dərman monitorinqi xidmətləri'
          }
        }
      ]
    },
    availableService: [
      {
        '@type': 'MedicalService',
        name: 'Telemedicine Məsləhəti',
        serviceType: 'Video zəng vasitəsilə uzaqdan tibbi məsləhət'
      },
      {
        '@type': 'MedicalService', 
        name: 'Psixoloji Sağlamlıq Dəstəyi',
        serviceType: 'Onlayn terapiya və psixiatrik qayğı'
      }
    ],
    serviceArea: {
      '@type': 'Country',
      name: 'Azərbaycan'
    }
  };

  return (
    <html lang="az" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#1A56DB" />
        <meta name="msapplication-TileColor" content="#1A56DB" />
        <meta name="application-name" content="TeleTebib" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TeleTebib" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className={`${poppins.variable} antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
