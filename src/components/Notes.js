import React, { useContext,useEffect,useRef,useState } from "react";
import Notecontext from "../context/notes/Notecontext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import {useNavigate} from 'react-router-dom';


const Notes = (props) => {
  const context = useContext(Notecontext);
  // eslint-disable-next-line
  const { notes, getNotes,editNote} = context;
  //console.log("token"+ localStorage.getItem("token"))
  //props.showAlert("welcome","success")
  let navigate = useNavigate();
  useEffect(()=>{
      if(!localStorage.getItem("token")){
          
          navigate("/login");
          
      }
      else {
        getNotes()
      }
  },[])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
 
  const updateNote = (currNote)=>{
    ref.current.click();
    setNote({id:currNote._id, etitle:currNote.title, edescription:currNote.description, etag: currNote.tag})
 }
 

  const clickHAndle = (e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag); 
     refClose.current.click();
     
   }
   const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
   }
  return (
    <>
      <AddNote />
      <div>
        
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
     
        <div className="modal fade" id="exampleModal"  tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
              <div className="container my-3">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="email"
            className="form-control"
            id="etitle"
            name="etitle"
            aria-describedby="emailHelp"
            onChange = {onChange}
            value = {note.etitle}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Descripton
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            onChange = {onChange}
            value = {note.edescription}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            onChange = {onChange}
            value = {note.etag}
          />
        </div>
        
      </form>
      </div>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button"  className="btn btn-primary"onClick = {clickHAndle}>update Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your note</h2>
        <div className="container">
            {notes.length===0&&"No Notes to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote = {updateNote} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
