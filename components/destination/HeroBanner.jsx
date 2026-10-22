import Image from "next/image";

export default function HeroBanner({ image, alt, title }) {
    return (
        <div className="relative w-screen h-[500px] md:h-[500px] overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            {image && (
                <Image
                    src={image}
                    alt={alt || title || ""}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            )}

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-4">
                    <p className="font-script-2 text-6xl md:text-9xl text-white text-center drop-shadow-2xl">
                        {title}
                    </p>
                </div>
            </div>
        </div>
    );
}