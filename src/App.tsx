import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import axios from "axios";

export type noteType = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

function App() {
  const [notes, setNotes] = useState<noteType[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      const res = await axios.get("http://localhost:3000/content");
      setNotes(res.data);
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
