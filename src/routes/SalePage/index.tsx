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

function SalePage() {
  const navigate = useNavigate();

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
    nav("/login");
  };
  const handlePolicy = () => {
    nav("/policies");
  };
  const handlePricing = () => {
    nav("/products/custom-book");
  };

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
            onClick={handleOrder}
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

      <div className="product-first">
        <div className="product-first-preview">
          <img
            src={mainFront}
            alt="product preview"
            className="product-first-preview-main"
          />
          <div className="product-first-thumbs">
            <div className="product-first-thumb">
              <img src={mainFront} />
            </div>
            <div className="product-first-thumb">
              <img src={mainBack} />
            </div>
            <div className="product-first-thumb">
              <img src={mainFull} />
            </div>
          </div>
        </div>

        <div className="product-first-content">
          <div className="product-first-content-title">
            Book for a Loved One
          </div>

          <div className="product-first-content-text">
            You can dedicate a book for anyone — there are 30+ themes: your
            loved one, family, friends, colleagues, your boss, your ex, even
            yourself and etc.
          </div>

          <div className="product-first-content-text">
            Our books are created in an interview style - each theme comes with
            a unique set of 50–200 questions: Just answer them, add photos if
            you like, and choose your cover design.
          </div>

          <div className="product-first-content-row">
            <img src={stars} />
            <div>5.0 stars, 934+ reviews on</div>
            <img src={google} />
          </div>

          <div className="product-first-actions">
            <div className="product-first-actions-main">
              <div className="product-first-qty">
                <button className="product-first-qty-btn">-</button>
                <span className="product-first-qty-value">1</span>
                <button className="product-first-qty-btn">+</button>
              </div>

              <div className="product-first-price">
                <span className="product-first-price-current">$120</span>
                <span className="product-first-price-old">$150</span>
              </div>
            </div>

            <div className="product-first-actions-bottom">
              <div className="product-first-main">
                <button className="product-first-order">Order now</button>

                <button className="product-first-paypal">
                  <img src={paypal} alt="PayPal" />
                </button>
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
    </div>
  );
}

export default SalePage;
