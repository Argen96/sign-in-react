import React,{useState} from "react";
import { Navigate, useNavigate } from 'react-router-dom'

function Update(){
    const [ destination, setDestination ] = useState('');
    const [ date, setDate ] = useState('');
    const [ days, setDays ] = useState('');
    const navigate = useNavigate()
    
    function updateDestination(e){
        setDestination( e.target.value );
    
    }
    function updateDate(e){
        setDate( e.target.value );
    
    }
    function updateDays(e){
        setDays( e.target.value );
   
    }
    async function  onSubmit(e) {
        e.preventDefault()
        const id_user =  localStorage.getItem('data');
        const id_trip = localStorage.getItem('id');
        const values = { id_user,id_trip, destination, date, days }
        const response = await fetch(`http://localhost:4000/api/trips/${id_trip}`, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(values)
        })
    
        const data = await response.json();
        navigate('/Trips')
    }
    
    return (
    <div>
    <h1>Update the trips that you have selected</h1>
    <form onSubmit = { onSubmit }>
        <input onChange = { updateDestination } type={'text'} name='destination' placeholder="destination"></input>
        <input onChange = { updateDate } type={'date'} name='date' placeholder="date"></input>
        <input onChange = { updateDays } type={'text'} name='days' placeholder="days"></input>
        <input type = { 'submit' } value = 'Update'></input>
    </form>
    </div>
  )
}

export default Update;