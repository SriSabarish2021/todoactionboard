import React from 'react'
import './List.css'
import Header from './Header';
import Today from './Today';
import Listcontent from './Listcontent';
import './Delete.css'
import { FaHome } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

const Delete = ({showalarm,setshowalarm,alarmitem,items,ham,curday,handlechange,handledelete,returnhome}) => {
  
  return (
    <>
        <div className='content'>
            <Header ham={ham}></Header>
            <Today curday={curday}></Today>
            {items.length?(<Listcontent items={items} handlechange={handlechange} handledelete={handledelete}></Listcontent>):(<p className="noitem">Your List is Empty pls add Item</p>)}
            <div className='returndiv'>
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

export default Delete