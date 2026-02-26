import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase.from("feedback").insert({
      message: message.trim(),
    })

    if (error) {
      console.error("[API] feedback insert error:", error.message)
      return NextResponse.json({ error: "Failed to save" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[API] feedback error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
