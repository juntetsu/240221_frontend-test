import React from "react";
import "../css/Sidebar.css";
import { NoteType } from "../App";
import { useState, useEffect } from "react";

type SidebarProps = {
  notes: NoteType[];
  setSelectedNoteId: (id: number) => void;
  deleteNote: (id: number) => void;
  addNote: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  notes,
  setSelectedNoteId,
  deleteNote,
  addNote,
}) => {
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  // 初期状態では最新のノートを選択状態にする
  useEffect(() => {
    if (notes.length > 0) {
      setSelectedNote(notes[0].id);
    }
  }, [notes]);

  // タイトルをクリック時のハイライト処理
  const handleClick = (id: number) => {
    console.log(id);
    setSelectedNote(id);
    setSelectedNoteId(id);
  };

  // 編集モードの切り替え
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  // 削除
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation(); // イベントの伝播を停止
    deleteNote(id);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        <h1 className="sidebar__logo">
          <img src="./logo.svg" alt="" />
          ServiceName
        </h1>
        <ul className="sidebar__list">
          {notes.map((note) => (
            <li
              className={`sidebar__item ${
                selectedNote === note.id ? "active" : ""
              }`}
              key={note.id}
              onClick={() => handleClick(note.id)}
            >
              <h2 className="sidebar__title">{note.title}</h2>
              {editMode && (
                <button
                  className="sidebar__item-delete-btn"
                  onClick={(e) => handleDelete(e, note.id)}
                >
                  <img src="./delete.svg" alt="" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar__btn-list">
        {editMode && (
          <button
            className="sidebar__btn btn add sidebar__add-btn"
            onClick={addNote}
          >
            <img src="./+.svg" alt="" />
            New Page
          </button>
        )}
        {editMode ? (
          <button
            className="sidebar__btn btn done sidebar__add-btn"
            onClick={toggleEditMode}
          >
            <img src="./done.svg" alt="" />
            Done
          </button>
        ) : (
          <button
            className="sidebar__btn btn sidebar__edit-btn"
            onClick={toggleEditMode}
          >
            <img src="./edit.svg" alt="" />
            Edit
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
