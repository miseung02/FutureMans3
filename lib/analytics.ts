type EventType =
  | "page_view"
  | "category_click"
  | "join_click"
  | "notification_signup"
  | "dialog_open"
  | "dialog_close"

interface AnalyticsEvent {
  type: EventType
  timestamp: string
  data: Record<string, string | number | boolean>
}

const eventLog: AnalyticsEvent[] = []

export function logEvent(type: EventType, data: Record<string, string | number | boolean>) {
  const event: AnalyticsEvent = {
    type,
    timestamp: new Date().toISOString(),
    data,
  }
  eventLog.push(event)
  console.log(`[PNU 벼락 Analytics] ${type}`, JSON.stringify(data))
}

export function getEventLog(): AnalyticsEvent[] {
  return [...eventLog]
}
