import React from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Не найдены VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY"
  );
}

const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

function App() {
  const [active, setActive] = React.useState("home");
  const [locations, setLocations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    loadLocations();
  }, []);

  async function loadLocations() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase locations error:", error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setLocations(data || []);
    setLoading(false);
  }

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          min-height: 100%;
        }

        body {
          background: #f5f3ef;
          color: #202020;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        button {
          font: inherit;
        }

        .app {
          min-height: 100vh;
          padding-bottom: 100px;
        }

        .header {
          position: sticky;
          top: 0;
          z-index: 10;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 16px;

          background: rgba(245, 243, 239, 0.94);
          backdrop-filter: blur(16px);

          border-bottom: 1px solid rgba(0,0,0,.06);
        }

        .logo {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.8px;
        }

        .caption {
          margin-top: 3px;
          color: #918b83;
          font-size: 11px;
        }

        .avatar {
          width: 42px;
          height: 42px;
          border: 0;
          border-radius: 50%;
          background: #d8cec1;
          color: #292621;
          font-weight: 800;
          cursor: pointer;
        }

        .content {
          width: min(760px, 100%);
          margin: 0 auto;
          padding: 18px 16px;
        }

        .hero {
          min-height: 330px;
          padding: 28px;

          display: flex;
          flex-direction: column;
          justify-content: flex-end;

          border-radius: 30px;
          overflow: hidden;

          background:
            linear-gradient(
              135deg,
              #d4c4b1 0%,
              #eee5da 52%,
              #cbd5cd 100%
            );
        }

        .eyebrow {
          color: #857d73;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .hero h1 {
          margin: 12px 0;
          font-size: clamp(44px, 11vw, 76px);
          line-height: .88;
          letter-spacing: -4px;
        }

        .hero h1 em {
          font-family: Georgia, serif;
          font-weight: 400;
        }

        .hero p {
          max-width: 420px;
          margin: 0;
          color: #5f5951;
          line-height: 1.5;
        }

        .sectionTitle {
          margin: 28px 0 14px;
          font-size: 25px;
          letter-spacing: -.9px;
        }

        .status {
          padding: 20px;
          border-radius: 20px;
          background: white;
          color: #777169;
        }

        .error {
          padding: 20px;
          border-radius: 20px;
          background: #fff0f0;
          color: #b42318;
          line-height: 1.5;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(250px, 1fr)
          );
          gap: 14px;
        }

        .card {
          overflow: hidden;
          background: #fff;
          border-radius: 23px;
          box-shadow: 0 10px 30px rgba(0,0,0,.05);
        }

        .card img {
          display: block;
          width: 100%;
          height: 220px;
          object-fit: cover;
          background: #e8e3dc;
        }

        .cardBody {
          padding: 16px;
        }

        .tag {
          display: inline-block;
          margin: 0 5px 9px 0;
          padding: 6px 9px;
          border-radius: 999px;
          background: #f0ece6;
          color: #7d766e;
          font-size: 10px;
        }

        .card h3 {
          margin: 0 0 7px;
          font-size: 20px;
          letter-spacing: -.5px;
        }

        .card p {
          margin: 0 0 10px;
          color: #777169;
          font-size: 13px;
          line-height: 1.45;
        }

        .rating {
          color: #8a6f35;
          font-size: 13px;
          font-weight: 700;
        }

        .profile {
          padding: 28px 10px;
        }

        .profileCard {
          padding: 26px;
          text-align: center;
          background: white;
          border-radius: 26px;
        }

        .profileAvatar {
          width: 90px;
          height: 90px;
          margin: 0 auto 15px;

          display: grid;
          place-items: center;

          border-radius: 50%;
          background: #d8cec1;

          font-size: 30px;
          font-weight: 800;
        }

        .profileCard h1 {
          margin: 0 0 6px;
          font-size: 28px;
        }

        .profileCard p {
          margin: 0;
          color: #858078;
        }

        .bottomNav {
          position: fixed;
          left: 12px;
          right: 12px;
          bottom: 12px;
          z-index: 20;

          height: 70px;

          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: center;

          border-radius: 25px;
          background: rgba(255,255,255,.96);

          box-shadow: 0 15px 40px rgba(0,0,0,.13);
        }

        .navButton {
          border: 0;
          background: transparent;
          color: #99928a;
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
        }

        .navButton span {
          display: block;
          margin-bottom: 3px;
          font-size: 22px;
        }

        .navButton.active {
          color: #202020;
        }

        .plus {
          justify-self: center;

          width: 44px;
          height: 44px;

          border-radius: 50%;
          border: 0;

          background: #202020;
          color: white;

          font-size: 25px;
        }
      `}</style>

      <div className="app">
        <header className="header">
          <div>
            <div className="logo">В кадре</div>
            <div className="caption">
              места • люди • моменты
            </div>
          </div>

          <button
            className="avatar"
            onClick={() => setActive("profile")}
          >
            А
          </button>
        </header>

        <main className="content">
          {active === "home" && (
            <>
              <section className="hero">
                <div className="eyebrow">
                  твоя лента
                </div>

                <h1>
                  Найди место
                  <br />
                  <em>в кадре.</em>
                </h1>

                <p>
                  Локации для прогулок, свиданий,
                  вдохновения и красивых фотографий.
                </p>
              </section>

              <h2 className="sectionTitle">
                Популярные места
              </h2>

              {loading && (
                <div className="status">
                  Загружаем локации…
                </div>
              )}

              {!loading && error && (
                <div className="error">
                  <strong>Не удалось загрузить локации.</strong>
                  <br />
                  <br />
                  {error}
                </div>
              )}

              {!loading &&
                !error &&
                locations.length === 0 && (
                  <div className="status">
                    В Supabase пока нет локаций.
                  </div>
                )}

              {!loading &&
                !error &&
                locations.length > 0 && (
                  <div className="grid">
                    {locations.map((location) => (
                      <article
                        className="card"
                        key={location.id}
                      >
                        {location.image_url && (
                          <img
                            src={location.image_url}
                            alt={location.name}
                          />
                        )}

                        <div className="cardBody">
                          {location.emoji && (
                            <div className="tag">
                              {location.emoji}
                            </div>
                          )}

                          {Array.isArray(location.tags) &&
                            location.tags.map((tag) => (
                              <div
                                className="tag"
                                key={tag}
                              >
                                #{tag}
                              </div>
                            ))}

                          <h3>{location.name}</h3>

                          <p>
                            {location.description}
                          </p>

                          {location.rating && (
                            <div className="rating">
                              ★ {location.rating}
                            </div>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
            </>
          )}

          {active === "profile" && (
            <section className="profile">
              <div className="profileCard">
                <div className="profileAvatar">
                  А
                </div>

                <h1>Анастасия</h1>

                <p>
                  Добро пожаловать в мой профиль
                </p>
              </div>
            </section>
          )}
        </main>

        <nav className="bottomNav">
          <button
            className={
              active === "home"
                ? "navButton active"
                : "navButton"
            }
            onClick={() => setActive("home")}
          >
            <span>⌂</span>
            Главная
          </button>

          <button
            className="navButton plus"
            onClick={() =>
              alert("Добавление локации")
            }
          >
            +
          </button>

          <button
            className={
              active === "profile"
                ? "navButton active"
                : "navButton"
            }
            onClick={() => setActive("profile")}
          >
            <span>○</span>
            Профиль
          </button>
        </nav>
      </div>
    </>
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
