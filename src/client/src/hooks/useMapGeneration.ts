import { useEffect, useRef } from "react";
import { useMapStore } from "./useMapStore";

/**
 * Auto-generate map when params change (debounced).
 */
export function useMapGeneration(debounceMs = 300) {
  const params = useMapStore((s) => s.params);
  const generate = useMapStore((s) => s.generate);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      generate();
    }, debounceMs);

    return () => clearTimeout(timerRef.current);
  }, [params, generate, debounceMs]);
}
