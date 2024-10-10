import CodeBlock from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { SiSupabase } from "react-icons/si";

const Database = () => {
  return (
    <div className="w-full space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
        <SiSupabase className="inline-block mr-2 text-primary" /> Database
      </h1>
      <p className="text-black dark:text-white">
        BoilerNext uses Supabase as the database. Supabase is a modern and
        powerful database platform that provides a secure and scalable solution
        for your application.
      </p>
      <Separator className="my-4" />
      <h1 className="text-xl font-semibold text-black dark:text-white">
        Create a new application on{" "}
        <a
          href="https://supabase.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          Supabase
        </a>{" "}
        and type connect to connect the database to your application.
      </h1>
      <h2 className="text-lg font-semibold text-black dark:text-white">
        1. Get your database URL & direct URL and add them to your .env file in
        ORM
        {">"}Prisma
      </h2>
      <CodeBlock
        text={`DATABASE_URL="postgresql://user:password@host:6543/database?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/database"`}
        title={".env"}
      />
      <p className="text-black dark:text-white italic">
        The database URL is used for the connection to the database. The direct
        URL is used for the connection to the database without the proxy.
      </p>
      <h2 className="text-lg font-semibold text-black dark:text-white">
        2. Configure schema with Prisma
      </h2>
      <p className="text-black dark:text-white">
        In the schema.prisma file you can create tables, models, etc.
      </p>
      <CodeBlock
        text={`model User {
  id      String   @id @default(uuid())
  userId  String   @unique
  email   String   @unique
  firstName    String?
  lastName    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}
        title={"schema.prisma"}
      />
      <p className="text-black dark:text-white italic">
        See the{" "}
        <a
          href="https://www.prisma.io/docs/concepts/components/prisma-schema"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          Prisma documentation
        </a>{" "}
        for more information about the schema.prisma
      </p>
    </div>
  );
};

export default Database;
