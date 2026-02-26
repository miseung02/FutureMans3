import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const table = searchParams.get("table")

  if (table !== "signups" && table !== "feedback") {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 })
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[API] export error:", error.message)
      return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return new Response("No data", { status: 200, headers: { "Content-Type": "text/plain" } })
    }

    const headers = Object.keys(data[0])
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((h) => {
            const val = String(row[h] ?? "")
            return `"${val.replace(/"/g, '""')}"`
          })
          .join(",")
      ),
    ]

    return new Response(csvRows.join("\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${table}_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    })
  } catch (err) {
    console.error("[API] export error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
