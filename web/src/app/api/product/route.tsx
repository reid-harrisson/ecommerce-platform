import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch from external API here, server-side
    const response = await fetch("http://localhost:8000/product", {
      headers: {
        "Content-Type": "application/json",
        // Add any required API keys or auth headers
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
