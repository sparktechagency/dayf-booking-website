import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "/public/images/footer/dayf-white-logo.png";
import twitterLogo from "/public/images/footer/icons8-x-logo (1).svg";
import facebookLogo from "/public/images/footer/icons8-facebook.svg";
import instaLogo from "/public/images/footer/instagram-logo.svg";
import youtubeLogo from "/public/images/footer/youtube-logo.svg";
import playStoreBadge from "/public/images/footer/play-store-badge.webp";
import appStoreBadge from "/public/images/footer/app-store-badge.webp";
import Image from "next/image";

const socialIcons = [twitterLogo, facebookLogo, instaLogo, youtubeLogo];
const navigationLinks = [
  {
    id: "home",
    label: "Home",
    route: "/",
  },
  {
    id: "hotels",
    label: "Hotels",
    route: "/property/hotels",
  },
  {
    id: "apartments",
    label: "Apartments",
    route: "/property/apartments",
  },
  {
    id: "about",
    label: "About Us",
    route: "/about",
  },
  {
    id: "contact",
    label: "Contact Us",
    route: "/contact",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#00548C]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image src={logo} alt="DAYF Booking Logo" className="" />
            </Link>

            <p className="text-sm leading-relaxed text-white">
              DAYF Booking makes booking your next stay easy, affordable, and
              stress-free. With thousands of hotels worldwide, exclusive deals,
              and secure payment options, we're here to help you find the
              perfect place to stay, every time.
            </p>

            <div className="flex items-center gap-x-5">
              {socialIcons.map((icon, index) => (
                <Link href="#" key={index} className="size-6">
                  <Image src={icon} alt={`Social Icon ${index + 1}`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Navigation</h3>
              <ul className="space-y-2">
                {navigationLinks.map((item) => (
                  <li key={item.route}>
                    <Link
                      href={item.route}
                      className="text-sm text-gray-200 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-sm text-gray-200 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4" />
                    +1 (555) 123-4567
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-sm text-gray-200 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                    support@dayf.com
                  </Link>
                </li>
                <li>
                  <div className="flex items-start gap-2 text-sm text-gray-200">
                    <MapPin className="mt-1 h-4 w-4 flex-shrink-0" />
                    123 Travel St, Suite 100, City, Country
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Download Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Download Our App</h3>
            <div className="flex flex-col gap-2">
              <div className="flex-center-start mt-3 gap-x-3">
                <Link href="#">
                  <Image src={playStoreBadge} alt="Play store link badge" />
                </Link>

                <Link href="#">
                  <Image src={appStoreBadge} alt="App store link badge" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/30 pt-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-300">
              © DAYF Booking {new Date().getFullYear()}. All Rights Reserved
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-300 transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-conditions"
                className="text-sm text-gray-300 transition-colors hover:text-white"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
