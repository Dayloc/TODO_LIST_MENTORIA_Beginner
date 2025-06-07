import React, { useState, useEffect } from "react";
import {
  CrearUsuario,
  fetchUsuarios,
  EliminarUsuario,
} from "./services/fetchs";
import ListaTareas from "./ListaTareas";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [usuarioCreado, setUsuarioCreado] = useState("");

  const cargarUsuarios = async () => {
    const usuarios = await fetchUsuarios();
    if (usuarios) {
      setUsers(usuarios);
    } else {
      alert("Cargando usuarios...");
    }
  };

  const handleCreateUser = async () => {
    if (userName.trim() === "") return;
    await CrearUsuario(userName);
    setUserName("");
    setUsuarioCreado(userName);
    await cargarUsuarios();
  };

  const handleDelete = async (userName) => {
    await EliminarUsuario(userName);
    await cargarUsuarios();
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div className="contenedor">
      <h1 className="titulo">TODO_LIST</h1>
      <div className="fila">
        {/* Columna izquierda: Usuarios */}
        <div className="columna">
          <h2 className="titulo-columna">Usuarios</h2>
          <div className="crear-usuario">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input-usuario"
            />
            <button
              onClick={handleCreateUser}
              className="boton-crear"
              disabled={userName.trim() === ""}
            >
              Crear Usuario
            </button>
          </div>

          <h3 className="subtitulo">Lista de Usuarios</h3>
          <ul className="lista-usuarios">
            {users.map((usuario, index) => (
              <li
                key={index}
                className={`usuario-item ${
                  usuario.name === usuarioCreado ? "usuario-creado" : ""
                }`}
              >
                <span>{usuario.name}</span>
                <button
                  className="boton-eliminar"
                  onClick={() => handleDelete(usuario.name)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna derecha: Tareas */}
        <div className="columna">
          <h2 className="titulo-columna">Tareas</h2>
          <ListaTareas />
        </div>
      </div>
    </div>
  );
};

export default Home;
