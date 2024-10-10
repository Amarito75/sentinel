import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  console.log("Webhook received");

  try {
    const payload = await req.text();
    const headers = Object.fromEntries(req.headers);

    console.log("Payload:", payload);
    console.log("Headers:", headers);

    if (!webhookSecret) {
      console.error("CLERK_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Verify the webhook
    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(payload, headers) as WebhookEvent;
      console.log("Event verified:", JSON.stringify(evt, null, 2));
    } catch (err) {
      console.error("Verification error:", err);
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 400 }
      );
    }

    // Process the webhook
    switch (evt.type) {
      case "user.created":
      case "user.updated":
        console.log(`Processing ${evt.type} event for user ${evt.data.id}`);
        console.log("User data:", JSON.stringify(evt.data, null, 2));
        try {
          const user = await prismadb.user.upsert({
            where: { userId: evt.data.id },
            create: {
              userId: evt.data.id,
              email: evt.data.email_addresses[0]?.email_address || "",
              firstName: evt.data.first_name || null,
              lastName: evt.data.last_name || null,
            },
            update: {
              email: evt.data.email_addresses[0]?.email_address || "",
              firstName: evt.data.first_name || null,
              lastName: evt.data.last_name || null,
            },
          });
          console.log("Upserted user:", JSON.stringify(user, null, 2));
        } catch (error) {
          console.error(`Error upserting user ${evt.data.id}:`, error);
          return NextResponse.json(
            { message: "Error processing user data" },
            { status: 500 }
          );
        }
        break;
      case "user.deleted":
        console.log(`Processing user.deleted event for user ${evt.data.id}`);
        try {
          await prismadb.user.delete({ where: { userId: evt.data.id } });
          console.log(`User ${evt.data.id} deleted from Supabase`);
        } catch (error) {
          console.error(
            `Error deleting user ${evt.data.id} from Supabase:`,
            error
          );
          return NextResponse.json(
            { message: "Error deleting user" },
            { status: 500 }
          );
        }
        break;
      default:
        console.log(`Unhandled event type: ${evt.type}`);
    }

    console.log("Webhook processed successfully");
    return NextResponse.json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Unexpected error processing webhook:", error);
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
