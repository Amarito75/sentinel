import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CodeBlock from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import { CircleAlert } from "lucide-react";
import React from "react";
import { SiResend } from "react-icons/si";

const Emailing = () => {
  return (
    <div className="w-full space-y-4 mb-32">
      <h1 className="text-black dark:text-white text-2xl font-bold">
        <SiResend className="inline-block mr-2 text-primary" /> Emailing
      </h1>
      <p className="text-black dark:text-white">
        BoilerNext uses Resend to send emails. Resend provides a secure and
        easy-to-use email system for your application. It also provides a
        variety of features such as email verification, passwordless login, and
        more.
      </p>
      <Separator className="my-4" />
      <h2 className="text-lg font-semibold text-black dark:text-white">
        Create a{" "}
        <a
          target="_blank"
          href="https://resend.com"
          rel="noopener noreferrer"
          className="underline text-primary"
        >
          Resend
        </a>{" "}
        account and get your API keys
      </h2>
      <Alert className="bg-yellow-600/75 border-yellow-950 text-white">
        <CircleAlert className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You need to have a custom domain to use this feature.
        </AlertDescription>
      </Alert>
      <h3 className="text-lg font-semibold text-black dark:text-white">
        1. Get your domain verified & insert your api key in .env file & also
        your custom email
      </h3>
      <CodeBlock
        text={`RESEND_API_KEY=re_your_resend_api_key_here
RESEND_CUSTOM_EMAIL=your_custom_email@example.com`}
        title={".env"}
      />
      <Separator className="my-4" />
      <h3 className="text-lg font-semibold text-black dark:text-white">
        2. Customize your email template with{" "}
        <a
          target="_blank"
          href="https://react.email"
          rel="noopener noreferrer"
          className="underline text-primary"
        >
          React Email
        </a>
      </h3>
      <p className="text-black dark:text-white">
        BoilerNext uses React Email to send emails. You can customize the
        template in{" "}
        <code className="bg-muted rounded-md px-1 py-0.5">
          /components/email-templates
        </code>
      </p>
      <CodeBlock
        text={`import * as React from "react";


interface EmailTemplateProps {
  email: string;
  message: string;
}


export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  message,
}) => (
  <div>
    <p className="text-lg font-bold text-red-500">Your email is {email}</p>
    <p className="text-lg font-bold">Your message is {message}</p>
  </div>
);
`}
        title={"/components/email-templates/basic-mail.tsx"}
      />
      <h3 className="text-xl text-black dark:text-white font-semibold">
        3. In{" "}
        <code className="bg-muted rounded-md px-1 py-0.5">
          /app/(private)/api/email/send
        </code>{" "}
        you change your email
      </h3>
      <p className="text-black dark:text-white">
        Here is a simple route to send an email with the React Email template
        and if success it will save the email in the database.
      </p>
      <CodeBlock
        text={`import { NextResponse } from "next/server";
import { EmailTemplate } from "../../../components/email-templates/basic-mail";
import { Resend } from "resend";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

const resend = new Resend(process.env.RESEND_API_KEY);
const customEmail = process.env.RESEND_CUSTOM_EMAIL || "";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { mail, subject, message } = body;
    const { data, error } = await resend.emails.send({
      from: customEmail,
      to: [mail],
      subject: subject,
      react: EmailTemplate({
        email: mail,
        message: message,
      }),
    });
    console.log(data);
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    const email = await prismadb.email.create({
      data: {
        email: mail,
        subject: subject,
        message: message,
        user: {
          connect: {
            userId: userId,
          },
        },
      },
    });

    return NextResponse.json(
      { success: "true", resend: data, db: email },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
`}
        title={"/app/(private)/api/sendEmail"}
      />
    </div>
  );
};

export default Emailing;
