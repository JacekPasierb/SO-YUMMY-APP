import axios, { AxiosError } from "axios";

export const uploadImage = async (file: File | null): Promise<string> => {
  if (!file) {
    throw new Error("No file selected");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "alex_preset");

  try {
    const response = await axios.post<{ secure_url: string }>("/api/ownRecipes/picture", formData);
    
    if (!response.data.secure_url) {
      throw new Error("Invalid response from server");
    }

    return response.data.secure_url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Error uploading image:", axiosError.response?.data || axiosError.message);
      throw new Error(`Image upload failed: ${axiosError.response?.data || axiosError.message}`);
    } else {
      console.error("Error uploading image:", error);
      throw new Error("Image upload failed due to an unexpected error");
    }
  }
};
