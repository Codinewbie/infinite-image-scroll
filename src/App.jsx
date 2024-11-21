import React, { useState, useEffect } from "react";
import "./App.css";
import Masonry from "react-masonry-css";

const breakpointColumns = {
  default: 4, // Default number of columns
  1100: 3,    // 3 columns for widths <= 1100px
  700: 2,     // 2 columns for widths <= 700px
  500: 1,     // 1 column for widths <= 500px
};

const clientID = `?client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);  // New state for error handling
  const[inputmsg, setInputmsg] = useState(null);

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchImages = async () => {
    setLoading(true);
    setError(null); // Reset error state when a new request is made
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    
    // Decide the URL based on whether there's a search query
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
  
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          const newPhotos = data.results.filter(
            (newPhoto) => !oldPhotos.some((photo) => photo.id === newPhoto.id)
          );
          return [...oldPhotos, ...newPhotos];
        } else {
          const newPhotos = data.filter(
            (newPhoto) => !oldPhotos.some((photo) => photo.id === newPhoto.id)
          );
          return [...oldPhotos, ...newPhotos];
        }
      });
  
      setLoading(false);
    } catch (error) {
      console.error("Error Fetching Images:", error);
      setLoading(false);
      setError("Failed to load images. Please check your connection!"); // Set the error message
    }
  };
  
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        console.log("Scroll Event Triggered - Fetching Next Page");
        setPage((oldPage) => oldPage + 1);
      }
    });
  
    return () => window.removeEventListener("scroll", event);
  }, [loading]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {

      setInputmsg("Please enter a search term!")
      setTimeout(() => {
        setInputmsg(null);  // Reset the input message after 3 seconds
      }, 2000);  // 3000 milliseconds = 3 seconds
      
      //alert("Please enter a search term!"); // Display an alert if the input is empty
      return;
    }
    console.log("Search Submitted -> Query:", query);
    setPage(1); // Reset to the first page
    setPhotos([]); // Clear the current photos
  };

  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  const handleCancel = () => {
    setError(null); // Hide the error message
  };

  return (
    <div className="relative px-3 min-h-screen bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500">
      {/* Conditionally apply the blur effect to the background */}
      {error && <div className="absolute inset-0 bg-black opacity-50 blur-sm z-10" />}
      
      <div className="flex justify-center">
        <div className={`${inputmsg ? "mt-10" : "my-7"}  border max-w-lg md:w-96 flex justify-between pr-1 py-1 bg-white rounded-lg space-x-3  z-20 relative`}>
        <input
          type="text"
          placeholder="Search Images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control ml-3 focus:outline-none"
          aria-label="Search for images"
          required
        />

          <button
            type="button"
            onClick={handleSubmit}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-400 rounded-md"
            aria-label="Submit search"
          >
            Search
          </button>
        </div>
      </div>
      {inputmsg && (
          <div className="text-center mt-1">
            {inputmsg}
          </div>
        )}
    
      <Masonry
        breakpointCols={breakpointColumns}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((image, index) => (
          <div key={index} className="flex flex-col" role="listitem">
            <img
              src={image.urls.regular}
              alt={image.alt_description || "A beautiful image from Unsplash"}
              className="rounded-lg object-cover rounded-md hover:shadow-md border mt-5 mb-2 hover:brightness-75"
              loading="lazy"
              aria-label={image.alt_description || "Image from Unsplash"} // Alt text for accessibility
            />
            <div className="flex justify-center items-center space-x-2">
              <div className="w-8 h-8 border rounded-full font-semibold flex justify-center items-center bg-gray-200">
                <img
                  src={image.user.profile_image.small}
                  alt={`Profile of ${image.user.name}`}
                  className="object-cover flex justify-center rounded-full hover:shadow-md border hover:brightness-75"
                />
              </div>
              <div className="text-black font-bold text-center" aria-label={`Photographer: ${image.user.name}`}>
                {image.user.name}
              </div>
            </div>
          </div>
        ))}
      </Masonry>

      {/* Error Message centered on the screen, sticky while scrolling */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center z-30" role="alert">
          <div className="bg-white text-red-500 text-xl font-bold p-6 rounded-lg shadow-lg">
            <p>{error}</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-md"
                aria-label="Close error message"
              >
                Cancel
              </button>
              <button
                onClick={handleRefresh}
                className="bg-blue-200 hover:bg-blue-400 text-black font-semibold py-2 px-4 rounded-md"
                aria-label="Refresh the page"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
