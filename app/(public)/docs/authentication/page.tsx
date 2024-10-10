"use client";

import CodeBlock from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { SiClerk } from "react-icons/si";

const folderStructure = `
(auth)
├── sign-in
│   ├── [[...sign-in]]
│   │   ├── page.tsx
├── sign-up
│   ├── [[...sign-up]]
│   │   ├── page.tsx`;

const Authentication = () => {
  return (
    <div className="w-full space-y-4 mb-32">
      <h1 className="text-black dark:text-white text-2xl font-bold">
        <SiClerk className="inline-block mr-2 text-primary" /> Authentication
      </h1>
      <p className="text-black dark:text-white">
        BoilerNext uses Clerk to authenticate users. Clerk provides a secure and
        easy-to-use authentication system for your application. It also provides
        a variety of features such as email verification, passwordless login,
        and more.
      </p>
      <Separator className="my-4" />
      <h2 className="text-lg font-semibold text-black dark:text-white">
        Create a{" "}
        <a
          target="_blank"
          href="https://clerk.com"
          rel="noopener noreferrer"
          className="underline text-primary"
        >
          Clerk
        </a>{" "}
        account and get your API keys and also a webhook secret
      </h2>
      <CodeBlock
        text={`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-publishable-key>
CLERK_SECRET_KEY=<your-secret-key>
CLERK_WEBHOOK_SECRET=<your-webhook-secret>`}
        title={".env"}
      />
      <h2 className="text-lg font-semibold text-black dark:text-white mt-4">
        Folder Structure
      </h2>
      <CodeBlock text={folderStructure} title="/app/(auth)" />
      <p className="text-black dark:text-white">
        The sign-in and sign-up pages are located in the auth folder. You can
        customize the pages as you want.
      </p>
      <h2 className="text-lg font-semibold text-black dark:text-white mt-4">
        Redirection
      </h2>
      <CodeBlock
        text={`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
          NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
          `}
        title={".env"}
      />
      <p className="text-black dark:text-white">
        You can customize the redirection after sign-in and sign-up by editing
        the routes in .env file
      </p>
    </div>
  );
};

export default Authentication;
