import { useRef } from "react";

export const useMyShit = <T>(foo: () => T, deps: unknown[]) => {
  const data = useRef({ deps, value: foo() });
  const isChange = data.current.deps.some((d, idx) => deps[idx] !== d);
  if (isChange) {
    data.current.value = foo();
  }
  return data.current.value;
};
