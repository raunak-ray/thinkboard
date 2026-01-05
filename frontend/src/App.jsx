import { Route, Routes } from "react-router";
import { CreateNotePage, HomePage, NoteDetailPage } from "./pages/index.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNotePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;

//
