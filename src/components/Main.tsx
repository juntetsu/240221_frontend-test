import React from "react";
import "../css/Main.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { NoteType } from "../App";

type MainProps = {
  selectedNoteId: number | null;
  updateNote: (id: number, updatedNote: NoteType) => void;
};

const Main: React.FC<MainProps> = ({ selectedNoteId, updateNote }) => {
  const [note, setNote] = useState<NoteType | null>(null);
  const [titleEditMode, setTitleEditMode] = useState<boolean>(false);
  const [bodyEditMode, setBodyEditMode] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedBody, setEditedBody] = useState<string>("");

  useEffect(() => {
    const fetchNote = async () => {
      if (selectedNoteId !== null) {
        const { data } = await axios.get(
          `http://localhost:3000/content/${selectedNoteId}`
        );
        setNote(data);
        setEditedTitle(data.title);
        setEditedBody(data.body);
      }
    };

    fetchNote();
  }, [selectedNoteId]);

  const handleTitleEdit = () => {
    setTitleEditMode(true);
  };
  const handleBodyEdit = () => {
    setBodyEditMode(true);
  };

  const handleCancel = () => {
    setTitleEditMode(false);
    setBodyEditMode(false);

    // 編集中の内容を元に戻す
    if (note) {
      setEditedTitle(note.title);
      setEditedBody(note.body);
    }
  };

  const handleSave = () => {
    if (note && editedTitle && editedBody) {
      const updatedNote = {
        ...note,
        title: editedTitle,
        body: editedBody,
        updatedAt: new Date().toISOString(),
      };
      updateNote(updatedNote.id, updatedNote);
      setNote(updatedNote);
      setTitleEditMode(false);
      setBodyEditMode(false);
    }
  };

  return (
    <main className="main">
      <article className="article">
        <div className="article__header">
          {titleEditMode ? (
            <>
              <input
                type="text"
                className="article__title-input"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <div className="article__btn-wrapper">
                <button
                  className="article__btn cancel-btn"
                  onClick={handleCancel}
                >
                  <span></span>
                  Cancel
                </button>
                <button className="article__btn save-btn" onClick={handleSave}>
                  <img src="../public/save.svg" alt="" />
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="article__title">{note ? note.title : ""}</h1>
              <button className="article__btn btn" onClick={handleTitleEdit}>
                <img src="../public/edit.svg" alt="" />
                Edit
              </button>
            </>
          )}
        </div>
        <div className="article__body">
          {bodyEditMode ? (
            <>
              <textarea
                className="article__body-input"
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
              />
              <div className="article__btn-wrapper">
                <button
                  className="article__btn cancel-btn"
                  onClick={handleCancel}
                >
                  <span></span>
                  Cancel
                </button>
                <button className="article__btn save-btn" onClick={handleSave}>
                  <img src="../public/save.svg" alt="" />
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="article__content">
                <p className="article__text">{note ? note.body : ""}</p>
              </div>
              <button className="article__btn btn" onClick={handleBodyEdit}>
                <img src="../public/edit.svg" alt="" />
                Edit
              </button>
            </>
          )}
        </div>
      </article>
      <footer className="footer">
        <p className="footer__copy">Copyright © 2021 Sample</p>
        <p className="footer__company">運営会社</p>
      </footer>
    </main>
  );
};

export default Main;
