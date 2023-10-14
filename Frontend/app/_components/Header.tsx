'use client'
import Link from 'next/link';
import { useAuth } from '../_contexts/authContext';
import { usePathname } from 'next/navigation';

const navigationRoutes = ['adminpage']

export default function Header(){
    const { logout } = useAuth();
    const pathname = usePathname()

    return (
        <div className=" bg-[#1e1e24]">
            <div className=" mx-auto max-w-screen-xl " >
                <div className="flex items-center justify-between px-6 py-3 mx-auto ">
                    <Link href='/' className="flex">
                        <svg width="570" height="90" xmlns="http://www.w3.org/2000/svg">
                            <path transform="scale(0.85) translate(570, 0)" d="M54.3 52.2c-0.2-0.8-0.6-1.6-1.3-2.2l-7.8-6.5 9.4-7.6c1-0.8 1.8-1.9 2.2-3l18.7 14.8c1.6 1.3 3.9 1 5.2-0.6 1.3-1.6 1-3.9-0.6-5.2L57 23.6c-0.7-0.6-1.6-0.8-2.5-0.8l0 0c0 0-14.5 1.2-23.3 11.6-8.3 9.7 13.2 19.4 16.3 20.7l3.7 20.4c0.3 1.8 1.9 3 3.6 3 0.2 0 0.4 0 0.7-0.1 2-0.4 3.3-2.3 3-4.3L54.3 52.2zM70.1 28.2c4.3 0 7.8-3.5 7.8-7.8 0-4.3-3.5-7.8-7.8-7.8s-7.8 3.5-7.8 7.8C62.3 24.7 65.8 28.2 70.1 28.2zM25.1 53.4c-9.4 0-17 7.6-17 17 0 9.4 7.6 17 17 17s17-7.6 17-17C42.1 61.1 34.5 53.4 25.1 53.4zM25.1 80.1c-5.3 0-9.6-4.3-9.6-9.6 0-5.3 4.3-9.6 9.6-9.6s9.6 4.3 9.6 9.6C34.8 75.8 30.5 80.1 25.1 80.1zM78.6 53.4c-9.4 0-17 7.6-17 17 0 9.4 7.6 17 17 17s17-7.6 17-17C95.5 61.1 87.9 53.4 78.6 53.4zM78.6 80.1c-5.3 0-9.6-4.3-9.6-9.6 0-5.3 4.3-9.6 9.6-9.6 5.3 0 9.6 4.3 9.6 9.6C88.2 75.8 83.9 80.1 78.6 80.1z" fill="#f36527" data-fill-palette-color="accent">
                            </path>
                            <rect x="474.6820907227949" y="27.315669959025236" width="3.4999186561076554" height="39.00396980806555" fill="#89939e" opacity="1" strokeWidth="0" stroke="transparent" fillOpacity="1" className="rect-r-0" data-fill-palette-color="primary" rx="1%" color="#89939e">
                            </rect>
                            <path transform="translate(0, 60)" d="M20.6-18.2L20.6-14.65 7.9-14.65 7.9 0 3.85 0 3.85-33.7 22.35-33.7 22.35-30.15 7.9-30.15 7.9-18.2 20.6-18.2ZM35.85-3.05L35.85-3.05Q38.55-3.05 40.15-4.58 41.75-6.1 41.75-8.45L41.75-8.45 41.75-11.7 37.35-11.7Q34.15-11.7 32.55-10.45 30.95-9.2 30.95-7.3 30.95-5.4 32.2-4.23 33.45-3.05 35.85-3.05ZM41.8 0L41.8-3Q39.85 0.25 34.7 0.25L34.7 0.25Q31.15 0.25 28.97-1.85 26.8-3.95 26.8-7.15L26.8-7.15Q26.8-10.8 29.57-12.83 32.35-14.85 37.15-14.85L37.15-14.85 41.75-14.85 41.75-16.15Q41.75-19.15 40.4-20.68 39.05-22.2 35.85-22.2L35.85-22.2Q31.8-22.2 28.65-20.05L28.65-20.05 28.65-24Q31.5-25.75 36.15-25.75L36.15-25.75Q45.7-25.75 45.7-16.05L45.7-16.05 45.7 0 41.8 0ZM72.7-17.45L72.7 0 68.75 0 68.75-16.4Q68.75-19.2 67.32-20.68 65.9-22.15 63.59-22.15L63.59-22.15Q60.75-22.15 58.67-19.95 56.59-17.75 56.59-13.85L56.59-13.85 56.59 0 52.7 0 52.7-25.35 56.59-25.35 56.59-20.95Q58.84-25.7 64.59-25.7L64.59-25.7Q68.3-25.7 70.5-23.45 72.7-21.2 72.7-17.45L72.7-17.45ZM92.39-4.4L92.39-0.65Q90.74 0.25 88.69 0.25L88.69 0.25Q81.19 0.25 81.19-7.4L81.19-7.4 81.19-22.15 77.14-22.15 77.14-25.35 81.19-25.35 81.19-31.65 85.14-31.65 85.14-25.35 92.14-25.35 92.14-22.15 85.14-22.15 85.14-7.3Q85.14-3.25 88.94-3.25L88.94-3.25Q90.89-3.25 92.39-4.4L92.39-4.4ZM105.89-3.05L105.89-3.05Q108.59-3.05 110.19-4.58 111.79-6.1 111.79-8.45L111.79-8.45 111.79-11.7 107.39-11.7Q104.19-11.7 102.59-10.45 100.99-9.2 100.99-7.3 100.99-5.4 102.24-4.23 103.49-3.05 105.89-3.05ZM111.84 0L111.84-3Q109.89 0.25 104.74 0.25L104.74 0.25Q101.19 0.25 99.02-1.85 96.84-3.95 96.84-7.15L96.84-7.15Q96.84-10.8 99.62-12.83 102.39-14.85 107.19-14.85L107.19-14.85 111.79-14.85 111.79-16.15Q111.79-19.15 110.44-20.68 109.09-22.2 105.89-22.2L105.89-22.2Q101.84-22.2 98.69-20.05L98.69-20.05 98.69-24Q101.54-25.75 106.19-25.75L106.19-25.75Q115.74-25.75 115.74-16.05L115.74-16.05 115.74 0 111.84 0ZM137.99-6.75L137.99-6.75Q137.99-3.5 135.71-1.6 133.44 0.3 129.49 0.3L129.49 0.3Q124.89 0.3 122.04-1.25L122.04-1.25 122.04-5.1Q125.39-3.1 129.24-3.1L129.24-3.1Q131.54-3.1 132.74-4 133.94-4.9 133.94-6.45L133.94-6.45Q133.94-8.25 132.61-9.25 131.29-10.25 128.19-11.5L128.19-11.5Q125.34-12.6 123.61-14.25 121.89-15.9 121.89-18.7L121.89-18.7Q121.89-21.85 124.26-23.73 126.64-25.6 130.19-25.6L130.19-25.6Q134.14-25.6 136.54-24.5L136.54-24.5 136.54-20.75Q134.24-22.15 130.24-22.15L130.24-22.15Q128.24-22.15 127.06-21.23 125.89-20.3 125.89-18.85L125.89-18.85Q125.89-17.95 126.24-17.28 126.59-16.6 127.61-15.95 128.64-15.3 129.11-15.08 129.59-14.85 131.19-14.15L131.19-14.15Q134.39-12.85 136.19-11.2 137.99-9.55 137.99-6.75ZM163.49-25.35L154.34-0.65Q152.38 4.5 149.71 6.6 147.03 8.7 143.59 8.7L143.59 8.7Q142.28 8.7 141.49 8.45L141.49 8.45 141.49 4.9Q142.24 5.1 143.19 5.1L143.19 5.1Q148.24 5.1 150.34-0.65L150.34-0.65 140.09-25.35 144.53-25.35 147.84-17 152.28-5.5Q152.69-6.8 156.28-17L156.28-17 159.24-25.35 163.49-25.35Z" fill="#fff" data-fill-palette-color="primary">
                            </path>
                            <path transform="translate(0, 60)" d="M203.69-5.95L203.69-1.7Q200.59 0.4 195.19 0.4L195.19 0.4Q187.59 0.4 182.84-4.28 178.09-8.95 178.09-17L178.09-17Q178.09-24.6 182.91-29.38 187.74-34.15 195.04-34.15L195.04-34.15Q200.29-34.15 203.59-32.35L203.59-32.35 203.59-28.2Q201.39-29.35 199.64-29.85 197.89-30.35 195.04-30.35L195.04-30.35Q189.59-30.35 185.96-26.65 182.34-22.95 182.34-17L182.34-17Q182.34-10.8 185.94-7.1 189.54-3.4 195.49-3.4L195.49-3.4Q200.29-3.4 203.69-5.95L203.69-5.95ZM229.58-25.35L220.44-0.65Q218.49 4.5 215.81 6.6 213.14 8.7 209.69 8.7L209.69 8.7Q208.39 8.7 207.58 8.45L207.58 8.45 207.58 4.9Q208.33 5.1 209.29 5.1L209.29 5.1Q214.33 5.1 216.44-0.65L216.44-0.65 206.19-25.35 210.64-25.35 213.94-17 218.39-5.5Q218.79-6.8 222.39-17L222.39-17 225.33-25.35 229.58-25.35ZM251.53-4.65L251.53-0.9Q249.13 0.55 245.63 0.55L245.63 0.55Q239.63 0.55 236.11-3.28 232.58-7.1 232.58-12.6L232.58-12.6Q232.58-18 236.11-21.9 239.63-25.8 245.73-25.8L245.73-25.8Q248.98-25.8 251.53-24.4L251.53-24.4 251.53-20.65Q249.23-22.2 246.13-22.2L246.13-22.2Q241.83-22.2 239.26-19.43 236.68-16.65 236.68-12.55L236.68-12.55Q236.73-8.45 239.18-5.73 241.63-3 246.13-3L246.13-3Q249.03-3 251.53-4.65L251.53-4.65ZM261.78-35.35L261.78 0 257.83 0 257.83-35.35 261.78-35.35ZM273.43-25.35L273.43 0 269.48 0 269.48-25.35 273.43-25.35ZM273.28-35.15Q274.03-34.4 274.03-33.3 274.03-32.2 273.28-31.48 272.53-30.75 271.43-30.75 270.33-30.75 269.6-31.48 268.88-32.2 268.88-33.3 268.88-34.4 269.6-35.15 270.33-35.9 271.43-35.9 272.53-35.9 273.28-35.15ZM300.93-17.45L300.93 0 296.98 0 296.98-16.4Q296.98-19.2 295.55-20.68 294.13-22.15 291.83-22.15L291.83-22.15Q288.98-22.15 286.9-19.95 284.83-17.75 284.83-13.85L284.83-13.85 284.83 0 280.93 0 280.93-25.35 284.83-25.35 284.83-20.95Q287.08-25.7 292.83-25.7L292.83-25.7Q296.53-25.7 298.73-23.45 300.93-21.2 300.93-17.45L300.93-17.45ZM328.37-25.35L328.37-2.05Q328.37 3.75 325.17 6.68 321.97 9.6 316.92 9.6L316.92 9.6Q312.32 9.6 309.07 8.05L309.07 8.05 309.07 4.1Q312.27 5.95 316.57 5.95L316.57 5.95Q320.22 5.95 322.32 4 324.42 2.05 324.42-2.1L324.42-2.1 324.42-4.95Q321.92-0.65 316.97-0.65L316.97-0.65Q312.62-0.65 309.55-3.85 306.47-7.05 306.47-12.75L306.47-12.75Q306.47-18.4 309.32-22.05 312.17-25.7 316.77-25.7L316.77-25.7Q321.97-25.7 324.42-21.15L324.42-21.15 324.42-25.35 328.37-25.35ZM310.57-12.85L310.57-12.85Q310.57-8.6 312.67-6.38 314.77-4.15 317.42-4.15L317.42-4.15Q320.17-4.15 322.3-6.28 324.42-8.4 324.42-12.6L324.42-12.6Q324.42-17.45 322.37-19.8 320.32-22.15 317.62-22.15L317.62-22.15Q314.37-22.15 312.47-19.58 310.57-17 310.57-12.85Z" fill="#f36527" data-fill-palette-color="secondary">
                            </path>
                            <path transform="translate(0, 60)" d="M370.67-2.8L370.72-2.65Q366.67 0.4 360.27 0.4L360.27 0.4Q352.47 0.4 347.72-4.23 342.97-8.85 342.97-16.9L342.97-16.9Q342.97-24.55 347.69-29.43 352.42-34.3 359.62-34.3L359.62-34.3Q365.57-34.3 369.47-32L369.47-32 369.47-27.65Q365.37-30.35 359.97-30.35L359.97-30.35Q354.32-30.35 350.77-26.68 347.22-23 347.22-16.9L347.22-16.9Q347.22-10.65 350.72-7.08 354.22-3.5 360.37-3.5L360.37-3.5Q363.77-3.5 366.67-4.85L366.67-4.85 366.67-15.35 359.27-15.35 359.27-18.9 370.72-18.9 370.72-2.8 370.67-2.8ZM385.47-3.05L385.47-3.05Q388.17-3.05 389.77-4.58 391.37-6.1 391.37-8.45L391.37-8.45 391.37-11.7 386.97-11.7Q383.77-11.7 382.17-10.45 380.57-9.2 380.57-7.3 380.57-5.4 381.82-4.23 383.07-3.05 385.47-3.05ZM391.42 0L391.42-3Q389.47 0.25 384.32 0.25L384.32 0.25Q380.77 0.25 378.59-1.85 376.42-3.95 376.42-7.15L376.42-7.15Q376.42-10.8 379.19-12.83 381.97-14.85 386.77-14.85L386.77-14.85 391.37-14.85 391.37-16.15Q391.37-19.15 390.02-20.68 388.67-22.2 385.47-22.2L385.47-22.2Q381.42-22.2 378.27-20.05L378.27-20.05 378.27-24Q381.12-25.75 385.77-25.75L385.77-25.75Q395.32-25.75 395.32-16.05L395.32-16.05 395.32 0 391.42 0ZM436.21-17.4L436.21 0 432.26 0 432.26-16.4Q432.26-22.15 427.41-22.15L427.41-22.15Q425.01-22.15 423.11-19.98 421.21-17.8 421.21-13.85L421.21-13.85 421.21 0 417.26 0 417.26-16.4Q417.26-22.15 412.41-22.15L412.41-22.15Q410.01-22.15 408.11-19.98 406.21-17.8 406.21-13.85L406.21-13.85 406.21 0 402.31 0 402.31-25.35 406.21-25.35 406.21-21.25Q408.31-25.7 413.36-25.7L413.36-25.7Q419.21-25.7 420.76-20.75L420.76-20.75Q421.86-23.15 423.84-24.43 425.81-25.7 428.26-25.7L428.26-25.7Q432.21-25.7 434.21-23.45 436.21-21.2 436.21-17.4L436.21-17.4ZM461.71-5L461.71-1.3Q458.76 0.25 454.51 0.25L454.51 0.25Q448.76 0.25 445.24-3.28 441.71-6.8 441.71-12.6L441.71-12.6Q441.71-18.65 444.86-22.15 448.01-25.65 452.96-25.65L452.96-25.65Q457.71-25.65 460.51-22.6 463.31-19.55 463.31-13.95L463.31-13.95Q463.31-12.35 463.06-11L463.06-11 445.76-11Q446.21-7.25 448.61-5.25 451.01-3.25 454.91-3.25L454.91-3.25Q459.16-3.25 461.71-5L461.71-5ZM452.96-22.2L452.96-22.2Q450.11-22.2 448.11-20.15 446.11-18.1 445.76-14.3L445.76-14.3 459.36-14.3 459.36-15.3Q459.36-18.45 457.66-20.33 455.96-22.2 452.96-22.2Z" fill="#fff" data-fill-palette-color="primary">
                            </path>
                        </svg>
                    </Link>
                    <div className="">
                        <nav>
                            {
                                pathname === '/' &&
                                <Link href={"/login"} className=" text-xl border-4 font-bold rounded-3xl p-2 bg-[#1e1e24] text-white hover:bg-white hover:text-black hover:border-black hover:border-dotted ">Login</Link>
                                ||
                                navigationRoutes.map((route) => {
                                    return (
                                        <Link 
                                        key={route} 
                                        href={`/${route}`}
                                        className={`text-xl pr-3 text-white ${pathname === `/${route}`? "underline" : ""} `}
                                        >
                                            {route}
                                        </Link>
                                    )
                                })
                                &&
                                pathname !== '/login' &&
                                <button onClick={() => logout()} className=" text-xl border-4 font-bold rounded-3xl p-2 bg-[#1e1e24] text-white hover:bg-white hover:text-black hover:border-black hover:border-dotted ">Logout</button>
                            }
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}