import Image from "next/image"

const Spinner = ({
  size = 145,
  className,
}) => {
  return (
    <div className={`flex h-[65vh] items-center justify-center ${className}`}>
      <Image src={'/images/spinner.svg'} alt="Spinner" width={size} height={size} />
    </div>
  )
}

export default Spinner
