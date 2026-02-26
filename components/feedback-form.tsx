"use client"

import { useState } from "react"
import { Send, CheckCircle2, MessageSquarePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logEvent } from "@/lib/analytics"

export function FeedbackForm() {
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!feedback.trim()) return
    setIsSubmitting(true)

    logEvent("feedback_submit", {
      feedback: feedback.trim(),
      length: feedback.trim().length,
    })

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  const handleReset = () => {
    setFeedback("")
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-neon/20 bg-card p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon/10">
          <CheckCircle2 className="h-8 w-8 text-neon" />
        </div>
        <div>
          <h3 className="mb-1 text-lg font-bold text-foreground">
            {"소중한 의견 감사합니다!"}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {"보내주신 의견은 PNU 벼락을 더 좋게 만드는 데 활용됩니다."}
          </p>
        </div>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-neon/30 text-neon hover:bg-neon/10 hover:text-neon"
        >
          {"추가 의견 남기기"}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon/10">
          <MessageSquarePlus className="h-5 w-5 text-neon" />
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground">
            {"의견을 들려주세요"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {"PNU 벼락에 추가되었으면 하는 기능이나 카테고리가 있나요?"}
          </p>
        </div>
      </div>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="예: 맛집 탐방 카테고리가 있으면 좋겠어요! / 매칭 알림 기능이 필요해요 / ..."
        rows={5}
        className="w-full resize-none rounded-lg border border-border bg-secondary p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon/30 leading-relaxed"
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {feedback.length > 0 ? `${feedback.length}자` : ""}
        </span>
        <Button
          onClick={handleSubmit}
          disabled={!feedback.trim() || isSubmitting}
          className="bg-neon text-primary-foreground font-bold hover:bg-neon/90 hover:shadow-neon transition-all disabled:opacity-50"
        >
          <Send className="mr-1.5 h-4 w-4" />
          {isSubmitting ? "제출 중..." : "제출하기"}
        </Button>
      </div>
    </div>
  )
}
