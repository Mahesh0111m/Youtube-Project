import { useEffect, useState } from "react";
import {toggleMenu} from "../utils/appSlice";
import {useDispatch, useSelector} from "react-redux";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import {cacheResults} from "../utils/searchSlice";

const Head = ()=>{
    const [searchQuery , setsearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions , setshowSuggestions] = useState(false);

    const searchCache = useSelector((store)=>store.search);
    const dispatch = useDispatch();

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(searchCache[searchQuery]){
                setSuggestions(searchCache[searchQuery]);
            }
            else
            {
                getSearchSuggestions();
            } 
                } , 200);

           return()=>
              {
                clearTimeout(timer);
              };
        
    } , [searchQuery]);

    const getSearchSuggestions = async ()=>{
       
        const data = await fetch(`https://youtube-node-server.onrender.com/api/search?q=${searchQuery}` );
        const json = await data.json();
        
        setSuggestions(json[1]);
        
        //update cache
        dispatch(cacheResults({
            [searchQuery]: json[1],
        }));
        
    }

    

    const toggleMenuHandler = ()=>{
        dispatch(toggleMenu());
    }

    return(
        <div className="grid grid-flow-col p-5 m-2 shadow-lg">
            <div className="flex col-span-1">

                <img className="h-8 cursor-pointer" 
                 onClick={()=>toggleMenuHandler()}
                 alt="menu" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8iICGSkZIkHyEPDA3z8vIyMTEhGx40MDEeHB4jICEeHR4AAAAxMTEgHh4gHB3W1tYtKyyXlpe6uroKBQhzcnJ+fX7CwsKysrJmZWX19fXk5OQYFhc5ODgoJidta2xUVFRfXV7Kysqsq6yjo6MHDa+eAAAB8UlEQVR4nO3c3VLaQBgGYJY/IQtE1Iogrfbn/q+xCaQ2TqtFm222+jwHDC8MMO8EdjnY+QYDAAAAAAAAAAAAAAAAeI/OL4Z5uDhP0m+yXYwzcbX4cJug4d045GN8Pem84GYd+67VUq6/dN7wou9Sjy1u0jQcjUZ9V2skaHhZfUuLbBrGYtN5w8F2HLNpGFOsNIPddlo3XGUgTK9T7BbVFzWbHX+zS1IQAAAAAAAAAABeZJKHVPXO76dHs9msul1OH+JfpOmr0ufuz15Wbhb78uzBvJzPWym2U/XU6Sk+lc6eTnEfv3Zf8PZjeTib2AihnYpwOJl5Qhp1kULY33d/1Pvbp9XTDcO/bhjGl503HD5uUX/Mn1PxTPr964pTUkhygra+hj9U16V10LS6+/pUtFLxTAo/00GCa1j/DhtFDw2Lxw1T/A7rtTRWS+ZhES2rdS3O22lep/qBX1LZSmetFI+pfvzk1HximrW03g9ns4edadboIy2XafbDWt9/Zhqp6gEAAAAAAAAAwAu89Zl7u+00xFXse2ZiLdHcxO24PLx7DpLMvrxcHy9f3+WOUswvHYZVRg2TTNktqnqjTCa0Jmm4WZcZNUwxC3pwd5VPwyLJlN3JdnHV9zD2RqKZ7G9/rj4AAAAAAAAAAAAAAAD8T74DVhZG6MsBqOQAAAAASUVORK5CYII="/>
                 <a href="/">
                <img className="h-8 mx-2"
                 alt="youtube-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWS__yRp3bt2ZswKRLr2GArzf0uIHEeGREYw&s"/>
                 </a>
            </div>

            <div className="col-span-10 px-10">
                <div>
                <input className="px-5 w-1/2 border border-gray-500 p-1 rounded-l-full" type="text"
                value={searchQuery}
                onChange={(e)=> setsearchQuery(e.target.value)} 
                onFocus={()=> setshowSuggestions(true)}
                onBlur={()=> setshowSuggestions(false)}   />
                <button className="border border-gray-600 px-4 py-1 rounded-r-full bg-gray-100">🔍</button>
                </div>

            {showSuggestions && (
            <div className="fixed bg-white py-2 px-5 w-[28rem] shadow-lg rounded-lg border border-gray-200">
                <ul>
                
                {suggestions.map((s)=>(
                        <li key={s} className="py-1 px-2 shadow-sm hover:bg-gray-100">🔍 {s}</li>))}
     
                </ul>
            </div>
            )}
            </div>

            <div className="col-span-1">
                <img className="h-9"
                 alt="user"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7qKgRvChw4p7QLmLJ_Vw2PyM11C6ThI6oA&s"/>
            </div>            
        </div>
    )
}

export default Head;