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



  const handleInst = () => {
    const instUrl = `https://instagram.com/comabooks.global`;
    window.open(instUrl, "_blank");
  };

  const handleLogin = () => {
    nav('/login');
  };
  const handlePricing = () => {
    nav('/products/custom-book');
  };
  const handlePolicy = () => {
    nav('/policies');
  };

  const [qty, setQty] = useState<number>(1);
    const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  
    const handleQtyMinus = () => {
      setQty((prev) => (prev > 1 ? prev - 1 : 1));
    };
  
    const handleQtyPlus = () => {
      setQty((prev) => prev + 1);
    };
  
    const getDirectMessage = () => {
      if (qty <= 1) {
        return "Hi! I want to order a book for my loved one";
      }
      return `Hi! I want to order ${qty} books for my loved ones`;
    };
  
    const openContactPopup = () => {
      setIsContactPopupOpen(true);
    };
  
    const closeContactPopup = () => {
      setIsContactPopupOpen(false);
    };
  
    const handlePopupWhatsapp = () => {
      const baseUrl = ""; // сюда потом вставишь реальный линк
      const text = encodeURIComponent(getDirectMessage());
      const url = `${baseUrl}?text=${text}`;
      window.open(url, "_blank");
      closeContactPopup();
    };
  
    const handlePopupFacebook = () => {
      const baseUrl = ""; // сюда потом вставишь реальный линк
      const text = encodeURIComponent(getDirectMessage());
      const url = `${baseUrl}?text=${text}`;
      window.open(url, "_blank");
      closeContactPopup();
    };
  
    const handlePopupInstagram = () => {
      const baseUrl = ""; // сюда потом вставишь реальный линк
      const text = encodeURIComponent(getDirectMessage());
      const url = `${baseUrl}?text=${text}`;
      window.open(url, "_blank");
      closeContactPopup();
    };

  return (
    <div className="landing-upd">
      <div className="landing-upd-header">
        <div onClick={() => navigate("/")} className="landing-upd-header-logo">
          comabooks
        </div>
        <div className="landing-upd-header-links">
          <Link to={"https://www.instagram.com/comabooks.global/"}>Reviews</Link>
          <div onClick={handlePricing}>
            Pricing
          </div>
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
            onClick={openContactPopup}
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
          onClick={openContactPopup}
          className="landing-upd-fixed-mobile-button-ask"
        >
          Ask a question
        </button>
        <button
          onClick={openContactPopup}
          className="landing-upd-fixed-mobile-button-action"
        >
          Order a book
        </button>
      </div>

      <div className="landing-upd-first">
        <div className="landing-upd-first-action">
          <div>Dedicate a book for a loved one</div>
          <button onClick={openContactPopup}>Start your book</button>
          <button style={{background: 'none', color: 'white', padding: 0, fontWeight: 400}} onClick={() => {nav('/products/custom-book')}}>Learn more</button>
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

          <button onClick={openContactPopup}>Order a book</button>
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

          <button onClick={openContactPopup}>Order a book</button>
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
            to="https://www.instagram.com/reel/DOilgjpjH-m/?igsh=MWdteXJpaGdoMjZzNQ=="
            className="landing-upd-fifth-grid-item"
          >
            <img src={player} />
          </Link>
          <Link
            to="https://www.instagram.com/reel/DOOVsx_DLR2/?igsh=MXYwaTZyZ2o4NmduNw=="
            className="landing-upd-fifth-grid-item"
          >
            <img src={player} />
          </Link>
          <Link
            to="https://www.instagram.com/reel/DRl7kXFkZim/?igsh=b3Y0b241OWhkdDFz"
            className="landing-upd-fifth-grid-item"
          >
            <img src={player} />
          </Link>
          <Link
            to="https://www.instagram.com/reel/DRo7xqCjE22/?igsh=cmNhZGU3YXc5aTV6"
            className="landing-upd-fifth-grid-item"
          >
            <img src={player} />
          </Link>
          <Link
            to="https://www.instagram.com/reel/DRmJRf4kdrG/?igsh=bGE1MWJ4ZGkxNzZm"
            className="landing-upd-fifth-grid-item"
          >
            <img src={player} />
          </Link>
          <Link
            to="https://www.instagram.com/reel/DRjkeFhEbUo/?igsh=ZmVubmVlOWV4YTB6"
            className="landing-upd-fifth-grid-item"
          >
            <img src={player} />
          </Link>
        </div>
      </div>

      <div className="landing-upd-footer">
        <div className="landing-upd-footer-row">
          <div>Give a gift they'll remember for a lifetime</div>
          <button onClick={openContactPopup}>Order a book</button>
        </div>

        <div className="landing-upd-footer-logo">comabooks</div>

        <div className="landing-upd-footer-row-2">
          <div>hello@comabooks.org</div>
          <Link to={"https://www.instagram.com/comabooks.global/"}>Instagram</Link>
        </div>

        <div className="landing-upd-footer-row-mobile">
          <div>hello@comabooks.org</div>
          <Link to={"https://www.instagram.com/comabooks.global/"}>Instagram</Link>
          <div onClick={handlePricing}>Pricing</div>
          <div onClick={handlePolicy}>
            Policy
          </div>
          <div>COMAHOLDING LLC, 2025</div>
        </div>
      </div>


      {isContactPopupOpen && (
  <div className="contact-popup-backdrop" onClick={closeContactPopup}>
    <div
      className="contact-popup"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="contact-popup-close"
        onClick={closeContactPopup}
      >
        ×
      </button>
      <div className="contact-popup-title">
        Average respond time: 3 minutes
      </div>

      <div className="contact-popup-buttons">
        <button
          className="contact-popup-btn contact-popup-btn-whatsapp"
          onClick={handlePopupWhatsapp}
        >
          <span className="contact-popup-btn-label">WhatsApp</span>
        </button>

        <button
          className="contact-popup-btn contact-popup-btn-facebook"
          onClick={handlePopupFacebook}
        >
          <span className="contact-popup-btn-label">Facebook</span>
        </button>

        <button
          className="contact-popup-btn contact-popup-btn-instagram"
          onClick={handlePopupInstagram}
        >
          <span className="contact-popup-btn-label">Instagram</span>
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default LandingUpdated;
