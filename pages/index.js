import React, { useState } from "react";
import copy from "copy-to-clipboard";

const Index = () => {
  const [videoURL, setVideoURL] = useState("");
  const [thumbnailOptions, setThumbnailOptions] = useState([]);

  const getYouTubeThumbnail = (url) => {
    let regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    let match = url.match(regExp);

    if (match && match[1].length === 11) {
      const videoURL = match[1];
      const thumbnailBaseUrl = "http://img.youtube.com/vi/";

      const options = [
        { resolution: "HD (1280x720)", code: "maxresdefault" },
        { resolution: "SD (640x480)", code: "sddefault" },
        { resolution: "Normal (480x360)", code: "hqdefault" },
        { resolution: "Medium (320x180)", code: "mqdefault" },
        { resolution: "Low (120x90)", code: "default" },
      ];

      const thumbnailOptions = options.map((option) => ({
        resolution: option.resolution,
        url: `${thumbnailBaseUrl}${videoURL}/${option.code}.jpg`,
      }));

      setThumbnailOptions(thumbnailOptions);
      setVideoURL("");
    } else {
      setThumbnailOptions([]);
    }
  };

  // The provided HTML code as a string
  const additionalHTML = `
    <html lang="en">
    <head>
      <title>Bootstrap Example</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
    
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="" alt=" " style="width: 40px;" class="rounded-pill">
        </a>
      </div>
    </nav>
    
    <div class="container-fluid mt-3">
      <h3></h3>
      <p></p>
    </div>
    
    </body>
    </html>
  `;

  return (
    <div>
      {/* Insert the provided HTML using dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={{ __html: additionalHTML }} />
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "white" }}>
            Youtube Thumbnail Downloader
          </h1>
          <p className="text-gray-600" style={{ color: "white" }}>
            Download high-quality thumbnails from YouTube videos.
          </p>
        </header>
        <div className="text-center">
          <input
            type="text"
            className="w-full md:w-1/2 px-4 py-2 border rounded"
            placeholder="Enter YouTube URL"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          />
          <button
            className="btn-blue mt-2"
            onClick={() => getYouTubeThumbnail(videoURL)}
          >
            Download Thumbnails
          </button>
        </div>
        {thumbnailOptions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Thumbnail Options</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {thumbnailOptions.map((option, index) => (
                <div key={index} className="thumbnail-option">
                  <img src={option.url} alt={`Thumbnail ${index + 1}`} />
                  <button
                    className="btn-blue mt-2"
                    onClick={() => copy(option.url)}
                  >
                    Copy Image URL
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;



