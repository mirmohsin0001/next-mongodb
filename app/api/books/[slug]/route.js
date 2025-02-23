import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from 'next/server';
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
    // Get the mongoose.connection.db object from the database
    const db = await dbConnect();
    const { slug } = params;

    // Validate the ObjectId
    if (!ObjectId.isValid(slug)) {
        return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }
    // Convert the id slug into mongodb object id
    const id = ObjectId.createFromHexString(slug);

    // Fetch a single doc from the collection by _id
    const data = await db.collection('books').findOne({ _id: id });
    if (!data) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(data);
}

export async function DELETE(request, { params }) {
    const db = await dbConnect();
    const { slug } = params;
    if (!ObjectId.isValid(slug)) {
        return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }
    const id = ObjectId.createFromHexString(slug);

    const { deletedCount } = await db.collection('books').deleteOne({ _id: id });
    if (!deletedCount) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json({ message: `${deletedCount} book deleted successfully` }, { status: 200 });
}

export async function PATCH(request, { params }) {
    const db = await dbConnect();
    const { slug } = params;
    if (!ObjectId.isValid(slug)) {
        return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }
    const id = ObjectId.createFromHexString(slug);

    const updates = await request.json();
    const { modifiedCount } = await db.collection('books').updateOne({ _id: id }, { $set: updates });
    if (!modifiedCount) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json({ message: `${modifiedCount} book updated successfully` }, { status: 200 });
}