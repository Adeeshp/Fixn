import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

function Hero() {
  return (
    <div className='flex items-center gap-3 flex-col justify-center pt-36 pb-7'>
        <h2 className='font-bold text-[46px] text-center'>
            Find Home 
            <span className='text-primary'> Service/Repair</span>
            <br></br> Near You</h2>
        <h2 className='text-xl text-gray-400'>Explore Best Home Service & Repair Near You</h2>
    </div>
  )
}

export default Hero
