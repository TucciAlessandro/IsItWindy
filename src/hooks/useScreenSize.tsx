import { useEffect, useState } from "react";
import { useEventListener } from "./useEventListener";
import { window } from "browser-monads";

type ScreenSize = "small" | "medium" | "large" | "x-large" | "unset";

const pxToNumber = (value: string) => parseInt(value.slice(0, -2), 10);

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("unset");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const breakpoints: any = ["420px", "768px", "992px", "1200px"];
  breakpoints.sm = breakpoints[0];
  breakpoints.md = breakpoints[1];
  breakpoints.lg = breakpoints[2];
  breakpoints.xl = breakpoints[3];

  useEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  useEffect(() => {
    if (windowWidth < pxToNumber(breakpoints.sm)) setScreenSize("small");

    if (
      windowWidth < pxToNumber(breakpoints.md) &&
      windowWidth > pxToNumber(breakpoints.sm)
    )
      setScreenSize("medium");

    if (
      windowWidth < pxToNumber(breakpoints.lg) &&
      windowWidth > pxToNumber(breakpoints.md)
    )
      setScreenSize("large");

    if (windowWidth > pxToNumber(breakpoints.lg)) setScreenSize("x-large");
  }, [windowWidth]);

  return { screenSize };
};

export { useScreenSize };
