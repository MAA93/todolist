// import { useState } from "react";
// import Checkbox from "./Checkbox";

// export default function Task({name , done, onToggle,onDelete,onRename}) {
//     const[editMode,setEditMode] = useState(false)
//     return(
//         <div className={'task ' +(done?'done':'')}>
        
//          <Checkbox checked={done} onClick={() => onToggle(!done)} />
//           {!editMode && (
//           <div className="task-name"onClick={() => setEditMode(prev => !prev)}>
//              <span>{name}</span>
//             </div>
//          )}
     
//          {editMode && (
//             <form onSubmit={ev =>{ev.preventDefault(); setEditMode(false)} }>
//                 <input type="text" value={name}
//                  onChange={ev =>onRename(ev.target.value) }/>
//             </form>
//          )}
//          <button className="remove" onClick={onDelete}>
//          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM152 232H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
//          </button>

        
//       </div>
//     )
// }

import React, { useState } from "react";
import Checkbox from "./Checkbox";

export default function Task({ name, done, onToggle, onDelete, onRename }) {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleRename = (ev) => {
    const value = ev.target.value;
    setNewName(value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    // Check if the new task name is non-empty
    if (newName.trim() === "") {
      return; // Do not submit if the name is empty
    }

    // Call the onRename callback with the new name
    onRename(newName);

    // Exit edit mode and reset the input field
    setEditMode(false);
    setNewName(name);
  };

  return (
    <div className={"task " + (done ? "done" : "")}>
      <Checkbox checked={done} onClick={() => onToggle(!done)} />

      {!editMode && (
        <div className="task-name" onClick={() => setEditMode(!editMode)}>
          <span>{name}</span>
        </div>
      )}

      {editMode && (
        <form onSubmit={handleSubmit}>
          <input type="text" value={newName} onChange={handleRename} />
          <button type="submit" disabled={newName.trim() === ""}>
            Add
          </button>
        </form>
      )}

      <button className="remove" onClick={onDelete}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM152 232H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
        </svg>
      </button>
    </div>
  );
}