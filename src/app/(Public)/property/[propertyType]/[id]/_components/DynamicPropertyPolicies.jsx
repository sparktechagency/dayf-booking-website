import React from "react";

export default function DynamicPropertyPolicies() {
  return (
    <div className="mx-auto w-full rounded-lg border px-8 py-4">
      <dl className="divide-y divide-gray-200">
        <div className="grid grid-cols-1 gap-x-5 py-4 md:grid-cols-[200px_1fr]">
          <dt className="font-medium text-gray-900">Check-in</dt>
          <dd className="mt-2 md:mt-0">
            <div className="text-gray-900">Available 24 hours</div>
            <div className="mt-1 text-sm text-gray-600">
              Guests are required to show a photo identification and credit card
              upon check-in
            </div>
            <div className="mt-1 text-sm text-gray-600">
              You'll need to let the property know in advance what time you'll
              arrive.
            </div>
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-x-5 py-4 md:grid-cols-[200px_1fr]">
          <dt className="font-medium text-gray-900">Check-out</dt>
          <dd className="mt-2 md:mt-0">
            <div className="text-gray-900">Available 24 hours</div>
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-x-5 py-4 md:grid-cols-[200px_1fr]">
          <dt className="font-medium text-gray-900">
            Cancellation/ prepayment
          </dt>
          <dd className="mt-2 md:mt-0">
            <div className="text-gray-600">
              Cancellation and prepayment policies vary according to
              accommodation type. Please check what{" "}
              <a href="#" className="underline">
                conditions
              </a>{" "}
              may apply to each option when making your selection.
            </div>
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-x-5 py-4 md:grid-cols-[200px_1fr]">
          <dt className="font-medium text-gray-900">Children and beds</dt>
          <dd className="mt-2 md:mt-0">
            <div className="space-y-4">
              <div>
                <div className="font-medium text-gray-900">Child policies</div>
                <div className="mt-1 text-sm text-gray-600">
                  Children of any age are welcome.
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  Children 12 years and above will be charged as adults at this
                  property.
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  To see correct prices and occupancy information, please add
                  the number of children in your group and their ages to your
                  search.
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  Cot and extra bed policies
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  The number of extra beds allowed is dependent on the option
                  you choose.
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  Please check your selected option for more information.
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  There are no cots available at this property.
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  All extra beds are subject to availability.
                </div>
              </div>
            </div>
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-x-5 py-4 md:grid-cols-[200px_1fr]">
          <dt className="font-medium text-gray-900">No age restriction</dt>
          <dd className="mt-2 md:mt-0">
            <div className="text-gray-900">
              There is no age requirement for check-in
            </div>
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-x-5 py-4 md:grid-cols-[200px_1fr]">
          <dt className="font-medium text-gray-900">Pets</dt>
          <dd className="mt-2 md:mt-0">
            <div className="text-gray-900">Pets are not allowed.</div>
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-x-5 py-4 md:grid-cols-[200px_1fr]">
          <dt className="font-medium text-gray-900">Cash only</dt>
          <dd className="mt-2 md:mt-0">
            <div className="text-gray-900">
              This property only accepts cash payments.
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
}
