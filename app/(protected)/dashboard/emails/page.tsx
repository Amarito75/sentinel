import { getEmails } from "@/actions/getEmails";
import { EmailForm } from "./components/email-form";
import React, { useEffect } from "react";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { EmailList } from "./components/email-list";
import { Separator } from "@/components/ui/separator";

const EmailsPage = async () => {
  const { userId } = auth();
  if (!userId) throw new Error("User not authenticated");

  const emails = await getEmails(userId);
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col items-start w-[90%]">
        <h1 className="text-2xl font-bold ml-4 mb-8">Recent mails sent</h1>
        {emails.map((item, index) => (
          <div className="flex flex-col items-start w-full">
            <EmailList
              key={index}
              mail={item.email}
              date={item.createdAt.toString()}
              subject={item.subject}
              message={item.message}
            />
          </div>
        ))}
      </div>
      <Separator orientation="vertical" className="h-full" />
      <div className="flex flex-col items-start w-[90%]">
        <h1 className="text-2xl font-bold">Send an email</h1>
        <EmailForm />
      </div>
    </div>
  );
};

export default EmailsPage;
