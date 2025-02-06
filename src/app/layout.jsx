import { dmSans, quicksand, roboto } from "@/fonts/fonts";
import "./globals.css";
import Navbar from "@/components/shared-layout/Navbar/Navbar";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from "@/components/shared-layout/Footer/Footer";
import PageTopLoader from "@/components/PageTopLoader";
import ScrollToTopBtn from "@/components/ScrollToTopBtn/ScrollToTopBtn";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export const metadata = {
  title: {
    default: "DAYF Booking",
    template: "%s - DAYF Booking",
  },
  description:
    "Book Your Dream Stay in Algeria’s Top Destinations with DAYF Booking! Discover handpicked hotels and accommodations across Algeria’s most captivating destinations. Whether you’re planning a city escape, a coastal retreat, or a desert adventure, we’ve got you covered.",

  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",

      // TODO: add other languages
    },
  },
  openGraph: {
    title: "DAYF Booking",
    description:
      "Book Your Dream Stay in Algeria’s Top Destinations with DAYF Booking!",
    images: [{ url: "/logos/logo.svg", width: 1260, height: 800 }],
  },
  type: "website",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className="scrollbar-thin scrollbar-track-light-sky-blue scrollbar-thumb-p1"
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body
        className={`${dmSans.className} ${quicksand.variable} ${roboto.variable} flex flex-col justify-between antialiased ${process.env.NODE_ENV === "development" && "debug-screens"}`}
      >
        <Navbar />

        <main className="min-h-[75vh] flex-1">{children}</main>

        <Footer />

        <PageTopLoader />
        <ScrollToTopBtn />
      </body>
    </html>
  );
}
