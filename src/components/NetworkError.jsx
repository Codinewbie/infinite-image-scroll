import React from "react";

const NetworkError = ({ error }) =>{

    const handleRefresh = () => {
        window.location.reload(); // Refresh the page
      };
    
      const handleCancel = () => {
        setError(null); // Hide the error message
      };

    return (
        <>
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
        </>
    )

}

export default NetworkError;