import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () =>{
    try {
        await ConnectDB();
    } catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Database connection failed");
    }
};

export async function POST(request) {
    await LoadDB();
    try {
        const formData = await request.formData();
        const emailData = {
            email: formData.get('email'),
        };
        
        if (!emailData.email) {
            return NextResponse.json({ success: false, msg: "Email is required" });
        }

        await EmailModel.create(emailData);
        return NextResponse.json({ success: true, msg: "Email Subscribed" });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ success: false, msg: "Internal server error" });
    }
}

export async function GET(request) {
    const emails = await EmailModel.find({});
    return NextResponse.json({emails});
}
