import { useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./Components/Main/Main";
import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
  // set states to be used in both main and sidebar
  const [journal, setJournal] = useState([]);
const [activeNote, setActiveNote] = useState(false)

  // function to serve on click adding note to the side bar
  const addNote = () => {
    // object to house all new entry
    const newJournal = {
      id: uuid(),
      title: "untitled",
      body: "",
      lastModified: Date.now(),
    };

    // putting new entry with objects in the journal array
    setJournal([newJournal, ...journal]);
    console.log("I just made a new journal entry");
  };

  // to handle entry in selected journal entry 
  const update = (updatedEntry)=>{

    const updatedJournal = journal.map((entry)=>{
      if (entry.id === activeNote){
        return updatedEntry
      }

      return entry
    })

    setJournal(updatedJournal)
  };

  // handles deleting a journal entry
  const deleteEntry = (idToDelete) => {
    setJournal(journal.filter((entry) => entry.id !== idToDelete));
  };


  // to select the journal entry you're currently working on 
const getActiveNote = () => {

  return journal.find((entry)=> entry.id === activeNote);

}

  
return (
    <div className="App">
      <Sidebar
        journal={journal}
        addNote={addNote}
        deleteEntry={deleteEntry}
        activeNote ={activeNote}
        setActiveNote ={setActiveNote}
      
      />

      <Main activeNote = {getActiveNote()}  update={update}/>
    </div>
  );
}

export default App;
