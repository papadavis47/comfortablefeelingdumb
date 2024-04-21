import { type Metadata } from 'next';
import '@/styles/main.css';
import { GeistSans } from 'geist/font/sans';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { BLOG_TITLE } from '@/utils/constants';

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: 'A blog about React, TypeScript ( and distance running )',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${GeistSans.variable}`}>
      <body className='h-full'>
        <div className='flex flex-col min-h-screen bg-background'>
          <NavBar />
          <section className='flex-1'>{children}</section>
          <Footer />
        </div>
      </body>
    </html>
  );
}
