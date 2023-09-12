import { useState } from "react";
import copy from "copy-to-clipboard";
import Head from "next/head"; // Import the Head component

function Index() {
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

  return (
    <div>
      <Head>
        {/* Include the Google AdSense script in the head section */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4644191924023931"
          crossOrigin="anonymous"
        ></script>
      </Head>


      {/* Content of your component */}
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "black", fontSize: "30px" }}>
            Effortlessly obtain premium video thumbnails from YouTube using our intuitive tool 😉
          </h1>
          <h2 className="text-3xl font-bold mb-2" style={{ color: "black" }}>
            Youtube Thumbnail Downloader
          </h2>
          <p className="text-gray-600" style={{ color: "black" }}>
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
            <h2 className="text-xl font-semibold mb-4" style={{ color: "white", fontSize: "20px" }}>Thumbnail Options:</h2>
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
}

export default Index;





