import React from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";


const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://qkeouzlsvzpoouamhrzo.supabase.co";


const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";


const supabase =
  SUPABASE_URL && SUPABASE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_KEY)
    : null;


const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85";


const demoLocations = [
  {
    id: "demo-1",
    name: "Патриаршие пруды",
    description:
      "Атмосферное место для прогулок и красивых кадров.",
    image: FALLBACK_IMAGE,
    rating: 4.8,
    emoji: "🌿",
    tags: ["прогулка", "свидание", "фото"],
  },
  {
    id: "demo-2",
    name: "Зарядье",
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
    name: "Парк Горького",
    description:
      "Зелень, вода, прогулки и много пространства.",
    image:
      "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1200&q=85",
    rating: 4.9,
    emoji: "🌳",
    tags: ["парк", "прогулка", "природа"],
  },
];


const styles = `
  * {
    box-sizing: border-box;
  }


  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    min-height: 100%;
  }


  body {
    background: #f6f4f0;
    color: #202020;
    font-family:
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  }


  button,
  input,
  textarea {
    font: inherit;
  }


  button {
    -webkit-tap-highlight-color: transparent;
  }


  .app {
    min-height: 100vh;
    padding-bottom: 100px;
    background: #f6f4f0;
  }


  .header {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 16px;
    background: rgba(246, 244, 240, 0.94);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }


  .logo {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.8px;
  }


  .caption {
    margin-top: 2px;
    color: #8c877f;
    font-size: 11px;
  }


  .miniAvatar {
    width: 42px;
    height: 42px;
    border: 0;
    border-radius: 50%;
    overflow: hidden;
    display: grid;
    place-items: center;
    background: #ddd5ca;
    cursor: pointer;
    padding: 0;
    font-weight: 800;
  }


  .miniAvatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }


  .content {
    width: min(760px, 100%);
    margin: 0 auto;
    padding: 18px 16px;
  }


  .hero {
    min-height: 280px;
    border-radius: 28px;
    padding: 26px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    background:
      linear-gradient(
        135deg,
        #d7cab9,
        #eee5da 48%,
        #cbd5cc
      );
  }


  .eyebrow {
    color: #8b847c;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.7px;
  }


  .hero h1 {
    margin: 12px 0;
    font-size: clamp(42px, 10vw, 72px);
    line-height: 0.9;
    letter-spacing: -3px;
  }


  .hero h1 i {
    font-family: Georgia, serif;
    font-weight: 500;
  }


  .hero p {
    max-width: 410px;
    margin: 0;
    color: #5f5951;
    line-height: 1.5;
  }


  .sectionTitle {
    margin: 26px 0 13px;
    font-size: 24px;
    letter-spacing: -0.8px;
  }


  .grid {
    display: grid;
    grid-template-columns:
      repeat(auto-fit, minmax(250px, 1fr));
    gap: 14px;
  }


  .card {
    position: relative;
    overflow: hidden;
    background: #fff;
    border-radius: 23px;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.05);
  }


  .imageWrap {
    position: relative;
  }


  .cardImage {
    width: 100%;
    height: 220px;
    display: block;
    object-fit: cover;
  }


  .rating {
    position: absolute;
    left: 12px;
    bottom: 12px;
    padding: 7px 9px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    font-size: 12px;
    font-weight: 800;
  }


  .likeButton {
    position: absolute;
    right: 12px;
    top: 12px;
    width: 42px;
    height: 42px;
    border: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.92);
    color: #202020;
    cursor: pointer;
    font-size: 22px;
  }


  .likeButton.liked {
    color: #e54848;
  }


  .cardBody {
    padding: 15px;
  }


  .cardTop {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 8px;
  }


  .emoji {
    font-size: 18px;
  }


  .tag {
    display: inline-block;
    padding: 6px 9px;
    border-radius: 999px;
    background: #f0ece6;
    color: #777067;
    font-size: 10px;
  }


  .card h3 {
    margin: 0 0 6px;
    font-size: 20px;
    letter-spacing: -0.5px;
  }


  .card p {
    margin: 0 0 14px;
    color: #78726a;
    line-height: 1.45;
    font-size: 13px;
  }


  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 14px;
  }


  .tags span {
    color: #8a837a;
    font-size: 11px;
  }


  .cardActions {
    display: flex;
    gap: 8px;
  }


  .openButton,
  .darkButton,
  .lightButton {
    min-height: 46px;
    border-radius: 14px;
    border: 0;
    padding: 0 16px;
    cursor: pointer;
    font-weight: 750;
  }


  .openButton,
  .darkButton {
    background: #202020;
    color: #fff;
  }


  .openButton {
    flex: 1;
  }


  .lightButton {
    background: #f0ece6;
    color: #34312d;
  }


  .smallLike {
    width: 46px;
    min-height: 46px;
    border: 0;
    border-radius: 14px;
    background: #f0ece6;
    cursor: pointer;
    font-size: 20px;
  }


  .smallLike.liked {
    color: #e54848;
  }


  .loading {
    padding: 40px 10px;
    text-align: center;
    color: #8c877f;
  }


  .profileHero {
    overflow: hidden;
    background: #fff;
    border-radius: 26px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }


  .cover {
    height: 120px;
    background:
      linear-gradient(
        135deg,
        #cdbdac,
        #eee3d7,
        #c8d2c8
      );
  }


  .profileBody {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 0 17px 18px;
    margin-top: -38px;
  }


  .bigAvatar {
    width: 82px;
    height: 82px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: 5px solid white;
    border-radius: 50%;
    background: #ece6de;
    cursor: pointer;
    font-size: 28px;
    font-weight: 800;
  }


  .bigAvatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }


  .bigAvatar input {
    display: none;
  }


  .profileBody h1 {
    margin: 42px 0 3px;
    font-size: 24px;
  }


  .profileBody span {
    color: #8c857d;
    font-size: 12px;
  }


  .profileStats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 14px 0;
  }


  .stat {
    padding: 14px 7px;
    border-radius: 18px;
    background: #fff;
    text-align: center;
  }


  .stat strong,
  .stat span {
    display: block;
  }


  .stat strong {
    font-size: 21px;
  }


  .stat span {
    margin-top: 3px;
    color: #8a847d;
    font-size: 11px;
  }


  .panel {
    padding: 18px;
    border-radius: 23px;
    background: #fff;
  }


  .panel h2 {
    margin: 5px 0 18px;
  }


  .panel label {
    display: block;
    margin-bottom: 14px;
    color: #5e5851;
    font-size: 12px;
    font-weight: 700;
  }


  .panel input,
  .panel textarea {
    width: 100%;
    margin-top: 7px;
    padding: 12px;
    border: 1px solid #e1dbd3;
    outline: none;
    border-radius: 14px;
    background: #faf9f7;
  }


  .panel textarea {
    min-height: 100px;
    resize: vertical;
  }


  .actions {
    display: flex;
    gap: 9px;
  }


  .actions > * {
    flex: 1;
  }


  .likedSection {
    margin-top: 24px;
  }


  .likedSection h2 {
    margin: 0 0 14px;
    font-size: 22px;
  }


  .likedList {
    display: grid;
    gap: 12px;
  }


  .likedItem {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    border: 0;
    border-radius: 18px;
    background: #f5f3ef;
    text-align: left;
    cursor: pointer;
  }


  .likedItem img {
    width: 65px;
    height: 65px;
    flex-shrink: 0;
    object-fit: cover;
    border-radius: 14px;
  }


  .likedItemTitle {
    color: #202020;
    font-weight: 800;
  }


  .likedItemSub {
    margin-top: 4px;
    color: #e54848;
    font-size: 14px;
  }


  .bottomNav {
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: 12px;
    z-index: 50;
    height: 70px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    border-radius: 24px;
    background: rgba(255,255,255,0.95);
    box-shadow: 0 15px 40px rgba(0,0,0,0.13);
  }


  .nav {
    border: 0;
    background: transparent;
    color: #99928a;
    cursor: pointer;
    font-size: 10px;
    font-weight: 700;
  }


  .nav span {
    display: block;
    margin-bottom: 3px;
    font-size: 22px;
  }


  .nav.active {
    color: #202020;
  }


  .nav.plus {
    justify-self: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: #202020;
    color: #fff;
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
    background: rgba(0,0,0,0.45);
  }


  .modalCard {
    position: relative;
    width: min(760px, 100%);
    max-height: 92vh;
    overflow-y: auto;
    padding: 18px;
    border-radius: 28px;
    background: #fff;
    box-shadow: 0 25px 60px rgba(0,0,0,0.22);
  }


  .close {
    position: sticky;
    top: 0;
    float: right;
    z-index: 2;
    width: 38px;
    height: 38px;
    border: 0;
    border-radius: 50%;
    background: #f0ece6;
    cursor: pointer;
    font-size: 22px;
  }


  .modalBody {
    clear: both;
    padding-top: 8px;
  }


  .modalBody h2 {
    margin: 0 0 16px;
    font-size: 26px;
  }


  .modalInput,
  .modalTextarea {
    width: 100%;
    padding: 14px;
    margin-bottom: 10px;
    border: 1px solid #e5e0d9;
    border-radius: 13px;
    outline: none;
    background: #f8f6f2;
    color: #202020;
  }


  .modalTextarea {
    min-height: 90px;
    resize: vertical;
  }


  .photoPicker {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 16px;
    border-radius: 14px;
    background: #f0ece6;
    text-align: center;
    font-weight: 700;
    cursor: pointer;
  }


  .photoPicker input {
    display: none;
  }


  .photoPreview {
    margin-bottom: 10px;
    overflow: hidden;
    border-radius: 14px;
  }


  .photoPreview img {
    display: block;
    width: 100%;
    max-height: 240px;
    object-fit: cover;
  }


  .modalRating {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 4px;
  }


  .empty {
    padding: 20px;
    border-radius: 18px;
    background: #fff;
    color: #8a847d;
    text-align: center;
  }


  @media (max-width: 560px) {
    .grid {
      grid-template-columns: 1fr;
    }


    .hero {
      min-height: 250px;
    }


    .modal {
      padding: 0;
    }


    .modalCard {
      max-height: 94vh;
      border-radius: 28px 28px 0 0;
    }
  }
`;


function App() {
  const [active, setActive] =
    React.useState("home");


  const [locations, setLocations] =
    React.useState(demoLocations);


  const [loading, setLoading] =
    React.useState(true);


  const [selectedLocation, setSelectedLocation] =
    React.useState(null);


  const [likedLocations, setLikedLocations] =
    React.useState({});


  const [showAddLocation, setShowAddLocation] =
    React.useState(false);


  const [savingLocation, setSavingLocation] =
    React.useState(false);


  const [newLocation, setNewLocation] =
    React.useState({
      name: "",
      description: "",
      emoji: "📍",
      tags: "",
      rating: "5",
      image_url: "",
      imageFile: null,
    });


  const [profile, setProfile] =
    React.useState({
      name: "Анастасия",
      username: "",
      bio: "",
      avatar: "",
    });


  React.useEffect(() => {
    loadLocations();
    loadLikes();
  }, []);


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
            name:
              item.name ||
              "Без названия",
            description:
              item.description ||
              "Красивое место для прогулки.",
            image:
              item.image_url ||
              FALLBACK_IMAGE,
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


  async function loadLikes() {
    if (!supabase) return;


    try {
      const { data, error } =
        await supabase
          .from("location_likes")
          .select("location_id")
          .eq(
            "user_id",
            "telegram-demo-user"
          );


      if (error) {
        console.error(
          "Ошибка загрузки лайков:",
          error
        );
        return;
      }


      const likes = {};


      (data || []).forEach((item) => {
        likes[item.location_id] = true;
      });


      setLikedLocations(likes);
    } catch (error) {
      console.error(
        "Likes error:",
        error
      );
    }
  }


  async function toggleLike(id) {
    const currentlyLiked =
      Boolean(likedLocations[id]);


    setLikedLocations((current) => ({
      ...current,
      [id]: !currentlyLiked,
    }));


    if (!supabase) return;


    const userId =
      "telegram-demo-user";


    try {
      if (currentlyLiked) {
        const { error } =
          await supabase
            .from("location_likes")
            .delete()
            .eq("location_id", id)
            .eq("user_id", userId);


        if (error) {
          console.error(
            "Ошибка удаления лайка:",
            error
          );


          setLikedLocations(
            (current) => ({
              ...current,
              [id]: true,
            })
          );
        }
      } else {
        const { error } =
          await supabase
            .from("location_likes")
            .insert({
              location_id: id,
              user_id: userId,
            });


        if (error) {
          console.error(
            "Ошибка сохранения лайка:",
            error
          );


          setLikedLocations(
            (current) => ({
              ...current,
              [id]: false,
            })
          );
        }
      }
    } catch (error) {
      console.error(
        "Like error:",
        error
      );


      setLikedLocations(
        (current) => ({
          ...current,
          [id]: currentlyLiked,
        })
      );
    }
  }


  async function addLocation() {
    if (!supabase) {
      alert("Supabase не подключён");
      return;
    }


    if (!newLocation.name.trim()) {
      alert("Введите название места");
      return;
    }


    setSavingLocation(true);


    try {
      let imageUrl = "";


      if (newLocation.imageFile) {
        const file =
          newLocation.imageFile;


        const extension =
          file.name.split(".").pop() ||
          "jpg";


        const fileName =
          `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}.${extension}`;


        const filePath =
          `locations/${fileName}`;


        const {
          error: uploadError,
        } = await supabase.storage
          .from("location-images")
          .upload(
            filePath,
            file,
            {
              cacheControl: "3600",
              upsert: false,
              contentType:
                file.type ||
                "image/jpeg",
            }
          );


        if (uploadError) {
          console.error(
            "Ошибка загрузки фото:",
            uploadError
          );


          alert(
            "Не удалось загрузить фото:\n" +
              uploadError.message
          );


          return;
        }


        const {
          data: publicData,
        } =
          supabase.storage
            .from(
              "location-images"
            )
            .getPublicUrl(
              filePath
            );


        imageUrl =
          publicData?.publicUrl ||
          "";
      }


      if (!imageUrl) {
        imageUrl = FALLBACK_IMAGE;
      }


      const tags =
        newLocation.tags
          .split(",")
          .map((tag) =>
            tag.trim()
          )
          .filter(Boolean);


      const {
        data,
        error,
      } = await supabase
        .from("locations")
        .insert({
          name:
            newLocation.name.trim(),


          description:
            newLocation.description
              .trim() ||
            "Красивое место для прогулки.",


          emoji:
            newLocation.emoji
              .trim() ||
            "📍",


          tags,


          rating:
            Number(
              newLocation.rating
            ) || 5,


          image_url:
            imageUrl,


          user_added: true,
        })
        .select()
        .single();


      if (error) {
        console.error(
          "Ошибка сохранения локации:",
          error
        );


        alert(
          "Не удалось сохранить локацию:\n" +
            error.message
        );


        return;
      }


      if (data) {
        const prepared = {
          id: data.id,
          name:
            data.name ||
            "Без названия",
          description:
            data.description ||
            "Красивое место для прогулки.",
          image:
            data.image_url ||
            FALLBACK_IMAGE,
          rating:
            data.rating ?? null,
          emoji:
            data.emoji || "📍",
          tags:
            Array.isArray(data.tags)
              ? data.tags
              : [],
        };


        setLocations(
          (current) => [
            prepared,
            ...current,
          ]
        );
      }


      setNewLocation({
        name: "",
        description: "",
        emoji: "📍",
        tags: "",
        rating: "5",
        image_url: "",
        imageFile: null,
      });


      setShowAddLocation(false);


      alert(
        "Локация добавлена ❤️"
      );
    } catch (error) {
      console.error(
        "Ошибка добавления локации:",
        error
      );


      alert(
        "Произошла ошибка при добавлении:\n" +
          error.message
      );
    } finally {
      setSavingLocation(false);
    }
  }


  function handlePhotoSelect(event) {
    const file =
      event.target.files?.[0];


    if (!file) return;


    setNewLocation(
      (current) => ({
        ...current,
        imageFile: file,
      })
    );
  }


  function clearPhoto() {
    setNewLocation(
      (current) => ({
        ...current,
        imageFile: null,
        image_url: "",
      })
    );
  }


  function isLiked(id) {
    return Boolean(
      likedLocations[id]
    );
  }


  const likesCount =
    Object.values(
      likedLocations
    ).filter(Boolean).length;


  const likedLocationList =
    locations.filter(
      (location) =>
        likedLocations[
          location.id
        ]
    );


  const previewUrl =
    newLocation.imageFile
      ? URL.createObjectURL(
          newLocation.imageFile
        )
      : "";


  return (
    <>
      <style>{styles}</style>


      <div className="app">
        <header className="header">
          <div>
            <div className="logo">
              В кадре
            </div>
            <div className="caption">
              места для твоих историй
            </div>
          </div>


          <button
            className="miniAvatar"
            onClick={() =>
              setActive("profile")
            }
          >
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt=""
              />
            ) : (
              "А"
            )}
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
                  <i>в кадре.</i>
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
                  Загружаем локации…
                </div>
              ) : locations.length === 0 ? (
                <div className="empty">
                  Пока нет локаций.
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
                          key={
                            location.id
                          }
                        >
                          <div className="imageWrap">
                            <img
                              className="cardImage"
                              src={
                                location.image
                              }
                              alt={
                                location.name
                              }
                              onError={(
                                event
                              ) => {
                                event.currentTarget.src =
                                  FALLBACK_IMAGE;
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


                            {location.rating !==
                              null &&
                              location.rating !==
                                undefined && (
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
                                  location.emoji
                                }
                              </span>


                              <span className="tag">
                                локация
                              </span>
                            </div>


                            <h3>
                              {
                                location.name
                              }
                            </h3>


                            <p>
                              {
                                location.description
                              }
                            </p>


                            {location.tags
                              .length >
                              0 && (
                              <div className="tags">
                                {location.tags
                                  .slice(
                                    0,
                                    4
                                  )
                                  .map(
                                    (tag) => (
                                      <span
                                        key={
                                          tag
                                        }
                                      >
                                        #
                                        {
                                          tag
                                        }
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
            <section>
              <div className="profileHero">
                <div className="cover" />


                <div className="profileBody">
                  <label className="bigAvatar">
                    {profile.avatar ? (
                      <img
                        src={
                          profile.avatar
                        }
                        alt=""
                      />
                    ) : (
                      <span>
                        {(profile.name ||
                          "А")
                          .slice(
                            0,
                            1
                          )
                          .toUpperCase()}
                      </span>
                    )}


                    <input
                      type="file"
                      accept="image/*"
                      onChange={(
                        event
                      ) => {
                        const file =
                          event.target.files?.[0];


                        if (!file) return;


                        const reader =
                          new FileReader();


                        reader.onload =
                          () =>
                            setProfile(
                              (
                                current
                              ) => ({
                                ...current,
                                avatar:
                                  String(
                                    reader.result ||
                                      ""
                                  ),
                              })
                            );


                        reader.readAsDataURL(
                          file
                        );
                      }}
                    />
                  </label>


                  <div>
                    <h1>
                      {profile.name}
                    </h1>


                    <span>
                      {profile.username
                        ? `@${profile.username}`
                        : "твой профиль"}
                    </span>
                  </div>
                </div>
              </div>


              <div className="profileStats">
                <div className="stat">
                  <strong>
                    {locations.length}
                  </strong>


                  <span>
                    локации
                  </span>
                </div>


                <div className="stat">
                  <strong>
                    {likesCount}
                  </strong>


                  <span>
                    мои лайки
                  </span>
                </div>


                <div className="stat">
                  <strong>0</strong>


                  <span>
                    друзья
                  </span>
                </div>
              </div>


              <div className="panel">
                <div className="eyebrow">
                  о тебе
                </div>


                <h2>
                  Профиль
                </h2>


                <label>
                  Имя


                  <input
                    value={
                      profile.name
                    }
                    onChange={(
                      event
                    ) =>
                      setProfile(
                        (
                          current
                        ) => ({
                          ...current,
                          name:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                  />
                </label>


                <label>
                  Username


                  <input
                    value={
                      profile.username
                    }
                    onChange={(
                      event
                    ) =>
                      setProfile(
                        (
                          current
                        ) => ({
                          ...current,
                          username:
                            event.target.value.replace(
                              "@",
                              ""
                            ),
                        })
                      )
                    }
                    placeholder="username"
                  />
                </label>


                <label>
                  О себе


                  <textarea
                    value={
                      profile.bio
                    }
                    onChange={(
                      event
                    ) =>
                      setProfile(
                        (
                          current
                        ) => ({
                          ...current,
                          bio:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                    placeholder="Напиши пару слов о себе..."
                  />
                </label>


                <div className="actions">
                  <button
                    className="darkButton"
                    onClick={() =>
                      alert(
                        "Профиль сохранён"
                      )
                    }
                  >
                    Сохранить
                  </button>


                  <button
                    className="lightButton"
                    onClick={() =>
                      alert(
                        "Функция поделиться будет добавлена позже"
                      )
                    }
                  >
                    Поделиться
                  </button>
                </div>
              </div>


              {likedLocationList.length >
                0 && (
                <div className="likedSection">
                  <h2>
                    ❤️ Мои лайки
                  </h2>


                  <div className="likedList">
                    {likedLocationList.map(
                      (location) => (
                        <button
                          key={
                            location.id
                          }
                          className="likedItem"
                          onClick={() =>
                            setSelectedLocation(
                              location
                            )
                          }
                        >
                          <img
                            src={
                              location.image
                            }
                            alt={
                              location.name
                            }
                            onError={(
                              event
                            ) => {
                              event.currentTarget.src =
                                FALLBACK_IMAGE;
                            }}
                          />


                          <div>
                            <div className="likedItemTitle">
                              {
                                location.name
                              }
                            </div>


                            <div className="likedItemSub">
                              ♥ Понравилось
                            </div>
                          </div>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </section>
          )}
        </main>


        <nav className="bottomNav">
          <button
            className={
              active === "home"
                ? "nav active"
                : "nav"
            }
            onClick={() =>
              setActive("home")
            }
          >
            <span>⌂</span>
            Главная
          </button>


          <button
            className="nav plus"
            onClick={() =>
              setShowAddLocation(
                true
              )
            }
          >
            +
          </button>


          <button
            className={
              active === "profile"
                ? "nav active"
                : "nav"
            }
            onClick={() =>
              setActive("profile")
            }
          >
            <span>◯</span>
            Профиль
          </button>
        </nav>


        {showAddLocation && (
          <div
            className="modal"
            onClick={() =>
              setShowAddLocation(
                false
              )
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
                  setShowAddLocation(
                    false
                  )
                }
              >
                ×
              </button>


              <div className="modalBody">
                <h2>
                  Добавить локацию
                </h2>


                <input
                  className="modalInput"
                  placeholder="Название места"
                  value={
                    newLocation.name
                  }
                  onChange={(
                    event
                  ) =>
                    setNewLocation(
                      (current) => ({
                        ...current,
                        name:
                          event
                            .target
                            .value,
                      })
                    )
                  }
                />


                <textarea
                  className="modalTextarea"
                  placeholder="Описание"
                  value={
                    newLocation.description
                  }
                  onChange={(
                    event
                  ) =>
                    setNewLocation(
                      (current) => ({
                        ...current,
                        description:
                          event
                            .target
                            .value,
                      })
                    )
                  }
                />


                <input
                  className="modalInput"
                  placeholder="Эмодзи, например 🌿"
                  value={
                    newLocation.emoji
                  }
                  onChange={(
                    event
                  ) =>
                    setNewLocation(
                      (current) => ({
                        ...current,
                        emoji:
                          event
                            .target
                            .value,
                      })
                    )
                  }
                />


                <input
                  className="modalInput"
                  placeholder="Теги через запятую"
                  value={
                    newLocation.tags
                  }
                  onChange={(
                    event
                  ) =>
                    setNewLocation(
                      (current) => ({
                        ...current,
                        tags:
                          event
                            .target
                            .value,
                      })
                    )
                  }
                />


                <label className="photoPicker">
                  📷 Выбрать фото из галереи


                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handlePhotoSelect
                    }
                  />
                </label>


                {newLocation.imageFile && (
                  <>
                    {previewUrl && (
                      <div className="photoPreview">
                        <img
                          src={
                            previewUrl
                          }
                          alt="Выбранное фото"
                        />
                      </div>
                    )}


                    <button
                      className="lightButton"
                      style={{
                        width: "100%",
                        marginBottom:
                          "10px",
                      }}
                      onClick={
                        clearPhoto
                      }
                    >
                      Убрать фото
                    </button>
                  </>
                )}


                <div className="modalRating">
                  <input
                    className="modalInput"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    placeholder="Рейтинг"
                    value={
                      newLocation.rating
                    }
                    onChange={(
                      event
                    ) =>
                      setNewLocation(
                        (current) => ({
                          ...current,
                          rating:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                  />
                </div>


                <button
                  className="darkButton"
                  style={{
                    width: "100%",
                  }}
                  onClick={
                    addLocation
                  }
                  disabled={
                    savingLocation
                  }
                >
                  {savingLocation
                    ? "Загружаем фото и сохраняем…"
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
              setSelectedLocation(
                null
              )
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
                  setSelectedLocation(
                    null
                  )
                }
              >
                ×
              </button>


              <div className="modalBody">
                <img
                  src={
                    selectedLocation.image
                  }
                  alt={
                    selectedLocation.name
                  }
                  style={{
                    width: "100%",
                    maxHeight: "360px",
                    objectFit:
                      "cover",
                    borderRadius:
                      "20px",
                    display: "block",
                    marginBottom:
                      "16px",
                  }}
                  onError={(
                    event
                  ) => {
                    event.currentTarget.src =
                      FALLBACK_IMAGE;
                  }}
                />


                <div className="cardTop">
                  <span className="emoji">
                    {
                      selectedLocation.emoji
                    }
                  </span>


                  <span className="tag">
                    локация
                  </span>
                </div>


                <h2
                  style={{
                    margin:
                      "6px 0 8px",
                  }}
                >
                  {
                    selectedLocation.name
                  }
                </h2>


                {selectedLocation.rating !==
                  null &&
                  selectedLocation.rating !==
                    undefined && (
                    <div
                      style={{
                        marginBottom:
                          "10px",
                        fontWeight:
                          800,
                      }}
                    >
                      ★{" "}
                      {
                        selectedLocation.rating
                      }
                    </div>
                  )}


                <p
                  style={{
                    margin:
                      "0 0 14px",
                    color:
                      "#78726a",
                    lineHeight:
                      1.5,
                  }}
                >
                  {
                    selectedLocation.description
                  }
                </p>


                {selectedLocation.tags
                  .length >
                  0 && (
                  <div className="tags">
                    {selectedLocation.tags.map(
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
                  className={
                    isLiked(
                      selectedLocation.id
                    )
                      ? "darkButton"
                      : "lightButton"
                  }
                  style={{
                    width:
                      "100%",
                  }}
                  onClick={() =>
                    toggleLike(
                      selectedLocation.id
                    )
                  }
                >
                  {isLiked(
                    selectedLocation.id
                  )
                    ? "♥ В избранном"
                    : "♡ Добавить в лайки"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}


const root =
  document.getElementById(
    "root"
  );


if (!root) {
  throw new Error(
    "Root element #root not found"
  );
}


createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
