
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-context';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeading = Inter({
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'StudyCalm',
  description: 'Your personal guide to mindful learning and mental well-being.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-body antialiased ${inter.variable} ${fontHeading.variable} bg-muted/40`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-sm h-screen overflow-y-auto bg-background shadow-2xl">
              {children}
            </div>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
