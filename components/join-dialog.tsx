"use client"

import { useState } from "react"
import { Rocket, MessageCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Meetup } from "@/lib/meetup-data"
import { logEvent } from "@/lib/analytics"

interface JoinDialogProps {
  meetup: Meetup | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function JoinDialog({ meetup, open, onOpenChange }: JoinDialogProps) {
  const [kakaoId, setKakaoId] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      logEvent("dialog_close", {
        meetupId: meetup?.id || "",
        submitted,
      })
      // Reset on close
      setTimeout(() => {
        setKakaoId("")
        setSubmitted(false)
        setIsSubmitting(false)
      }, 300)
    } else {
      logEvent("dialog_open", {
        meetupId: meetup?.id || "",
        category: meetup?.category || "",
      })
    }
    onOpenChange(newOpen)
  }

  const handleSubmit = () => {
    if (!kakaoId.trim()) return
    setIsSubmitting(true)

    logEvent("notification_signup", {
      meetupId: meetup?.id || "",
      category: meetup?.category || "",
      title: meetup?.title || "",
      kakaoId: kakaoId.trim(),
    })

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm border-border bg-card text-card-foreground">
        {!submitted ? (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-neon/10">
                <Rocket className="h-7 w-7 text-neon" />
              </div>
              <DialogTitle className="text-xl font-bold text-foreground">
                {"베타 테스트 모집 중!"}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                {"정식 출시 시 알림을 보내드릴게요 🚀"}
              </DialogDescription>
            </DialogHeader>

            {/* Meetup info */}
            {meetup && (
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="flex items-center gap-2 text-sm">
                  <span aria-hidden="true">{meetup.emoji}</span>
                  <span className="font-medium text-foreground">{meetup.title}</span>
                </div>
              </div>
            )}

            {/* Kakao ID input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="kakao-id" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <MessageCircle className="h-4 w-4 text-neon" />
                {"카카오톡 ID"}
              </label>
              <Input
                id="kakao-id"
                placeholder="카카오톡 ID를 입력해주세요"
                value={kakaoId}
                onChange={(e) => setKakaoId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground focus-visible:border-neon focus-visible:ring-neon/30"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!kakaoId.trim() || isSubmitting}
              className="w-full bg-neon text-primary-foreground font-bold hover:bg-neon/90 hover:shadow-neon transition-all disabled:opacity-50"
            >
              {isSubmitting ? "처리 중..." : "알림 신청"}
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon/10">
              <span className="text-3xl" aria-hidden="true">{"🎉"}</span>
            </div>
            <div>
              <h3 className="mb-1 text-lg font-bold text-foreground">{"신청 완료!"}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {"정식 출시 시 카카오톡으로 알려드릴게요."}
                <br />
                {"함께 뛰어볼 준비 되셨나요? 🏃‍♂️"}
              </p>
            </div>
            <Button
              onClick={() => handleOpenChange(false)}
              variant="outline"
              className="border-neon/30 text-neon hover:bg-neon/10 hover:text-neon"
            >
              {"확인"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
