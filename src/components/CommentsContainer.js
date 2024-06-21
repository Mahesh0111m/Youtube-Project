import React from 'react'

const commentsData = [
    {
        name:"ABC",
        text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
        replies:[],
    },
    {
        name:"ABC",
        text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
        replies:[
            {
                name:"ABC",
                text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
                replies:[
                    {
                        name:"ABC",
                        text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
                        replies:[
                            {
                                name:"ABC",
                                text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
                                replies:[],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name:"ABC",
        text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
        replies:[
            {
                name:"ABC",
                text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
                replies:[],
            },
        ],
    },
    {
        name:"ABC",
        text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
        replies:[],
    },
    

];

const Comment = ({data})=>{
    const {name,text,replies} = data;

    return(
        <div className='flex shadow-sm  bg-gray-100 p-2 rounded-lg my-2'>
            <img className='w-6 h-6'
             alt="user" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7qKgRvChw4p7QLmLJ_Vw2PyM11C6ThI6oA&s'/>
           <div className='px-2'>
            <p className='font-semibold'>{name}</p>
            <p>{text}</p>
           </div>
        </div>
    )
}

const CommentsList = ({comments}) =>{
    return comments.map((comment , index) => (
    <div key={index}>
    <Comment  data={comment}/>
    <div className='pl-5 border border-l-black ml-7'>
        <CommentsList comments={comment.replies}/>
    </div>
    </div>
       ));
};

const CommentsContainer = () => {
  return (
    <div className='m-2 p-2'>
     <h1 className='text-xl font-semibold'>Comments</h1>
     <CommentsList comments={commentsData}/>
    </div>
  )
}

export default CommentsContainer
