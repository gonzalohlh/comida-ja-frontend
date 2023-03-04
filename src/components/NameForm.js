const NameForm = ({
  createName,
  name,
  handleInputChange,
  isEditing,
  updateName,
}) => {
  return (
    <form className="task-form" onSubmit={isEditing ? updateName : createName}>
      <input
        type="text"
        placeholder="Agregar Nombre"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <button type="submit">{isEditing ? "Editar" : "Agregar"}</button>
    </form>
  );
};

export default NameForm;
