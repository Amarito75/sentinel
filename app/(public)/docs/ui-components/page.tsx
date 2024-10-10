import CodeBlock from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { SiShadcnui } from "react-icons/si";

const UiComponents = () => {
  return (
    <div className="flex flex-col gap-4 w-full mb-32">
      <h1 className="text-2xl text-black dark:text-white font-bold flex items-center gap-2">
        <SiShadcnui className="text-primary mr-2" />
        UI Components
      </h1>
      <p className="text-black dark:text-white">
        BoilerNext uses Shadcnui for the UI components. You can find the
        documentation{" "}
        <a
          href="https://ui.shadcn.com/docs"
          target="_blank"
          className="text-primary underline"
        >
          here
        </a>
      </p>
      <Separator className="my-2" />
      <p className="text-black dark:text-white">
        You need to master Tailwind CSS to use Shadcnui. You can find the
        documentation{" "}
        <a
          href="https://tailwindcss.com/docs"
          target="_blank"
          className="text-primary underline"
        >
          here
        </a>
      </p>
      <CodeBlock
        text={`npx shadcn@latest add <component-name>`}
        title={"terminal"}
        language="bash"
      />
      <p className="text-black dark:text-white">
        You can add any component to your project by running the command above &
        this will be added to{" "}
        <code className="px-1 py-0.5 bg-muted rounded-md">/components/ui/</code>{" "}
        folder.
      </p>
      <h3 className="text-lg font-semibold text-black dark:text-white">
        Magic UI
      </h3>
      <p className="text-black dark:text-white">
        Magic UI is a component library that is built on top of Shadcnui. You
        can find the documentation{" "}
        <a
          href="https://magicui.design/docs"
          target="_blank"
          className="text-primary underline"
        >
          here
        </a>
        .
      </p>
      <p className="text-black dark:text-white">
        It also uses Framer Motion for animations. You can find the
        documentation{" "}
        <a
          href="https://www.framer.com/motion/"
          target="_blank"
          className="text-primary underline"
        >
          here
        </a>
        .
      </p>
    </div>
  );
};

export default UiComponents;
