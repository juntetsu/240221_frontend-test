import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import axios from "axios";

export type NoteType = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      const res = await axios.get("http://localhost:3000/content");
      // 取得したノートをupdatedAtで降順にソート
      const sortedNotes = res.data.sort(
        (a: NoteType, b: NoteType) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setNotes(sortedNotes);
    };
    getNotes();
  }, []);

  return (
    <div className="container">
      <Sidebar notes={notes} />
      <Main />
    </div>
  );
}

export default App;
