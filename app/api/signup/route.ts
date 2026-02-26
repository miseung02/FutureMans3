import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { kakao_id, meetup_id, meetup_title, meetup_category } = body

    if (!kakao_id || !meetup_id || !meetup_title || !meetup_category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase.from("signups").insert({
      kakao_id,
      meetup_id,
      meetup_title,
      meetup_category,
    })

    if (error) {
      console.error("[API] signup insert error:", error.message)
      return NextResponse.json({ error: "Failed to save" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[API] signup error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
