import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const useOffers = (filters = {}) => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setLoading(true);
                const queryParams = new URLSearchParams();

                // Add filters based on new schema
                if (filters.type && filters.type !== "all") {
                    queryParams.append("type", filters.type);
                }
                if (filters.minPrice) {
                    queryParams.append("priceFrom", filters.minPrice);
                }
                if (filters.maxPrice) {
                    queryParams.append("priceTo", filters.maxPrice);
                }
                if (filters.province && filters.province !== "All") {
                    queryParams.append("destination", filters.province);
                }
                if (filters.sortBy) {
                    queryParams.append("sortBy", filters.sortBy);
                }
                // Filter for approved status only
                queryParams.append("status", "approved");

                const response = await fetch(
                    `${API_URL}/services?${queryParams.toString()}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch offers");
                }

                const data = await response.json();
                setOffers(data.data || []);
                setError(null);
            } catch (err) {
                setError(err.message);
                setOffers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, [filters]);

    return { offers, loading, error };
};

export const useOffer = (offerId) => {
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!offerId) return;

        const fetchOffer = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/services/${offerId}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch offer");
                }

                const data = await response.json();
                setOffer(data.data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setOffer(null);
            } finally {
                setLoading(false);
            }
        };

        fetchOffer();
    }, [offerId]);

    return { offer, loading, error };
};

export const useServiceTypes = () => {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Service types are defined in the schema
        const serviceTypes = [
            { value: "tour", label: "Tour" },
            { value: "hotel", label: "Khách sạn" },
            { value: "restaurant", label: "Nhà hàng" },
            { value: "transport", label: "Vận chuyển" },
            { value: "experience", label: "Trải nghiệm" },
            { value: "other", label: "Khác" },
        ];
        setTypes(serviceTypes);
        setLoading(false);
    }, []);

    return { types, loading, error };
};
