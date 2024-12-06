import { BrowserRouter } from 'react-router-dom'
import './App.css'
import List from './List'

function App() {
  return (
    <div className='styler' style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
      <BrowserRouter>
        <List></List>
      </BrowserRouter>
      
    </div>
  )
}

export default App
