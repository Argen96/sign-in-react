import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

function LogIn(){
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
        const response = await fetch('http://localhost:4000/api/sign-in', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(values)
        })
        const data = await response.json();
       
        if ( typeof data === 'object' ) {
        const user_id = data.id
        localStorage.setItem('data',user_id)
        navigate('/Trips')
       } else {
        setError(data)
       }
   }
   return(
    <div>
        <form onSubmit = { onSubmit }>
            <input onChange = { onChangeUsername } type = {'text'} id ='username' name ='username'></input>
            <input onChange = {onChangePassword} type = {'password'} id ='passowrd' name ='password'></input>
            <input type = { 'submit' } id = 'submit' className='submit' value='Log In'></input>
            {error ? <h1>Invalid username and password</h1>:null }
        </form>
     </div>
   )
}

export default LogIn