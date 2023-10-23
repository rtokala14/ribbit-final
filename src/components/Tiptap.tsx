"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
// import FileHandler from "@tiptap-pro/extension-file-handler";
import Toolbar from "./Toolbar";
import { FormDescription } from "./ui/form";

export default function Tiptap({
  description,
  onChange,
  editor,
}: {
  description: string;
  onChange: (richText: string) => void;
  editor: Editor;
}) {
  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <Toolbar editor={editor} />
      <EditorContent className=" mb-2" editor={editor} />

      <FormDescription>
        {editor?.storage.characterCount.characters()}/{350} characters
        <br />
        {editor?.storage.characterCount.words()} words
      </FormDescription>
    </div>
  );
}
