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
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  useEffect(() => {
    const getNotes = async () => {
      const res = await axios.get("http://localhost:3000/content");
      // 取得したノートをupdatedAtで降順にソート
      const sortedNotes = res.data.sort(
        (a: NoteType, b: NoteType) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setNotes(sortedNotes);

      // 初期状態では最新のノートを選択状態に
      if (sortedNotes.length > 0) {
        setSelectedNoteId(sortedNotes[0].id);
      }
    };

    getNotes();
  }, []);

  const deleteNote = async (id: number) => {
    // サーバーから記事を削除するAPIを呼び出す場合
    await axios.delete(`http://localhost:3000/content/${id}`);

    // 削除後の記事リストを更新
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);

    // 削除された記事が選択されていた場合、選択を解除または更新
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
  };

  return (
    <div className="container">
      <Sidebar notes={notes} setSelectedNoteId={setSelectedNoteId} deleteNote={deleteNote} />
      <Main selectedNoteId={selectedNoteId} />
    </div>
  );
}

export default App;
