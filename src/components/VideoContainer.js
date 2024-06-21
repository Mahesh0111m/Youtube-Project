import React, { useEffect , useState} from 'react'
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
  const [videos,setVideos] = useState([]);

  useEffect(()=>{
    getVideos();
  }, []);

  const getVideos = async ()=>{

    const data = await fetch("https://youtube-node-server.onrender.com/api/videos");
    const json = await data.json();
    
    setVideos(json.items);
  };

  if(videos.length === 0)
    <h1>Loading....</h1>
    else
  return (
    <div className='flex flex-wrap'>
      {videos.map(video => <Link key={video.id} to={"/watch?v=" + video.id}><VideoCard info={video} /> </Link>)}
      
    </div>
  )
}

export default VideoContainer;
