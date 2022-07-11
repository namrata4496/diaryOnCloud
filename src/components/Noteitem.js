import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export default function Noteitem(props) {
    const {note} = props;

    const context = useContext(noteContext);
    const {deleteNote, editNote} = context;
   // console.log(note);


    const click = ()=>{
       deleteNote(note._id);
    }

    const click2 = ()=>{
      editNote(note._id);
   }


  return (
    <div className='col-md-4'>
      <div className="card" style= {{width: "18rem"}}>
     <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <button  className="btn btn-primary" onClick={click2}>Edit</button>
    <button className="btn btn-danger mx-3" onClick={click}>Delete</button>
  </div>
</div>
    </div>
  )
}
