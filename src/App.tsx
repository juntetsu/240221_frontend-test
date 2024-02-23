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
    const fetchNotes = async () => {
      try {
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
      } catch (error) {
        console.error("エラーが発生しました", error);
      }
    };

    fetchNotes();
  }, []);

  // 削除機能
  const deleteNote = async (id: number) => {
    try {
      // サーバーから記事を削除するAPIを呼び出す場合
      await axios.delete(`http://localhost:3000/content/${id}`);

      // 削除後の記事リストを更新
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);

      // 削除された記事が選択されていた場合、選択を解除または更新
      if (selectedNoteId === id) {
        if (updatedNotes.length > 0) {
          setSelectedNoteId(updatedNotes[0].id);
        } else {
          setSelectedNoteId(null);
        }
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  // 追加機能
  const addNote = async () => {
    try {
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
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  // 編集機能
  const updateNote = async (id: number, updatedNote: NoteType) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/content/${id}`,
        updatedNote
      );
      const updatedNoteData = res.data;

      // ①ノートが更新対象の場合、更新後のデータに置き換える
      // ②ノートが更新対象でない場合、そのままのデータを使う
      // ③最後にupdatedAtで降順にソート
      // ④更新されたノートを選択状態にする
      const updatedNotes = notes
        .map((note) => (note.id === id ? updatedNoteData : note))
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

      setNotes(updatedNotes);
      setSelectedNoteId(updatedNoteData.id);
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  return (
    <div className="container">
      <Sidebar
        notes={notes}
        setSelectedNoteId={setSelectedNoteId}
        deleteNote={deleteNote}
        addNote={addNote}
      />
      <Main selectedNoteId={selectedNoteId} updateNote={updateNote} />
    </div>
  );
}

export default App;
