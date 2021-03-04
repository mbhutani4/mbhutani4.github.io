import { useRef, useEffect } from "react";
import ScrollSnap from "scroll-snap";

interface UseScrollSnapProps {
  callback?: () => void;
}

const useScrollSnap = (props: UseScrollSnapProps = {}) => {
  const { callback } = props;
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const snapElement = new ScrollSnap(ref.current, {
      snapDestinationY: "100%",
    }).bind(callback);
    return () => snapElement.unbind();
  }, [callback]);
  return ref;
};

export default useScrollSnap;
