import { CircleAlert } from "lucide-react";
import { motion } from "motion/react";

// Motion variant
const scaleUpVariants = {
  initial: {
    opacity: 0,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 0.1
    }
  }
};

export default function CustomFormError({ formError, extraClass }) {
  return (
    <motion.div
      className={`flex-center-start mt-5 gap-x-2 rounded-xl bg-red-500 px-4 py-2 text-base font-medium text-white ${extraClass}`}
      variants={scaleUpVariants}
      initial="initial"
      animate="animate"
    >
      <CircleAlert size={18} />
      <p>{formError}</p>
    </motion.div>
  );
}
