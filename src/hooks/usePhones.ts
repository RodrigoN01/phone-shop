import { useState, useEffect } from "react";
import { getPhones } from "../services/api";

export function usePhones(search?: string) {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setLoading(true);
        const data = await getPhones(search);
        setPhones(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch phones")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, [search]);

  return { phones, loading, error };
}
