import React, { useState, useEffect, useRef } from 'react';

const StreamingService = ({ selectedVideo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [loadedFraction, setLoadedFraction] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
      videoRef.current.addEventListener('progress', handleProgress);
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      videoRef.current.addEventListener('ended', handleVideoEnded);
      return () => {
        videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        videoRef.current.removeEventListener('progress', handleProgress);
        videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        videoRef.current.removeEventListener('ended', handleVideoEnded);
      };
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        //Change to exitFullScreen when I star making the design (Maybe I'll take a while because I'm exicted doing behaviours... I know myself)
        enterFullScreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleProgress = () => {
    if (videoRef.current.buffered.length > 0) {
      const loadedEnd = videoRef.current.buffered.end(0);
      const duration = videoRef.current.duration;
      setLoadedFraction(loadedEnd / duration);
    }
  };

  const handleLoadedMetadata = () => {
    setVideoDuration(videoRef.current.duration);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setLoadedFraction(0);
  };

  const play = () => {
    setIsPlaying(true);
    videoRef.current.play();
  };

  const pause = () => {
    setIsPlaying(false);
    videoRef.current.pause();
  };

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleVideoClick = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleVolumeChange = (event) => {
    const volume = parseFloat(event.target.value);
    setVolume(volume);
    videoRef.current.volume = volume;
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      enterFullScreen();
    } else {
      //Change to exitFullScreen
      enterFullScreen();
    }
  };

  const enterFullScreen = () => {
    const videoElement = videoRef.current;

    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }

    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    setIsFullScreen(false);
  };

  const handleProgressBarClick = (event) => {
    const progressBar = event.target;
    const progressWidth = progressBar.offsetWidth;
    const clickedPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const time = (clickedPosition / progressWidth) * videoDuration;

    videoRef.current.currentTime = time;
  };

  return (
    <div className="streaming-service">
      {selectedVideo && (
        <div className="video-container">
          <video
            ref={videoRef}
            src={selectedVideo.videoUrl}
            className="video-player"
            onClick={handleVideoClick}
          ></video>
          <div className="progress-bar" onClick={handleProgressBarClick}>
            <div
              className="progress"
              style={{ width: `${(currentTime / videoDuration) * 100}%` }}
            ></div>
            <div
              className="loaded"
              style={{ width: `${loadedFraction * 100}%` }}
            ></div>
          </div>
          <div className="controls">
            <button className="play-pause-button" onClick={handlePlayPauseClick}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="fullscreen-button" onClick={toggleFullScreen}>
              {'Fullscreen' /*Change this little guy for some cool awesome symbol of fullscreen :O */ }
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange /* This guy will be an awesome symbol as well like pretty much any weird button >:) */}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamingService;
