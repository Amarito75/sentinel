import React from "react";
import CodeBlock from "../../../components/ui/code-block";

const DocsPage = () => {
  const documentationCode = [
    {
      title: "Installation",
      code: `git clone https://github.com/Amarito75/nextjs-boilerplate.git
cd nextjs-boilerplate
npm install`,
      fileTitle: "terminal",
      language: "bash",
    },
    {
      title: "Run the development server",
      code: "npm run dev",
      fileTitle: "terminal",
      language: "bash",
    },
    {
      title: "Rename the .env.example file to .env",
      code: "mv .env.example .env",
      fileTitle: "terminal",
    },
    {
      title: "Add your api keys in the .env file",
      code: `DATABASE_URL="postgresql://<YOUR_DATABASE_URL>"
DIRECT_URL="postgresql://<YOUR_DATABASE_URL>"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<YOUR_CLERK_SECRET_KEY>
CLERK_WEBHOOK_SECRET=<YOUR_CLERK_WEBHOOK_SECRET>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
RESEND_API_KEY=<YOUR_RESEND_API_KEY>`,
      fileTitle: ".env.local",
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Hello, welcome to BoilerNext 👋
      </h1>
      <p className="text-black dark:text-white">
        Here is the documentation for BoilerNext. You need Node JS, Git and npm
        installed on your computer.
      </p>
      {documentationCode.map((doc, index) => (
        <div key={index}>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-black dark:text-white">
            {doc.title}
          </h2>
          <CodeBlock
            text={doc.code}
            title={doc.fileTitle}
            language={doc.language}
          />
        </div>
      ))}
      <h2 className="text-xl font-semibold mt-6 mb-32 text-black dark:text-white">
        Open{" "}
        <code className="bg-card p-1 rounded-md">http://localhost:3000</code> in
        your browser to see the result.
      </h2>
    </div>
  );
};

export default DocsPage;
