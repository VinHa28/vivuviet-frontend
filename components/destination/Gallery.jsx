'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery({ images }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    if (!images || images.length === 0) return null;

    const openLightbox = (index) => {
        setSelectedImageIndex(index);
        document.body.style.overflow = 'hidden';
        setTimeout(() => setIsAnimating(true), 10);
    };

    const closeLightbox = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setSelectedImageIndex(null);
            document.body.style.overflow = 'auto';
        }, 300);
    };

    const showNext = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev + 1) % images.length);
    };

    const showPrev = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white py-3 ">
            <div className="max-w-[1170px] mx-auto px-4">
                <h2 className="text-4xl font-bold text-secondary mb-8 uppercase text-center tracking-widest font-primary">
                    Khoảnh khắc
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full auto-rows-[200px] md:auto-rows-[300px]">
                {images.slice(0, 5).map((img, idx) => (
                    <div
                        key={idx}
                        onClick={() => openLightbox(idx)}
                        className={`overflow-hidden cursor-zoom-in relative ${idx === 0 || idx === 3
                            ? 'col-span-1 row-span-2'
                            : idx === 4
                                ? 'col-span-2'
                                : 'col-span-1'
                            }`}
                    >
                        <img
                            src={img.image}
                            alt={img.alt}
                            className="absolute inset-0 w-full h-full object-cover block hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                ))}
            </div>

            {selectedImageIndex !== null && (
                <div
                    className={`fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4 md:p-10 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
                        }`}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image gallery lightbox"
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-5 right-5 text-white bg-red-600 p-2 hover:bg-red-700 transition-colors z-[1000]"
                        aria-label="Close lightbox"
                    >
                        <X className="w-6 h-6" aria-hidden="true" />
                    </button>

                    <button
                        onClick={showPrev}
                        className="absolute left-4 bg-black/40 text-white hover:text-secondary transition-colors p-2 rounded-full"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-8 h-8" aria-hidden="true" />
                    </button>

                    <div
                        className={`relative max-w-5xl max-h-full transition-all duration-500 ease-out transform ${isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={images[selectedImageIndex].image}
                            alt={images[selectedImageIndex].alt}
                            className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                            role="img"
                        />
                    </div>

                    <div className="sr-only" aria-live="polite">
                        Image {selectedImageIndex + 1} of {images.length}
                    </div>

                    <button
                        onClick={showNext}
                        className="absolute right-4 bg-black/40 text-white hover:text-secondary transition-colors p-2 rounded-full"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-8 h-8" aria-hidden="true" />
                    </button>
                </div>
            )}
        </section>
    );
}