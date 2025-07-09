"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function useSearchParamsState(key, defaultValue, parse, serialize) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize state from URL param or default
  const initialValue = searchParams.get(key);
  const [value, setValue] = useState(
    initialValue !== null ? parse(initialValue) : defaultValue
  );

  // Update URL when value changes
  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const serializedValue = serialize(value);

    if (serializedValue) {
      currentParams.set(key, serializedValue);
    } else {
      currentParams.delete(key);
    }

    // Update URL without full reload, shallow routing
    router.replace(`${window.location.pathname}?${currentParams.toString()}`, {
      scroll: false
    });
  }, [value, key]);

  return [value, setValue];
}
