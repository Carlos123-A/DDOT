import React, { useRef, useEffect, useState, useMemo } from 'react'
import '../../assets/css/videos.css'

const Videos = () => {
  const videos = useMemo (() => [
    { src: '/videos/video5.mp4' },
    { src: '/videos/video2.mp4' },
    { src: '/videos/video3.mp4' },
    { src: '/videos/video4.mp4' },
    { src: '/videos/hola.mp4' }
  ], [])
  
  const videoRefs = useRef([])
  const containerRef = useRef(null)
  const [userInteracted, setUserInteracted] = useState(false)
  
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length)
  }, [videos])
  
  const handleScroll = () => {
    if (!userInteracted) return
    
    const container = containerRef.current
    const containerTop = container.getBoundingClientRect().top
    const containerBottom = containerTop + container.clientHeight
    
    videos.forEach((video, index) => {
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
        {videos.map((video, index) => (
          <video
            key={index}
            src={video.src}
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
