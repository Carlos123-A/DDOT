import React, { useRef, useEffect, useState} from 'react'
import '../../assets/css/videos.css'
import { apiClient } from '../../Api/apiClient'


const Videos = () => {
  const [ videoData, setViodeoData ] = useState([])
  let video_id = ''

  useEffect(() => {
    apiClient.get('/', {
    })
    .then(response => {
      setViodeoData(response.data)
      console.log(response.data)
    })
  },[] )
  
  const videoRefs = useRef([])
  const containerRef = useRef(null)
  const [userInteracted, setUserInteracted] = useState(false)
  
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videoData.length)
  }, [videoData])
  
  const handleScroll = () => {
    if (!userInteracted) return
    
    const container = containerRef.current
    const containerTop = container.getBoundingClientRect().top
    const containerBottom = containerTop + container.clientHeight
    
    videoData.forEach((video, index) => {
      const videoRef = videoRefs.current[index]
      const videoTop = videoRef.getBoundingClientRect().top
      const videoBottom = videoTop + videoRef.clientHeight
      
      if (videoTop >= containerTop && videoBottom <= containerBottom) {
        if (videoRef.paused) {
          videoRef.currentTime = 0;
          videoRef.play()
        }
      } else {
        if (!videoRef.paused) {
          videoRef.pause()
          console.log('Pause ' + parseInt(videoRef.currentTime))
          if (parseInt(videoRef.currentTime) <= 19){
            apiClient.post('/user/prefers',{
              video_id: video_id, 
              watch_time: parseInt(videoRef.currentTime)
            
            })
            .then (response => 
              console.log(response.data)
            )
            .catch (erro => 
              console.error(erro.message)
              
            )
          }
        }
      }
    })
  }
  
  const handleContainerClick = () => {
    setUserInteracted(true)
  }

  return (
    <div className="app" onClick={handleContainerClick}>
      <div className="video-container" ref={containerRef} onScroll={handleScroll}>
        {videoData.map((video, index) => (
          video_id = video._id,
          <video
            key={index}
            src={video.url}
            className="video"
            loop
            controls
            ref={el => (videoRefs.current[index] = el)}
          />
        ))}
      </div>
    </div>
  )
}

export default Videos;
