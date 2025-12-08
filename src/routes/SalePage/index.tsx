import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import player from "../Red/assets/player.svg";
import { Link, useNavigate } from "react-router-dom";

import mainFront from "../Red/assets/product/main-front.png";
import mainBack from "../Red/assets/product/main-back.png";
import mainFull from "../Red/assets/product/main-full.png";

import stars from "../Red/assets/product/stars.png";
import google from "../Red/assets/product/google.png";
import facebook from "../Red/assets/product/facebook.png";
import whatsapp from "../Red/assets/product/whatsapp.png";
import paypal from "../Red/assets/product/paypal.png";

import starsmall from "../Red/assets/starsmallwhite.svg";

import product from "../Red/assets/product/product.png";

function SalePage() {
  const navigate = useNavigate();

  const reviewsRef = useRef<HTMLDivElement>(null);

  const nav = useNavigate();

  useEffect(() => {
    const container = reviewsRef.current;
    if (!container) return;

    const speed = 1;
    const intervalTime = 20;

    const scrollInterval = setInterval(() => {
      if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth
      ) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += speed;
      }
    }, intervalTime);

    return () => clearInterval(scrollInterval);
  }, []);

  const [phone, setPhone] = useState<string>("");

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

  useEffect(() => {
    async function fetchPhone() {
      try {
        const res = await fetch(
          "https://api.comabooks.org/sales/phoneNumber",
          {}
        );
        if (!res.ok) throw new Error("Не удалось получить номер");
        const data = await res.json();
        setPhone(data.phone || "");
      } catch (err) {
        console.error(err);
      }
    }
    fetchPhone();
  }, []);



  const handleInst = () => {
    const instUrl = `https://instagram.com/comabooks.global`;
    window.open(instUrl, "_blank");
  };

  const handleLogin = () => {
    nav("/login");
  };
  const handlePolicy = () => {
    nav("/policies");
  };
  const handlePricing = () => {
    nav("/products/custom-book");
  };

  // стейт для выбранной картинки
  const [activePreview, setActivePreview] = useState<string>(mainFront);

  return (
    <div className="landing-upd">
      <div className="landing-upd-header">
        <div onClick={() => navigate("/")} className="product-header-logo">
          comabooks
        </div>
        <div className="landing-upd-header-links">
          <Link to={"https://www.instagram.com/comabooks.global/"}>
            Reviews
          </Link>
          <div onClick={handlePricing}>Pricing</div>
          <div onClick={handlePolicy}>Policy</div>
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
        <div className="product-header-logo">comabooks</div>
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

      <div className="product-first">
        <div className="product-first-preview">
          <img
            src={activePreview}
            alt="product preview"
            className="product-first-preview-main"
          />
          <div className="product-first-thumbs">
            <div
              className="product-first-thumb"
              onClick={() => setActivePreview(mainFront)}
            >
              <img src={mainFront} alt="Front cover" />
            </div>
            <div
              className="product-first-thumb"
              onClick={() => setActivePreview(mainBack)}
            >
              <img src={mainBack} alt="Back cover" />
            </div>
            <div
              className="product-first-thumb"
              onClick={() => setActivePreview(mainFull)}
            >
              <img src={mainFull} alt="Full spread" />
            </div>
          </div>
        </div>

        <div className="product-first-content">
          <div className="product-first-content-title">
            Book for a Loved One
          </div>

          <div className="product-first-content-text">
            You can dedicate a book for anyone, there are 30+ themes, your loved
            one, family, friends, colleagues, your boss, your ex, even yourself
            and so on.
          </div>

          <div className="product-first-content-text">
            Our books are created in an interview style. Each theme comes with a
            unique set of 50–200 questions. Just answer them, add photos if you
            like, and choose your cover design.
          </div>

          <div className="product-first-content-row">
            <img src={stars} />
            <div>5.0 stars, 934+ reviews on</div>
            <img src={google} />
          </div>

          <div className="product-first-actions">
            <div className="product-first-actions-main">
              <div className="product-first-qty">
                <button
                  className="product-first-qty-btn"
                  onClick={handleQtyMinus}
                >
                  -
                </button>
                <span className="product-first-qty-value">{qty}</span>
                <button
                  className="product-first-qty-btn"
                  onClick={handleQtyPlus}
                >
                  +
                </button>
              </div>

              <div className="product-first-price">
                <span className="product-first-price-current">$120</span>
                <span className="product-first-price-old">$150</span>
              </div>
            </div>

            <div className="product-first-actions-bottom">
              <div className="product-first-main">
                <button
                  className="product-first-order"
                  onClick={openContactPopup}
                >
                  Order now
                </button>

                {/* <button className="product-first-paypal">
                  <img src={paypal} alt="PayPal" />
                </button> */}
              </div>

              <div className="product-first-socials">
                <button className="product-first-social product-first-social-facebook">
                  <img src={facebook} alt="Facebook" />
                </button>
                <button className="product-first-social product-first-social-whatsapp">
                  <img src={whatsapp} alt="WhatsApp" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-second">
        <div className="product-second-title">Specifics of the proccess</div>

        <div className="product-second-column">
          <div className="product-second-item">
            <div className="product-second-row">
              <img src={starsmall} />
              Can be dedicated to anyone
            </div>
            There are 30+ themes — for everyone who matters: your loved one,
            family, friends, colleagues, your boss, your ex, even yourself and
            etc.
          </div>

          <div className="product-second-item">
            <div className="product-second-row">
              <img src={starsmall} />
              Easy to fill
            </div>
            Our books are created in an interview style — each theme comes with
            a unique set of 50–200 questions: Just answer them, add photos if
            you like, and choose your cover design.
          </div>

          <div className="product-second-item">
            <div className="product-second-row">
              <img src={starsmall} />
              Editing and printing
            </div>
            Once you’ve finished answering, our editing team will review your
            answers for grammar, punctuation, and spelling. After they approve
            the final version, the book is printed. The whole process takes 5–7
            business days.
          </div>

          <div className="product-second-item">
            <div className="product-second-row">
              <img src={starsmall} />
              How to start
            </div>
            Just message us on WhatsApp, Facebook, or Instagram — our managers
            will guide you through everything. Once the payment is made, they’ll
            create a personal account for you so you can start your book.
          </div>
        </div>
      </div>

      <div className="product-third">
        <div className="product-third-row">
          Sample questions for different themes
          <button onClick={openContactPopup} className="product-first-order">Start your book</button>
        </div>

        <div className="product-third-block">
          <span className="corner corner-tl" />
          <span className="corner corner-tr" />
          <span className="corner corner-bl" />
          <span className="corner corner-br" />

          <div className="product-third-block-row">
            <div className="product-third-block-row-title">Loved one</div>
            <div className="product-third-block-row-text">
              Describe your relationship status in 5 words. Name one reason
              (with today’s date) why you love her right now. We often mirror
              the actions of the ones we love. How true is that in your case?
              What relationship advice would you give yourself at the beginning
              of your journey together?
            </div>
          </div>

          <div className="product-third-block-row">
            <div className="product-third-block-row-title">Mother</div>
            <div className="product-third-block-row-text">
              The word “Mom” has only three letters - but what does it mean to
              you? How has your relationship with your mom changed over time?
              How is it different from when you were a child? When was the last
              time you told her “I love you”? Is there anything you’ve
              intentionally kept from her so she wouldn’t worry?
            </div>
          </div>

          <div className="product-third-block-row">
            <div className="product-third-block-row-title">Friend</div>
            <div className="product-third-block-row-text">
              What is it like to be her friend? Tell us about the moment you
              first realized how much she means to you. She definitely has her
              own wish list - which of her wishes would you want to fulfill
              first? Which of your qualities do you think she values the most?
            </div>
          </div>
        </div>
      </div>

      <div className="product-forth">
        <div className="product-forth-image">
          <span className="corner-bl"></span>
          <span className="corner-br"></span>
          <img src={product} />
        </div>

        <div className="product-forth-content">
          <div className="product-forth-content-title">Details to consider</div>
          <div className="product-forth-content-text">
            The editing and printing process takes 5–7 business days, and
            delivery takes 3–10 business days. Delivery is paid separately and
            depends on your city and country (the average cost is $20–40).
            <br /> <br />
            There’s no time limit for filling out your book - take as long as
            you need.
          </div>

          <button
            style={{ marginRight: "auto" }}
            className="product-first-order"
            onClick={openContactPopup}
          >
            Start your book
          </button>
        </div>
      </div>

      <div className="landing-upd-fifth" style={{ marginTop: 0 }}>
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
          <button onClick={openContactPopup}>Order a book</button>
        </div>

        <div className="landing-upd-footer-logo">comabooks</div>

        <div className="landing-upd-footer-row-2">
          <div>hello@comabooks.org</div>
          <Link to={"https://www.instagram.com/comabooks.global/"}>
            Instagram
          </Link>
        </div>

        <div className="landing-upd-footer-row-mobile">
          <div>hello@comabooks.org</div>
          <Link to={"https://www.instagram.com/comabooks.global/"}>
            Instagram
          </Link>
          <div onClick={handlePricing}>Pricing</div>
          <div onClick={handlePolicy}>Policy</div>
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

export default SalePage;
