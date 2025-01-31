"use client";

import { hotels } from "@/components/HomePageSections/TopPicks/HotelsCarousel";
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
import BgIcon from "@/components/HotelSearchPanel/BgIcon";
import { Icon } from "@iconify/react";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import DynamicHotelImageGallery from "./DynamicHotelImageGallery";

// Constants
const hotel = {
  id: 1,
  name: "Sheraton Club des Pins Resort",
  shortDesc:
    "Spacious, modern rooms with panoramic views of the Mediterranean Sea.",
  desc: "<article>\r\n  \r\n  <p>Located in Dhaka, 1.1 miles from Uttara University, Sheraton Club des Pins Resort provides accommodations with a fitness center, private parking, a shared lounge and a terrace. This 3-star hotel offers an ATM and babysitting service. The property has a 24-hour front desk, airport transportation, room service and free WiFi.</p>\r\n\r\n<p>At the hotel you'll find a restaurant serving Chinese, Indian and Italian cuisine. Vegetarian and halal options can also be requested.</p>\r\n\r\n<p>IUBAT is 1.8 miles from Sheraton Club des Pins Resort, while Dhaka Airport Train Station is 2.7 miles away. Hazrat Shahjalal International Airport is 4.3 miles from the property.</p>\r\n\r\n<p>Solo travelers in particular like the location – they rated it 8.0 for a one-person stay.</p>\r\n</article>",

  images: [
    hotelImg1,
    hotelImg2,
    hotelImg3,
    hotelImg4,
    hotelImg5,
    hotelImg6,
    hotelImg7,
    hotelImg8,
    hotelImg9,
    hotelImg10,
    hotelImg11,
  ],

  propertyType: { title: "Hotel", icon: "ri:hotel-line" },

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

  hotelPolicies: {
    checkIn: {
      time: "Available 24 hours",
      details:
        "Guests are required to show a photo identification and credit card upon check-in. You'll need to let the property know in advance what time you'll arrive.",
    },
    checkOut: {
      time: "Available 24 hours",
    },
    cancellationPrepayment: {
      details:
        "Cancellation and prepayment policies vary according to accommodation type. Please check what conditions may apply to each option when making your selection.",
    },
    childrenAndBeds: {
      childPolicies: {
        description: "Children of any age are welcome.",
        adultCharge:
          "Children 12 years and above will be charged as adults at this property.",
        pricingInfo:
          "To see correct prices and occupancy information, please add the number of children in your group and their ages to your search.",
      },
      cotAndExtraBedPolicies: {
        extraBeds:
          "The number of extra beds allowed is dependent on the option you choose. Please check your selected option for more information.",
        cotsAvailable: "There are no cots available at this property.",
        extraBedAvailability: "All extra beds are subject to availability.",
      },
    },
    noAgeRestriction: {
      description: "There is no age requirement for check-in.",
    },
    pets: {
      allowed: false,
      details: "Pets are not allowed.",
    },
    paymentMethods: {
      cashOnly: true,
      details: "This property only accepts cash payments.",
    },
  },

  relatedHotels: hotels,
};

export default function DynamicHotelContainer() {
  return (
    <ResponsiveContainer className="my-10">
      <section className="flex-center-between">
        <div>
          <h2 className="font-quicksand text-h3 font-bold">{hotel.name}</h2>
          <p className="text-h6 text-gray-500">{hotel.shortDesc}</p>
        </div>

        <div className="flex-center-start gap-x-4">
          <CustomTooltip title="Save for Later">
            <BgIcon
              className="size-12 bg-p1/10 text-p1"
              as="button"
              onClick={() => {
                console.log("uzzal");
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
            <Link href="#reserve">
              Reserve <AnimatedArrow />
            </Link>
          </Button>
        </div>
      </section>

      {/* Gallery */}
      <DynamicHotelImageGallery images={hotel.images} />
    </ResponsiveContainer>
  );
}
