import React ,{useState} from 'react'
import {useLazyQuery } from '@apollo/client'
import { GET_WEATHER_QUERY } from '../graphql/queries'

function Home() {
 
  const [city, setCity] = useState("")
  const [getWeather, {loading,data, error}] = useLazyQuery(GET_WEATHER_QUERY, {

    variables: { name: city}
  })
  
  if(error) return <h1>Something Went Wrong</h1>

  if (data){

    console.log(data);

  }

  return (
    <div className='home'>
        <h1>Search your city and get weather</h1>
        <input type="text" placeholder="City Name" onChange={(e)=> {setCity(e.target.value)}}/>
        <button onClick={()=> getWeather()}>Search</button>

        <div className='displayWeather'>

          {data && (
            <>
            <h2>City Name: {data.getCityByName.name}</h2>
            <h2>Temperature: {data.getCityByName.weather.temperature?.actual} F</h2>
            <h2>Description: {data.getCityByName.weather.summary?.description}</h2>
            <h2>Wind Speed: {data.getCityByName.weather.wind?.speed}</h2>
            </>
          )}

        </div>

    </div>
  )
}

export default Home