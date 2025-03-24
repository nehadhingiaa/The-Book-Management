import React, { useState } from 'react'

import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({loading}) => {
    const [color]=useState("text-purple-900")

  return (
    <div>
        <ClipLoader
        color={color}
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        className='text-purple-600 font-bold'
      />
    </div>
  )
}

export default Loader
