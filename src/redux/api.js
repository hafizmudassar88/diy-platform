
import axiosInstance from "@/lib/axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/template`;

// Fetch Template Data
export const fetchTemplateData = async () => {
  const response = await axiosInstance.get(`${API_URL}/mine`);
  return response.data;
};

// Fetch Template Data by ID
export const fetchTemplateDataById = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

// Create Template Data
export const createTemplateData = async (newData) => {
  const response = await axiosInstance.post(`${API_URL}/create`, newData);
  return response.data;
};

// Update Template Data
export const updateTemplateData = async (id, updatedData) => {
  const response = await axiosInstance.put(`${API_URL}/update`, {
    templateId: id,
    details: updatedData,
  });
  return response.data;
};

// Delete Template Data
export const deleteTemplateData = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/delete`, {
    data: { templateId: id }, // Axios requires data in `data` for DELETE
  });
  return response.data;
};
