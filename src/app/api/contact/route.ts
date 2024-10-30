import connectToDatabase from "lib/mongoDb";
import { NextResponse } from "next/server";
import { z } from "zod";


// Define a Zod schema based on the Contact structure
const ContactSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  message: z.string().min(1),
  phone: z.string().optional(),
});

export async function POST(req: Request) {
  // Parse the incoming JSON body with the Zod schema
  const body = await req.json();

  // Validate against the schema
  const validation = ContactSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: "Invalid input format" }, { status: 400 });
  }

  console.log("Received Contact:", validation.data);

  const cached = await connectToDatabase();
  const db = cached.conn?.db; // Optional chaining to handle potential undefined

  if (!db) {
    return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
  }

  // Insert the validated Contact into the "colormetta" collection
  const result = await db.collection("colormetta").insertOne(validation.data);

  return NextResponse.json({ result });
}

