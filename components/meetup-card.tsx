"use client"

import { MapPin, Clock, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Meetup } from "@/lib/meetup-data"
import { logEvent } from "@/lib/analytics"

interface MeetupCardProps {
  meetup: Meetup
  onJoinClick: (meetup: Meetup) => void
}

export function MeetupCard({ meetup, onJoinClick }: MeetupCardProps) {
  const fillPercent = (meetup.currentMembers / meetup.maxMembers) * 100
  const isAlmostFull = fillPercent >= 75

  const handleJoin = () => {
    logEvent("join_click", {
      meetupId: meetup.id,
      category: meetup.category,
      title: meetup.title,
    })
    onJoinClick(meetup)
  }

  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:border-neon/30 hover:shadow-[0_0_15px_rgba(57,255,20,0.08)]">
      {/* Category badge */}
      <div className="mb-3 flex items-center justify-between">
        <Badge
          variant="secondary"
          className="bg-neon/10 text-neon border-neon/20"
        >
          <span aria-hidden="true">{meetup.emoji}</span>
          {meetup.category}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{meetup.timeLabel}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-1.5 text-base font-bold leading-snug text-foreground text-balance">
        {meetup.title}
      </h3>

      {/* Description */}
      {meetup.description && (
        <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
          {meetup.description}
        </p>
      )}

      {/* Tags */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {meetup.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
          >
            {"#"}{tag}
          </span>
        ))}
      </div>

      {/* Location */}
      <div className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5 text-neon" />
        <span>{meetup.location}</span>
      </div>

      {/* Progress bar + join button */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-foreground">
              <Users className="h-3 w-3" />
              <span className="font-semibold">
                {meetup.currentMembers}/{meetup.maxMembers}
              </span>
            </div>
            {isAlmostFull && (
              <span className="text-[10px] font-bold text-neon animate-pulse">
                {"마감 임박!"}
              </span>
            )}
          </div>
          {/* Custom progress bar */}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={meetup.currentMembers} aria-valuemin={0} aria-valuemax={meetup.maxMembers}>
            <div
              className="h-full rounded-full bg-neon transition-all duration-500"
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>
        <Button
          onClick={handleJoin}
          size="sm"
          className="shrink-0 bg-neon text-primary-foreground font-bold hover:bg-neon/90 hover:shadow-neon transition-all"
        >
          {"참여 신청"}
        </Button>
      </div>
    </article>
  )
}
