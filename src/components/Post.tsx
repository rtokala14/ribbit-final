"use client";

import { extensionList } from "@/lib/utils";
import { generateHTML } from "@tiptap/react";

export default function Post({ content }: { content: JSON }) {
  if (typeof window !== "undefined") {
    const renderData = generateHTML(content, extensionList);
  }
  return (
    <>
      {typeof window !== "undefined" ? (
        <div
          dangerouslySetInnerHTML={{
            __html: generateHTML(content, extensionList),
          }}
        >
          {/* hi */}
        </div>
      ) : (
        <div>Hi</div>
      )}
    </>
  );
  //   return <div>hi</div>;
}
