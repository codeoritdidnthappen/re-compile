import React from 'react'

const Loading = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h3>Loading ...</h3>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    </div>
  )
}

export default Loading