import React from 'react';
import './Header.css'
import chatImage from '../../assets/chatImage.png'

const Header = () =>{
    
    return (
        <header>
            <span>
                <img src={chatImage} alt='Not found' />
                <label>Mirror Chatbot</label>
            </span>
        </header>
    )
}

export default Header;