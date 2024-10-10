import React from "react";
import CodeBlock from "@/components/ui/code-block";

const ProjectStructure = () => {
  const code = `
app
├── components
│   ├── ui
│   │   ├── input.tsx
│   │   └── button.tsx
│   └── page.tsx
`;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Project Structure
      </h1>
      <CodeBlock text={code} title="Project Structure" />
    </div>
  );
};

export default ProjectStructure;
