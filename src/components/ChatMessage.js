import React from 'react'

const ChatMessage = ({name , message}) => {
  return (
    <div className='flex items-center shadow-sm p-2'>
      <img className="h-6   "
         alt="user"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7qKgRvChw4p7QLmLJ_Vw2PyM11C6ThI6oA&s"/>
         
         <span className='font-bold px-2'>{name}</span>
         <spam>{message}</spam>
    </div>
  )
}

export default ChatMessage
