import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

export default function DisplayNotes() {


  const navigate = useNavigate();
  const context = useContext(noteContext);
  const {notes,getNotes} = context;

  useEffect(()=>{
    if(localStorage.getItem('token'))
    getNotes();
    else{
      navigate('login');
    }
  },[])

  return (
    <div className='container'>
       <h1>Your Notes</h1>
       <div className="row">
       {notes.map((note)=>{
        return <Noteitem key={note._id} note={note}/>
       })}
       </div>
    </div>
  )
}
