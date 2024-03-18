import React from 'react'
import Line from '../components/line.js'
import Countrychart from '../components/chartcountry.js'
export default function statistics() {
  return (
    <div>
      <Line/>
      <div className='mt-2'>
      <Countrychart/>
      </div>
    </div>
  )
}
