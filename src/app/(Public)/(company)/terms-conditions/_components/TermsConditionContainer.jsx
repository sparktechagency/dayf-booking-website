"use client";

// import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
// import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";
// import { useGetContentQuery } from "@/redux/api/contentApi";

export default function TermsConditionContainer() {
  // const { data: termsRes } = useGetContentQuery();
  // const termsConditions =
  //   termsRes?.data?.data?.length > 0
  //     ? termsRes?.data?.data[0]?.termsAndConditions
  //     : "";
  // return termsConditions ? (
  //   <ContentWrapper content={termsConditions} />
  // ) : (
  //   <EmptyContainer />
  // );

  return (
    <div>
      <div className="mx-auto max-w-4xl p-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">Terms and Conditions</h1>

          <p className="text-gray-700">
            By using our app to book accommodations, you agree to the following
            terms and conditions. Please read them carefully.
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="mb-2 font-semibold">1. Booking and Payment</h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  1.1. All bookings are subject to availability and confirmation
                  by the respective hotel.
                </p>
                <p>
                  1.2. Payments must be made in full at the time of booking
                  unless otherwise specified.
                </p>
                <p>
                  1.3. Additional taxes, fees, or charges may apply based on
                  local regulations or hotel policies.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-2 font-semibold">
                2. Cancellation and Refund Policy
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  2.1. Cancellation policies vary by hotel. Please review the
                  specific policy before confirming your booking.
                </p>
                <p>
                  2.2. Refunds, if applicable, will be processed according to
                  the hotel's policy and may take up to 7-10 business days.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-2 font-semibold">3. User Responsibilities</h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  3.1. Ensure the accuracy of all details provided during the
                  booking process.
                </p>
                <p>
                  3.2. Comply with the hotel's rules and policies during your
                  stay.
                </p>
                <p>
                  3.3. You are solely responsible for any damages or additional
                  charges incurred during your stay.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-2 font-semibold">4. Changes to Bookings</h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  4.1. Modifications to bookings are subject to the hotel's
                  approval and policies.
                </p>
                <p>
                  4.2. Fees may apply for changes to dates, room types, or other
                  booking details.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-2 font-semibold">5. Limitation of Liability</h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  5.1. [Hotel Booking App Name] acts as an intermediary and is
                  not responsible for disputes, cancellations, or issues between
                  the user and the hotel.
                </p>
                <p>
                  5.2. We are not liable for any losses, damages, or
                  inconveniences caused by errors, delays, or unforeseen
                  circumstances.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-2 font-semibold">6. Privacy Policy</h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  6.1. Personal data collected during bookings will be handled
                  according to our Privacy Policy.
                </p>
                <p>
                  6.2. Your information will be shared with the selected hotel
                  for reservation purposes only.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-2 font-semibold">7. Governing Law</h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  7.1. These terms are governed by the laws of [your
                  region/country].
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-2 font-semibold">8. Changes to Terms</h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  8.1. [Hotel Booking App Name] reserves the right to modify
                  these terms at any time.
                </p>
                <p>
                  8.2. Continued use of the app implies acceptance of any
                  updated terms.
                </p>
              </div>
            </section>

            <p className="pt-4 text-gray-700">
              If you need any clarification or assistance, feel free to contact
              our support team at [Support Email/Contact Info].
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
