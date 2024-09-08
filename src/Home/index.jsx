import React, { useEffect } from 'react';
import img from '../assets/images/home_cover.svg';
import { Link } from 'react-router-dom';

export default function Home() {

  useEffect(()=>{
    window.scrollTo({top:0,behavior:'smooth'});},[]);
  return (
    <div className='mt-20'>
      <div className="flex items-center justify-center bg-gradient-to-b  to-hero-gradient-end pt-[30px] pb-[30px] xl:pt-[50px] xl:pb-[93px] from-hero-gradient-start overflow-hidden">
        <div style={{ maxWidth: 1536, margin: "auto", width: "100%" }}>
          <div className="m-auto w-[90%]">
            <div className="flex flex-col-reverse items-center justify-center md:flex  md:flex-col-reverse lg:flex-row">
              <div className="mt-[24px] flex flex-1 flex-col md:mt-0">
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="mb-[8px] md:mt-[90px]">
                      <p className="relative z-[2] text-center md:text-center lg:text-left">
                        <span className="text-center text-[20px] font-[500] text-[#424242] md:text-center md:text-[20px] md:font-[400] lg:text-left">
                          Hey &nbsp;
                        </span>
                        <span className="text-center text-[20px] font-[500] text-primary md:text-left md:text-[20px] md:font-[400]">
                          I am Raj Maisuriya
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-[8px] lg:items-start">
                      <h1 className="relative z-[2] text-center text-[25px] font-[600] text-[#37474F] sm:text-[28px] md:text-center md:text-[28px] lg:text-left lg:text-[38px]">
                        Full Stack Web Developer<br />
                        <span className="text-primary" />
                      </h1>
                      <h5 className="relative z-[2] w-4/5 text-center text-[15px] text-[#37474F] md:w-full md:text-[25px] lg:text-left">
                        Bring your ideas to life!&nbsp;
                        <span className="text-primary" />
                      </h5>
                    </div>
                  </div>
                  <div className="relative z-[2] flex justify-center py-5 md:justify-center lg:justify-start">
                    <div className="min-w-[140px] rounded-[7px] bg-[#0095ff] px-[24px] py-[12px] text-center md:min-w-[300px]">
                      <p className="text-[14px] font-[500] text-[#FFFFFF] md:text-[23px]">
                        <Link to="/profile">See My Profile!</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-[1.4] justify-center">
                <div className="relative z-[2] h-[350px] w-[90%] md:h-[500px] md:w-[95%]">
                  <img
                    className="bg-cover img-filter img-animation"
                    src={img}
                    alt="Home cover image"
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="-z-1 absolute right-0 hidden lg:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={447}
            height={859}
            fill="none"
            viewBox="0 0 447 859"
          >
            <path
              fill="#B0C5B2"
              fillOpacity="0.35"
              fillRule="evenodd"
              d="M447 .611c-60.498 4.221-120.172 14.48-175.846 30.47a748.63 748.63 0 00-16.77 5.028 693.876 693.876 0 00-17.227 4.568c-31.385 8.757-61.388 19.553-89.295 32.319C95.38 97.338 52.715 135.117 24.242 182.46c-25.382 44.247-33.051 95.069-8.005 144.48a155.781 155.781 0 002.786 5.245c.65 1.856 1.34 3.712 2.069 5.566 11.492 29.261 32.681 58.3 65.99 85.828 27.05 22.37 58.675 38.309 90.332 54.265 28.792 14.511 57.611 29.036 83.039 48.426a240.852 240.852 0 0113.795 11.335c.659 1.03 1.311 2.064 1.954 3.102 19.886 32.087 32.125 67.603 44.263 102.824 18.121 52.585 36.016 104.512 78.795 143.382.625.568 1.256 1.134 1.892 1.696.353.755.709 1.508 1.067 2.26 11.612 24.385 25.739 47.359 44.781 67.739v-1.468c-18.064-19.525-31.662-41.423-42.903-64.671 7.722 6.496 16.209 12.592 25.586 18.226l.003.002A180.084 180.084 0 00447 819.799v-2.203a178.249 178.249 0 01-16.289-8.615c-10.683-6.419-20.199-13.443-28.74-20.981-10.678-22.835-19.244-46.891-27.654-71.22a6601.1 6601.1 0 01-2.723-7.894c-21.218-61.574-42.805-124.221-96.581-171.938-13.233-20.653-29.784-39.833-51.689-56.513-22.627-17.253-48.26-30.173-73.773-43.031l-3.835-1.933c-26.803-13.525-53.307-27.221-76.112-46.081v-.001c-22.526-18.615-38.753-37.991-49.665-57.613a153.513 153.513 0 01-6.793-26.917c-6.273-39.868 3.9-79.293 24.368-114.975 31.997-53.202 79.947-95.666 138.95-123.032 24.731-11.313 50.925-21.252 78.191-29.78C315.828 21.688 381.632 13.871 447 14.11v-2c-53.64-.195-107.577 5.02-159.03 15.38C338.76 14.119 392.544 5.419 447 1.615V.61zM148.281 73.904c22.665-10.368 46.716-19.434 71.769-27.162-15.246 5.631-30.078 11.731-44.421 18.292l-.004.002c-59.352 27.528-107.617 70.261-139.83 123.826l-.006.008-.005.009c-20.642 35.983-30.973 75.87-24.614 116.29.84 5.342 1.972 10.69 3.409 16.038-5.553-12.098-9.167-24.254-11.07-36.35-5.558-35.325 3.455-70.262 21.596-101.89 28.364-47.159 70.87-84.803 123.176-109.063zM87.719 422.809c-31.135-25.731-51.608-52.753-63.455-80.004 10.704 16.405 25.212 32.545 44.065 48.126 23.003 19.023 49.702 32.811 76.486 46.325l3.785 1.909c25.556 12.88 51.037 25.723 73.512 42.861h.001c19.613 14.936 34.897 31.892 47.347 50.145a241.92 241.92 0 00-8.4-6.695c-25.505-19.448-54.4-34.011-83.171-48.512l-2.941-1.482-1.38-.696c-30.222-15.25-60.121-30.7-85.849-51.977zm233.667 220.326c-11.743-34.078-23.617-68.539-42.486-99.923 49.581 46.718 70.302 106.841 90.852 166.468l.039.115c.878 2.548 1.756 5.094 2.636 7.639 7.887 22.814 15.931 45.465 25.76 67.135-39.458-36.767-57.279-84.947-74.383-134.425-.801-2.315-1.599-4.633-2.399-6.953l-.019-.056z"
              clipRule="evenodd"
            />
          </svg>
        </div>

      </div>

    </div>
  )
}
