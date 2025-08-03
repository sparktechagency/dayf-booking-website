import { toast, Id } from "react-toastify";

/**
 * Helper to run an RTK‑Query mutation with optional toast feedback.
 *
 * @param data        – body / params you pass to the mutation.
 * @param mutation    – the RTK‑Query mutation hook’s trigger fn.
 * @param loadingTxt  – text for the “loading…” toast.
 *                      ➜ if empty / undefined 👉 **no toasts will be shown**.
 * @param onSuccess   – callback invoked with the resolved data.
 * @param onFailure   – callback invoked with the error / response.
 */

const handleMutation = async (
  data,
  mutation,
  loadingTxt,
  onSuccess,
  onFailure
) => {
  // ── 1. Show loading toast only if text is provided ────────────────────────────
  let toastId = null;
  const useToast = Boolean(loadingTxt && loadingTxt.trim().length > 0);

  if (useToast) {
    toastId = toast.loading(loadingTxt);
  }

  try {
    const res = await mutation(data).unwrap();

    if (res?.success) {
      if (useToast && toastId) {
        toast.update(toastId, {
          render: res?.message || "Operation successful",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
      onSuccess?.(res);
    } else {
      if (useToast && toastId) {
        toast.update(toastId, {
          render: res?.message || "Operation failed",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      onFailure?.(res);
    }
  } catch (error) {
    if (useToast && toastId) {
      let errorMessage = "Something went wrong!";
      if (error?.status === "PARSING_ERROR") {
        errorMessage =
          "Server returned invalid data. Please try again or contact support.";
      } else if (error?.data?.message) {
        errorMessage = error.data.message;
      }

      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
    onFailure?.(error);
  }
};

export default handleMutation;
