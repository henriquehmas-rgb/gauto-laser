"use client";

export type AnalyticsEvent =
  | "campaign_click"
  | "cta_whatsapp_click"
  | "scroll_to_treatments"
  | "treatment_view"
  | "treatment_details_open"
  | "combo_submit"
  | "quiz_start"
  | "quiz_step"
  | "quiz_complete"
  | "compare_view"
  | "maps_click"
  | "phone_click"
  | "faq_open"
  | "lead_form_submit"
  | "referral_click"
  | "referral_share"
  | "exit_modal_view"
  | "exit_modal_submit";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
