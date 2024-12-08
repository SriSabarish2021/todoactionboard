import { RiDeleteBin5Line } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";
import {Link, useParams} from 'react-router-dom'

const Listcontent = ({items,handlechange,handledelete}) => {
  let {name}=useParams()
  
  
  return (
    <>
      <div className='listcontent'>
            <ul className='ul'>
                {items
                  .sort((a,b)=>Number(a.time-b.time))
                  .map((item)=>(
                    <li key={item.id} className='li'>
                        <input className='checkbox' type="checkbox" checked={item.checked} onChange={()=>handlechange(item.id)}/>
                        <p style={{ textDecoration:item.checked?'line-through':'none',color:item.checked?'grey':'white',transitionDuration:'0.5s'}} className='itembody'>{item.body}</p>
                        {name && name.includes("delete")?(<button className='deletebtn' onClick={()=>handledelete(item.id)}><RiDeleteBin5Line></RiDeleteBin5Line></button>)
                        :name && name.includes("edit")?(<Link to={`/edit/${item.id}`}><button className='editbtn'><RiEditFill></RiEditFill></button></Link>)
                        :(<p style={{color:item.checked?'grey':'white',transitionDuration:'0.5s'}} className='itemtime'>{item.time}</p>)}
                    </li>
                ))}
            </ul>
        </div>
    </>
  )
}

export default Listcontent
