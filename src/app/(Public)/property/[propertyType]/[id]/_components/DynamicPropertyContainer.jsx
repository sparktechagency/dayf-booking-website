"use client";

import { properties } from "@/components/HomePageSections/TopPicks/PropertiesCarousel";
import hotelImg1 from "/public/images/dynamic-hotel/sheraton/restaurant-la-terrasse.jpg";
import hotelImg2 from "/public/images/dynamic-hotel/sheraton/hotel-exterior-entrance.jpg";
import hotelImg3 from "/public/images/dynamic-hotel/sheraton/restaurant-nautilus (1).jpg";
import hotelImg4 from "/public/images/dynamic-hotel/sheraton/restaurant-nautilus.jpg";
import hotelImg5 from "/public/images/dynamic-hotel/sheraton/hotel-view.jpg";
import hotelImg6 from "/public/images/dynamic-hotel/sheraton/wine-shop.jpg";
import hotelImg7 from "/public/images/dynamic-hotel/sheraton/link-sheraton.jpg";
import hotelImg8 from "/public/images/dynamic-hotel/sheraton/indoor-pool.jpg";
import hotelImg9 from "/public/images/dynamic-hotel/sheraton/la-brasserie.jpg";
import hotelImg10 from "/public/images/dynamic-hotel/sheraton/salle-uranus.jpg";
import hotelImg11 from "/public/images/dynamic-hotel/sheraton/lobby-cafe.jpg";

import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import BgIcon from "@/components/PropertySearchPanel/BgIcon";
import { Icon } from "@iconify/react";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import DynamicPropertyImageGallery from "./DynamicPropertyImageGallery";
import DynamicHotelDetails from "./DynamicPropertyDetails";
import { notFound } from "next/navigation";
import { apartmentImages } from "../../_components/ApartmentsContainer";
import DynamicPropertyDetails from "./DynamicPropertyDetails";

// Constants
const hotel = {
  id: 1,
  name: "Sheraton Club des Pins Resort",
  shortDesc:
    "Spacious, modern rooms with panoramic views of the Mediterranean Sea.",
  desc: "<article>\r\n  \r\n  <p>Located in Dhaka, 1.1 miles from Uttara University, Sheraton Club des Pins Resort provides accommodations with a fitness center, private parking, a shared lounge and a terrace. This 3-star hotel offers an ATM and babysitting service. The property has a 24-hour front desk, airport transportation, room service and free WiFi.</p>\r\n\r\n<p>At the hotel you'll find a restaurant serving Chinese, Indian and Italian cuisine. Vegetarian and halal options can also be requested.</p>\r\n\r\n<p>IUBAT is 1.8 miles from Sheraton Club des Pins Resort, while Dhaka Airport Train Station is 2.7 miles away. Hazrat Shahjalal International Airport is 4.3 miles from the property.</p>\r\n\r\n<p>Solo travelers in particular like the location – they rated it 8.0 for a one-person stay.</p>\r\n</article>",

  images: [
    { id: 0, url: hotelImg1 },
    { id: 1, url: hotelImg2 },
    { id: 2, url: hotelImg3 },
    { id: 3, url: hotelImg4 },
    { id: 4, url: hotelImg5 },
    { id: 5, url: hotelImg6 },
    { id: 6, url: hotelImg7 },
    { id: 7, url: hotelImg8 },
    { id: 8, url: hotelImg9 },
    { id: 9, url: hotelImg10 },
    { id: 10, url: hotelImg11 },
  ],

  propertyHighlights: [
    { title: "Hotel", icon: "ri:hotel-line" },
    { title: "1200 sq ft", icon: "mi:expand" },
  ],

  features: [
    {
      title: "WiFi",
      icon: "hugeicons:wifi-01",
    },
    {
      title: "Swimming Pool",
      icon: "ic:sharp-pool",
    },
    {
      title: "Gym",
      icon: "gg:gym",
    },
    {
      title: "Restaurant",
      icon: "material-symbols:restaurant-rounded",
    },
    {
      title: "Room Service",
      icon: "guidance:cleaning-room",
    },
    {
      title: "Private Parking",
      icon: "mingcute:parking-fill",
    },
    {
      title: "Non-Smoking Rooms",
      icon: "ic:round-smoking-rooms",
    },
  ],

  availability: [
    {
      id: "twin-room",
      title: "Twin Room",
      features: [
        {
          title: "2 Single Beds",
          icon: "material-symbols:single-bed",
        },
        {
          title: "Air Conditioning",
          icon: "material-symbols:ac-unit-rounded",
        },
        {
          title: "WiFi",
          icon: "hugeicons:wifi-01",
        },
        {
          title: "TV",
          icon: "material-symbols:tv-rounded",
        },
      ],
      guests: 2,
      price_per_night: "999",
      choices: [
        "Breakfast Included",
        "Non-refundable",
        "Online/Offline Cash Received",
      ],
      stock: 3,
      costPerRoom: [
        {
          quantity: 1,
          price: 999,
        },
        {
          quantity: 2,
          price: 1999,
        },
      ],
    },

    {
      id: "deluxe-double-room",
      title: "Deluxe Double Room",
      features: [
        {
          title: "2 Single Beds",
          icon: "material-symbols:single-bed",
        },
        {
          title: "Air Conditioning",
          icon: "material-symbols:ac-unit-rounded",
        },
        {
          title: "WiFi",
          icon: "hugeicons:wifi-01",
        },
        {
          title: "TV",
          icon: "material-symbols:tv-rounded",
        },
      ],
      guests: 1,
      price_per_night: "1299",
      choices: [
        "Breakfast Included",
        "Non-refundable",
        "No pre-payment needed",
        "Online/Offline Cash Received",
      ],
      stock: 2,
      costPerRoom: [
        {
          quantity: 1,
          price: 999,
        },
        {
          quantity: 2,
          price: 1999,
        },
        {
          quantity: 3,
          price: 2499,
        },
      ],
    },

    {
      id: "superior-twin-room",
      title: "Superior Twin Room",
      features: [
        {
          title: "Double Bed",
          icon: "material-symbols:single-bed",
        },
        {
          title: "Air Conditioning",
          icon: "material-symbols:ac-unit-rounded",
        },
        {
          title: "WiFi",
          icon: "hugeicons:wifi-01",
        },
        {
          title: "TV",
          icon: "material-symbols:tv-rounded",
        },
      ],
      guests: 3,
      price_per_night: "1299",
      choices: [
        "Breakfast Included",
        "Non-refundable",
        "No pre-payment needed",
        "Pay the property before arrival",
        "Online/Offline Cash Received",
      ],
      stock: 3,
      costPerRoom: [
        {
          quantity: 1,
          price: 1999,
        },
        {
          quantity: 2,
          price: 2999,
        },
        {
          quantity: 3,
          price: 3499,
        },
      ],
    },
  ],

  surroundings: [
    {
      title: "Restaurants & Cafes",
      icon: "ph:chef-hat-bold",
      data: [
        {
          title: "Blue Cafe",
          distance: "1.2 km",
        },
        {
          title: "Blue Cafe",
          distance: "1.2 km",
        },
        {
          title: "Blue Cafe",
          distance: "1.2 km",
        },
      ],
    },
    {
      title: "Shops & Markets",
      icon: "lets-icons:shop-light",
      data: [
        {
          title: "Central Mall",
          distance: "1.4 km",
        },
        {
          title: "Central Mall",
          distance: "1.4 km",
        },
        {
          title: "Central Mall",
          distance: "1.4 km",
        },
      ],
    },
    {
      title: "Beaches",
      icon: "majesticons:beach",
      data: [
        {
          title: "Les Dunes Beach",
          distance: "1.2 km",
        },
        {
          title: "Les Dunes Beach",
          distance: "1.2 km",
        },
        {
          title: "Les Dunes Beach",
          distance: "1.2 km",
        },
      ],
    },
    {
      title: "Public Transport",
      icon: "ri:bus-fill",
      data: [
        {
          title: "Train - Riverdale Central Station",
          distance: "1.2 km",
        },
        {
          title: "Metro - Cityline Metro Hub",
          distance: "1.2 km",
        },
        {
          title: "Metro - Cityline Metro Hub",
          distance: "1.2 km",
        },
      ],
    },
  ],

  testimonials: [
    {
      title: "Breathtaking Views and Luxury Comfort!",
      review:
        "The Executive Suite exceeded all my expectations! The panoramic views of the Mediterranean Sea were absolutely stunning. The suite was spacious, immaculately clean, and the modern decor made me feel right at home. The bathroom was luxurious, and the amenities provided were top-notch. Perfect for both work and relaxation!",
      rating: 5,
      author: "Sofia B.",
      location: "France",
      date: "23.10.2024",
      profileImg: "",
    },
    {
      title: "A Truly Magical Stay!",
      review:
        "This hotel is a hidden gem! From the warm welcome to the elegant rooms, everything was impeccable. The staff went above and beyond to ensure my stay was perfect. I can't wait to return!",
      rating: 5,
      author: "James T.",
      location: "United Kingdom",
      date: "15.09.2024",
      profileImg: "",
    },
    {
      title: "Perfect for a Romantic Getaway",
      review:
        "My partner and I had an unforgettable experience here. The ambiance was amazing, the food was delicious, and the spa services were beyond relaxing. Highly recommended for couples!",
      rating: 5,
      author: "Elena M.",
      location: "Italy",
      date: "05.08.2024",
      profileImg: "",
    },
    {
      title: "Exceeded Expectations!",
      review:
        "I travel a lot for work, and this hotel stands out. Super clean, excellent WiFi, and the best breakfast I've had in a long time. Would definitely book again!",
      rating: 4,
      author: "David L.",
      location: "USA",
      date: "28.07.2024",
      profileImg: "",
    },
  ],

  relatedHotels: properties,
};

const apartment = {
  id: 1,
  name: "Zidane Appartements",
  shortDesc:
    "Featuring a private beach area, Zidane Appartements features accommodations in Boumerdes. This property offers access to a terrace and free private parking.\n\nThe air-conditioned apartment is composed of 2 separate bedrooms, a living room, a fully equipped kitchen, and 1 bathroom. A flat-screen TV is available.\n\nDistance in property description is calculated using © OpenStreetMap",

  images: apartmentImages.map((img, idx) => ({ id: idx, url: img })),

  propertyHighlights: [
    { title: "Apartment", icon: "solar:home-outline" },
    { title: "500 sq ft", icon: "mi:expand" },
  ],

  features: [
    {
      title: "WiFi",
      icon: "hugeicons:wifi-01",
    },
    {
      title: "Swimming Pool",
      icon: "ic:sharp-pool",
    },
    {
      title: "Gym",
      icon: "gg:gym",
    },
    {
      title: "Restaurant",
      icon: "material-symbols:restaurant-rounded",
    },
    {
      title: "Room Service",
      icon: "guidance:cleaning-room",
    },
    {
      title: "Private Parking",
      icon: "mingcute:parking-fill",
    },
    {
      title: "Non-Smoking Rooms",
      icon: "ic:round-smoking-rooms",
    },
  ],

  availability: [
    {
      id: "two-bedroom-room",
      title: "Two Bedroom Apartment",
      features: [
        {
          title: "2 Single Beds",
          icon: "material-symbols:single-bed",
        },
        {
          title: "Air Conditioning",
          icon: "material-symbols:ac-unit-rounded",
        },
        {
          title: "WiFi",
          icon: "hugeicons:wifi-01",
        },
        {
          title: "TV",
          icon: "material-symbols:tv-rounded",
        },
      ],
      guests: 4,
      price_per_night: "999",
      choices: [
        "Breakfast Included",
        "Non-refundable",
        "Online/Offline Cash Received",
      ],
      stock: 3,
      costPerRoom: [
        {
          quantity: 1,
          price: 999,
        },
        {
          quantity: 2,
          price: 1999,
        },
      ],
    },
  ],

  surroundings: [
    {
      title: "Restaurants & Cafes",
      icon: "ph:chef-hat-bold",
      data: [
        {
          title: "Blue Cafe",
          distance: "1.2 km",
        },
        {
          title: "Blue Cafe",
          distance: "1.2 km",
        },
        {
          title: "Blue Cafe",
          distance: "1.2 km",
        },
      ],
    },
    {
      title: "Shops & Markets",
      icon: "lets-icons:shop-light",
      data: [
        {
          title: "Central Mall",
          distance: "1.4 km",
        },
        {
          title: "Central Mall",
          distance: "1.4 km",
        },
        {
          title: "Central Mall",
          distance: "1.4 km",
        },
      ],
    },
    {
      title: "Beaches",
      icon: "majesticons:beach",
      data: [
        {
          title: "Les Dunes Beach",
          distance: "1.2 km",
        },
        {
          title: "Les Dunes Beach",
          distance: "1.2 km",
        },
        {
          title: "Les Dunes Beach",
          distance: "1.2 km",
        },
      ],
    },
    {
      title: "Public Transport",
      icon: "ri:bus-fill",
      data: [
        {
          title: "Train - Riverdale Central Station",
          distance: "1.2 km",
        },
        {
          title: "Metro - Cityline Metro Hub",
          distance: "1.2 km",
        },
        {
          title: "Metro - Cityline Metro Hub",
          distance: "1.2 km",
        },
      ],
    },
  ],

  testimonials: [
    {
      title: "Breathtaking Views and Luxury Comfort!",
      review:
        "The Executive Suite exceeded all my expectations! The panoramic views of the Mediterranean Sea were absolutely stunning. The suite was spacious, immaculately clean, and the modern decor made me feel right at home. The bathroom was luxurious, and the amenities provided were top-notch. Perfect for both work and relaxation!",
      rating: 5,
      author: "Sofia B.",
      location: "France",
      date: "23.10.2024",
      profileImg: "",
    },
    {
      title: "A Truly Magical Stay!",
      review:
        "This hotel is a hidden gem! From the warm welcome to the elegant rooms, everything was impeccable. The staff went above and beyond to ensure my stay was perfect. I can't wait to return!",
      rating: 5,
      author: "James T.",
      location: "United Kingdom",
      date: "15.09.2024",
      profileImg: "",
    },
    {
      title: "Perfect for a Romantic Getaway",
      review:
        "My partner and I had an unforgettable experience here. The ambiance was amazing, the food was delicious, and the spa services were beyond relaxing. Highly recommended for couples!",
      rating: 5,
      author: "Elena M.",
      location: "Italy",
      date: "05.08.2024",
      profileImg: "",
    },
    {
      title: "Exceeded Expectations!",
      review:
        "I travel a lot for work, and this hotel stands out. Super clean, excellent WiFi, and the best breakfast I've had in a long time. Would definitely book again!",
      rating: 4,
      author: "David L.",
      location: "USA",
      date: "28.07.2024",
      profileImg: "",
    },
  ],

  relatedHotels: properties,
};

export default function DynamicPropertyContainer({ propertyType }) {
  return propertyType === "hotels" ? (
    <DynamicHotel />
  ) : propertyType === "apartments" ? (
    <DynamicApartment />
  ) : (
    notFound()
  );
}

// Dynamic Hotel
const DynamicHotel = () => {
  return (
    <ResponsiveContainer className="my-10">
      <section className="flex-center-between">
        <div>
          <h2 className="font-quicksand text-h3 font-bold">{hotel?.name}</h2>
          <p className="text-h6 text-gray-500">{hotel.shortDesc}</p>
        </div>

        <div className="flex-center-start gap-x-4">
          <CustomTooltip title="Save for Later">
            <BgIcon
              className="size-12 bg-p1/10 text-p1"
              as="button"
              onClick={() => {
                console.log("saved");
              }}
            >
              <Icon icon="solar:bookmark-linear" width="24" height="24" />
              <span className="sr-only">Save for Later</span>
            </BgIcon>
          </CustomTooltip>

          <CustomTooltip title="Share">
            <BgIcon className="size-12 bg-p1/10 text-p1">
              <Icon icon="tdesign:share" width="24" height="24" />
              <span className="sr-only">Share</span>
            </BgIcon>
          </CustomTooltip>

          <Button
            variant="primary"
            size="lg"
            className="group rounded-full font-semibold"
            asChild
          >
            <Link href="#availability">
              Reserve <AnimatedArrow />
            </Link>
          </Button>
        </div>
      </section>

      {/* Gallery */}
      <DynamicPropertyImageGallery property={hotel} images={hotel.images} />

      {/* Hotel Details */}
      <DynamicHotelDetails property={hotel} />
    </ResponsiveContainer>
  );
};

// Dynamic Apartment
const DynamicApartment = () => {
  return (
    <ResponsiveContainer className="my-10">
      <section className="flex-center-between">
        <div className="w-3/4 space-y-1">
          <h2 className="font-quicksand text-h3 font-bold">{apartment.name}</h2>
          <p className="text-h6 text-gray-500">{apartment.shortDesc}</p>
        </div>

        <div className="flex-center-start gap-x-4">
          <CustomTooltip title="Save for Later">
            <BgIcon
              className="size-12 bg-p1/10 text-p1"
              as="button"
              onClick={() => {
                console.log("saved");
              }}
            >
              <Icon icon="solar:bookmark-linear" width="24" height="24" />
              <span className="sr-only">Save for Later</span>
            </BgIcon>
          </CustomTooltip>

          <CustomTooltip title="Share">
            <BgIcon className="size-12 bg-p1/10 text-p1">
              <Icon icon="tdesign:share" width="24" height="24" />
              <span className="sr-only">Share</span>
            </BgIcon>
          </CustomTooltip>

          <Button
            variant="primary"
            size="lg"
            className="group rounded-full font-semibold"
            asChild
          >
            <Link href="#availability">
              Reserve <AnimatedArrow />
            </Link>
          </Button>
        </div>
      </section>

      {/* Gallery */}
      <DynamicPropertyImageGallery
        property={apartment}
        images={apartment.images}
      />

      {/* Hotel Details */}
      <DynamicPropertyDetails property={apartment} />
    </ResponsiveContainer>
  );
};
