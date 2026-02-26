import { track } from "@vercel/analytics"

type EventType =
  | "page_view"
  | "category_click"
  | "join_click"
  | "notification_signup"
  | "dialog_open"
  | "dialog_close"
  | "feedback_submit"

export function logEvent(type: EventType, data: Record<string, string | number | boolean>) {
  try {
    track(type, data)
  } catch {
    // silently ignore analytics errors
  }
}
