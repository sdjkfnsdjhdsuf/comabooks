import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import video from "./assets/video.mp4";
import player from "./assets/player.svg";
import starsmall from "./assets/starsmall.svg";
import review from "./assets/review2.jpg";
import { Link, useNavigate } from "react-router-dom";
import BookConstructor, { globalPhoneNumber } from "./Constructor";

function LandingUpdated() {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState("любимому человеку");

  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = reviewsRef.current;
    if (!container) return;

    const speed = 1; // pixels to scroll per interval
    const intervalTime = 20; // milliseconds between scroll updates

    const scrollInterval = setInterval(() => {
      if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth
      ) {
        container.scrollLeft = 0; // Reset scroll to the start
      } else {
        container.scrollLeft += speed;
      }
    }, intervalTime);

    return () => clearInterval(scrollInterval);
  }, []);

  const [phone, setPhone] = useState<string>("");
  useEffect(() => {
    async function fetchPhone() {
      try {
        const res = await fetch("https://api.comabooks.org/sales/phoneNumber", {
        });
        if (!res.ok) throw new Error("Не удалось получить номер");
        const data = await res.json();
        setPhone(data.phone || "");
      } catch (err) {
        console.error(err);
      }
    }
    fetchPhone();
  }, []);

  const words = [
    "любимому человеку",
    "девушке",
    "парню",
    "жене",
    "мужу",
    "маме",
    "папе",
    "родителям",
    "брату",
    "сестре",
    "друзьям",
    "коллеге",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleOrder = () => {
    const message = `Здравствуйте! Хочу сделать заказ. Можете проконсультировать?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleAsk = () => {
    const message = `Здравствуйте! Хочу узнать подробнее о книге`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleInst = () => {
    const instUrl = `https://instagram.com/comabooks`;
    window.open(instUrl, "_blank");
  };

  const handleLogin = () => {
    const instUrl = `https://comabooks.org/login`;
    window.open(instUrl, "_blank");
  };

  return (
    <div className="landing-upd">
      <div className="landing-upd-header">
        <div onClick={() => navigate("/")} className="landing-upd-header-logo">
          comabooks
        </div>
        <div className="landing-upd-header-links">
          <Link to={"https://www.instagram.com/comabooks/"}>Отзывы</Link>
          <Link to={"https:/comabooks.org/order"}>Цены и вопросы</Link>
          <Link to={"https:/comabooks.org/policies"}>
            Условия использования
          </Link>
          <button
            onClick={handleLogin}
            className="landing-upd-header-button-empty"
          >
            Войти
          </button>
          <button
            onClick={handleOrder}
            className="landing-upd-header-button-filled"
          >
            Заказать книгу
          </button>
        </div>
      </div>

      <div className="landing-upd-header-mobile">
        <div className="landing-upd-header-logo">comabooks</div>
        <button
          onClick={handleLogin}
          className="landing-upd-header-button-filled"
        >
          Войти
        </button>
      </div>

      <div className="landing-upd-fixed-mobile">
        <button
          onClick={handleAsk}
          className="landing-upd-fixed-mobile-button-ask"
        >
          Задать вопрос
        </button>
        <button
          onClick={handleOrder}
          className="landing-upd-fixed-mobile-button-action"
        >
          Заказать книгу
        </button>
      </div>

      <div className="landing-upd-first">
        <div className="landing-upd-first-action">
          <div>Посвяти книгу любимому человеку</div>
          <button onClick={handleOrder}>Заказать книгу</button>
        </div>

        <div className="landing-upd-first-reviews" ref={reviewsRef}>
          <Link
            to="https://www.instagram.com/reel/DGaoqFMN3T7/?igsh=bTR0Zzk5bXZlNGRt"
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s1">
              <img src={player} />
            </div>
            <div>Девушке</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/C8CS1heN8if/?igsh=MTVya3FwbjN4OHQ2cQ%3D%3D"
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s2">
              <img src={player} />
            </div>
            <div>Мужу</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/DGLQqQpMWNv/?igsh=cGQwcW05Nmk1cmVo"
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s3">
              <img src={player} />
            </div>
            <div>Бабушке</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/DGIReIctGMW/?igsh=eXpkcGRxN21mNmN0"
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s4">
              <img src={player} />
            </div>
            <div>Подруге</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/DE4xDPTNDVy/?igsh=MTI4a3Jhd2VxajduMQ=="
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s5">
              <img src={player} />
            </div>
            <div>Родителям</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/DG2-FhONQtm/?igsh=MWJtOXBjdHJhZXQ2Ng=="
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s6">
              <img src={player} />
            </div>
            <div>Детям</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/DHqnaqstZWU/?igsh=MWdleGF6bGN2aW0zYw=="
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s7">
              <img src={player} />
            </div>
            <div>Сестре</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/DG5C213I3D7/?igsh=YWtvczk3djhwY2xt"
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s8">
              <img src={player} />
            </div>
            <div>Себе</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/C8UaVEXC95t/?igsh=ejV0djJiMHV3Y2t3"
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s9">
              <img src={player} />
            </div>
            <div>Девушке</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/DEPNZJyo2oB/?igsh=dnMzam9iank2NHV0"
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s10">
              <img src={player} />
            </div>
            <div>Коллеге</div>
          </Link>
        </div>
      </div>

      <div className="landing-upd-second">
        <div className="landing-upd-second-content">
          <div className="landing-upd-second-content-title">
            Почувствуй себя в роли автора и порадуй близких
          </div>

          <div className="landing-upd-second-content-item">
            <div className="landing-upd-second-content-item-row">
              <img src={starsmall} />
              Полноценная книга
            </div>
            О любимом человеке с вашимии инициалами и содержанием на 200+
            страниц.
          </div>

          <div className="landing-upd-second-content-item">
            <div className="landing-upd-second-content-item-row">
              <img src={starsmall} />
              Более 30 форматов
            </div>
            У нас есть форматы книг для: любимых, семьи, друзей, коллег,
            начальства, бывших и даже себя.
          </div>

          <div className="landing-upd-second-content-item">
            <div className="landing-upd-second-content-item-row">
              <img src={starsmall} />
              Доставляем по всему миру
            </div>
            По г. Алматы в течении 1 рабочего дня, по другим городам Казахстана
            за 2-4 дня, по другим странам от 4-10 дней.
          </div>

          <button onClick={handleOrder}>Заказать книгу</button>
        </div>

        <video
          className="landing-upd-second-video"
          src={video}
          loop
          autoPlay
          muted
          playsInline
        />

        <div className="landing-upd-second-content-mobile">
          <div className="landing-upd-second-content-title">
            Почувствуй себя в роли автора и порадуй близких
          </div>

          <video
            className="landing-upd-second-video-mobile"
            src={video}
            loop
            autoPlay
            muted
            playsInline
          />

          <div className="landing-upd-second-content-item">
            <div className="landing-upd-second-content-item-row">
              <img src={starsmall} />
              Полноценная книга
            </div>
            О любимом человеке с вашимии инициалами и содержанием на 200+
            страниц.
          </div>

          <div className="landing-upd-second-content-item">
            <div className="landing-upd-second-content-item-row">
              <img src={starsmall} />
              Более 30 форматов
            </div>
            У нас есть форматы книг для: любимых, семьи, друзей, коллег,
            начальства, бывших и даже себя.
          </div>

          <div className="landing-upd-second-content-item">
            <div className="landing-upd-second-content-item-row">
              <img src={starsmall} />
              Доставляем по всему миру
            </div>
            По г. Алматы в течении 1 рабочего дня, по другим городам Казахстана
            за 2-4 дня, по другим странам от 4-10 дней.
          </div>

          <button onClick={handleOrder}>Заказать книгу</button>
        </div>
      </div>

      <div className="landing-upd-third"></div>
      <div className="landing-upd-forth">
        <div className="landing-upd-forth-title">Процесс написания книги</div>

        <BookConstructor />
        {/* <div className="landing-upd-constructor">
            <div className="landing-upd-constructor-editor">
                <div className="landing-upd-constructor-editor-title">Обложка</div>

                <div className="landing-upd-constructor-editor-box">
                    <div className="landing-upd-constructor-editor-box-title">Дизайн</div>
                    <div className="landing-upd-constructor-editor-box-selector">
                        <img src={review} className="landing-upd-constructor-editor-box-item" />
                        <img src={review}  className="landing-upd-constructor-editor-box-item" />
                        <img src={review}  className="landing-upd-constructor-editor-box-item" />
                        <img src={review}  className="landing-upd-constructor-editor-box-item" />
                        <img src={review}  className="landing-upd-constructor-editor-box-item" />
                    </div>
                </div>

                <div className="landing-upd-constructor-editor-box">
                    <div className="landing-upd-constructor-editor-box-title">Название книги</div>
                    <input className="landing-upd-constructor-editor-box-input" />
                </div>

                <div className="landing-upd-constructor-editor-box">
                    <div className="landing-upd-constructor-editor-box-title">Автор</div>
                    <input className="landing-upd-constructor-editor-box-input" />
                </div>

                <div className="landing-upd-constructor-editor-box">
                    <div className="landing-upd-constructor-editor-box-title">Получатель</div>
                    <input className="landing-upd-constructor-editor-box-input" />
                </div>
            </div>
            <div className="landing-upd-constructor-preview"></div>
        </div> */}
      </div>

      <div className="landing-upd-fifth">
        <div className="landing-upd-fifth-content">
          Более 1 000 человек стали авторами собственных книг
          <button onClick={handleInst}>Больше отзывов в Instagram</button>
        </div>

        <div className="landing-upd-fifth-grid">
          <Link
            to="https://www.instagram.com/reel/C8ysJ4gN9Im/?utm_source=ig_web_copy_link"
            className="landing-upd-fifth-grid-item"
          >
            <img src={player} />
          </Link>
          <Link
            to="https://www.tiktok.com/@chakievaa/video/7364429063080971537?is_from_webapp=1&sender_device=pc"
            className="landing-upd-fifth-grid-item"
          >
            <img src={player} />
          </Link>
          <Link
            to="https://www.instagram.com/reel/C8UaVEXC95t/?igsh=ejV0djJiMHV3Y2t3"
            className="landing-upd-fifth-grid-item"
          >
            <img src={player} />
          </Link>
          <Link
            to="https://www.instagram.com/reel/C8CS1heN8if/?utm_source=ig_web_copy_link"
            className="landing-upd-fifth-grid-item"
          >
            <img src={player} />
          </Link>
          <Link
            to="https://www.instagram.com/reel/C9PpvKMtC7s/?igsh=MXFyMmIxeWhuYThzcw=="
            className="landing-upd-fifth-grid-item"
          >
            <img src={player} />
          </Link>
          <Link
            to="https://www.instagram.com/reel/DF-l9q2IH7F/?igsh=NGxqNTVsMHp1N2p6"
            className="landing-upd-fifth-grid-item"
          >
            <img src={player} />
          </Link>
        </div>
      </div>

      <div className="landing-upd-footer">
        <div className="landing-upd-footer-row">
          <div>Сделай подарок, который запомнится на вcю жизнь</div>
          <button onClick={handleOrder}>Заказать книгу</button>
        </div>

        <div className="landing-upd-footer-logo">comabooks</div>

        <div className="landing-upd-footer-row-2">
          <div>hello@comabooks.org</div>
          <Link to={"https://www.instagram.com/comabooks/"}>Instagram</Link>
        </div>

        <div className="landing-upd-footer-row-mobile">
          <div>hello@comabooks.org</div>
          <Link to={"https://www.instagram.com/comabooks/"}>Instagram</Link>
          <Link to={"https:/comabooks.org/order"}>Цены и вопросы</Link>
          <Link to={"https:/comabooks.org/policies"}>
            Условия использования
          </Link>
          <div>ИП COMAHOLDING, 2025</div>
        </div>
      </div>
    </div>
  );
}

export default LandingUpdated;
