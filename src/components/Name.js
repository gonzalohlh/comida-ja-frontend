import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

const Name = ({ name, index, deleteName, getSingleName, setToComplete }) => {
  return (
    <div className={name.completed ? "task completed" : "task"}>
      <p>
        <b>{index + 1}. </b>
        {name.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" onClick={() => setToComplete(name)} />
        <FaEdit color="purple" onClick={() => getSingleName(name)} />
        <FaRegTrashAlt
          color="red"
          onClick={() => {
            deleteName(name._id);
          }}
        />
      </div>
    </div>
  );
};

export default Name;
