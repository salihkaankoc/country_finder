"use client"
import React, { useState } from 'react'
import axios from 'axios'
const CountryFinder = () => {
    const [countryName, setCountryName] = useState('')
    const [country, setCountry] = useState()
    const [error, setError] = useState('')
    const [loaded, setLoaded] = useState(false)
    async function getCountry() {
        axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((response) => {
            setCountry(response.data[0])
            console.log(response)
            setLoaded(true)
        }).catch((err) => {
            if (err.response) {
                setError('Something went wrong :( Please check your input and try again.')
            }
            setLoaded(true)
        })
        
    }
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <div className='bg-white w-96 h-24 flex items-center justify-between shadow-md shadow-white rounded-lg'>
                <input onChange={(e) => setCountryName(e.target.value)} placeholder='Type a country..' className='w-60 h-12 border-2 rounded-md border-black text-black ml-4 indent-2'></input>
                <button onClick={() => getCountry()} className='h-12 mr-4 w-24 bg-red-400 text-white rounded-md hover:bg-red-500'>Search</button>
            </div>
            {loaded && <div className='w-96 justify-center text-black items-center flex flex-col mt-10  max-h-96 overflow-y-scroll bg-white shadow-md shadow-white rounded-lg'>

                {error != '' ? <h3 className='text-center flex justify-center m-12'>{error}</h3> :
                 <div className='m-12 flex flex-col justify-center items-center'>
                    <h3 className='text-4xl'>{country.name.common}</h3>
                    <img className='h-48 mt-2' src={country.flags.svg} />
                    <h3 className='text-2xl mt-2'>Capital City: {country.capital[0]}</h3>
                    <h3 className='text-2xl mt-2'>Region: {country.region}</h3>
                </div>}

            </div>}
        </div>
    )
}

export default CountryFinder