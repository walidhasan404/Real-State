import React, { useRef } from 'react';

const Banner = () => {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative">
            <div ref={carouselRef} className="carousel carousel-end h-64 lg:h-96 shadow-lg overflow-hidden scroll-smooth snap-x">
                <div className="carousel-item w-full flex-shrink-0">
                    <img className="w-full h-full object-cover" src="https://i.ibb.co/mhVThhv/hand-holding-small-house-with-tree-growing-out-it.jpg" alt="House with tree" />
                </div>
                <div className="carousel-item w-full flex-shrink-0">
                    <img className="w-full h-full object-cover" src="https://i.ibb.co/s2ssLL7/04.jpg" alt="Forest Path" />
                </div>
                <div className="carousel-item w-full flex-shrink-0">
                    <img className="w-full h-full object-cover" src="https://i.ibb.co/G56npWL/02.jpg" alt="Mountain view" />
                </div>
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
                <button onClick={scrollLeft} className="btn btn-circle btn-sm bg-white text-gray-800 hover:bg-gray-200">❮</button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
                <button onClick={scrollRight} className="btn btn-circle btn-sm bg-white text-gray-800 hover:bg-gray-200">❯</button>
            </div>
        </div>
    );
};

export default Banner;
