"use client";

// import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
// import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";
// import { useGetContentQuery } from "@/redux/api/contentApi";

export default function PrivacyPolicyContainer() {
  // const { data: privacyPolicyRes } = useGetContentQuery();

  // const privacyPolicy =
  //   privacyPolicyRes?.data?.data?.length > 0
  //     ? privacyPolicyRes?.data?.data[0]?.privacyPolicy
  //     : "";

  // return privacyPolicy ? (
  //   <ContentWrapper content={privacyPolicy} />
  // ) : (
  //   <EmptyContainer />
  // );

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Privacy Policy
        </h1>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Your Privacy Matters to Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            At DAYF Booking, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy outlines how we collect, use, and safeguard your data when
            you visit or use our website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">
            Types of Information We Collect
          </h2>
          <ul className="text-muted-foreground space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Personal Information: Name, email address, phone number, payment
                details, etc.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Booking Details: Hotel preferences, travel dates, and booking
                history.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Technical Information: IP address, browser type, device details,
                and cookies.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Purpose of Data Collection</h2>
          <ul className="text-muted-foreground space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>To process bookings and payments.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                To communicate updates, confirmations, and special offers.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>To personalize your browsing and booking experience.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                To improve our website functionality and user experience.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Cookies Policy</h2>
          <ul className="text-muted-foreground space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                We use cookies to enhance your browsing experience and analyze
                website usage.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                You can manage or disable cookies through your browser settings.
              </span>
            </li>
          </ul>
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
