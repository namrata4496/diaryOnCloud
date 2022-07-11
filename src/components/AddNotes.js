import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';






const AddNotes = () => {

  const context = useContext(noteContext);
  const { addNote} = context;

  const [note, setNote] = useState({title: "", description:"", tag: "default"})

  const click = (e)=>{
    e.preventDefault()
    addNote(note.title,note.description,note.tag);
  }

  const onchange = (e)=>{
     setNote({...note, [e.target.name]:e.target.value})
  }


  return (
    <div className='container'>
      <h1>Add Note</h1>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange}/>
  </div>
  <div className="mb-3">
  <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" onChange={onchange}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={click}>Add Note</button>
</form>
    </div>
  )
}

export default AddNotes
