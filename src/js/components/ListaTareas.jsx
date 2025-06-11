import React, { useState, useEffect } from "react";
import { CrearTarea, GetTareas, EliminarTarea } from "../services/fetchs";
//import { usuario } from "../services/fetchs";

const ListaTareas = ({ user }) => {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  const obtenerTareas = async () => {
    if (user) {
      const respuesta = await GetTareas(user);
      if (respuesta?.todos && Array.isArray(respuesta.todos)) {
        setTareas(respuesta.todos);
      } else {
        setTareas([]);
      }
    }
  };

  const agregarTarea = async () => {
    if (tarea.trim() === "") return;

    await CrearTarea(tarea, user);
    setTarea("");
    await obtenerTareas(); // refresca después de crear
  };

  const handleDeleteTarea = async (id) => {
    await EliminarTarea(id);
    await obtenerTareas(); // refresca después de eliminar
  };

  useEffect(() => {
    obtenerTareas(); // ← se ejecuta cuando cambia el usuario
  }, [user]);

  return (
    <>
      <div className="crear-tarea">
        <input
          type="text"
          placeholder="Escribe una tarea"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
          className="input-usuario"
          onKeyDown={(e) => {
            if (e.key === "Enter" && tarea.trim() !== "") {
              agregarTarea();
            }
          }}
        />
        <button
          className="boton-crear mx-2"
          disabled={tarea.trim() === ""}
          onClick={agregarTarea}
        >
          Agregar
        </button>
      </div>

      <h3 className="subtitulo mt-5">Lista de Tareas</h3>
      <ul className="lista-usuarios">
        {tareas.map((t, index) => (
          <li key={t.id ?? index} className="usuario-item">
            <span>{t.label}</span>
            <button
              className="boton-eliminar"
              onClick={() => handleDeleteTarea(t.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListaTareas;
