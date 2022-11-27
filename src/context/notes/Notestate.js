import Notecontext from "./Notecontext";
import { useState } from "react";
const host = "http://localhost:5500"

const Notestate = (props)=>{
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)

      const getNotes = async ()=>{
          const response = await fetch(`${host}/api/notes/fetchallnotes`,{
              method: 'GET',
              headers: {
                  'content-type' :'application/json',
                  "auth-token": localStorage.getItem("token")
              }
          });
          const json = await response.json();
          console.log(json)
          setNotes(json)
      } 

      const addNote = async (title,description,tag)=>{
          console.log("adding new note")
          
          const response = await fetch(`${host}/api/notes/addnote`,{
              method: 'POST',
              headers: {
                  'content-type' :'application/json',
                  "auth-token": localStorage.getItem("token")
              },
              body: JSON.stringify({title,description,tag})
      
          });
           const Newnote = await response.json();
           setNotes(notes.concat(Newnote))
           props.showAlert("Note Added","success")
        
      }
      const deleteNote = async (id)=>{
          console.log("deleting a note");
          console.log("deleting note with id" + id)
          const response = await fetch(`${host}/api/notes/deletenotes/${id}`,{
            method: 'DELETE',
            headers: {
                'content-type' :'application/json',
                "auth-token": localStorage.getItem("token")
            }
        });
        const json =await response.json;
        console.log(json);
        
          const newNote = notes.filter((note)=>{return note._id!==id});
          setNotes(newNote);
          props.showAlert("Note Deleted","success")
      }
      const editNote = async (id,title,description,tag)=>{
        console.log("editting a note");
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: 'PUT',
            headers: {
                'content-type' :'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
            
        });
         const json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
         for (let index = 0; index < newNotes.length; index++) {
             const element = newNotes[index];
             if(element._id===id){
                newNotes[index].title = title;
                newNotes[index].description =description;
                newNotes[index].tag = tag;
                 break;
             }
             
         }
         setNotes(newNotes); 
         props.showAlert("Note Updated","success")
      }
return ( 

    <Notecontext.Provider value = {{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </Notecontext.Provider>
)
}
export default Notestate;