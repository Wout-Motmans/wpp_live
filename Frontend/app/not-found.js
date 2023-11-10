'use client'
import Link from 'next/link';

const NotFound = () => {
    const url = document.URL
    return (
        <div className='flex-center-container' style={{display:'flex',flexDirection:'column',gap:'20px',textAlign:'center', marginTop:'12em'}}>
            <div style={{padding:'2em' ,border:'solid white 2px', backgroundColor:'grey', color:'black'}} className='content'>
                <div style={{display:'flex', gap:'3px',justifyContent:'center' ,alignItems:'center'}}>
                <h1 style={{fontSize:'6em'}}>4</h1>
                <img src='/img/wiel.gif' style={{width:'75px',height:'75px',}}></img>
                <h1 style={{fontSize:'6em'}}>4</h1>
                </div>
                <h2>{url} doesn't exist, please head back to the home page :)</h2>
            </div>

            <div className='content'>
                <Link style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: 'grey', // Change the background color as needed
                    color: 'black', // Change the text color as needed
                    borderRadius: '5px',
                    textDecoration: 'none',
                    transition: 'background-color 0.3s ease'
                }} href="/" id='button'
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#646566'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'grey'}>
                    Go back to Home
                </Link>
            </div>

        </div>
    );
};

export default NotFound;
