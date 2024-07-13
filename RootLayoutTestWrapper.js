// RootLayoutTestWrapper.js

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Urbanist } from 'next/font/google';
import clsx from 'clsx';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';

const urbanist = Urbanist({ subsets: ['latin'] });

export default function RootLayoutTestWrapper({ children }) {
  return (
    <div className={clsx(urbanist.className, 'relative min-h-screen bg-blue-950 text-slate-100')}>
      <Header />
      {children}
      <div className="h-[85vh]">
        <Footer />
        <div className="absolute inset-0 -z-50 max-h-screen background-gradient"></div>
        <div className="absolute pointer-events-none inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
      </div>
      <PrismicPreview repositoryName={repositoryName} />
    </div>
  );
}
