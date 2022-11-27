import React,{useContext} from 'react'
import Notecontext from '../context/notes/Notecontext'


export const About = () => {
    const a = useContext(Notecontext);
    return (
        <div>
            this is {a.name};
        </div>
    )
}
