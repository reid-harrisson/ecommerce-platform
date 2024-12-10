import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

// GET /api/cart
export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access");
    console.log(`Bearer ${accessToken?.value}`);
    const response = await fetch(`${process.env.BACKEND_API_URL}/cart/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "failed to get carts" }, { status: 500 });
  }
}

// POST /api/cart
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access");
    const body = await request.json();
    const response = await fetch(`${process.env.BACKEND_API_URL}/cart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "failed to create cart" },
      { status: 500 }
    );
  }
}
