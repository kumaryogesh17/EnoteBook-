import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import React from 'react'

export const About = () => {
    const a = useContext(noteContext)
    return (
        <div>
            <h1>This is about Components and Hello {a.name}</h1>
        </div>
    )
}
