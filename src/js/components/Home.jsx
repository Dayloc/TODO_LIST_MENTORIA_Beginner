import React, { useState, useEffect } from "react";
import {
  CrearUsuario,
  fetchUsuarios,
  EliminarUsuario,
} from "../services/fetchs";
import ListaUsuarios from "./ListaDeUsuarios";
import VistaTareas from "./VistaTareas";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [usuarioCreado, setUsuarioCreado] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  const cargarUsuarios = async () => {
    const usuarios = await fetchUsuarios();
    if (usuarios) {
      setUsers(usuarios);
    } else {
      alert("Error al cargar usuarios.");
    }
  };

  const handleCreateUser = async () => {
    if (userName.trim() === "") return;

    if (users.some((user) => user.name === userName)) {
      alert("El usuario ya existe.");
      return;
    }

    await CrearUsuario(userName);
    setUserName("");
    setUsuarioCreado(userName);
    setUsuarioSeleccionado(userName);
    await cargarUsuarios();
  };

  const handleDelete = async (name) => {
    await EliminarUsuario(name);
    if (usuarioSeleccionado === name) setUsuarioSeleccionado("");
    if (usuarioCreado === name) setUsuarioCreado("");
    await cargarUsuarios();
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div className="contenedor">
      <h1 className="titulo">TODO_LIST_FETCH</h1>
      <div className="fila">
        {usuarioCreado ? (
          <VistaTareas usuarioCreado={usuarioCreado} />
        ) : (
          <ListaUsuarios
            users={users}
            userName={userName}
            setUserName={setUserName}
            usuarioSeleccionado={usuarioSeleccionado}
            setUsuarioSeleccionado={setUsuarioSeleccionado}
            handleCreateUser={handleCreateUser}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
