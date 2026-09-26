import React from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  "https://qkeouzlsvzpoouamhrzo.supabase.co";

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_ANON_KEY) {
  throw new Error(
    "Не найден VITE_SUPABASE_ANON_KEY. Добавь ключ именно проекта qkeouzlsvzpoouamhrzo в переменные Cloudflare."
  );
}

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

function App() {
  const [locations, setLocations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    loadLocations();
  }, []);

  async function loadLocations() {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setLocations(data || []);
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f3ef",
        padding: "20px",
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1>В кадре</h1>

      <p>Supabase: qkeouzlsvzpoouamhrzo</p>

      {loading && <p>Загружаем локации...</p>}

      {error && (
        <div
          style={{
            padding: 16,
            background: "#ffe5e5",
            borderRadius: 12,
            color: "#a00",
          }}
        >
          Ошибка Supabase:
          <br />
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <h2>
            Локации: {locations.length}
          </h2>

          {locations.map((location) => (
            <div
              key={location.id}
              style={{
                background: "#fff",
                padding: 16,
                marginBottom: 12,
                borderRadius: 16,
              }}
            >
              <h3>{location.name}</h3>

              <p>{location.description}</p>

              {location.image_url && (
                <img
                  src={location.image_url}
                  alt={location.name}
                  style={{
                    width: "100%",
                    maxWidth: 500,
                    borderRadius: 12,
                  }}
                />
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
