import { useState, useEffect } from "react";
import { getDocuments, createDocument, deleteDocument } from "../services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const DocumentList = ({ onOpenDocument }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const fetchDocuments = async () => {
    try {
      const docs = await getDocuments();
      setDocuments(docs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const doc = await createDocument("Untitled Document");
      setDocuments((prev) => [doc, ...prev]);
      onOpenDocument(doc.id);
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#f0f4f9]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">D</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-800">CollabDocs</h1>
        </div>
        <Button onClick={handleCreate} disabled={creating}>
          {creating ? "Creating..." : "+ New Document"}
        </Button>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Recent Documents
        </h2>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading documents...</p>
        ) : documents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No documents yet</p>
            <Button onClick={handleCreate}>Create your first document</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => onOpenDocument(doc.id)}
                className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow group"
              >
                {/* Document Preview */}
                <div className="w-full h-32 bg-gray-50 rounded border border-gray-100 mb-3 flex items-start p-3">
                  <div className="space-y-1.5 w-full">
                    <div className="h-2 bg-gray-200 rounded w-3/4" />
                    <div className="h-2 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-200 rounded w-2/3" />
                    <div className="h-2 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>

                <h3 className="text-sm font-medium text-gray-800 truncate">
                  {doc.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(doc.updated_at)}
                </p>

                <button
                  onClick={(e) => handleDelete(e, doc.id)}
                  className="mt-2 text-xs text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DocumentList;