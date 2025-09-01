
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if(loading) {
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>
  }

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <AppLogo className="size-8 text-primary" />
          <span className="text-xl font-bold tracking-tight">StudyCalm</span>
        </Link>
        <div className="flex items-center gap-2">
           <Button asChild variant="ghost">
                <Link href="/login">
                  Login
                </Link>
              </Button>
            <Button asChild>
                <Link href="/signup">
                  Get Started
                </Link>
            </Button>
        </div>
      </header>
      <main className="flex-grow flex items-center">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
          >
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
          </div>
          <div className="relative pt-16 md:pt-20 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-headline text-balance">
              Find Your Focus, Master Your Mind.
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-lg text-muted-foreground text-balance">
              StudyCalm is your personal guide to mindful learning. We blend AI-powered study plans with tools for stress management to help you achieve academic success without sacrificing your well-being.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Started for Free <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-muted-foreground text-sm">
        <div className="flex justify-between items-center border-t pt-6">
            <p>
                © {new Date().getFullYear()} StudyCalm. All rights reserved by{' '}
                <a href="https://dare4.org/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                Dare4.0
                </a>
            </p>
            <a href="https://dare4.org/" target="_blank" rel="noopener noreferrer">
                <Image 
                    src="https://dare4.masterpeace.org/wp-content/uploads/sites/19/2024/03/dare4-logos.png"
                    alt="Dare4.0 Logo"
                    width={150}
                    height={35}
                    data-ai-hint="logo"
                />
            </a>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center border-t pt-6 mt-6">
          <p className="text-xs text-balance">
            Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.
          </p>
          <div className="flex justify-center md:justify-end">
             <Image 
                src="https://dare4.masterpeace.org/wp-content/uploads/sites/19/2024/03/EN-Co-Funded-by-the-EU_PANTONE-1536x322.png"
                alt="Co-funded by the EU Logo"
                width={300}
                height={63}
                data-ai-hint="logo EU"
             />
          </div>
        </div>
      </footer>
    </div>
  );
}
