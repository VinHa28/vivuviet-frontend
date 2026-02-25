'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import Button from "@/components/ui/Button";
import eventService from '@/services/eventService';

const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const EventsSection = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [currentIndex, setCurrentIndex] = useState(0);
    const [allEvents, setAllEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await eventService.getAllEvents();

                // Handle response - API trả về { success: true, data: [...], total: N }
                if (response && response.data && Array.isArray(response.data)) {
                    setAllEvents(response.data);
                    setError(null);
                } else {
                    setError('Invalid response from server');
                }
            } catch (err) {
                setError(err?.message || 'Error loading events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = useMemo(() => {
        return allEvents.filter(event => {
            const startMonth = new Date(event.startDate).getMonth();
            const endMonth = new Date(event.endDate).getMonth();
            return selectedMonth >= startMonth && selectedMonth <= endMonth;
        });
    }, [selectedMonth, allEvents]);

    const displayEvents = filteredEvents.slice(currentIndex, currentIndex + 3);

    const handleNext = () => {
        if (currentIndex + 3 < filteredEvents.length) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const formatDateRange = (startDate, endDate) => {
        const f = (d) => {
            const date = new Date(d);
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        };
        return `${f(startDate)} - ${f(endDate)}`;
    };

    const getGridColsClass = () => {
        if (displayEvents.length === 1) return 'grid-cols-1';
        if (displayEvents.length === 2) return 'grid-cols-2';
        return 'grid-cols-3';
    };

    return (
        <section className="mt-10 w-full overflow-hidden font-sans">
            <Button
                size="md"
                isButton={false}
                hoverable={false}
                className="mb-[32px]"
            >
                Sự kiện nổi bật
            </Button>

            <div className="relative group min-h-[400px]">
                {loading ? (
                    <div className="h-[400px] flex items-center justify-center bg-gray-100">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#a31d1d]"></div>
                            <p className="mt-4 text-gray-600">Đang tải sự kiện...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="h-[400px] flex items-center justify-center bg-red-50">
                        <div className="text-center">
                            <p className="text-red-600 font-semibold">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-[#a31d1d] text-white rounded hover:bg-[#8b1717]"
                            >
                                Thử lại
                            </button>
                        </div>
                    </div>
                ) : filteredEvents.length > 0 ? (
                    <div className={`grid ${getGridColsClass()}  transition-all duration-500`}>
                        {displayEvents.map((event) => (
                            <div key={event._id || event.id} className="relative h-[400px] overflow-hidden group/item animate-fadeIn">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
                                <div className="absolute top-8 left-6 right-6 text-white">
                                    <p className="text-[13px] font-medium mb-1 text-yellow-400">
                                        {event.location}
                                    </p>
                                    <h3 className="text-[20px] font-extrabold uppercase mb-2 leading-tight">
                                        {event.title}
                                    </h3>
                                    <p className="text-[12px] opacity-80 line-clamp-2 mb-2">
                                        {event.description}
                                    </p>
                                    <p className="text-[13px] font-bold border-t border-white/20 pt-2">
                                        {formatDateRange(event.startDate, event.endDate)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-[400px] flex items-center justify-center bg-gray-100 text-gray-500 italic">
                        Không có sự kiện nào nổi bật trong tháng này...
                    </div>
                )}

                {!loading && !error && filteredEvents.length > 3 && (
                    <>
                        <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 text-white rounded-full hover:bg-black/70">
                            <ChevronLeft size={30} />
                        </button>
                        <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 text-white rounded-full hover:bg-black/70">
                            <ChevronRight size={30} />
                        </button>
                    </>
                )}
            </div>

            {/* Month Timeline */}
            <div className="bg-[#a31d1d] py-10 px-6 relative"
                style={{
                    backgroundImage: "url('/images/background_events.svg')",
                    backgroundRepeat: 'repeat',
                }}>
                <div className="relative max-w-6xl mx-auto">
                    <div className="absolute top-[14px] left-0 right-0 h-[2px] bg-[#f1c40f]/30 z-0" />
                    <div className="relative z-10 flex justify-between items-center">
                        {months.map((month, idx) => {
                            const isSelected = idx === selectedMonth;
                            return (
                                <div key={idx} className="flex flex-col items-center gap-4 cursor-pointer min-w-[50px]"
                                    onClick={() => {
                                        setSelectedMonth(idx);
                                        setCurrentIndex(0);
                                    }}>
                                    <div className={`w-4 h-4 rounded-full border-[3px] border-[#f1c40f] transition-all ${isSelected ? 'bg-white scale-125 shadow-[0_0_10px_#fff]' : 'bg-transparent'
                                        }`} />
                                    <div className={`px-3 py-1 rounded-sm text-[11px] font-bold transition-all ${isSelected
                                        ? 'bg-white text-[#a31d1d] scale-110 shadow-lg'
                                        : 'bg-[#f1c40f] text-[#a31d1d] hover:bg-yellow-400'
                                        }`}>
                                        {month}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventsSection;