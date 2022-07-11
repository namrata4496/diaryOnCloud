import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
  const host = "http://localhost:5000";
   
    const notesinitial=[];
      const [notes,setNotes] = useState(notesinitial);


      const addNote = async(title,description,tag) =>{
  
        const response = await fetch(`http://localhost:5000/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
       const it = await response.json();
       setNotes(notes.concat(it))
      
     
          
    }

    const getNotes = async ()=>{
       const response = await fetch(`http://localhost:5000/notes/fetchallnotes`,{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        
       })
       
       const json = await response.json()
       setNotes(json)
    }

    const deleteNote = async (id)=>{
      const response = await fetch(`http://localhost:5000/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        
       })
       const newNotes = notes.filter((note)=>note._id!==id);
       setNotes(newNotes);

    }


    const editNote =async(id, title, description, tag)=>{

         const response = await fetch(`${host}/notes/updatenotes/${id}`,{method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body:JSON.stringify(title,description,tag)
        });
      

        for(let index = 0;index<notes.length; index++){
          const element = notes[index];
          if(element._id === id){
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
        }
    }
    
    


    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;