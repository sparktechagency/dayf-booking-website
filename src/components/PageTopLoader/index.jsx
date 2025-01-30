import HolyLoader from "holy-loader";

export default function PageTopLoader() {
  return (
    <HolyLoader
      color="linear-gradient(to right, var(--color-light-sky-blue), var(--color-p1))"
      height="4px"
      speed={250}
      easing="ease"
      spinnerColor="red"
      ignoreSearchParams={true}
    />
  );
}
