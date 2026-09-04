"use client";

import Cal, { getCalApi } from "@calid/react-embed";
import { useEffect } from "react";

/**
 * Booking embed. Source of truth for the calendar link.
 * Brand theming: Sapphire in light mode, Gold in dark, per 02_design_system_spec.md.
 * Bookings route to Ashok. Do not add any other name to this component.
 */
export function BookingEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace: "default",
        embedLibUrl: "https://cal.id/embed-link/embed.js",
      });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#1A2642" },
          dark: { "cal-brand": "#D4AF37" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      namespace="default"
      calLink="ashok-verma/quick-call"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
      calOrigin="https://cal.id"
      embedJsUrl="https://cal.id/embed-link/embed.js"
    />
  );
}
