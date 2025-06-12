import React from "react";
import ListaTareas from "./ListaTareas";

const VistaTareas = ({ usuarioCreado }) => {
  return (
    <div className="columna">
      <h2 className="titulo-columna">Tareas de {usuarioCreado}</h2>
      <ListaTareas user={usuarioCreado} />
    </div>
  );
};

export default VistaTareas;
