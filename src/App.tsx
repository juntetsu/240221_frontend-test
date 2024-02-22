import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

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

  const addNote = async () => {
    const newNote = {
      title: "タイトル",
      body: "コンテンツ",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 新しいnoteを追加
    const res = await axios.post("http://localhost:3000/content", newNote);
    const addedNote = res.data;

    setNotes((prevNotes) => [addedNote, ...prevNotes]);

    // 新しく作成されたノートを選択状態に（ハイライト）
    setSelectedNoteId(addedNote.id);
  };

  return (
    <div className="container">
      <Sidebar
        notes={notes}
        setSelectedNoteId={setSelectedNoteId}
        deleteNote={deleteNote}
        addNote={addNote}
      />
      <Main selectedNoteId={selectedNoteId} />
    </div>
  );
}

export default App;
