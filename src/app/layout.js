import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./root.css";
import ReduxProvider from "../redux/provider";
import NavbarWrapper from "../components/NavbarWrapper";
import {ToastContainer} from "react-toastify";
import I18nProvider from '../i18n/i18nProvider';
import FooterWrapper from "../components/Fotter/FooterWrapper";
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'عقاري ماب | المنصة الأولى لعقارات سوريا',
  description: 'استعرض أفضل العقارات في سوريا – شقق، فلل، أراضي، ومكاتب تجارية للبيع والإيجار.',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          <NavbarWrapper />
          <ToastContainer />
          <I18nProvider>{children}</I18nProvider>
          <FooterWrapper/>
      </ReduxProvider>
      </body>
    </html>
  );
}
