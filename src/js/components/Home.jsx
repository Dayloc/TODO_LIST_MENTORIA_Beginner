import React, { useState, useEffect } from "react";
import {
  CrearUsuario,
  fetchUsuarios,
  EliminarUsuario,
} from "../services/fetchs";
import ListaTareas from "./ListaTareas";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [usuarioCreado, setUsuarioCreado] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  // Cargar usuarios desde el backend
  const cargarUsuarios = async () => {
    const usuarios = await fetchUsuarios();
    if (usuarios) {
      setUsers(usuarios);
    } else {
      alert("Error al cargar usuarios.");
    }
  };

  // Crear un nuevo usuario
  const handleCreateUser = async () => {
    if (userName.trim() === "") return;
    await CrearUsuario(userName);
    setUserName("");
    setUsuarioCreado(userName);
    await cargarUsuarios();
  };

  // Eliminar un usuario
  const handleDelete = async (name) => {
    await EliminarUsuario(name);
    if (usuarioSeleccionado === name) {
      setUsuarioSeleccionado(""); // Limpiar selección si eliminamos al actual
    }
    await cargarUsuarios();
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div className="contenedor">
      <h1 className="titulo">TODO_LIST_FETCH</h1>

      <div className="fila">
        {/* Columna izquierda: Usuarios */}
        <div className="columna">
          <h2 className="titulo-columna">Usuarios</h2>

          {/* Crear usuario */}
          <div className="crear-usuario ">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input-usuario"
              onKeyDown={(e) => {
                if (e.key === "Enter" && userName.trim() !== "") {
                  handleCreateUser();
                }
              }}
            />
            <button
              onClick={handleCreateUser}
              className="boton-crear"
              disabled={userName.trim() === ""}
            >
              Crear Usuario
            </button>
          </div>

          {/* Lista de usuarios */}
          <h3 className="subtitulo">Lista de Usuarios</h3>
          <ul className="lista-usuarios">
            {users.map((usuario, index) => (
              <li
                key={index}
                className={`usuario-item ${
                  usuario.name === usuarioCreado ? "usuario-creado" : ""
                }`}
              >
                <div
                  className={`usuario-item ${
                    usuario.name === usuarioSeleccionado
                      ? "usuario-seleccionado"
                      : ""
                  }`}
                  type="button"
                  onClick={() => setUsuarioSeleccionado(usuario.name)}
                >
                  {usuario.name}
                </div>
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
          <h2 className="titulo-columna">Tareas de {usuarioSeleccionado}</h2>
          {usuarioSeleccionado ? (
            <ListaTareas user={usuarioSeleccionado} />
          ) : (
            <p>Selecciona un usuario para ver sus tareas</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
