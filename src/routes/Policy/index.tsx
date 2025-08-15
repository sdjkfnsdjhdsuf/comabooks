import React, { useEffect, useState } from 'react';
import './index.css';
import HeaderNew from 'New/components/Header';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Policy() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const toggleNav = () => setIsNavVisible(!isNavVisible);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOrder = () => {
    const message = `Hello! I'm reaching out about a book—could you please advise?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/77751716068?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="policy-container">
      <div className={`landing-new-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className={`landing-new-menu ${isNavVisible ? 'show' : ''}`}>
          <div className={`landing-new-menu-logo ${isScrolled ? 'scrolled' : ''}`}>
            comabooks
          </div>
          <div className="landing-new-menu-right">
            <button onClick={toggleNav} className="landing-new-menu-ham">
              <MenuIcon />
            </button>
            <button className="landing-new-menu-order" onClick={handleOrder}>
              Order
            </button>
          </div>
        </div>

        <div className={`navigation ${isNavVisible ? 'show' : 'hide'}`}>
          <Link to="https://www.comabooks.org/login">Log in</Link>
          <Link to="https://www.instagram.com/comabooks/">Instagram reviews</Link>
          <Link to="https://www.comabooks.org/policies">Terms of Use</Link>
          <Link to="/order">Prices & FAQ</Link>
          <button onClick={handleOrder}>Order</button>
        </div>
      </div>

      <div className="policy-title">Privacy Policy</div>

      <div className="policy-term">
        <div className="policy-term-title">Introduction</div>
        <div className="policy-term-text">
          We, Comabooks Publishing House (legal entity: IE COMAHOLDING), are
          committed to protecting the privacy of your personal data. This Privacy
          Policy explains how we collect, use, and protect information about users
          of our website.
        </div>
      </div>

      <div className="policy-term">
        <div className="policy-term-title">Data We Collect</div>
        <div className="policy-term-text">We collect the following types of data:</div>
        <div className="policy-term-text">
          Personal data: name, email address, and other contact details you
          provide when creating an account.
        </div>
        <div className="policy-term-text">
          Answers to questions: information you provide when answering prompts to
          create your personalized book.
        </div>
        <div className="policy-term-text">
          Photos: images you upload for inclusion in the book.
        </div>
        <div className="policy-term-text">
          Cover selection: your preferences regarding the book cover design.
        </div>
      </div>

      <div className="policy-term">
        <div className="policy-term-title">How We Use Data</div>
        <div className="policy-term-text">We use collected data to:</div>
        <div className="policy-term-text">Create your personalized book.</div>
        <div className="policy-term-text">
          Process your orders and manage your account.
        </div>
        <div className="policy-term-text">Improve our website and services.</div>
      </div>

      <div className="policy-term">
        <div className="policy-term-title">
          Confidentiality, Editing, and Disclosure
        </div>
        <div className="policy-term-text">
          The content of your book is visible only to you and our editor. You may
          opt out of editing, in which case your material will remain fully
          anonymous.
        </div>
      </div>

      <div className="policy-term">
        <div className="policy-term-title">Disclaimer & Data Security</div>
        <div className="policy-term-text">
          We take all reasonable measures to protect your data but cannot
          guarantee absolute security on the internet. In the event our site is
          compromised, we are not liable for the leakage of your personal data. We
          employ electronic, physical, and administrative safeguards to protect
          your personal information.
        </div>
      </div>

      <div className="policy-term">
        <div className="policy-term-title">Your Rights</div>
        <div className="policy-term-text">
          You have the right to request access to your personal data, its
          rectification, deletion, or restriction of processing at any time. You
          also have the right to object to processing and to request data
          portability.
        </div>
      </div>

      <div className="policy-term">
        <div className="policy-term-title">Changes to This Policy</div>
        <div className="policy-term-text">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Policy on this page.
        </div>
      </div>

      <div className="policy-term">
        <div className="policy-term-title">Contact Information</div>
        <div className="policy-term-text">
          If you have questions regarding this Privacy Policy, you can contact us
          at +7 (747) 673-84-27.
        </div>
      </div>

      <div className="policy-title">Terms of Use</div>

      <div className="policy-term">
        <div className="policy-term-title">Introduction</div>
        <div className="policy-term-text">
          Welcome to comabooks.org. This site provides services for creating
          personalized books. By using our site, you agree to the following Terms
          of Use, which we may update from time to time without prior notice.
          Please check for updates regularly.
        </div>
      </div>

      <div className="policy-term">
        <div className="policy-term-title">
          Copyright and Intellectual Property
        </div>
        <div className="policy-term-text">
          All materials on the site, including text, graphics, logos, button
          icons, images, audio, and video clips, are the property of Comabooks
          Publishing House or its content providers and are protected by
          copyright laws. No materials on this site may be copied, reproduced,
          transmitted, or distributed without prior written permission from
          Comabooks Publishing House.
        </div>
      </div>

      <div className="policy-term">
        <div className="policy-term-title">License to Use</div>
        <div className="policy-term-text">
          Comabooks Publishing House grants you a limited license to access and
          make personal use of this site. This license does not include the
          resale or commercial use of the site or its contents; the collection and
          use of any product listings, descriptions, or prices; any derivative use
          of the site or its contents; downloading or copying of information for
          the benefit of another merchant; or any use of data mining, robots, or
          similar data gathering and extraction tools.
        </div>
      </div>

      <div className="policy-term">
        <div className="policy-term-title">Your Account</div>
        <div className="policy-term-text">
          If you use this site, you are responsible for maintaining the
          confidentiality of your account and password and for restricting access
          to your computer, and you agree to accept responsibility for all
          activities that occur under your account or password.
        </div>
      </div>

      <div className="policy-term">
        <div className="policy-term-title">Refund Policy</div>
        <div className="policy-term-text">
          We understand that circumstances may vary and offer the following
          refund terms:
        </div>

        <div style={{ paddingTop: 10 }} className="policy-term-text">
          <b>Service Breakdown</b>
        </div>
        <div className="policy-term-text">- “Account Creation”: 5,000 ₸.</div>
        <div className="policy-term-text">- “Editing”: 20,000 ₸.</div>
        <div className="policy-term-text">- “Printing”: 14,000 ₸.</div>
        <div className="policy-term-text">
          All prices on the site are in Kazakhstani tenge (₸). When paying in
          another currency, the final amount may differ from what is shown on the
          site due to various factors, including exchange rates, payment system
          fees, and conversion specifics.
        </div>

        <div style={{ paddingTop: 10 }} className="policy-term-text">
          <b>Account Creation</b>
        </div>
        <div className="policy-term-text">
          “Account Creation” is deemed fully rendered immediately after we provide
          you with access (login and password) to your personal account on the
          site.
        </div>
        <div className="policy-term-text">
          Because access is created individually and allows you to start working
          on your book immediately, the cost of “Account Creation” (5,000 ₸) is
          non-refundable.
        </div>

        <div style={{ paddingTop: 10 }} className="policy-term-text">
          <b>Editing and Printing</b>
        </div>
        <div className="policy-term-text">
          The “Editing” and “Printing” services involve personalized work on the
          client’s materials: text corrections, layout, and printing of a unique
          copy.
        </div>
        <div className="policy-term-text">
          If a refund is requested before editing starts, the cost of “Editing”
          and “Printing” (34,000 ₸) will be refunded in full (minus the
          non-refundable “Account Creation” service).
        </div>
        <div className="policy-term-text">
          The editing process begins as soon as the client completes the book and
          sends it for correction (by clicking “Finish” or otherwise notifying us
          that the material is ready for editing). From this moment, the cost of
          “Editing” is non-refundable, as work on an individual order begins.
        </div>
        <div className="policy-term-text">
          If, after editing has started, the client decides to cancel printing, a
          refund will be made only for the “Printing” service (5,000 ₸).
        </div>

        <div style={{ paddingTop: 10 }} className="policy-term-text">
          <b>How to Request a Refund</b>
        </div>
        <div className="policy-term-text">
          To request a refund, contact us via any convenient method (phone, email,
          messengers).
        </div>
        <div className="policy-term-text">
          Provide your login, purchase date, and the reason for your refund
          request.
        </div>
        <div className="policy-term-text">After receiving your request, we will:</div>
        <div className="policy-term-text">
          Verify the status of your order (whether editing, printing, etc., has
          started).
        </div>
        <div className="policy-term-text">
          Calculate the refundable amount (according to the sections above).
        </div>
      </div>

      <div className="policy-term">
        <div className="policy-term-title">Changes to the Terms of Use</div>
        <div className="policy-term-text">
          We may make changes to these Terms of Use and will notify users by
          publishing the updated version on the site no later than 2 calendar days
          before the changes take effect. Continuing to use the site after the
          changes take effect constitutes acceptance of the new terms.
        </div>
      </div>

      <div className="policy-term">
        <div className="policy-term-title">Governing Law & Dispute Resolution</div>
        <div className="policy-term-text">
          All matters of interpretation, validity, performance, and any disputes
          arising out of or relating to these Terms of Use, our Privacy Policy,
          and/or the use of our services shall be governed by and construed in
          accordance with the laws of the Republic of Kazakhstan. Any disputes or
          claims shall be resolved in the competent courts of the Republic of
          Kazakhstan, unless otherwise required by applicable law.
        </div>
      </div>

      <div className="policy-term">
        <div className="policy-term-title">Contact Information</div>
        <div className="policy-term-text">
          For additional questions about these Terms of Use, please contact us at
          +7 (747) 673-84-27.
        </div>
      </div>
    </div>
  );
}

export default Policy;
