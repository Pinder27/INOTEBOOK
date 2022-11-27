import React, { useContext ,useState} from "react";
import Notecontext from "../context/notes/Notecontext";

const AddNote = () => {
    const context = useContext(Notecontext);
  
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"",tag:""})

   const clickHAndle = (e)=>{
       e.preventDefault();
         addNote(note.title,note.description,note.tag)
         setNote({title:"", description:"", tag:""})
    }
    const onChange = (e)=>{
         setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className = "mt-1">
            <h2>Add a note</h2>
      <div className="container my-3">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="email"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value = {note.title}
            onChange = {onChange}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Descripton
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange = {onChange}
            value = {note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value = {note.tag}
            onChange = {onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick = {clickHAndle}>
          Add Note
        </button>
      </form>
      </div>
        </div>
    )
}

export default AddNote
