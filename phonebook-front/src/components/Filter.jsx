import React from "react"
const Filter = (props) => {
    return(  
      <form>
        <div>Filter names with <input value={props.newFilter} onChange = {props.handleNewFilter}/></div>
      </form>
    )
}
export default Filter