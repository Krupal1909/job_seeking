/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react'

const ResumeModel = ({imageUrl, onClose}) => {
  return (
    <>
      <div className="resume-model">
        <div className="model-content">
          <span className='close' onClick={onClose}>
            &times;
          </span>
          <img src={imageUrl} alt="resume" />
        </div>
      </div>
    </>
  )
}

export default ResumeModel
