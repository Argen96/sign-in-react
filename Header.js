import React, {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './style.css'

function Header() {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error,setError ] = useState(null)
    const navigate = useNavigate()
    
    function onChangeUsername(e){
        setUsername( e.target.value )
    }
    
    function onChangePassword(e){
        setPassword( e.target.value )
    }
    
    async function onSubmit(e){
        e.preventDefault()
        const values = { username,password }
        const response = await fetch('http://localhost:4000/api/sign-up', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(values)
        })
        const data = await response.json();
      
        if ( typeof data === 'object' ) {
        navigate('/LogIn')
       } else {
        setError ( data )
       }
   }
    return (
     <div>
        <form onSubmit = { onSubmit }>
            <input onChange = { onChangeUsername } type = {'text'} id='username' name='username'></input>
            <input onChange ={ onChangePassword } type={'password'} id='passowrd' name='password'></input>
            <input type={'submit'} id='submit' className="submit" value='Register'></input>
            {error ? <h3>Password should contain more than 8 characters</h3>:null }
        </form>
     </div>
    )
}

export default Header