import React from "react";
import "./Sidebar.css";
import { noteType } from "../App";
import {useState} from "react";

const Sidebar = ({ notes }: { notes: noteType[] }) => {
  const [selectedNote, setSelectedNote] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setSelectedNote(id)
  }
  
  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        <h1 className="sidebar__logo">
          <img src="./public/logo.svg" alt="" />
          ServiceName
        </h1>
        <ul className="sidebar__list">
          {notes.map((note) => (
            <li className={`sidebar__item ${selectedNote === note.id ? "active" : ""}`} key={note.id} onClick={() => handleClick(note.id)}>
              <h2 className="sidebar__title">{note.title}</h2>
              <button className="sidebar__item-delete-btn">
                <img src="../public/delete.svg" alt="" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar__btn-list">
        <button className="sidebar__btn btn">
          <img src="../public/edit.svg" alt="" />
          Edit
        </button>
        <button className="sidebar__btn btn">
          <img src="../public/edit.svg" alt="" />
          Edit
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
