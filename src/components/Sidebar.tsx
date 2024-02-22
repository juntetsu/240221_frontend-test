import React from "react";
import "./Sidebar.css";
import { NoteType } from "../App";
import { useState, useEffect } from "react";

const Sidebar = ({ notes }: { notes: NoteType[] }) => {
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
    setSelectedNote(id);
  };

  // 編集モードの切り替え
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        <h1 className="sidebar__logo">
          <img src="./public/logo.svg" alt="" />
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
                <button className="sidebar__item-delete-btn">
                  <img src="../public/delete.svg" alt="" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar__btn-list">
        {editMode && (
          <button className="sidebar__btn btn add sidebar__add-btn">
            <img src="../public/+.svg" alt="" />
            New Page
          </button>
        )}
        {editMode ? (
          <button
            className="sidebar__btn btn done sidebar__add-btn"
            onClick={toggleEditMode}
          >
            <img src="../public/done.svg" alt="" />
            Done
          </button>
        ) : (
          <button
            className="sidebar__btn btn sidebar__edit-btn"
            onClick={toggleEditMode}
          >
            <img src="../public/edit.svg" alt="" />
            Edit
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
