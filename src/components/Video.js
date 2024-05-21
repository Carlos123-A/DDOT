import React from 'react';

const Video = ({ src }) => {
  return (
    <div className="video"> 
      <video src={src} controls autoPlay />
    </div>
  );
};

export default Video;
