import React, {useState}  from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import './trips.css'

function Trips(){
    const [ destination, setDestination ] = useState('')
    const [ date, setDate ] = useState('')
    const [ days, setDays]  = useState('')
    const [ trips,setTrips ] = useState('')
    const navigate = useNavigate()

    function updateDestination(e) {
        setDestination( e.target.value )
    }
    
    function updateDate(e) {
        setDate( e.target.value ) 
    }
    
    function updateDays(e) {
        setDays( e.target.value )
    }

    function goToLogOut() {
        window.localStorage.clear();
        navigate('/LogIn')
    }
    
    async function onSubmit() {
        const userId = localStorage.getItem ( 'data' )
        const values = { destination,date,days }
        const response = await fetch(`http://localhost:4000/api/trips/${userId}`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify( values )
        })
        const data = await response.json();
    }
    React.useEffect(() => {
               async function onClick(e){
               await fetch(`http://localhost:4000/api/trips/${e.target.dataset.number }`, {
               method: 'DELETE'
            })
          }

             function onUpdate(e){
             localStorage.setItem( 'id',e.target.dataset.number )
             console.log( e.target.dataset.number )
             navigate('/Update')
        }
        
            async function TripsCreated () {
            const userId = localStorage.getItem ( 'data' )
            const response = await fetch (`http://localhost:4000/api/trips/${userId}`)
            const data = await response.json();
            const tripsAll = data.map( ( data,i ) => {
             return(  <div key = {i}>
            <span>{ data.destination }</span> <span>{ data.date }</span> <span>{ data.days }</span> <button onClick={ onUpdate } data-number = {`${data.id}`} >Update</button> <button onClick={ onClick } data-number = {`${data.id}`}>Delete</button>
            </div> )
         })
    
         setTrips ( tripsAll )
        }
        TripsCreated ()
      },[])
   
   
    return(
        <div>
            <h1>Create Trips</h1>
            <form onSubmit = { onSubmit }>
                <input onChange ={ updateDestination } type={'text'} name ='destination' placeholder="destination"></input>
                <input onChange ={ updateDate } type={'date'} name ='date' placeholder="date"></input>
                <input onChange = {updateDays } type={'text'} name ='days' placeholder="days"></input>
                <input type ={'submit'} value ='Add Date'></input>
            </form>
            <div className="tripsCreated">
             <h1>Trips Created</h1>
             <span>Destination</span> <span>Date</span> <span>Days</span> 
             {trips}
          </div>
          <button onClick={ goToLogOut } className='logOut'>Log Out</button>
        </div>
       
    )
}

export default Trips