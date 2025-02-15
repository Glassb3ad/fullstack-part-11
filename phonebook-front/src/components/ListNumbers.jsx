import React from "react"
const ListNumbers = (props) => {
    return(
      <ul>
        {props.filteredPersons.map((a,i) => 
        <li key={i} >
          {a.name} {a.number} <button onClick ={() => props.deleteName(a)}>delete</button> 
        </li>) }
      </ul>
    )
  }

export default ListNumbers