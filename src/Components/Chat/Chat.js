import React, { Component } from 'react';
import Header from '../Header/Header';
import './Chat.css'

class Home extends Component
{
    state = 
    {
        messages : []
    }

    componentDidMount(){
        this.getUserData();
    }

    getUserData = async()=>{
        let messages = localStorage.getItem('messages');
        if(messages){
            messages = JSON.parse(messages);
            await this.setState({messages});
            messages.map(message => this.addMessageToContainer(message));
        }
    }

    addMessageToContainer = (message)=>{
        message = message
        let senderMessageEle = document.createElement('div');
        senderMessageEle.innerText = message; 
        senderMessageEle.className = 'sender';
        
        const lastReceiverMessage = document.getElementsByClassName('receiver');
        if(lastReceiverMessage.length > 0) {
            senderMessageEle.style.marginTop = 10+lastReceiverMessage[lastReceiverMessage.length-1].offsetHeight+'px';
        }
        else{
            senderMessageEle.style.marginTop = '10px';
        }


        let senderMsgContainer = document.getElementById('senderContainer');
        senderMsgContainer.appendChild(senderMessageEle);

        let receiverMessageEle = document.createElement('div');
        receiverMessageEle.innerText = message; 
        receiverMessageEle.className = 'receiver';
        receiverMessageEle.style.marginTop = 10+senderMessageEle.offsetHeight+'px';

        let receiverMsgContainer =  document.getElementById('receiverContainer');
        receiverMsgContainer.appendChild(receiverMessageEle);

        const msgContainer = document.getElementById('msgContainer');
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    sendMessage = async (event) => {
        if(event.key === 'Enter') {
            const message = event.target.value;
            if(message!==''){
                event.target.value = '';
                let messages  = [...this.state.messages];
                messages.push(message)
                await this.setState({messages:messages});
                localStorage.setItem('messages',JSON.stringify(messages));
                this.addMessageToContainer(message);        
            }
        }
    }

    render(){            
        return(
            <div className='chatWindow'>
                <Header/>
                <div id="msgContainer">
                    <div id='receiverContainer'></div>
                    <div id='senderContainer'></div>
                </div>
                <section className='inputBox'>
                    <input type="text" onKeyDown={this.sendMessage} placeholder=' Type a new message...'/>
                </section>
            </div>
        )    
    }
}


export default Home