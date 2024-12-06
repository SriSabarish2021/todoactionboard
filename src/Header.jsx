import React, { useState } from 'react'
import { FaHamburger } from "react-icons/fa";
import './List.css'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'



const Header = ({ham}) => {
  const [ showmenu,setshowmenu]=useState(false)
    let {name}=useParams()

  return (
    <>
      <div className='title'>
              <header className='headd'>To-Do List</header>
              <button className='btn' style={{display:name&&name.includes("delete")||name&&name.includes("edit")||!ham?'none':'flex'}} onClick={()=>setshowmenu(showmenu=>!showmenu)}><FaHamburger></FaHamburger></button>
      </div>
      <div className={`options ${showmenu?"show":"hide"}`}>
          <ul className='optul'>
            <Link to="delete" className='del'><li><MdDeleteForever></MdDeleteForever> Delete</li></Link>
            <Link to="edit" className='edt'><li><CiEdit></CiEdit> Edit</li></Link>
          </ul> 
      </div>
    </>
  )
}

export default Header