
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NotesState';
import Login from './components/Login';
//import DisplayNotes from './components/DisplayNotes';
//import AddNotes from './components/AddNotes';
import Page from './components/Page';
import Register from './components/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div >
      <NoteState>
        <Router>
      <Navbar></Navbar>
    
     {/*<AddNotes></AddNotes>
     <DisplayNotes></DisplayNotes>*/}
    <Routes>
    < Route exact path="/" element={<About/>}/>
     < Route exact path="/login" element={<Login/>}/>
     < Route exact path="/register" element={<Register/>}/>
     < Route exact path="/add" element={  <Page/>}/>
     
      </Routes>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
