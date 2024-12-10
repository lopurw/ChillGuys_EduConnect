
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5220/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const register = async (userData) => {
    const response = await apiClient.post('/User/registerUser', userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await apiClient.post('/User/login', userData);
    return response.data;
};

export const getAllCourses = async (pageNumber = 1, pageSize = 100) => {
    const params = {
        pageNumber: pageNumber,
        pageSize: pageSize
    };

    const response = await apiClient.get('Course/getCourses', { params });
    return response.data;
};
export const getAllStudentCourses = async (studentId,pageNumber = 1, pageSize = 100) => {
    const params = {
        studentId: studentId,
        pageNumber: pageNumber,
        pageSize: pageSize
    };


    const response = await apiClient.get('Course/getStudentCourses', { params });
    return response.data;
};

export const getCourseById = async (id) => {
    const response = await apiClient.get(`Course/getCourseById?id=${id}`);
    return response.data;
}

export const completeLesson = async ({ studentId, lessonId }) => {
    const payload = {
        studentId: studentId,
        lessonId: lessonId
    };

    const response = await apiClient.post('Course/completeLesson', payload);
    return response.data;
};

export const fetchCourseStats = async () => {

    const response = await apiClient.get(`Course/courseCompletionStats?studentId=${localStorage.getItem('userId')}`);
    return response.data;
};

export const getAllProjects = async () => {

    const response = await apiClient.get('Project/getProjects');
    return response.data;
};

export const getProjectById = async (id) => {

    const response = await apiClient.get(`Project/getProjectById?id=${id}`);
    return response.data;
}
