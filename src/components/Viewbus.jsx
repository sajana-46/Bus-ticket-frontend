import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import{useEffect} from 'react'
import NavigationBar from './Navigationbar'



const Viewbus = () => {
    const[data,changeData]=useState([])


    const fetchData = () =>{
     axios.post("http://localhost:3000/view-bus").then(
        (res)=>{
            changeData(res.data)

        }
    ).catch()   


    }
    useEffect(()=>{
        fetchData()
    },[])
    
  return (
    <div>
        <NavigationBar/>
        
        <div className="container mt-4">
        <h2 className="text-center mb-4">View All Bus</h2>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Bus Number</th>
<th>Bus Name</th>
<th>Bus Type</th>
<th>Source</th>
<th>Destination</th>
<th>Departure Time</th>
<th>Arrival Time</th>
<th>Total Seats</th>
<th>Available Seats</th>
<th>Fare</th>
<th>Created At</th>
<th>Id</th>
            </tr>
          </thead>

          <tbody>
            {data.map(
                (value,index)=>{
                    return(
                         <tr>
                        <td>{value.busNumber}</td>
<td>{value.busName}</td>
<td>{value.busType}</td>
<td>{value.source}</td>
<td>{value.destination}</td>
<td>{value.departureTime}</td>
<td>{value.arrivalTime}</td>
<td>{value.totalSeats}</td>
<td>{value.availableSeats}</td>
<td>{value.fare}</td>
<td>{value.createdAt}</td>
<td>{value._id}</td>
                        </tr>
                    )
                }
            )
                
            }
           
             </tbody>
        </table>
      </div>

        


    </div>
  )
}

export default Viewbus