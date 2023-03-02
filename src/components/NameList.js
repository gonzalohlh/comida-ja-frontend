import NameForm from "./NameForm";
import Name from "./Name";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";
import loadingImg from "../assets/loader.gif";

const NameList = () => {
  const [names, setNames] = useState([]);
  const [completedNames, setCompletedNames] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [nameId, setNameId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getNames = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/names`);
      setNames(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNames();
  }, []);

  const createName = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Este campo no puede quedar vacio");
    }
    try {
      await axios.post(`${URL}/api/names`, formData);
      toast.success("Nombre agregado!");
      setFormData({ ...formData, name: "" });
      getNames();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteName = async (id) => {
    try {
      await axios.delete(`${URL}/api/names/${id}`);
      getNames();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const cName = names.filter((name) => {
      return name.completed === true;
    });
    setCompletedNames(cName);
  }, [names]);

  const getSingleName = async (name) => {
    setFormData({ name: name.name, completed: false });
    setNameId(name._id);
    setIsEditing(true);
  };

  const updateName = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Este campo no puede quedar vacio");
    }
    try {
      await axios.put(`${URL}/api/names/${nameId}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getNames();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setToComplete = async (name) => {
    const newFormData = {
      name: name.name,
      completed: true,
    };
    try {
      await axios.put(`${URL}/api/names/${name._id}`, newFormData);
      getNames();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2>Comida - JA</h2>
      <NameForm
        name={name}
        handleInputChange={handleInputChange}
        createName={createName}
        isEditing={isEditing}
        updateName={updateName}
      />
      {names.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Cantidad Nombres:</b> {names.length}
          </p>
          <p>
            <b>Entregados:</b> {completedNames.length}
          </p>
        </div>
      )}

      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="Cargando" />
        </div>
      )}
      {!isLoading && names.length === 0 ? (
        <p className="--py">No hay nombres, agregar un Nombre</p>
      ) : (
        <>
          {names.map((name, index) => {
            return (
              <Name
                key={name._id}
                name={name}
                index={index}
                deleteName={deleteName}
                getSingleName={getSingleName}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default NameList;
