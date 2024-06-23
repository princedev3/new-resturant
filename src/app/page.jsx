import Contact from '@/components/Contact'
import IsFeatured from '@/components/IsFeatured'
import Offer from '@/components/Offer'
import Slider from '@/components/Slider'
import React from 'react'

const Home = () => {
  return (
    <div className='p-10'>
      <Slider/>
      <IsFeatured/>
      <Offer/>
      <Contact/>
    </div>
  )
}

export default Home