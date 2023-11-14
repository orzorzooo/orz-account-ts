import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { users, db, createUsers } from "@/lib/db/users";

// export async function GET(request: Request) {
//   try {
//     const result = await db.select().from(users);
//     console.log("Results", result);
//     return NextResponse.json({ result }, { status: 200 });
//   } catch (error) {
//     // console.log(error);
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

export async function GET(request: Request) {
  try {
    const result = await createUsers({ name: "test", email: "bb2@gmail.com", password: "bb" });
    console.log("Results", result);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
