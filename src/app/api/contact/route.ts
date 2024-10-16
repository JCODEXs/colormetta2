import connectToDatabase from "../../../../lib/mongoDb.js"
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  console.log("Received recipe:", body);

  const cached = await connectToDatabase();
  const db = cached.conn.db;

  // Insert the recipe into the "therecipes" collection
  const result = await db.collection("colormetta").insertOne(body);
  
  return NextResponse.json({ result });
}