import React from 'react'
import Sliders from '../../Components/Slider'
import Trending from '../../Components/Trending'
import Production from '../../Components/Production'
import PopularMovies from '../../Components/PopularMovies'

function Home() {
  return (
    <div className='px-16 max-w-screen-2xl mx-auto'>

      <Sliders/>
      <Trending/>
      <Production/>
      <PopularMovies/>
    </div>
  )
}

export default Home
