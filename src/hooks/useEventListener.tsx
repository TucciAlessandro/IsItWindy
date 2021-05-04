import { useEffect, useRef } from "react";
import { window } from "browser-monads";

type AnyFunction = (...args: any[]) => any;

export type HTMLElementOrWindow =
  | (Window & typeof globalThis)
  | HTMLElement
  | null;
export function useEventListener(
  eventName: string,
  handler: AnyFunction,
  element: HTMLElementOrWindow = window
) {
  const savedHandler = useRef<AnyFunction | null>(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported || element === null) return;

    const eventListener = (event: any) =>
      savedHandler.current && savedHandler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
