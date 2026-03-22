import { useEffect, useRef } from "react";
import useDocument from "../hooks/useDocument";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const DocumentEditor = ({ documentId, onBack }) => {
  const {
    content,
    title,
    loading,
    handleContentChange,
    handleTitleChange,
  } = useDocument(documentId);

  const editorRef = useRef(null);

  // Sync content to editor div
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerText !== content) {
      editorRef.current.innerText = content;
    }
  }, [content]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4f9] flex items-center justify-center">
        <p className="text-gray-400">Loading document...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f9] flex flex-col">
      {/* Toolbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Back
        </Button>

        <div className="w-px h-5 bg-gray-200" />

        {/* Document Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="text-lg font-medium text-gray-800 bg-transparent border-none outline-none flex-1 min-w-0"
          placeholder="Untitled Document"
        />

        <Badge variant="outline" className="text-green-600 border-green-300 text-xs">
          ● Live
        </Badge>
      </header>

      {/* Editor Area */}
      <main className="flex-1 flex justify-center px-6 py-10">
        <div className="w-full max-w-3xl">
          {/* Paper */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[calc(100vh-180px)] p-16">
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleContentChange(e.currentTarget.innerText)}
              className="outline-none text-gray-800 text-base leading-relaxed min-h-full w-full"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "1rem",
                lineHeight: "1.8",
                whiteSpace: "pre-wrap",
              }}
              data-placeholder="Start typing your document..."
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentEditor;