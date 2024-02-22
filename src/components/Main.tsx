import React from "react";
import "./Main.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { NoteType } from "../App";

type MainProps = {
  selectedNoteId: number | null;
};

const Main: React.FC<MainProps> = ({ selectedNoteId }) => {
  const [note, setNote] = useState<NoteType | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      if (selectedNoteId !== null) {
        const { data } = await axios.get(
          `http://localhost:3000/content/${selectedNoteId}`
        );
        setNote(data);
      }
    };

    fetchNote();
  }, [selectedNoteId]);

  return (
    <main className="main">
      <article className="article">
        <div className="article__header">
          <h1 className="article__title">{note ? note.title : ""}</h1>
          <button className="article__btn btn">
            <img src="../public/edit.svg" alt="" />
            Edit
          </button>
        </div>
        <div className="article__body">
          <div className="article__content">
            <p className="article__text">{note ? note.body : ""}</p>
          </div>
          <button className="article__btn btn">
            <img src="../public/edit.svg" alt="" />
            Edit
          </button>
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
