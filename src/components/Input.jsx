import React from "react";

const Input = ({query, setQuery, inputmsg,handleSubmit }) =>{

    return (
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
    )

}

export default Input;