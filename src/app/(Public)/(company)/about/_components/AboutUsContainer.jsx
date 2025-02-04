"use client";

// import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
// import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";
// import { useGetContentQuery } from "@/redux/api/contentApi";

export default function AboutUsContainer() {
  // const { data: aboutUsRes } = useGetContentQuery();
  // const aboutUs =
  //   aboutUsRes?.data?.data?.length > 0
  //     ? aboutUsRes?.data?.data[0]?.aboutUs
  //     : "";

  // return aboutUs ? <ContentWrapper content={aboutUs} /> : <EmptyContainer />;

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold tracking-tight">About Us</h1>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Who We Are</h2>
          <p className="text-muted-foreground leading-relaxed">
            Welcome to [Your Website Name], your trusted partner in finding the
            perfect stay. We specialize in connecting travelers with top-rated
            hotels, offering a seamless booking experience tailored to your
            needs. Whether it&apos;s a luxurious getaway, a business trip, or a
            family vacation, we make finding the right accommodation easy and
            reliable.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Our Purpose</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is to simplify the travel experience by providing a
            platform where quality, convenience, and affordability meet.
            We&apos;re committed to offering a wide range of hotel options,
            ensuring every traveler finds their ideal stay, no matter their
            budget or destination.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Why Choose Us?</h2>
          <ul className="text-muted-foreground space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Wide Selection of Hotels: From boutique stays to 5-star resorts.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                User-Friendly Interface: Simple navigation and hassle-free
                booking.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Transparent Pricing: No hidden fees, just honest rates.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                24/7 Support: Dedicated customer service to assist you anytime.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Exclusive Deals: Get access to discounts and special offers.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
