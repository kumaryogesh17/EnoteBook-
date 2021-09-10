import React, { useContext,useState  } from 'react'
import noteContext from '../context/notes/noteContext'

function AddNote() {
    const context = useContext(noteContext)
    const {addNote } = context;
    const [note, setnote] = useState({title:" ",  description:" ", tag:""})
    
    
    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        
    }

    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className="container my-3">
                <h1>ADD NOTES</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onchange}/>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Save Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
