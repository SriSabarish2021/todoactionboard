import './List.css'
import { Route, Routes} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Addpage from './Addpage';
import Error from './Error';
import Maincontent from './Maincontent';
import { useNavigate } from 'react-router-dom';
import Delete from './Delete';
import Edit from './Edit';


const List = () => {
  // sidenav hide and show
  const [ham,setham]=useState(true)
  // fetchin items
  const [items,setitems]=useState([])
  // searching items
  const [serval,setsearch]=useState('')
 
  
  const [curday,setcurday]=useState(new Date())

  // adding items
  const [additem,setadditem]=useState('')
  const [today,settoday]=useState()

  const [alert,setalert]=useState(false)  
  const [alertfortime,setalertfortime]=useState(false)


  const [alarmitem,setalarmitem]=useState('')

  const [showalarm,setshowalarm]=useState(false)

  const [loading,setloading]=useState(true)


  let navigate=useNavigate()

  // fetch data on load
  useEffect(() => {
    let getdata=async()=>{
      try{
        /* const fetchingdata=await fetch("http://actionboard.netlify.app/data/db.json/items")
        if (!fetchingdata.ok) throw Error("Server is Busy Please try Later")
        let jsondata=await fetchingdata.json()
        setitems(jsondata) */
        let localdata=await JSON.parse(localStorage.getItem('items'))
        if (!localdata) throw Error("Server is Busy Please try Later")
        setitems(localdata)
      }catch(Error){
        console.log(Error);
      }finally{
        setloading(false)
      } 
    }
    getdata()
  return () => {
    setitems([])
  }
}, [])


  let getval =(e)=>{
      e.preventDefault()
  }
  
let handlechange=(id)=>{
  const getchange=items.map((checkitem)=>(checkitem.id===id?{...checkitem,checked:!checkitem.checked}:checkitem))
  setitems(getchange)
  const myitem=getchange.filter((indiitem)=>(indiitem.id===id))
  localStorage.setItem('items',JSON.stringify(getchange))
  // const updatedata=async()=>{
  //       const fetchingdata=await fetch(`http://actionboard.netlify.app/data/db.json/items/${id}`,{
  //           method:'PATCH',
  //           headers:{
  //               'Content-Type':'application/json'
  //           },
  //           body:JSON.stringify({checked:myitem[0].checked})
  //       })
  //   }
  //   (async () => await updatedata())()
}
let handlegetdata=(e)=>{
  e.preventDefault()
  if(additem.length&&today){
    setham(!ham)
    const idval=items.length ?Number(items[items.length-1].id)+1:1
    let checked=false
    let objdata={id:String(idval),body:additem,checked,time:today}   
    let arrdata=[...items,objdata]
    localStorage.setItem('items',JSON.stringify(arrdata))
    setitems(arrdata)
  
      /* let newadddata=async()=>{
          let addingdata=await fetch("http://actionboard.netlify.app/data/db.json/items",{
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify(objdata)
          })
      }
        newadddata() */
    setadditem('')
    settoday()
    navigate('/')
  }else{
    setalert(!alert)
  }
  
}

let handledelete=(id)=>{
      let delarr=items.filter((item)=>(item.id!==id))
      setitems(delarr)
      localStorage.setItem('items',JSON.stringify(delarr))

/* 
      let deldata=async()=>{
        let deletingdata=await fetch(`http://actionboard.netlify.app/data/db.json/items/${id}`,{
            method:'DELETE'
        })
      }
      deldata() */

}

  let returnhome=()=>{
    setham(true)
    navigate('/')
  }


const [hour,sethour]=useState()
const [minites,setminites]=useState()

  useEffect(() => {
    let gettime=()=>{
      let hr=new Date().getHours().toString().padStart(2,0)  
      sethour(hr)
      let minites=new Date().getMinutes().toString().padStart(2,0)
      setminites(minites)      
    }
    let timer=setInterval(() => {
      gettime()
    }, 1000);
    return () => {
      clearInterval(timer)
    }
  },[minites,hour]) 

  let itemstime=items.find((item)=>(
    item.time.includes(`${hour}:${minites}`) 
  ))
  useEffect(() => {
    
    if(itemstime&& !itemstime.checked){
       Notification.requestPermission().then(perm=>{
          if(perm==="granted"){
            let notify=new Notification("From To-Do List",{
              body:`Hey Your task "${itemstime.body}" is now overdue`,
              icon:"/images/to-do-list.png"              
            })
            setTimeout(()=>{
              notify.close()
             },30000)
          }
          else if(perm==="denied"){
            window.alert("Please Turn on your Notification")
          }
         })
      setalarmitem(itemstime)
      setshowalarm(!showalarm)
    }else{
      setshowalarm(false)
    }
    return () => {
      setalarmitem('')


    }
  }, [itemstime])
  
 


  return (
    <>
        <Routes>
            <Route path='/' element={<Maincontent loading={loading} setshowalarm={setshowalarm} showalarm={showalarm} alarmitem={alarmitem} itemstime={itemstime} ham={ham} setham={setham} items={items} setitems={setitems}  serval={serval} setsearch={setsearch} getval={getval} handlechange={handlechange} curday={curday}></Maincontent>}></Route>
            <Route path='/addpage' element={<Addpage showalarm={showalarm} setshowalarm={setshowalarm} alarmitem={alarmitem} ham={ham} curday={curday} setham={setham} items={items} setitems={setitems} today={today} settoday={settoday} additem={additem} setadditem={setadditem} handlegetdata={handlegetdata} returnhome={returnhome} alert={alert} setalert={setalert} alertfortime={alertfortime}></Addpage>}></Route>
            <Route path='/:name' element={<Delete showalarm={showalarm} setshowalarm={setshowalarm} alarmitem={alarmitem} items={items} ham={ham} curday={curday} handlechange={handlechange} handledelete={handledelete} returnhome={returnhome}></Delete>}></Route>
            <Route path='/edit/:id' element={<Edit showalarm={showalarm} setshowalarm={setshowalarm} alarmitem={alarmitem} items={items} setitems={setitems} ham={ham} curday={curday} returnhome={returnhome}
            today={today} settoday={settoday} additem={additem} setadditem={setadditem} ></Edit>}></Route>
            <Route path='/:name/*' element={<Error></Error>}></Route>

        </Routes>
    </>
  )
}

export default List
