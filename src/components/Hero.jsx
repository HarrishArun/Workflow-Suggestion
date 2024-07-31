import React from 'react'
import{logo} from'../assets';

const Hero = () => {
  return (
 <header className='w-full flex justify-center items-center flex-col'>

    <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        {/* <img src={logo} alt='logo' className='w-28 object-contain'/> */}
      
    </nav>
    <h1 className='head_text'>Innovate Buisness with<br className='max-md:hidden'/><span className='orange_gradient'>Gen AI</span></h1>
    <h2 className='desc'>Shaping Success Through Strategic Requirements</h2>
 </header>
  )
}

export default Hero