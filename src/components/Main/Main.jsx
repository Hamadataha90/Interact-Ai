import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'

const Main = () => {
  return (
    <div className='main'>
      <div className="nav">
        <p> Gemini </p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        <div className="greet">
          <p><span>Hello, Dev.</span></p>
          <p>How can I help you today </p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <img src={assets.compass_icon} alt="" />
          </div>

          <div className="card">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <img src={assets.bulb_icon} alt="" />
          </div>

          <div className="card">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <img src={assets.message_icon} alt="" />
          </div>

          <div className="card">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <img src={assets.code_icon} alt="" />
          </div>

        </div>

        <div className="main-bottom">
          <div className="search-box">
            <input type="text" placeholder='Enter a Prompt here'/>
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img src={assets.send_icon} alt="" />
            </div>
          </div>
        </div>

        <div className="footer">
          <p>© 2024 Gemini by Hamada Taha. All rights reserved.</p>
          <a href="https://github.com/Hamadataha90">Github</a>
          <a href="https://www.linkedin.com/in/hamada-elsayed-90h2011/">LinkedIn</a>
        </div>
      </div>
      
    </div>
  )
}

export default Main
