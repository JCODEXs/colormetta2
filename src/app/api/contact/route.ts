
import connectToDatabase from "lib/mongoDb";
import { NextResponse } from "next/server";

// Define an interface for the Contact structure

interface Contact  {
  email: string;
  name: string;
  message: string;
  phone: string;
};

export async function POST(req: Request) {
  // Define the response type
  const body: Contact = await req.json(); // Cast the body to the Contact type
  console.log("Received Contact:", body);

  const cached = await connectToDatabase();
  const db = cached.conn?.db; // Optional chaining to handle potential undefined

  // Check if db exists before attempting to insert
  if (!db) {
    return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
  }

  // Insert the Contact into the "colormetta" collection
  const result = await db.collection("colormetta").insertOne(body);

  return NextResponse.json({ result });
}
