import { MutableRefObject, useEffect, useRef } from "react";

const useDidUpdateEffect = (fn: Function, inputs: string[]) => {
  const mounted: MutableRefObject<boolean> = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      fn();
    }
  }, inputs);
};

export { useDidUpdateEffect };
