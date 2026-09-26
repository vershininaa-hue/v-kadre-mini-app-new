import React from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL;

const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase =
  SUPABASE_URL && SUPABASE_KEY
    ? createClient(
        SUPABASE_URL,
        SUPABASE_KEY
      )
    : null;

const demoLocations = [
  {
    id: "demo-1",
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
    id: "demo-2",
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
    id: "demo-3",
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

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "10px",
  border: "1px solid #e5e0d9",
  borderRadius: "13px",
  background: "#f8f6f2",
  color: "#202020",
  fontSize: "14px",
  outline: "none",
};
  
  const [active, setActive] =
    React.useState("home");

  const [locations, setLocations] =
    React.useState(demoLocations);

  const [loading, setLoading] =
    React.useState(true);

  const [selectedLocation, setSelectedLocation] =
    React.useState(null);

  const [showAddLocation, setShowAddLocation] =
  React.useState(false);

const [newLocation, setNewLocation] =
  React.useState({
    name: "",
    description: "",
    emoji: "📍",
    tags: "",
    rating: "5",
    image_url: "",
  });

const [savingLocation, setSavingLocation] =
  React.useState(false);

  const [likedLocations, setLikedLocations] =
    React.useState({});

  React.useEffect(() => {
  loadLocations();
  loadLikes();
}, []);

  async function loadLikes() {
  if (!supabase) return;

  try {
    const { data, error } = await supabase
      .from("location_likes")
      .select("location_id")
      .eq("user_id", "telegram-demo-user");

    if (error) {
      console.error("Ошибка загрузки лайков:", error);
      return;
    }

    const likes = {};

    (data || []).forEach((item) => {
      likes[item.location_id] = true;
    });

    setLikedLocations(likes);
  } catch (error) {
    console.error("Likes error:", error);
  }
}

  async function loadLocations() {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } =
        await supabase
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

      if (
        Array.isArray(data) &&
        data.length > 0
      ) {
        const prepared =
          data.map((item) => ({
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
          }));

        setLocations(prepared);
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

  async function addLocation() {
  if (!supabase) {
    alert("Supabase не подключён");
    return;
  }

  if (!newLocation.name.trim()) {
    alert("Напиши название места");
    return;
  }

  setSavingLocation(true);

  try {
    const { data, error } = await supabase
      .from("locations")
      .insert({
        name: newLocation.name.trim(),
        description:
          newLocation.description.trim() ||
          "Красивое место для прогулки.",
        emoji: newLocation.emoji || "📍",
        tags: newLocation.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        rating:
          Number(newLocation.rating) || 5,
        image_url:
          newLocation.image_url.trim() ||
          demoLocations[0].image,
        user_added: true,
      })
      .select()
      .single();

    if (error) {
      console.error(
        "Ошибка добавления:",
        error
      );

      alert(
        "Не удалось добавить локацию. Проверь консоль."
      );

      return;
    }

    const prepared = {
      id: data.id,
      title: data.name,
      description: data.description,
      image:
        data.image_url ||
        demoLocations[0].image,
      rating: data.rating,
      emoji: data.emoji || "📍",
      tags: Array.isArray(data.tags)
        ? data.tags
        : [],
    };

    setLocations((current) => [
      prepared,
      ...current,
    ]);

    setNewLocation({
      name: "",
      description: "",
      emoji: "📍",
      tags: "",
      rating: "5",
      image_url: "",
    });

    setShowAddLocation(false);

    alert("Локация добавлена ❤️");
  } catch (error) {
    console.error(
      "Ошибка добавления локации:",
      error
    );

    alert("Произошла ошибка");
  } finally {
    setSavingLocation(false);
  }
}

  async function toggleLike(id) {
  const currentlyLiked = Boolean(likedLocations[id]);

  // Сразу меняем сердечко на экране
  setLikedLocations((current) => ({
    ...current,
    [id]: !currentlyLiked,
  }));

  if (!supabase) return;

  const userId = "telegram-demo-user";

  try {
    if (currentlyLiked) {
      const { error } = await supabase
        .from("location_likes")
        .delete()
        .eq("location_id", id)
        .eq("user_id", userId);

      if (error) {
        console.error("Ошибка удаления лайка:", error);

        setLikedLocations((current) => ({
          ...current,
          [id]: true,
        }));
      }
    } else {
      const { error } = await supabase
        .from("location_likes")
        .insert({
          location_id: id,
          user_id: userId,
        });

      if (error) {
        console.error("Ошибка сохранения лайка:", error);

        setLikedLocations((current) => ({
          ...current,
          [id]: false,
        }));
      }
    }
  } catch (error) {
    console.error("Ошибка лайка:", error);
  }
}

  function isLiked(id) {
    return Boolean(likedLocations[id]);
  }

  const likesCount =
    Object.values(likedLocations).filter(
      Boolean
    ).length;
  
  const likedLocationList = locations.filter(
  (location) => likedLocations[location.id]
);

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
          z-index: 20;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 16px;

          background:
            rgba(245,243,239,.94);

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

          font-size:
            clamp(44px, 11vw, 76px);

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
            rgba(255,255,255,.94);

          font-size: 11px;
          font-weight: 800;
        }

        .likeButton {
          position: absolute;

          left: 12px;
          top: 12px;

          width: 42px;
          height: 42px;

          display: grid;
          place-items: center;

          border: 0;
          border-radius: 50%;

          background:
            rgba(255,255,255,.94);

          box-shadow:
            0 5px 18px
            rgba(0,0,0,.12);

          font-size: 21px;

          cursor: pointer;

          transition:
            transform .15s ease;
        }

        .likeButton:active {
          transform: scale(.88);
        }

        .likeButton.liked {
          color: #e54848;
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

        .cardActions {
          display: flex;
          gap: 8px;
        }

        .openButton {
          flex: 1;

          min-height: 43px;

          border: 0;
          border-radius: 13px;

          background: #202020;
          color: white;

          font-weight: 700;
          cursor: pointer;
        }

        .smallLike {
          width: 48px;

          min-height: 43px;

          border: 0;
          border-radius: 13px;

          background: #f0ece6;

          color: #777169;

          font-size: 20px;

          cursor: pointer;
        }

        .smallLike.liked {
          color: #e54848;
          background: #fae8e8;
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
          margin: 0 0 22px;
          color: #858078;
        }

        .profileStats {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 8px;
        }

        .stat {
          padding: 14px 6px;

          border-radius: 17px;

          background: #f5f3ef;
        }

        .stat strong {
          display: block;

          font-size: 21px;
        }

        .stat span {
          display: block;

          margin-top: 4px;

          color: #8a837b;

          font-size: 10px;
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

          width: min(620px,100%);

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

        .modalHeader {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          gap: 12px;
        }

        .modalBody h2 {
          margin: 7px 0;

          font-size: 28px;
        }

        .modalBody p {
          color: #6f6961;
          line-height: 1.55;
        }

        .modalLike {
          flex-shrink: 0;

          width: 48px;
          height: 48px;

          border: 0;
          border-radius: 50%;

          background: #f0ece6;

          font-size: 22px;

          cursor: pointer;
        }

        .modalLike.liked {
          color: #e54848;
          background: #fae8e8;
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
                  Загружаем локации
                  из Supabase…
                </div>

              ) : (

                <div className="grid">

                  {locations.map(
                    (location) => {

                      const liked =
                        isLiked(
                          location.id
                        );

                      return (
                        <article
                          className="card"
                          key={location.id}
                        >

                          <div className="imageWrap">

                            <img
                              src={
                                location.image
                              }
                              alt={
                                location.title
                              }
                              onError={(
                                event
                              ) => {
                                event.currentTarget.src =
                                  demoLocations[0]
                                    .image;
                              }}
                            />

                            <button
                              className={
                                liked
                                  ? "likeButton liked"
                                  : "likeButton"
                              }
                              onClick={() =>
                                toggleLike(
                                  location.id
                                )
                              }
                              aria-label={
                                liked
                                  ? "Убрать лайк"
                                  : "Поставить лайк"
                              }
                            >
                              {liked
                                ? "♥"
                                : "♡"}
                            </button>

                            {location.rating && (
                              <div className="rating">
                                ★{" "}
                                {
                                  location.rating
                                }
                              </div>
                            )}

                          </div>

                          <div className="cardBody">

                            <div className="cardTop">

                              <span className="emoji">
                                {
                                  location.emoji ||
                                  "📍"
                                }
                              </span>

                              <span className="tag">
                                локация
                              </span>

                            </div>

                            <h3>
                              {
                                location.title
                              }
                            </h3>

                            <p>
                              {
                                location.description
                              }
                            </p>

                            {location.tags
                              .length > 0 && (

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

                            <div className="cardActions">

                              <button
                                className="openButton"
                                onClick={() =>
                                  setSelectedLocation(
                                    location
                                  )
                                }
                              >
                                Открыть →
                              </button>

                              <button
                                className={
                                  liked
                                    ? "smallLike liked"
                                    : "smallLike"
                                }
                                onClick={() =>
                                  toggleLike(
                                    location.id
                                  )
                                }
                              >
                                {liked
                                  ? "♥"
                                  : "♡"}
                              </button>

                            </div>

                          </div>

                        </article>
                      );
                    }
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

                <div className="profileStats">

                  <div className="stat">
                    <strong>
                      {locations.length}
                    </strong>

                    <span>
                      локации
                    </span>
                  </div>

                  {likedLocationList.length > 0 && (
  <div style={{ marginTop: "24px" }}>
    <h2
      style={{
        margin: "0 0 14px",
        fontSize: "22px",
        textAlign: "left",
      }}
    >
      ❤️ Мои лайки
    </h2>

    <div
      style={{
        display: "grid",
        gap: "12px",
      }}
    >
      {likedLocationList.map((location) => (
        <button
          key={location.id}
          onClick={() =>
            setSelectedLocation(location)
          }
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "100%",
            padding: "10px",
            border: 0,
            borderRadius: "18px",
            background: "#f5f3ef",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          <img
            src={location.image}
            alt={location.title}
            style={{
              width: "65px",
              height: "65px",
              borderRadius: "14px",
              objectFit: "cover",
            }}
          />

          <div>
            <strong>{location.title}</strong>

            <div
              style={{
                marginTop: "4px",
                color: "#e54848",
                fontSize: "14px",
              }}
            >
              ♥ Понравилось
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
)}
                  
                  <div className="stat">
                    <strong>
                      {likesCount}
                    </strong>

                    <span>
                      мои лайки
                    </span>
                  </div>

                  <div className="stat">
                    <strong>
                      0
                    </strong>

                    <span>
                      друзья
                    </span>
                  </div>

                </div>

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
    setShowAddLocation(true)
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

        {showAddLocation && (
  <div
    className="modal"
    onClick={() =>
      setShowAddLocation(false)
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
          setShowAddLocation(false)
        }
      >
        ×
      </button>

      <div className="modalBody">

        <h2>
          Добавить локацию
        </h2>

        <input
          placeholder="Название места"
          value={newLocation.name}
          onChange={(event) =>
            setNewLocation({
              ...newLocation,
              name: event.target.value,
            })
          }
          style={inputStyle}
        />

        <textarea
          placeholder="Описание"
          value={newLocation.description}
          onChange={(event) =>
            setNewLocation({
              ...newLocation,
              description:
                event.target.value,
            })
          }
          style={{
            ...inputStyle,
            minHeight: "90px",
            resize: "vertical",
          }}
        />

        <input
          placeholder="Эмодзи, например 🌿"
          value={newLocation.emoji}
          onChange={(event) =>
            setNewLocation({
              ...newLocation,
              emoji: event.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          placeholder="Теги через запятую"
          value={newLocation.tags}
          onChange={(event) =>
            setNewLocation({
              ...newLocation,
              tags: event.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          placeholder="Ссылка на фото"
          value={newLocation.image_url}
          onChange={(event) =>
            setNewLocation({
              ...newLocation,
              image_url:
                event.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          type="number"
          min="1"
          max="5"
          step="0.1"
          placeholder="Рейтинг"
          value={newLocation.rating}
          onChange={(event) =>
            setNewLocation({
              ...newLocation,
              rating: event.target.value,
            })
          }
          style={inputStyle}
        />

        <button
          className="openButton"
          onClick={addLocation}
          disabled={savingLocation}
          style={{
            width: "100%",
            marginTop: "8px",
          }}
        >
          {savingLocation
            ? "Сохраняем..."
            : "Добавить локацию"}
        </button>

      </div>
    </div>
  </div>
)}
        
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
                src={
                  selectedLocation.image
                }
                alt={
                  selectedLocation.title
                }
              />

              <div className="modalBody">

                <div className="modalHeader">

                  <div>
                    <div className="emoji">
                      {
                        selectedLocation.emoji ||
                        "📍"
                      }
                    </div>

                    <h2>
                      {
                        selectedLocation.title
                      }
                    </h2>

                    {selectedLocation.rating && (
                      <strong>
                        ★{" "}
                        {
                          selectedLocation.rating
                        }
                      </strong>
                    )}
                  </div>

                  <button
                    className={
                      isLiked(
                        selectedLocation.id
                      )
                        ? "modalLike liked"
                        : "modalLike"
                    }
                    onClick={() =>
                      toggleLike(
                        selectedLocation.id
                      )
                    }
                  >
                    {isLiked(
                      selectedLocation.id
                    )
                      ? "♥"
                      : "♡"}
                  </button>

                </div>

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
