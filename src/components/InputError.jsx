import React from "react";

const InputError = ({ inputmsg }) =>{

    return (
        <>
        {inputmsg && (
          <div className="text-center mt-1">
            {inputmsg}
          </div>
        )}
        </>
    )

}

export default InputError;