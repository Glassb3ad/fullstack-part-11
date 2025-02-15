import React from "react";

const AddNewName = (props) => {
    return(
      <form onSubmit={props.addNewName}>
      <div>
        name: <input value={props.newName} onChange = {props.handleNewName} />
      </div>
      <br/>
      <div>number: <input value={props.newNumber} onChange = {props.handleNewNumber}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
}
export default AddNewName