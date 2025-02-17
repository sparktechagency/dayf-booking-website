// Navigation Links
export const navbarLinks = [
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

export const mobileNavbarLinks = [
  ...navbarLinks,
  {
    id: "list-property",
    label: "List Your Property",
    route: "/list-property",
  },
];

// Supported Currencies
export const supportedCurrencies = [
  {
    id: "usd",
    label: "USD",
    icon: "/images/navbar/dollar-circle.svg",
  },

  {
    id: "euro",
    label: "EURO",
    icon: "/images/navbar/euro-circle.svg",
  },

  {
    id: "dzd",
    label: "DZD",
    icon: "/images/navbar/algeria-dinar-circle.svg",
  },
];

// Supported Languages
export const supportedLanguages = [
  {
    id: "english",
    label: "English",
    icon: "/images/navbar/usa.svg",
  },
  {
    id: "arabic",
    label: "Arabic",
    icon: "/images/navbar/algeria.svg",
  },
  {
    id: "french",
    label: "French",
    icon: "/images/navbar/france.svg",
  },
];
