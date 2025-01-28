export default function FeatureCard({ feature }) {
  return (
    <div>
      <h5 className="rounded-full w-max bg-[#e6f2fb] px-6 py-2 text-h5 font-medium">
        0{feature.id}
      </h5>

      <h2 className="mb-1 mt-4 text-h3 font-medium">{feature.title}</h2>
      <p className="text-base text-gray-500">{feature.description}</p>
    </div>
  );
}
