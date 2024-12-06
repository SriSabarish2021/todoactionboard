import React from 'react'

const Today = ({curday}) => {
  return (
    <>
        <div className='today'>
            <p className='tdtxt' >Today</p>
            <p className='tddate'>{curday.getDate()} - {Number(curday.getMonth())+1} - {curday.getFullYear()}</p>
        </div>
    </>
  )
}

export default Today