import React from 'react'
import loading from '../loading.gif'

const Loading= ()=> {
    return (
      //Loading Spinner
      <div className='text-center'> 
          <img src={loading} alt="loading spinner"/>
      </div>
    )
  
}

export default Loading