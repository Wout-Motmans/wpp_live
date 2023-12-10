'use client'
import Image from 'next/image'
import bicycle from '../public/img/bicycleman.gif'

export default function Loading() {
    


    return (
            <div className=' w-full'>
                <Image
                    src={bicycle}
                    alt='Bicycle Animation'
                    width={120}
                    height={90}
                    className='animate-slide '
                    
                />
                
            </div>
    )
}