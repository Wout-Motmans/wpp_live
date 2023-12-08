'use client'
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className='flex-center-container' style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', marginTop: '12em' }}>
            <div style={{ width: "100%", overflow: "hidden" }}>
                <img
                    src='/img/bicycleman3.gif'
                    alt='Bicycle Animation'
                    className='animated-image'
                />

                <style jsx>{`
                    @keyframes slide {
                        0% {
                            transform: translateX(-10vw);
                          }
                          100% {
                            transform: translateX(100vw);
                          }
                    }

                    .animated-image {
                    width: 120px;
                    height: 90px;
                    animation: slide 7s linear infinite; 
                    }
                `}</style>
            </div>
            <div style={{ padding: '2em', border: 'solid white 2px', backgroundColor: '#f55525', color: 'black' }} className='content'>
                <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '6em' }}>4</h1>
                    <img src='/img/wiel.gif' style={{ width: '75px', height: '75px', }}></img>
                    <h1 style={{ fontSize: '6em' }}>4</h1>
                </div>
                <h2>The page you tried to reach doesn&apos;t exist, please &apos;cycle&apos; back to the home page.</h2>
            </div>

            <div className='content'>
                <Link style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: 'black', // Change the background color as needed
                    color: 'white', // Change the text color as needed
                    borderRadius: '5px',
                    textDecoration: 'none',
                    transition: 'background-color 0.3s ease'
                }} href="/" id='button'
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'grey'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'black'}>
                    Go back to Home
                </Link>
            </div>

        </div>
    );
};

export default NotFound;
