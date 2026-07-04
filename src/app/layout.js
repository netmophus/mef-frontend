import { Roboto } from 'next/font/google';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata = {
  title: 'Ministère des Finances — République du Niger',
  description:
    "Site officiel du Ministère des Finances de la République du Niger : budget, lois de finances, directions et services, actualités.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={roboto.variable}>
      <body>
        <ThemeRegistry>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
