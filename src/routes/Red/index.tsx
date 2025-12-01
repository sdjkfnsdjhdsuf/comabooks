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

  const nav = useNavigate();

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
    const message = `Hello! I’d like to learn more about the book`;
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
    const instUrl = `https://instagram.com/comabooks.global`;
    window.open(instUrl, "_blank");
  };

  const handleLogin = () => {
    nav('/login');
  };
  const handlePolicy = () => {
    nav('/policies');
  };

  return (
    <div className="landing-upd">
      <div className="landing-upd-header">
        <div onClick={() => navigate("/")} className="landing-upd-header-logo">
          comabooks
        </div>
        <div className="landing-upd-header-links">
          <Link to={"https://www.instagram.com/comabooks.global/"}>Reviews</Link>
          <Link to={"https:/comabooks.org/order"}>Pricing</Link>
          <div onClick={handlePolicy}>
            Policy
          </div>
          <button
            onClick={handleLogin}
            className="landing-upd-header-button-empty"
          >
            Login
          </button>
          <button
            onClick={handleOrder}
            className="landing-upd-header-button-filled"
          >
            Order a book
          </button>
        </div>
      </div>

      <div className="landing-upd-header-mobile">
        <div className="landing-upd-header-logo">comabooks</div>
        <button
          onClick={handleLogin}
          className="landing-upd-header-button-filled"
        >
          Login
        </button>
      </div>

      <div className="landing-upd-fixed-mobile">
        <button
          onClick={handleAsk}
          className="landing-upd-fixed-mobile-button-ask"
        >
          Ask a question
        </button>
        <button
          onClick={handleOrder}
          className="landing-upd-fixed-mobile-button-action"
        >
          Order a book
        </button>
      </div>

      <div className="landing-upd-first">
        <div className="landing-upd-first-action">
          <div>Dedicate a book for a loved one</div>
          <button onClick={handleOrder}>Start your book</button>
        </div>

        <div className="landing-upd-first-reviews" ref={reviewsRef}>
          <Link
            to="https://www.instagram.com/reel/DGaoqFMN3T7/?igsh=bTR0Zzk5bXZlNGRt"
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s1">
              <img src={player} />
            </div>
            <div>For girlfriend</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/C8CS1heN8if/?igsh=MTVya3FwbjN4OHQ2cQ%3D%3D"
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s2">
              <img src={player} />
            </div>
            <div>For husband</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/DGLQqQpMWNv/?igsh=cGQwcW05Nmk1cmVo"
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s3">
              <img src={player} />
            </div>
            <div>For grandma</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/DGIReIctGMW/?igsh=eXpkcGRxN21mNmN0"
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s4">
              <img src={player} />
            </div>
            <div>For bestie</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/DE4xDPTNDVy/?igsh=MTI4a3Jhd2VxajduMQ=="
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s5">
              <img src={player} />
            </div>
            <div>For parents</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/DG2-FhONQtm/?igsh=MWJtOXBjdHJhZXQ2Ng=="
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s6">
              <img src={player} />
            </div>
            <div>For kids</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/DHqnaqstZWU/?igsh=MWdleGF6bGN2aW0zYw=="
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s7">
              <img src={player} />
            </div>
            <div>For sister</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/DG5C213I3D7/?igsh=YWtvczk3djhwY2xt"
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s8">
              <img src={player} />
            </div>
            <div>For yourself</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/C8UaVEXC95t/?igsh=ejV0djJiMHV3Y2t3"
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s9">
              <img src={player} />
            </div>
            <div>For girlfriend</div>
          </Link>

          <Link
            to="https://www.instagram.com/reel/DEPNZJyo2oB/?igsh=dnMzam9iank2NHV0"
            className="landing-upd-first-reviews-item"
          >
            <div className="landing-upd-first-reviews-item-preview s10">
              <img src={player} />
            </div>
            <div>For collegue</div>
          </Link>
        </div>
      </div>

      <div className="landing-upd-second">
        <div className="landing-upd-second-content">
          <div className="landing-upd-second-content-title">
            Be the author<br/>Make your loved ones smile
          </div>

          <div className="landing-upd-second-content-item">
            <div className="landing-upd-second-content-item-row">
              <img src={starsmall} />
              Can be dedicated to anyone
            </div>
            There are 30+ themes — for everyone who matters: your loved one, family, friends, colleagues, your boss, your ex, even yourself and etc.
          </div>

          <div className="landing-upd-second-content-item">
            <div className="landing-upd-second-content-item-row">
              <img src={starsmall} />
              Easy to fill
            </div>
            Our books are created in an interview style — each theme comes with a unique set of 50–200 questions: Just answer them, add photos if you like, and choose your cover design.
          </div>

          <div className="landing-upd-second-content-item">
            <div className="landing-upd-second-content-item-row">
              <img src={starsmall} />
              Editing and printing
            </div>
            Once you’ve finished answering, our editing team will review your answers for grammar, punctuation, and spelling. After they approve the final version, the book is printed. The whole process takes 5–7 business days.
          </div>

          <div className="landing-upd-second-content-item">
            <div className="landing-upd-second-content-item-row">
              <img src={starsmall} />
              How to start
            </div>
            Just message us on WhatsApp, Facebook, or Instagram — our managers will guide you through everything. Once the payment is made, they’ll create a personal account for you so you can start your book.
          </div>

          <button onClick={handleOrder}>Order a book</button>
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
            Be the author<br/>Make your loved ones smile
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
              Can be dedicated to anyone
            </div>
            There are 30+ themes — for everyone who matters: your loved one, family, friends, colleagues, your boss, your ex, even yourself and etc.
          </div>

          <div className="landing-upd-second-content-item">
            <div className="landing-upd-second-content-item-row">
              <img src={starsmall} />
              Easy to fill
            </div>
            Our books are created in an interview style — each theme comes with a unique set of 50–200 questions: Just answer them, add photos if you like, and choose your cover design.
          </div>

          <div className="landing-upd-second-content-item">
            <div className="landing-upd-second-content-item-row">
              <img src={starsmall} />
              Editing and printing
            </div>
            Once you’ve finished answering, our editing team will review your answers for grammar, punctuation, and spelling. After they approve the final version, the book is printed. The whole process takes 5–7 business days.
          </div>

          <div className="landing-upd-second-content-item">
            <div className="landing-upd-second-content-item-row">
              <img src={starsmall} />
              How to start
            </div>
            Just message us on WhatsApp, Facebook, or Instagram — our managers will guide you through everything. Once the payment is made, they’ll create a personal account for you so you can start your book.
          </div>

          <button onClick={handleOrder}>Order a book</button>
        </div>
      </div>

      <div className="landing-upd-third"></div>
      <div className="landing-upd-forth">
        <div className="landing-upd-forth-title">Let's try to start one</div>

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
          +20,000 people have already become authors of their own books
          <button onClick={handleInst}>More reviews on Instagram</button>
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
          <div>Give a gift they'll remember for a lifetime</div>
          <button onClick={handleOrder}>Order a book</button>
        </div>

        <div className="landing-upd-footer-logo">comabooks</div>

        <div className="landing-upd-footer-row-2">
          <div>hello@comabooks.org</div>
          <Link to={"https://www.instagram.com/comabooks.global/"}>Instagram</Link>
        </div>

        <div className="landing-upd-footer-row-mobile">
          <div>hello@comabooks.org</div>
          <Link to={"https://www.instagram.com/comabooks.global/"}>Instagram</Link>
          <Link to={"https:/comabooks.org/order"}>Pricing</Link>
          <div onClick={handlePolicy}>
            Policy
          </div>
          <div>COMAHOLDING LLC, 2025</div>
        </div>
      </div>
    </div>
  );
}

export default LandingUpdated;
