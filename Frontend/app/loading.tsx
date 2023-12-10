'use client'
import Image from 'next/image'

export default function Loading() {
    


    return (
        <div>
            <div style={{width: "100%", overflow: "hidden" }}>
                <Image
                    src='/public/img/bicycleman.gif'
                    alt='Bicycle Animation'
                    width={120}
                    height={90}
                    style={{
                        animation: 'slide 7s linear infinite',
                        '@keyframes slide': {
                            '0%': { transform: 'translateX(0)', },
                            '100%': { transform: 'translateX(-100%)', },
                        },
                    }}
                    
                />
                
            </div>
        </div>
        
    )
}