import React from 'react'
import noteContext from './noteContext'
import { useState } from 'react'

function NoteState(props) {
  const host = "http://localhost:5000"


  const initialNotes = []
  const [notes, setnotes] = useState(initialNotes)

  // Get all Notes Function

  const getNotes = async () => {

    // Api calls for get all notes ---- 

    const response = await fetch(` ${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDg2NGU5NzM0ZGFiZDRhZGIyNjAyIn0sImlhdCI6MTYzMDgzMjIwNn0.8URAw1pFYwTgz8I1DAeRhLpXHF2YPXMNrbvYFRSPFD0"

      },

    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  }


  // Add a Note Function()

  const addNote = async (title, description, tag) => {

    // Api calls for add notes ---- 

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDg2NGU5NzM0ZGFiZDRhZGIyNjAyIn0sImlhdCI6MTYzMDgzMjIwNn0.8URAw1pFYwTgz8I1DAeRhLpXHF2YPXMNrbvYFRSPFD0"

      },

      body: JSON.stringify({title, description, tag})
    });

    const json = await response.json();
    console.log(json);

    console.log("Adding a new note")
    
    setnotes(notes.concat(json))
  }


  // Delete Note Function 
  const deleteNote = async (id) => {

    // Delete Api call Here --- 

    const response = await fetch(` ${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDg2NGU5NzM0ZGFiZDRhZGIyNjAyIn0sImlhdCI6MTYzMDgzMjIwNn0.8URAw1pFYwTgz8I1DAeRhLpXHF2YPXMNrbvYFRSPFD0"

      }

    });
    const json = await response.json();
    console.log(json);


    console.log("Deleting note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes);
  }




  // Edit Note 
  const editNote = async (id, title, description, tag) => {

    // api calls here

    const response = await fetch(` ${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDg2NGU5NzM0ZGFiZDRhZGIyNjAyIn0sImlhdCI6MTYzMDgzMjIwNn0.8URAw1pFYwTgz8I1DAeRhLpXHF2YPXMNrbvYFRSPFD0"

      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({title, description, tag})
    });

    // logic for editing notes in broweser side (client side)
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
    const json = response.json()
    console.log(json)

  }
  return (
    <noteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
