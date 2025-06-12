import React from "react";

const ListaDeUsuarios = ({
  users,
  userName,
  setUserName,
  usuarioSeleccionado,
  setUsuarioSeleccionado,
  handleCreateUser,
  handleDelete,
}) => {
  return (
    <div className="columna">
      <h2 className="titulo-columna">Usuarios</h2>

      {/* Crear usuario */}
      <div className="crear-usuario">
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

      <h3 className="subtitulo">Lista de Usuarios</h3>
      <ul className="lista-usuarios">
        {users.map((usuario, index) => (
          <li
            key={index}
            className={`usuario-item ${
              usuario.name === usuarioSeleccionado ? "usuario-seleccionado" : ""
            }`}
          >
            <div
              className="usuario-nombre"
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
  );
};

export default ListaDeUsuarios;
