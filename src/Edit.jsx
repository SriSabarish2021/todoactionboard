import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header';
import Today from './Today';
import './List.css'
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { GiCancel } from "react-icons/gi";


const Edit = ({showalarm,setshowalarm,alarmitem,items,setitems,ham,curday,returnhome}) => {
  let {id}=useParams()
  let navigate=useNavigate()

  let getedititem=items.find((item)=>(String(item.id)===id))
  if (!getedititem) {
    return (
      <div className="content smaller">
        <p className='txtadd' style={{fontSize:'20px'}}>Task not found! Please go back to the home page.</p>
        <div className='returndiv'>
          <button className='returnbtn' onClick={() => navigate("/")}><FaHome></FaHome></button>
        </div>
      </div>
    );
  }
  const [editbody,seteditbody]=useState(getedititem.body||" ")
  const [edittoday,setedittoday]=useState(getedititem.time||" ")

  let handleedit=(e)=>{
    e.preventDefault()
    const getedit=items.map((edititem)=>(edititem.id===getedititem.id?{...edititem,body:editbody,time:edittoday}:edititem))
    setitems(getedit)
    localStorage.setItem('items',JSON.stringify(getedit))
    const myedititem=getedit.filter((indiedititem)=>(indiedititem.id===id))
    /* const editdata=async()=>{
      const editingdata=await fetch(`http://actionboard.netlify.app/data/db.json/items/${id}`,{
          method:'PATCH',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({body:myedititem[0].body,time:myedititem[0].time})
      })
  }
  (async () => await editdata())() */
    navigate('/')
  }
  

  return (
    <>
    
        <div className='content custom'>
            <Header ham={ham}></Header>
            <Today curday={curday}></Today>
            
            <p className='txtadd'>Edit Your Task: {id}</p>
            <form action="submit" onSubmit={handleedit}  className='addform'>
              <textarea className='addinp addinptxt' type="" value={editbody} onChange={(e)=>seteditbody(e.target.value)} placeholder='Edit Task'/>
              <input className='addinp' type="time" value={edittoday} onChange={(e)=>setedittoday(e.target.value)} placeholder='Add Time 24hour format'/>
              <button  className='subbtn' type='submit' onClick={handleedit}>Submit</button>
            </form>
            <div className='returndiv edithome'  >
              <button className='returnbtn' onClick={()=>returnhome()}><FaHome></FaHome></button>
            </div>
        </div>
        <div className={`remind ${showalarm?"showalarm":"hidealarm"}`}>
        <div className="remindcont">
            <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <h3 style={{flex:'1'}}>Hello My User!</h3>
              <p onClick={()=>setshowalarm(!showalarm)} style={{cursor:'pointer',paddingRight:'10px'}}><GiCancel></GiCancel></p>
            </div>
          <p>This is the time for your <span className="idnum">{alarmitem.body}</span> task</p>
          <p>Please finish it and free yourself</p>
        </div>
        
      </div>
    </>
  )
}

export default Edit