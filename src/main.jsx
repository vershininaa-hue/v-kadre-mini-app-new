import React from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL;

const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const demoLocations = [
  {
    id: 1,
    title: "Патриаршие пруды",
    description:
      "Атмосферное место для прогулок и красивых кадров.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85",
    rating: 4.8,
    emoji: "🌿",
    tags: ["прогулка", "свидание", "фото"],
  },
  {
    id: 2,
    title: "Зарядье",
    description:
      "Панорамы, вечерний свет и красивые виды.",
    image:
      "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=1200&q=85",
    rating: 4.7,
    emoji: "🌆",
    tags: ["вид", "закат", "город"],
  },
  {
    id: 3,
    title: "Парк Горького",
    description:
      "Зелень, вода, прогулки и много пространства.",
    image:
      "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1200&q=85",
    rating: 4.9,
    emoji: "🌳",
    tags: ["парк", "прогулка", "природа"],
  },
];

function App() {
  const [active, setActive] =
    React.useState("home");

  const [locations, setLocations] =
    React.useState(demoLocations);

  const [loading, setLoading] =
    React.useState(true);

  const [selectedLocation, setSelectedLocation] =
    React.useState(null);

  React.useEffect(() => {
    loadLocations();
  }, []);

  async function loadLocations() {
    try {
      const { data, error } = await supabase
        .from("locations")
        .select(
          "id, created_at, name, description, emoji, moods, tags, rating, image_url, user_added"
        )
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Ошибка загрузки locations:",
          error
        );

        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        const preparedLocations = data.map(
          (item) => ({
            id: item.id,

            title:
              item.name ||
              "Без названия",

            description:
              item.description ||
              "Красивое место для прогулки.",

            image:
              item.image_url ||
              demoLocations[0].image,

            rating:
              item.rating ?? null,

            emoji:
              item.emoji || "📍",

            tags:
              Array.isArray(item.tags)
                ? item.tags
                : [],
          })
        );

        setLocations(
          preparedLocations
        );
      }
    } catch (error) {
      console.error(
        "Supabase error:",
        error
      );
    } finally {
      setLoading(false);
    }
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

          background: rgba(
            245,
            243,
            239,
            0.94
          );

          backdrop-filter: blur(16px);

          border-bottom:
            1px solid rgba(0,0,0,.06);
        }

        .logo {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -.8px;
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
          width: min(
            760px,
            100%
          );

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

          font-size:
            clamp(
              44px,
              11vw,
              76px
            );

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

        .loading {
          padding: 40px 10px;

          text-align: center;

          color: #8b847c;
        }

        .grid {
          display: grid;

          grid-template-columns:
            repeat(
              auto-fit,
              minmax(250px, 1fr)
            );

          gap: 14px;
        }

        .card {
          overflow: hidden;

          background: #fff;

          border-radius: 23px;

          box-shadow:
            0 10px 30px
            rgba(0,0,0,.05);

          cursor: pointer;
        }

        .imageWrap {
          position: relative;
        }

        .card img {
          display: block;

          width: 100%;
          height: 220px;

          object-fit: cover;
        }

        .rating {
          position: absolute;

          top: 12px;
          right: 12px;

          padding: 7px 9px;

          border-radius: 999px;

          background:
            rgba(255,255,255,.92);

          font-size: 11px;
          font-weight: 800;
        }

        .cardBody {
          padding: 16px;
        }

        .cardTop {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 9px;
        }

        .emoji {
          font-size: 21px;
        }

        .tag {
          display: inline-block;

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
          margin: 0 0 12px;

          color: #777169;

          font-size: 13px;
          line-height: 1.45;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;

          margin-bottom: 14px;
        }

        .tags span {
          color: #8b837a;
          font-size: 10px;
        }

        .openButton {
          width: 100%;
          min-height: 43px;

          border: 0;
          border-radius: 13px;

          background: #202020;
          color: white;

          font-weight: 700;
          cursor: pointer;
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

          margin:
            0 auto 15px;

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

          grid-template-columns:
            1fr 1fr 1fr;

          align-items: center;

          border-radius: 25px;

          background:
            rgba(255,255,255,.96);

          box-shadow:
            0 15px 40px
            rgba(0,0,0,.13);
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

        .modal {
          position: fixed;

          inset: 0;

          z-index: 100;

          display: flex;
          align-items: flex-end;
          justify-content: center;

          padding: 12px;

          background:
            rgba(0,0,0,.45);
        }

        .modalCard {
          position: relative;

          width: min(
            620px,
            100%
          );

          max-height: 90vh;

          overflow: auto;

          border-radius: 27px;

          background: white;
        }

        .modalCard img {
          display: block;

          width: 100%;
          height: 270px;

          object-fit: cover;
        }

        .close {
          position: absolute;

          top: 12px;
          right: 12px;

          width: 38px;
          height: 38px;

          border: 0;
          border-radius: 50%;

          background:
            rgba(255,255,255,.95);

          font-size: 24px;
          cursor: pointer;
        }

        .modalBody {
          padding: 20px;
        }

        .modalBody h2 {
          margin: 7px 0;
          font-size: 28px;
        }

        .modalBody p {
          color: #6f6961;
          line-height: 1.55;
        }

        .modalTags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .modalTags span {
          padding: 6px 9px;

          border-radius: 999px;

          background: #f0ece6;

          color: #777169;

          font-size: 10px;
        }
      `}</style>

      <div className="app">

        <header className="header">

          <div>
            <div className="logo">
              В кадре
            </div>

            <div className="caption">
              места • люди • моменты
            </div>
          </div>

          <button
            className="avatar"
            onClick={() =>
              setActive("profile")
            }
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
                  Локации для прогулок,
                  свиданий, вдохновения
                  и красивых фотографий.
                </p>

              </section>

              <h2 className="sectionTitle">
                Популярные места
              </h2>

              {loading ? (
                <div className="loading">
                  Загружаем локации из Supabase…
                </div>
              ) : (

                <div className="grid">

                  {locations.map(
                    (location) => (

                      <article
                        className="card"
                        key={location.id}
                        onClick={() =>
                          setSelectedLocation(
                            location
                          )
                        }
                      >

                        <div className="imageWrap">

                          <img
                            src={location.image}
                            alt={location.title}
                            onError={(event) => {
                              event.currentTarget.src =
                                demoLocations[0].image;
                            }}
                          />

                          {location.rating && (
                            <div className="rating">
                              ★{" "}
                              {location.rating}
                            </div>
                          )}

                        </div>

                        <div className="cardBody">

                          <div className="cardTop">

                            <span className="emoji">
                              {location.emoji ||
                                "📍"}
                            </span>

                            <span className="tag">
                              локация
                            </span>

                          </div>

                          <h3>
                            {location.title}
                          </h3>

                          <p>
                            {location.description}
                          </p>

                          {location.tags.length >
                            0 && (

                            <div className="tags">

                              {location.tags
                                .slice(0, 4)
                                .map(
                                  (tag) => (
                                    <span
                                      key={tag}
                                    >
                                      #{tag}
                                    </span>
                                  )
                                )}

                            </div>

                          )}

                          <button
                            className="openButton"
                            onClick={(event) => {
                              event.stopPropagation();

                              setSelectedLocation(
                                location
                              );
                            }}
                          >
                            Открыть →
                          </button>

                        </div>

                      </article>

                    )
                  )}

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

                <h1>
                  Анастасия
                </h1>

                <p>
                  Добро пожаловать
                  в мой профиль
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
            onClick={() =>
              setActive("home")
            }
          >
            <span>⌂</span>
            Главная
          </button>

          <button
            className="navButton plus"
            onClick={() =>
              alert(
                "Добавление локации"
              )
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
            onClick={() =>
              setActive("profile")
            }
          >
            <span>○</span>
            Профиль
          </button>

        </nav>

        {selectedLocation && (

          <div
            className="modal"
            onClick={() =>
              setSelectedLocation(null)
            }
          >

            <div
              className="modalCard"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <button
                className="close"
                onClick={() =>
                  setSelectedLocation(null)
                }
              >
                ×
              </button>

              <img
                src={selectedLocation.image}
                alt={selectedLocation.title}
              />

              <div className="modalBody">

                <div className="emoji">
                  {selectedLocation.emoji ||
                    "📍"}
                </div>

                <h2>
                  {selectedLocation.title}
                </h2>

                {selectedLocation.rating && (
                  <strong>
                    ★{" "}
                    {selectedLocation.rating}
                  </strong>
                )}

                <p>
                  {
                    selectedLocation.description
                  }
                </p>

                <div className="modalTags">

                  {selectedLocation.tags.map(
                    (tag) => (
                      <span key={tag}>
                        #{tag}
                      </span>
                    )
                  )}

                </div>

              </div>

            </div>

          </div>

        )}

      </div>
    </>
  );
}

const root =
  document.getElementById("root");

if (!root) {
  throw new Error(
    "Root element not found"
  );
}

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
