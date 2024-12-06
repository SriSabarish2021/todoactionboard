import { BiSolidAddToQueue } from "react-icons/bi";
import './List.css'
import Header from './Header';
import Search from './Search';
import Today from './Today';
import Listcontent from './Listcontent';
import {Link} from 'react-router-dom'
import { GiCancel } from "react-icons/gi";

const Maincontent = ({loading,setshowalarm,showalarm,alarmitem,itemstime,ham,curday,setham,items,serval,setsearch,getval,handlechange}) => {
   
  return (
    <>
      <div className='content'>
          <Header ham={ham}></Header>
          <Search getval={getval}
          serval={serval}
          setsearch={setsearch}></Search>
          <Today curday={curday}></Today>
          {loading?(<p className="loading">Loading....</p>):(items.length?(<Listcontent items={items.filter((item)=>item.body.toLowerCase().includes(serval.toLowerCase()))}
          handlechange={handlechange}
          ></Listcontent>):(<p className="noitem">Your List is Empty pls add Item</p>))}
          
          
          <div className='additemdiv'>
              <Link to="addpage"><button onClick={()=>setham(!ham)} className='additembtn'><BiSolidAddToQueue></BiSolidAddToQueue></button></Link>
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

export default Maincontent