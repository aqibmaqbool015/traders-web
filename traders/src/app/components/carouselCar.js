import 'flowbite';
import { Carousel } from 'flowbite';
import { useEffect } from 'react';

export const CarouselCar = () => {
    const image = {
        vector: '/car-slide.png'
    };

    useEffect(() => {
        // Check for the presence of window
        if (typeof window !== 'undefined') {
            const carouselElement = document.querySelector('[data-carousel]');
            if (carouselElement) {
                try {
                    const carousel = new Carousel(carouselElement, {
                        interval: 5000,
                    });
                    carousel.cycle();
                } catch (error) {
                    console.error("Carousel initialization error:", error);
                }
            }
        }
    }, []);

    return (
        <div data-carousel="slide" className="relative">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <div className="carousel-item" data-carousel-item="0">
                    <img src={image.vector} alt="Slide 1" />
                </div>
                <div className="carousel-item" data-carousel-item="1">
                    <img src={image.vector} alt="Slide 2" />
                </div>
                <div className="carousel-item" data-carousel-item="2">
                    <img src={image.vector} alt="Slide 3" />
                </div>
            </div>

            {/* <div className="absolute z-30 flex -translate-x-1/2 left-1/2 space-x-3 rtl:space-x-reverse">
                <button type="button" className="w-3 h-3 rounded-full bg-[#FBD4A5] hover:bg-[#FF8C00] active:bg-[#FF8C00]" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" className="w-3 h-3 rounded-full bg-[#FBD4A5] hover:bg-[#FF8C00] active:bg-[#FF8C00]" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" className="w-3 h-3 rounded-full bg-[#FBD4A5] hover:bg-[#FF8C00] active:bg-[#FF8C00]" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
            </div> */}
        </div>
    );
};
