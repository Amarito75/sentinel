import CodeBlock from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const Webhooks = () => {
  return (
    <div className="w-full">
      <h1 className="text-black dark:text-white text-2xl font-bold">
        Webhooks
      </h1>
      <p className="text-black dark:text-white">
        Webhooks are a way for your application to receive updates about events
        that happen in your application.
      </p>
      <Separator className="my-4" />
      <Tabs defaultValue="clerk">
        <TabsList>
          <TabsTrigger value="clerk">Clerk</TabsTrigger>
          <TabsTrigger value="stripe">Stripe</TabsTrigger>
        </TabsList>
        <TabsContent value={"clerk"}>
          <p className="text-black dark:text-white mb-4 text-lg">
            First install{" "}
            <a
              href="https://ngrok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary"
            >
              Ngrok
            </a>{" "}
            to create a tunnel to your local server (follow the instructions on
            the website).
          </p>
          <div className="space-y-4">
            <p className="text-black dark:text-white">
              Start your local server
            </p>
            <CodeBlock text={"npm run dev"} title={"terminal"} />
            <p className="text-black dark:text-white">
              Start Ngrok to create a tunnel to your local server
            </p>
            <CodeBlock text={"ngrok http 3000"} title={"terminal"} />
            <p className="text-black dark:text-white">
              Copy the forwarded URL and add it to your webhook in the Clerk
              dashboard
            </p>
            <CodeBlock
              text={"https://<ngrok-url>/api/webhooks/clerk"}
              title={"ngrok"}
            />
            <p className="text-black dark:text-white">
              Then all the users registered in Clerk will be added to the
              database
            </p>
            <p className="text-black dark:text-white italic">
              You can test events in the webhook section in the Clerk dashboard
            </p>
          </div>
        </TabsContent>
        <TabsContent value={"stripe"}>
          <p className="text-black dark:text-white mb-4 text-lg">
            First install{" "}
            <a
              href="https://ngrok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary"
            >
              Ngrok
            </a>{" "}
            to create a tunnel to your local server (follow the instructions on
            the website).
          </p>
          <div className="space-y-4">
            <p className="text-black dark:text-white">
              Start your local server
            </p>
            <CodeBlock text={"npm run dev"} title={"terminal"} />
            <p className="text-black dark:text-white">
              Start Ngrok to create a tunnel to your local server
            </p>
            <CodeBlock text={"ngrok http 3000"} title={"terminal"} />
            <p className="text-black dark:text-white">
              Copy the forwarded URL and add it to your webhook in the Stripe
              dashboard
            </p>
            <CodeBlock
              text={"https://<ngrok-url>/api/webhooks/stripe"}
              title={"ngrok"}
            />
            <p className="text-black dark:text-white">
              Then all the users registered in Stripe will be added to the
              database
            </p>
            <p className="text-black dark:text-white italic">
              You can test events in the webhook section in the Stripe dashboard
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Webhooks;
