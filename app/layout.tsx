import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/NavBar';
import Footer from './components/Footer';

export const metadata = {
  title: 'HyperX',
  description: 'HyperX',
};

const font = Nunito({ 
  subsets: ['latin'], 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div>
          {children}
        </div>
        <Footer /> 
      </body>
    </html>
  );
}
