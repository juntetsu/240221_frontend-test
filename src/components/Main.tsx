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
  const [titleError, setTitleError] = useState<boolean>(false);
  const [bodyError, setBodyError] = useState<boolean>(false);

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
      setTitleError(false);
      setBodyError(false);
    }

    // タイトルが空の場合
    if (!editedTitle) {
      setTitleError(true);
    }

    // 本文が空の場合
    if (!editedBody) {
      setBodyError(true);
    }
  };

  return (
    <main className="main">
      {selectedNoteId === null ? (
        <div className="no-notes">ノートはありません</div>
      ) : (
        <article className="article">
          <div className={`article__header ${titleEditMode ? "" : "flex"}`}>
            {titleEditMode ? (
              <>
                <div className="article__title-input-wrapper">
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
                    <button
                      className="article__btn save-btn"
                      onClick={handleSave}
                    >
                      <img src="./save.svg" alt="" />
                      Save
                    </button>
                  </div>
                </div>
                {titleError && (
                  <div className="error-message">
                    タイトルを入力してください。
                  </div>
                )}
              </>
            ) : (
              <>
                <h1 className="article__title">{note ? note.title : ""}</h1>
                <button className="article__btn btn" onClick={handleTitleEdit}>
                  <img src="./edit.svg" alt="" />
                  Edit
                </button>
              </>
            )}
          </div>
          <div className={`article__body ${bodyError ? "error" : ""}`}>
            <div className="article__body-inner">
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
                    <button
                      className="article__btn save-btn"
                      onClick={handleSave}
                    >
                      <img src="./save.svg" alt="" />
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
                    <img src="./edit.svg" alt="" />
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        </article>
      )}
      <footer className="footer">
        <p className="footer__copy">Copyright © 2021 Sample</p>
        <p className="footer__company">運営会社</p>
      </footer>
    </main>
  );
};

export default Main;
