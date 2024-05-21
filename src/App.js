import React, { useEffect, useState, useRef } from 'react';
import './App.css'; 

const App = () => {
  const [userInteracted, setUserInteracted] = useState(false);
  const videoRefs = useRef([]);



  useEffect(() => {
      const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        videoRefs.current.forEach((videoRef) => {
          const container = videoRef.parentElement;
          const containerTop = container.offsetTop;
          const containerHeight = container.offsetHeight;

          if (containerTop - scrollTop < windowHeight / 2 && containerTop + containerHeight > scrollTop) {
            if (videoRef.paused) {
              videoRef.play();
            }
          } else {
            if (!videoRef.paused) {
              videoRef.pause();
            }
          }
        });
      };


      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  const videos = [
    { src: require('./videos/video5.mp4') },
    { src: require('./videos/video2.mp4') },
    { src: require('./videos/video3.mp4') },
    { src: require('./videos/video4.mp4') },
    { src: require('./videos/hola.mp4') },
  ];

  return (
    <div className="app">
      {videos.map((video, index) => (
        <div key={index} className="video-container">
          <video
            id={`video-${index}`}
            src={video.src}
            className="video"
            controls
            ref={(el) => (videoRefs.current[index] = el)}
            loop muted
          />
        </div>
      ))}
      <div className="footer">
        <p>Footer Content Here</p>
      </div>
    </div>
  );
};

export default App;
