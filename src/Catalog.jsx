import React, { useState } from 'react';
import StreamingService from './StreamingService';

const Catalog = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const mediaList = [
    {
      id: 1,
      title: 'Digimon Next Order',
      description: 'Evolução Jogress',
      imageUrl: 'sample.png',
      videoUrl: 'sample.mp4',
    },
    {
      id: 2,
      title: 'Live do Aguilelo',
      description: 'Live Jogando DBZ',
      imageUrl: 'live.jpg',
      videoUrl: 'live.mp4',
    },
    // Adicione mais itens de mídia conforme necessário
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="streaming-service">
    {selectedVideo && <StreamingService selectedVideo={selectedVideo} />}
    <div className="catalog">
      <h2>Catálogo</h2>      
      <div className="media-list">
        {mediaList.map((media) => (
          <div
            key={media.id}
            className="media-item"
            onClick={() => handleVideoClick(media)}
          >
            <img src={media.imageUrl} alt={media.title} />
            <div className="media-info">
              <h3>{media.title}</h3>
              <p>{media.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Catalog;
