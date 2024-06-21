import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import {useDispatch, useSelector} from "react-redux";
import {addMessage} from "../utils/chatSlice";
import {generateRandomName, makeRandomMessage} from "../utils/helper";

const LiveChat = () => {
  const [liveMessage , setliveMessage] = useState("");

  const dispatch = useDispatch();

  const chatMessages = useSelector((store)=> store.chat.messages);

  useEffect(()=>{
    const i = setInterval(()=>{
       
        dispatch(
          addMessage({
            name: generateRandomName(),
            message: makeRandomMessage(20),
          })
        );
    },2000);

    return() => clearInterval(i);

  },[])

  return (
    
    <div className='w-full h-[380px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse'>
      <div>
      {chatMessages.map((c,i)=>(<ChatMessage key={i} name={c.name} message={c.message}/>))}
      </div>
      
    </div>

   
    
  )
}

export default LiveChat
