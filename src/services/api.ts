const API_URL = "https://prueba-tecnica-api-tienda-moviles.onrender.com";
const API_KEY = "87909682e6cd74208f41a6ef39fe4191";

const headers = {
  "x-api-key": API_KEY,
  "Content-Type": "application/json",
};

export const getPhones = async (search?: string) => {
  const url = search
    ? `${API_URL}/products?search=${encodeURIComponent(search)}`
    : `${API_URL}/products`;

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch phones");
  }

  return response.json();
};

export const getPhoneById = async (id: string) => {
  const response = await fetch(`${API_URL}/products/${id}`, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch phone details");
  }

  return response.json();
};
