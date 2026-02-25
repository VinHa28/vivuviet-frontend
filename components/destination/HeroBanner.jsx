export default function HeroBanner({ image, alt, title }) {
    return (
        <div className="relative w-screen h-[500px] md:h-[500px] overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <img
                src={image}
                alt={alt}
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-4">
                    <h1 className="font-script-2 text-6xl md:text-9xl text-white text-center drop-shadow-2xl">
                        {title}
                    </h1>
                </div>
            </div>
        </div>
    );
}
