import { useState, useEffect } from "react";
import { getPhoneById } from "../services/api";
import { Phone } from "@/types";

export function usePhone(id: string) {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPhone = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getPhoneById(id);
        setPhone(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch phone details")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPhone();
  }, [id]);

  return { phone, loading, error };
}
