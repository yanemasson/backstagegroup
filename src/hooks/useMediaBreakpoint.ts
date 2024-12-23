import {useEffect, useRef, useState} from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpointValuesMap = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
export const useMediaBreakpoint = (breakpoint: Breakpoint) => {
  const [isUp, setIsUp] = useState(false);
  const mediaQueryList = useRef(matchMedia(`(min-width: ${breakpointValuesMap[breakpoint]}px)`));

  useEffect(() => {
    const screenTest = (e: MediaQueryListEvent) => {
      return setIsUp(e.matches);
    };
    setIsUp(mediaQueryList.current.matches);
    mediaQueryList.current.addEventListener('change', screenTest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => mediaQueryList.current.removeEventListener('change', screenTest);
  }, [mediaQueryList]);

  return isUp;
};
