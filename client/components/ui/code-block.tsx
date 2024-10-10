import CopyButton from "@/components/ui/copy-button";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  text: string;
  title: string;
  language?: string;
}

const CodeBlock = ({
  text,
  title,
  language = "typescript",
}: CodeBlockProps) => {
  return (
    <div className="flex flex-col items-start justify-between border border-border rounded-md bg-card w-full">
      <div className="flex items-center justify-between w-full border-b border-border px-3 py-1">
        <code className="text-sm text-black dark:text-white">{title}</code>
        <CopyButton text={text} />
      </div>
      <div className="w-full overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers
          wrapLines
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
          }}
          codeTagProps={{
            style: {
              fontFamily: "inherit",
              fontSize: "inherit",
            },
          }}
          lineNumberStyle={{
            color: "#6e7681", // Couleur grise pour les numéros de ligne
            paddingRight: "1em",
            userSelect: "none",
          }}
        >
          {text}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
