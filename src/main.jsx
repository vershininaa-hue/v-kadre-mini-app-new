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

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85";

const demoLocations = [
  {
    id: "demo-1",
    title: "Патриаршие пруды",
    description:
      "Атмосферное место для прогулок и красивых кадров.",
    image: FALLBACK_IMAGE,
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

function getUserId() {
  const telegramId =
    window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

  return telegramId
    ? String(telegramId)
    : "telegram-demo-user";
}

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
    background: #f5f3ef;
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
  }

  .header {
    position: sticky;
    top: 0;
    z-index: 20;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 15px 16px;

    background: rgba(245,243,239,.95);
    backdrop-filter: blur(16px);

    border-bottom:
      1px solid rgba(0,0,0,.05);
  }

  .logo {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -.8px;
  }

  .caption {
    margin-top: 2px;
    color: #8c877f;
    font-size: 11px;
  }

  .avatar {
    width: 42px;
    height: 42px;

    border: 0;
    border-radius: 50%;

    background: #d8cec1;
    color: #202020;

    font-weight: 800;
    cursor: pointer;
  }

  .content {
    width: min(760px,100%);
    margin: 0 auto;
    padding: 18px 16px;
  }

  .hero {
    min-height: 290px;

    padding: 26px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    border-radius: 28px;
    overflow: hidden;

    background:
      linear-gradient(
        135deg,
        #d4c4b1,
        #eee5da 52%,
        #cbd5cd
      );
  }

  .eyebrow {
    color: #857d73;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1.7px;
    text-transform: uppercase;
  }

  .hero h1 {
    margin: 12px 0;

    font-size:
      clamp(44px,11vw,74px);

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

  .searchBox {
    position: relative;
    margin-bottom: 10px;
  }

  .searchInput {
    width: 100%;
    min-height: 50px;

    padding:
      0 48px 0 17px;

    border: 0;
    outline: none;

    border-radius: 17px;

    background: #fff;

    box-shadow:
      0 8px 25px
      rgba(0,0,0,.05);
  }

  .searchIcon {
    position: absolute;

    right: 16px;
    top: 50%;

    transform: translateY(-50%);

    color: #8e877f;
    font-size: 20px;

    pointer-events: none;
  }

  .filters {
    display: flex;
    gap: 8px;

    overflow-x: auto;

    padding:
      2px 1px 8px;

    scrollbar-width: none;
  }

  .filters::-webkit-scrollbar {
    display: none;
  }

  .filterButton {
    flex-shrink: 0;

    min-height: 36px;

    padding:
      0 14px;

    border-radius: 999px;

    background: #fff;
    color: #817a72;

    font-size: 11px;
    font-weight: 700;

    cursor: pointer;
  }

  .filterButton.active {
    background: #202020;
    color: #fff;
  }

  .resultInfo {
    margin:
      6px 2px 14px;

    color: #8c857d;
    font-size: 11px;
  }

  .loading {
    padding: 40px 10px;

    text-align: center;

    color: #8b847c;
  }

  .empty {
    padding: 40px 20px;

    text-align: center;

    color: #817a72;

    background: #fff;

    border-radius: 22px;
  }

  .grid {
    display: grid;

    grid-template-columns:
      repeat(
        auto-fit,
        minmax(250px,1fr)
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

  .cardImage {
    display: block;

    width: 100%;
    height: 220px;

    object-fit: cover;
  }

  .rating {
    position: absolute;

    right: 12px;
    bottom: 12px;

    padding:
      7px 9px;

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

    border-radius: 50%;

    background:
      rgba(255,255,255,.94);

    box-shadow:
      0 5px 18px
      rgba(0,0,0,.12);

    font-size: 21px;

    cursor: pointer;
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
    justify-content: space-between;

    margin-bottom: 8px;
  }

  .emoji {
    font-size: 20px;
  }

  .tag {
    padding:
      6px 9px;

    border-radius: 999px;

    background: #f0ece6;

    color: #777067;

    font-size: 10px;
  }

  .card h3 {
    margin:
      0 0 7px;

    font-size: 20px;

    letter-spacing: -.5px;
  }

  .card p {
    margin:
      0 0 12px;

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

    border-radius: 13px;

    background: #202020;
    color: #fff;

    font-weight: 700;

    cursor: pointer;
  }

  .smallLike {
    width: 48px;

    min-height: 43px;

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
    padding:
      20px 0;
  }

  .profileCard {
    padding: 26px;

    background: #fff;

    border-radius: 26px;

    text-align: center;
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
    margin:
      0 0 5px;

    font-size: 28px;
  }

  .profileUsername {
    margin:
      0 0 8px;

    color: #8c857d;
    font-size: 13px;
  }

  .profileBio {
    margin:
      0 0 20px;

    color: #6f6961;
    line-height: 1.45;
  }

  .profileStats {
    display: grid;

    grid-template-columns:
      repeat(3,1fr);

    gap: 8px;
  }

  .stat {
    padding: 14px 6px;

    border-radius: 17px;

    background: #f5f3ef;
  }

  .stat strong,
  .stat span {
    display: block;
  }

  .stat strong {
    font-size: 21px;
  }

  .stat span {
    margin-top: 4px;

    color: #8a837b;

    font-size: 10px;
  }

  .profileActions {
    display: grid;

    grid-template-columns:
      1fr 1fr;

    gap: 9px;

    margin-top: 13px;
  }

  .darkButton,
  .lightButton {
    min-height: 46px;

    border-radius: 14px;

    padding:
      0 15px;

    font-weight: 750;

    cursor: pointer;
  }

  .darkButton {
    background: #202020;
    color: #fff;
  }

  .lightButton {
    background: #f0ece6;
    color: #34312d;
  }

  .profileEditor {
    margin-top: 14px;

    padding: 18px;

    background: #fff;

    border-radius: 22px;
  }

  .profileEditor label {
    display: block;

    margin-bottom: 13px;

    color: #5e5851;

    font-size: 12px;
    font-weight: 700;
  }

  .profileEditor input,
  .profileEditor textarea {
    width: 100%;

    margin-top: 7px;

    padding: 13px;

    border:
      1px solid #e1dbd3;

    border-radius: 14px;

    background: #faf9f7;

    outline: none;
  }

  .profileEditor textarea {
    min-height: 90px;
    resize: vertical;
  }

  .likedSection {
    margin-top: 24px;
  }

  .likedSection h2 {
    margin:
      0 0 14px;

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

    border-radius: 18px;

    background: #fff;

    text-align: left;

    cursor: pointer;
  }

  .likedItem img {
    width: 65px;
    height: 65px;

    object-fit: cover;

    border-radius: 14px;
  }

  .likedItemTitle {
    font-weight: 800;
  }

  .likedItemSub {
    margin-top: 4px;

    color: #e54848;

    font-size: 13px;
  }

  .bottomNav {
    position: fixed;

    left: 12px;
    right: 12px;
    bottom: 12px;

    z-index: 50;

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

  .navButton.plus {
    justify-self: center;

    width: 44px;
    height: 44px;

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

    background:
      rgba(0,0,0,.45);
  }

  .modalCard {
    position: relative;

    width: min(620px,100%);

    max-height: 92vh;

    overflow: auto;

    border-radius: 28px;

    background: #fff;
  }

  .modalClose {
    position: absolute;

    right: 12px;
    top: 12px;

    z-index: 2;

    width: 38px;
    height: 38px;

    border-radius: 50%;

    background:
      rgba(255,255,255,.95);

    font-size: 23px;

    cursor: pointer;
  }

  .modalImage {
    display: block;

    width: 100%;
    height: 270px;

    object-fit: cover;
  }

  .modalBody {
    padding: 20px;
  }

  .modalHeader {
    display: flex;

    justify-content: space-between;

    gap: 12px;
  }

  .modalBody h2 {
    margin:
      7px 0;

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
    padding:
      6px 9px;

    border-radius: 999px;

    background: #f0ece6;

    color: #777169;

    font-size: 10px;
  }

  .modalInput,
  .modalTextarea {
    width: 100%;

    padding: 14px;

    margin-bottom: 10px;

    border:
      1px solid #e5e0d9;

    border-radius: 13px;

    background: #f8f6f2;

    outline: none;
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
    max-height: 230px;

    object-fit: cover;
  }

  @media (max-width: 560px) {
    .grid {
      grid-template-columns: 1fr;
    }

    .modal {
      padding: 0;
    }

    .modalCard {
      border-radius:
        28px 28px 0 0;
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

  const [search, setSearch] =
    React.useState("");

  const [activeFilter, setActiveFilter] =
    React.useState("Все");

  const [editingProfile, setEditingProfile] =
    React.useState(false);

  const [sharedProfile, setSharedProfile] =
    React.useState(null);

  const [profile, setProfile] =
    React.useState({
      name: "Анастасия",
      username: "",
      bio: "",
    });

  const [newLocation, setNewLocation] =
    React.useState({
      name: "",
      description: "",
      emoji: "📍",
      tags: "",
      rating: "5",
      imageFile: null,
    });

  React.useEffect(() => {
    loadLocations();
    loadLikes();
    loadProfile();
    readSharedProfile();
  }, []);

  function loadProfile() {
    try {
      const saved =
        localStorage.getItem(
          "v-kadre-profile"
        );

      if (saved) {
        const parsed =
          JSON.parse(saved);

        setProfile(
          (current) => ({
            ...current,
            ...parsed,
          })
        );
      }
    } catch (error) {
      console.error(
        "Ошибка загрузки профиля:",
        error
      );
    }
  }

  function readSharedProfile() {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const username =
      params.get("profile");

    if (!username) return;

    setSharedProfile({
      username,
      name:
        params.get("name") ||
        "Профиль пользователя",
      bio:
        params.get("bio") ||
        "",
    });

    setActive("profile");
  }

  async function loadLocations() {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      const {
        data,
        error,
      } = await supabase
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

        setLocations(
          prepared
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

  async function loadLikes() {
    if (!supabase) return;

    try {
      const {
        data,
        error,
      } = await supabase
        .from("location_likes")
        .select("location_id")
        .eq(
          "user_id",
          getUserId()
        );

      if (error) {
        console.error(
          "Ошибка загрузки лайков:",
          error
        );
        return;
      }

      const likes = {};

      (data || []).forEach(
        (item) => {
          likes[
            item.location_id
          ] = true;
        }
      );

      setLikedLocations(
        likes
      );
    } catch (error) {
      console.error(
        "Likes error:",
        error
      );
    }
  }

  async function toggleLike(id) {
    const currentlyLiked =
      Boolean(
        likedLocations[id]
      );

    setLikedLocations(
      (current) => ({
        ...current,
        [id]:
          !currentlyLiked,
      })
    );

    if (!supabase) return;

    const userId =
      getUserId();

    try {
      if (currentlyLiked) {
        const { error } =
          await supabase
            .from(
              "location_likes"
            )
            .delete()
            .eq(
              "location_id",
              id
            )
            .eq(
              "user_id",
              userId
            );

        if (error) {
          throw error;
        }
      } else {
        const { error } =
          await supabase
            .from(
              "location_likes"
            )
            .insert({
              location_id: id,
              user_id: userId,
            });

        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error(
        "Ошибка лайка:",
        error
      );

      setLikedLocations(
        (current) => ({
          ...current,
          [id]:
            currentlyLiked,
        })
      );
    }
  }

  async function addLocation() {
    if (!supabase) {
      alert(
        "Supabase не подключён"
      );
      return;
    }

    if (
      !newLocation.name.trim()
    ) {
      alert(
        "Введите название места"
      );
      return;
    }

    setSavingLocation(true);

    try {
      let imageUrl = "";

      if (
        newLocation.imageFile
      ) {
        const file =
          newLocation.imageFile;

        const extension =
          file.name
            .split(".")
            .pop() ||
          "jpg";

        const fileName =
          `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}.${extension}`;

        const filePath =
          `locations/${fileName}`;

        const {
          error:
            uploadError,
        } =
          await supabase.storage
            .from(
              "location-images"
            )
            .upload(
              filePath,
              file,
              {
                cacheControl:
                  "3600",
                upsert:
                  false,
                contentType:
                  file.type ||
                  "image/jpeg",
              }
            );

        if (uploadError) {
          throw new Error(
            `Фото: ${uploadError.message}`
          );
        }

        const {
          data:
            publicData,
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
        imageUrl =
          FALLBACK_IMAGE;
      }

      const tags =
        newLocation.tags
          .split(",")
          .map(
            (tag) =>
              tag.trim()
          )
          .filter(Boolean);

      const {
        data,
        error,
      } =
        await supabase
          .from(
            "locations"
          )
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

            user_added:
              true,
          })
          .select()
          .single();

      if (error) {
        throw error;
      }

      const prepared = {
        id: data.id,

        title:
          data.name ||
          "Без названия",

        description:
          data.description ||
          "Красивое место для прогулки.",

        image:
          data.image_url ||
          FALLBACK_IMAGE,

        rating:
          data.rating ??
          null,

        emoji:
          data.emoji ||
          "📍",

        tags:
          Array.isArray(
            data.tags
          )
            ? data.tags
            : [],
      };

      setLocations(
        (current) => [
          prepared,
          ...current,
        ]
      );

      setNewLocation({
        name: "",
        description: "",
        emoji: "📍",
        tags: "",
        rating: "5",
        imageFile: null,
      });

      setShowAddLocation(
        false
      );

      alert(
        "Локация добавлена ❤️"
      );
    } catch (error) {
      console.error(
        "Ошибка добавления:",
        error
      );

      alert(
        "Не удалось добавить локацию:\n" +
          error.message
      );
    } finally {
      setSavingLocation(
        false
      );
    }
  }

  function handlePhotoSelect(
    event
  ) {
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

  function saveProfile() {
    const cleanUsername =
      profile.username
        .replace(
          /^@+/,
          ""
        )
        .trim();

    const next = {
      ...profile,
      username:
        cleanUsername,
    };

    setProfile(next);

    localStorage.setItem(
      "v-kadre-profile",
      JSON.stringify(
        next
      )
    );

    setEditingProfile(
      false
    );

    alert(
      "Профиль сохранён ❤️"
    );
  }

  async function shareProfile() {
    const username =
      profile.username
        .replace(
          /^@+/,
          ""
        )
        .trim() ||
      "user";

    const params =
      new URLSearchParams({
        profile:
          username,

        name:
          profile.name ||
          "Профиль пользователя",

        bio:
          profile.bio ||
          "",
      });

    const url =
      `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    const shareText =
      `Мой профиль в «В кадре»: @${username}`;

    try {
      if (
        navigator.share
      ) {
        await navigator.share({
          title:
            "Профиль в «В кадре»",
          text:
            shareText,
          url,
        });
      } else {
        const telegramUrl =
          `https://t.me/share/url?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(
            shareText
          )}`;

        window.open(
          telegramUrl,
          "_blank"
        );
      }
    } catch (error) {
      if (
        error?.name !==
        "AbortError"
      ) {
        console.error(
          "Ошибка шаринга:",
          error
        );
      }
    }
  }

  const previewUrl =
    React.useMemo(() => {
      if (
        !newLocation.imageFile
      ) {
        return "";
      }

      return URL.createObjectURL(
        newLocation.imageFile
      );
    }, [
      newLocation.imageFile,
    ]);

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(
          previewUrl
        );
      }
    };
  }, [previewUrl]);

  const likesCount =
    Object.values(
      likedLocations
    ).filter(Boolean)
      .length;

  const likedLocationList =
    locations.filter(
      (location) =>
        likedLocations[
          location.id
        ]
    );

  const filterNames = [
    "Все",
    "Прогулка",
    "Свидание",
    "Фото",
    "Природа",
    "Город",
    "Закат",
    "Парк",
    "Вид",
  ];

  const filteredLocations =
    locations.filter(
      (location) => {
        const query =
          search
            .trim()
            .toLowerCase();

        const tags =
          Array.isArray(
            location.tags
          )
            ? location.tags
            : [];

        const searchable =
          [
            location.title,
            location.description,
            ...tags,
          ]
            .join(" ")
            .toLowerCase();

        const matchesSearch =
          !query ||
          searchable.includes(
            query
          );

        const matchesFilter =
          activeFilter ===
            "Все" ||
          tags.some(
            (tag) =>
              String(tag)
                .toLowerCase()
                .includes(
                  activeFilter.toLowerCase()
                )
          );

        return (
          matchesSearch &&
          matchesFilter
        );
      }
    );

  return (
    <>
      <style>
        {styles}
      </style>

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
              setActive(
                "profile"
              )
            }
          >
            А
          </button>

        </header>

        <main className="content">

          {active ===
            "home" && (
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
                  Локации для
                  прогулок,
                  свиданий,
                  вдохновения
                  и красивых
                  фотографий.
                </p>

              </section>

              <h2 className="sectionTitle">
                Популярные места
              </h2>

              <div className="searchBox">

                <input
                  className="searchInput"
                  value={search}
                  onChange={(
                    event
                  ) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Найти место..."
                />

                <span className="searchIcon">
                  ⌕
                </span>

              </div>

              <div className="filters">

                {filterNames.map(
                  (filter) => (
                    <button
                      key={filter}
                      className={
                        activeFilter ===
                        filter
                          ? "filterButton active"
                          : "filterButton"
                      }
                      onClick={() =>
                        setActiveFilter(
                          filter
                        )
                      }
                    >
                      {filter}
                    </button>
                  )
                )}

              </div>

              {!loading && (
                <div className="resultInfo">
                  Найдено:{" "}
                  {
                    filteredLocations.length
                  }
                </div>
              )}

              {loading ? (

                <div className="loading">
                  Загружаем
                  локации…
                </div>

              ) : filteredLocations.length === 0 ? (

                <div className="empty">
                  Ничего не
                  нашли. Попробуй
                  другой запрос
                  или фильтр.
                </div>

              ) : (

                <div className="grid">

                  {filteredLocations.map(
                    (location) => {

                      const liked =
                        Boolean(
                          likedLocations[
                            location.id
                          ]
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
                                location.title
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

                            {location.tags.length >
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

          {active ===
            "profile" && (

            <section className="profile">

              {sharedProfile ? (

                <div className="profileCard">

                  <div className="profileAvatar">
                    {(
                      sharedProfile.name ||
                      "П"
                    )
                      .slice(
                        0,
                        1
                      )
                      .toUpperCase()}
                  </div>

                  <h1>
                    {
                      sharedProfile.name
                    }
                  </h1>

                  <div className="profileUsername">
                    @
                    {
                      sharedProfile.username
                    }
                  </div>

                  {sharedProfile.bio && (
                    <div className="profileBio">
                      {
                        sharedProfile.bio
                      }
                    </div>
                  )}

                  <button
                    className="darkButton"
                    style={{
                      width: "100%",
                    }}
                    onClick={() => {
                      setSharedProfile(
                        null
                      );

                      setActive(
                        "home"
                      );
                    }}
                  >
                    Открыть своё
                    приложение
                  </button>

                </div>

              ) : (

                <>

                  <div className="profileCard">

                    <div className="profileAvatar">
                      {(
                        profile.name ||
                        "А"
                      )
                        .slice(
                          0,
                          1
                        )
                        .toUpperCase()}
                    </div>

                    <h1>
                      {
                        profile.name ||
                        "Анастасия"
                      }
                    </h1>

                    <div className="profileUsername">
                      {profile.username
                        ? `@${profile.username}`
                        : "Добавь username"}
                    </div>

                    {profile.bio && (
                      <div className="profileBio">
                        {
                          profile.bio
                        }
                      </div>
                    )}

                    <div className="profileStats">

                      <div className="stat">

                        <strong>
                          {
                            locations.length
                          }
                        </strong>

                        <span>
                          локации
                        </span>

                      </div>

                      <div className="stat">

                        <strong>
                          {
                            likesCount
                          }
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

                    <div className="profileActions">

                      <button
                        className="darkButton"
                        onClick={() =>
                          setEditingProfile(
                            (current) =>
                              !current
                          )
                        }
                      >
                        {editingProfile
                          ? "Закрыть"
                          : "Изменить профиль"}
                      </button>

                      <button
                        className="lightButton"
                        onClick={
                          shareProfile
                        }
                      >
                        Поделиться
                      </button>

                    </div>

                  </div>

                  {editingProfile && (

                    <div className="profileEditor">

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
                              (current) => ({
                                ...current,
                                username:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          placeholder="например anastasia"
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
                              (current) => ({
                                ...current,
                                bio:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          placeholder="Пара слов о себе..."
                        />

                      </label>

                      <button
                        className="darkButton"
                        style={{
                          width: "100%",
                        }}
                        onClick={
                          saveProfile
                        }
                      >
                        Сохранить профиль
                      </button>

                    </div>

                  )}

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
                                  location.title
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
                                    location.title
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

                </>

              )}

            </section>

          )}

        </main>

        <nav className="bottomNav">

          <button
            className={
              active ===
              "home"
                ? "navButton active"
                : "navButton"
            }
            onClick={() =>
              setActive(
                "home"
              )
            }
          >
            <span>
              ⌂
            </span>
            Главная
          </button>

          <button
            className="navButton plus"
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
              active ===
              "profile"
                ? "navButton active"
                : "navButton"
            }
            onClick={() =>
              setActive(
                "profile"
              )
            }
          >
            <span>
              ○
            </span>
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
                className="modalClose"
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

                  📷 Выбрать
                  фото из галереи

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handlePhotoSelect
                    }
                  />

                </label>

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
                className="modalClose"
                onClick={() =>
                  setSelectedLocation(
                    null
                  )
                }
              >
                ×
              </button>

              <img
                className="modalImage"
                src={
                  selectedLocation.image
                }
                alt={
                  selectedLocation.title
                }
                onError={(
                  event
                ) => {
                  event.currentTarget.src =
                    FALLBACK_IMAGE;
                }}
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
                      likedLocations[
                        selectedLocation.id
                      ]
                        ? "modalLike liked"
                        : "modalLike"
                    }
                    onClick={() =>
                      toggleLike(
                        selectedLocation.id
                      )
                    }
                  >
                    {likedLocations[
                      selectedLocation.id
                    ]
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
                      <span
                        key={
                          tag
                        }
                      >
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
  document.getElementById(
    "root"
  );

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
