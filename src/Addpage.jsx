import Header from './Header';
import Today from './Today';
import './List.css'
import './Addpage.css'
import { FaHome } from "react-icons/fa";
import { AiTwotoneAlert } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";


const Addpage = ({showalarm,setshowalarm,alarmitem,curday,today,settoday,handlegetdata,additem,setadditem,returnhome,alert,setalert}) => {
  return (
    <>
        <div className='content custom'>
            <Header></Header>
            <Today curday={curday}></Today>
            <p className='txtadd'>Add Item </p>
            <form action="submit" onSubmit={handlegetdata}  className='addform'>
              <textarea className='addinp addinptxt' type="" value={additem} onChange={(e)=>setadditem(e.target.value)} placeholder='Add Task'/>
              <input className='addinp' type="time" value={today} onChange={(e)=>settoday(e.target.value)} placeholder='Add Time 24hour format'/>
              <button  className='subbtn' type='submit' onClick={handlegetdata}>Submit</button>
            </form>
            <div className='returndiv' style={{bottom:'40px'}}>
              <button className='returnbtn' onClick={()=>returnhome()}><FaHome></FaHome></button>
            </div>
        </div>
        <div className={`popup ${alert?"showalrt":"hidealrt"}`}>
              <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <p style={{fontSize:'30px',flex:'1'}}><AiTwotoneAlert></AiTwotoneAlert></p>
                <p onClick={()=>setalert(!alert)} style={{cursor:'pointer',paddingRight:'10px'}}><GiCancel></GiCancel></p>
              </div>
              <p>Please Add Task to Submit or return to Home</p>
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

export default Addpage