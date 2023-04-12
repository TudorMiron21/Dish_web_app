import React from "react";
import "../App.css";
import fb from "../images/facebook.png";
import twitter from "../images/twitter.png";
import linkedin from "../images/linkedin.png";
import instagram from "../images/instagram.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb_footer_section_padding">
        <div className="sb_footer-links">
          <div className="sb_footer_links-div">
            <h4>For Business</h4>
            <a href="/healthplan">
              <p>Health Plan</p>
            </a>
            <a href="/employer">
              <p>Employer</p>
            </a>
            <a href="/individual">
              <p>Individual</p>
            </a>
          </div>

          <div className="sb_footer_links-div">
            <h4>For Business</h4>
            <a href="/resource">
              <p>Resource center</p>
            </a>
            <a href="/resource">
              <p>Testimonials</p>
            </a>
            <a href="/resource">
              <p>STV</p>
            </a>
          </div>
          <div className="sb_footer_links-div">
            <h4>Partners</h4>
            <a href="/employer">
              <p>Swing Tech</p>
            </a>
          </div>

          <div className="sb_footer_links-div">
            <h4>Company</h4>
            <a href="/about">
              <p>About</p>
            </a>
            <a href="/press">
              <p>Press</p>
            </a>
            <a href="/careers">
              <p>Employer</p>
            </a>
            <a href="/contact">
              <p>Contact</p>
            </a>
          </div>

          <div className="sb_footer_links-div">
            <h4> Cooming Soon on</h4>
            <div className="socialMedia">
              <p>
                <img src={fb} alt="" />
              </p>
              <p>
                <img src={twitter} alt="" />
              </p>
              <p>
                <img src={linkedin} alt="" />
              </p>
              <p>
                <img src={instagram} alt="" />
              </p>
            </div>
          </div>
        </div>
        <hr />

        <div className="sb_footer-bellow">
          <div className="sb_footer-copyright">
            <p>{new Date().getFullYear()} CodeInn. All right reserved</p>

            <div className="sb_footer-bellow-links">
              <a href="/terms">
                <div>
                  <p>Terms & Conditions</p>
                </div>
              </a>
              <a href="/privacy">
                <div>
                  <p>Privacy</p>
                </div>
              </a>
              <a href="/security">
                <div>
                  <p>Security</p>
                </div>
              </a>
              <a href="/cookie">
                <div>
                  <p>Cookie Declaration</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
