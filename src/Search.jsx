import React from 'react'
import { FaSearch } from "react-icons/fa";
import './List.css'

const Search = ({getval,serval,setsearch}) => {
  return (
    <>
    <form action="submit" onSubmit={getval} className='searchform'>
            <input className='searchinp' type="text" value={serval} onChange={(e)=>setsearch(e.target.value)} placeholder='Search List'/>
            <button className='searchbtn' type='submit' onClick={getval}><FaSearch></FaSearch></button>
    </form>
    </>
  )
}

export default Search