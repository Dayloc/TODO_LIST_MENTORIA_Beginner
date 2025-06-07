import React, { useState } from "react";

const ListaTareas = () => {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  const agregarTarea = () => {
    if (tarea.trim() === "") return;
    setTareas([...tareas, tarea]);
    setTarea("");
  };

  return (
    <>
      <div className="crear-tarea">
        <input
          type="text"
          placeholder="Escribe una tarea"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
          className="input-usuario"
        />
        <button
          className="boton-crear"
          disabled={tarea.trim() === ""}
          onClick={agregarTarea}
        >
          Agregar
        </button>
      </div>

      <h3 className="subtitulo mt-5">Lista de Tareas</h3>
      <ul className="lista-usuarios">
        {tareas.map((t, index) => (
          <li key={index} className="usuario-item">
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListaTareas;
