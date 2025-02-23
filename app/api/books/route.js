import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from 'next/server'

export async function GET() {
    //get the mongoose.connection.db object from the database
    const db = await dbConnect();
    //fetch all docs from the books collection via the db object
    const data = await db.collection('books').find().toArray()
    return NextResponse.json(data);
}


export async function POST(request) {
    const book = await request.json()
    const db = await dbConnect();
    await db.collection('books').insertOne(book);
    return NextResponse.json({ message: 'Book added successfully' }, { status: 201 });
}

