import axiosInstance from '@/lib/axios';

export const eventService = {
    // Lấy tất cả events
    getAllEvents: async (params = {}) => {
        try {
            const data = await axiosInstance.get('/events', { params });
            return data;
        } catch (error) {
            console.error('eventService.getAllEvents error:', error);
            throw error;
        }
    },

    // Lấy chi tiết event
    getEventById: async (id) => {
        try {
            const data = await axiosInstance.get(`/events/${id}`);
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Lấy events sắp tới
    getUpcomingEvents: async () => {
        try {
            const data = await axiosInstance.get('/events/upcoming');
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Lấy events đang diễn ra
    getActiveEvents: async () => {
        try {
            const data = await axiosInstance.get('/events/active');
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Tạo event mới (Admin)
    createEvent: async (eventData) => {
        try {
            const data = await axiosInstance.post('/events', eventData);
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Cập nhật event (Admin)
    updateEvent: async (id, eventData) => {
        try {
            const data = await axiosInstance.put(`/events/${id}`, eventData);
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Xóa event (Admin)
    deleteEvent: async (id) => {
        try {
            const data = await axiosInstance.delete(`/events/${id}`);
            return data;
        } catch (error) {
            throw error;
        }
    },
};

export default eventService;
