import React from 'react'
import { useState } from 'react'
import data from '../rest-countries-api-with-color-theme-switcher-master/data.json'
import '../assets/Country.css'
// import Pagination from './Pagination'


const Country = () => {
    const [myCountry, setMyCountry] = useState(data)
    const [selectedRegion, setSelectedRegion] = useState('')
    const [select, setSelect] = useState('')
    const [bgColor, setBgColor] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(25)


    const indexOfLastcountry  = currentPage * countriesPerPage
    const indexOfFirstcountry  = indexOfLastcountry - countriesPerPage
    const current = (myCountry.slice(indexOfFirstcountry, indexOfLastcountry))
    console.log(current)


    const regions = [
        'Asia',
        'Europe',
        'Americas',
        'Polar',
        'Oceania',
        'Africa'
    ]
    const handleChange=(e)=>{
      setSelectedRegion(e.target.value)
    }
    const foundRegion = current.filter((item)=> item.region=== selectedRegion)

    const handleChanged =(e)=>{
        setSelect(e.target.value)
        const searchItem = myCountry.filter((product)=>{
            const {name} = product
            return name.toLowerCase().includes(select.toLowerCase())
        })
        setMyCountry(searchItem)
    }

    const dark =()=>{
        setBgColor(!bgColor)    
    }
//    const btnClick=()=>{
//     setCountry(data.name[9])
//    }

const handleClick = ()=>{
    if (currentPage !== 1) {
        setCurrentPage(currentPage - 1)
    }
}
const handleClick2 = ()=>{
    if (currentPage !== Math.ceil(myCountry.length/countriesPerPage)) {
        setCurrentPage(currentPage + 1)
    }
}

//page numbering
const pageNumber = []
for (let i = 1; i<= Math.ceil(myCountry.length/countriesPerPage); i++){
    pageNumber.push(i)
}

const paginate = (event) => {
    const pageNumber = Number(event.target.textContent)
    setCurrentPage(pageNumber)
}

  return (
    <div className='con' style={{backgroundColor: bgColor? 'black' : 'lightBlue'}}>
    <div className='subb'  style={{backgroundColor: bgColor? 'black' : 'skyBlue'}}>
    <input type='text' placeholder='search-country' onChange={(e)=>handleChanged(e)}></input>
        <div className='nav'>
            
            <select
                name='regions'
                value={selectedRegion}
                onChange={(e)=>handleChange(e)}>
                <option>All</option>
                {regions.map((option)=>(
                    <option key={option[0]}>{option}</option>
                ))}
            </select>
            <button onClick={dark} >Dark Mode</button>
        </div>
       
        </div>
        <div className='container'>
            {foundRegion.length > 0
                ? foundRegion.map((myCountry)=>{
                    return(
                        <div className='sec' key={myCountry.name}>
                            <img src={myCountry.flags.svg}></img>
                            <h1>{myCountry.name}</h1>
                            <h1> Native Name: {myCountry.nativeName}</h1>
                            <h3>Population: {myCountry.population}</h3>
                        </div>
                    )
                })
                : current.map((myCountry)=>{
                    return(
                        <div className='sec' key={myCountry.name}>
                            <img src={myCountry.flags.svg}></img>
                            <h1>{myCountry.name}</h1>
                            <h1> Native Name: {myCountry.nativeName}</h1>
                            <h3> Population: {myCountry.population}</h3>
                        
                        </div>
                    )
                })
               
            }
        </div>

        <div className='footer'>
            <button onClick={()=>{handleClick()}}>previous</button>
            {pageNumber.map((page)=>{
                return <span style={{marginRight:'10px', marginLeft:'10px'}} onClick={paginate}>{page}</span>
            })}
            <button onClick={()=>{handleClick2()}}>next</button>
        </div>
       
    </div>
  )
}

export default Country