"use client"

import { useState, useEffect, useMemo } from "react"
import { PnuHeader } from "@/components/pnu-header"
import { CategoryTabs } from "@/components/category-tabs"
import { MeetupCard } from "@/components/meetup-card"
import { JoinDialog } from "@/components/join-dialog"
import { FeedbackForm } from "@/components/feedback-form"
import { meetups, type Category, type Meetup } from "@/lib/meetup-data"
import { logEvent } from "@/lib/analytics"
import { Zap, TrendingUp } from "lucide-react"

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("전체")
  const [selectedMeetup, setSelectedMeetup] = useState<Meetup | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    logEvent("page_view", { page: "home" })
  }, [])

  const isFeedbackTab = activeCategory === "요청사항"

  const filteredMeetups = useMemo(() => {
    if (activeCategory === "전체") return meetups
    if (activeCategory === "요청사항") return []
    return meetups.filter((m) => m.category === activeCategory)
  }, [activeCategory])

  const handleJoinClick = (meetup: Meetup) => {
    setSelectedMeetup(meetup)
    setDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <PnuHeader />
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="mx-auto max-w-lg px-4 pb-24 pt-4">
        {isFeedbackTab ? (
          <FeedbackForm />
        ) : (
          <>
            {/* Stats banner */}
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-neon/20 bg-neon/5 p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon/10">
                <TrendingUp className="h-5 w-5 text-neon" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {"지금 "}
                  <span className="text-neon">{meetups.length}</span>
                  {"개의 번개가 진행 중!"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {"오늘 부산대 주변에서 만나요"}
                </p>
              </div>
            </div>

            {/* Meetup list */}
            <div className="flex flex-col gap-3">
              {filteredMeetups.map((meetup) => (
                <MeetupCard
                  key={meetup.id}
                  meetup={meetup}
                  onJoinClick={handleJoinClick}
                />
              ))}
            </div>

            {/* Empty state */}
            {filteredMeetups.length === 0 && (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <Zap className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-foreground">
                    {"아직 번개가 없어요"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {"이 카테고리의 첫 번개를 만들어보세요!"}
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <footer className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {"PNU 벼락 Beta v0.1"}
          </p>
          <p className="mt-1 text-[10px] text-muted-foreground/60">
            {"부산대학교 학생들을 위한 실시간 번개 매칭 서비스"}
          </p>
        </footer>
      </main>

      <JoinDialog
        meetup={selectedMeetup}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
