import { useState } from "react";
import DocumentList from "./pages/DocumentList";
import DocumentEditor from "./pages/DocumentEditor";

const App = () => {
  const [currentDocumentId, setCurrentDocumentId] = useState(null);

  return (
    <div>
      {currentDocumentId ? (
        <DocumentEditor
          documentId={currentDocumentId}
          onBack={() => setCurrentDocumentId(null)}
        />
      ) : (
        <DocumentList onOpenDocument={setCurrentDocumentId} />
      )}
    </div>
  );
};

export default App;