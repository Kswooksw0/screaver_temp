import React from "react";
import styles from "./MemeGallery.module.css";

export const MemeGallery = () => {
  // Array of YouTube video IDs or URLs
  const videos = [
    "ykOG5fVqGD0 ", // Example YouTube video ID
    "Q4ZcZDLV7Dc", // Another example video
    "5YMIoBUPDsw", // Example
    "FBh9c2f2fXI",
  ];

  return (
    <>
      <h1 className={styles.title}>Meme Gallery</h1>
      <div className={styles.memeGalleryContainer}>
        {videos.map((videoId, index) => (
          <div key={index} className={styles.videoWrapper}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`Meme video ${index + 1}`}
              // frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; "
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </>
  );
};

// title={`Meme video ${index + 1}`}
