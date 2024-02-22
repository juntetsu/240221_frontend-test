import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        <h1 className="sidebar__logo">
          <img src="./public/logo.svg" alt="" />
          ServiceName
        </h1>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <h2 className="sidebar__title">こころ</h2>
            <button className="sidebar__item-delete-btn">
              <img src="../public/delete.svg" alt="" />
            </button>
          </li>
          <li className="sidebar__item active">
            <h2 className="sidebar__title">我輩は猫である</h2>
            <button className="sidebar__item-delete-btn">
              <img src="../public/delete.svg" alt="" />
            </button>
          </li>
          <li className="sidebar__item">
            <h2 className="sidebar__title">坊ちゃん</h2>
            <button className="sidebar__item-delete-btn">
              <img src="../public/delete.svg" alt="" />
            </button>
          </li>
          <li className="sidebar__item">
            <h2 className="sidebar__title">学問のすゝめ</h2>
            <button className="sidebar__item-delete-btn">
              <img src="../public/delete.svg" alt="" />
            </button>
          </li>
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
