import { useEffect, useState } from "react";

export function useMediaQuery() {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const onChange = (e: MediaQueryListEvent) => setValue(e.matches);
    const result = matchMedia("(min-width: 768px)");

    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, []);

  return value;
}
