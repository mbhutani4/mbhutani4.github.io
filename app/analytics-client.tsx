"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-NQRF4J353G";

export function AnalyticsClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }, []);

  useEffect(() => {
    const search = searchParams.toString();
    const page = search ? `${pathname}?${search}` : pathname;
    ReactGA.send({ hitType: "pageview", page });
  }, [pathname, searchParams]);

  return null;
}
