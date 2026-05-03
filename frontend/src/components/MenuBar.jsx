import { useState } from "react"
import './MenuBar.css'
import diamond from '../assets/diamond.png' 
import hamburger from '../assets/hamburger.svg'

export const MenuBar = () => {
  const [open, setOpen] = useState(false)

  return <div className="navigation">
    <div className="header">
      <div className="img-brand-div"><img className="img-brand" src={diamond} /></div>

      <button
        type="button"
        id="hamburger-button"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
      >
        <img src={hamburger} id="hamburger"/>
      </button>
    </div>

    <ul className='menu-items'>
      <li className='menu-item'>Home</li>
      <li className='menu-item'>Order</li>
      <li className='menu-item'>About Us</li>
    </ul>

  </div>
}
