import React, { useEffect } from 'react';
import "./PageFooter.css";
import { ReactComponent as TwitterIcon } from "../images/x-twitter.svg";
import silhouette from "../Icon/silhouette/silhouette.png";

function PageFooter() {
  // Links array
  const links = {
    facebook: ["https://www.facebook.com/praful.shrestha.017"],
    instagram: ["https://www.instagram.com/ajay.nemkul/", "https://www.instagram.com/prafulstha.17/"],
    youtube: ["https://www.youtube.com/channel/UC0ntZYXMAsvcgrKLWyHMe5Q"],
    twitter: ["https://x.com/AxelXrest"],
    linkedin: ["https://www.linkedin.com/in/ajay-nemkul-shrestha-7a9285270/", "https://www.linkedin.com/in/praful-shrestha/"]
  };

  // Function to set random href
  const setRandomHref = (platform) => {
    const elements = document.querySelectorAll(`.${platform}`);
    elements.forEach(element => {
      const randomLink = links[platform][Math.floor(Math.random() * links[platform].length)];
      element.href = randomLink;
    });
  };

  // Use useEffect to set random hrefs after component mounts
  useEffect(() => {
    setRandomHref('facebook');
    setRandomHref('instagram');
    setRandomHref('youtube');
    setRandomHref('twitter');
    setRandomHref('linkedin');
  }, []);

  return (
    <div className="footerBody">
      <div className="silhouette">
        <img className="silhouette" src={silhouette} alt="Silhouette" />
      </div>
      <footer>
        <div className="footercontainer">
          <div className="row">
            <div className="col">
              <h4>For Client</h4>
              <div className="links">
                <a href="/jobs">Talent Marketplace</a>
                <a href="#">Any Hire</a>
              </div>
            </div>
            <div className="col">
              <h4>For Talent</h4>
              <div className="links">
                <a href="/directContract">Direct Contracts</a>
                <a href="/jobs">Find Freelance Jobs in the Nepal</a>
              </div>
            </div>

            <div className="col" id="useful-links">
              <h4>About</h4>
              <div className="links">
                <a href="/howItWorks">How it Work</a>
                <a href="/termsCondition">Terms & Condition </a>
                <a href="/whyUs">Why Us?</a>
              </div>
            </div>

            <div className="col" id="support">
              <h4>Support</h4>
              <div className="support-details">
                <i className="fa-solid fa-envelope"></i>
                <p>flexhirenepal@gmail.com</p>
              </div>
              <br />
              <div className="support-details">
                <i className="fa fa-phone"></i>
                <p>+977 98012345678(FAKE)</p>
              </div>
            </div>
          </div>
          <center>
            <div className="col" id="followUs">
              <h4>Follow Us</h4>
              <div className="social">
                <a className="facebook" target="_blank">
                  <i className="fab fa-facebook fa-2xl"></i>
                </a>
                <a className="instagram" target="_blank">
                  <i className="fab fa-instagram fa-2xl"></i>
                </a>
                <a className="youtube" target="_blank">
                  <i className="fab fa-youtube fa-2xl"></i>
                </a>
                <a className="twitter" target="_blank">
                  <TwitterIcon className="twitter-icon" />
                </a>
                <a className="linkedin" target="_blank">
                  <i className="fab fa-linkedin fa-2xl"></i>
                </a>
              </div>
            </div>
          </center>

          <div className="container">
            <div className="copyright">
              <div className="row">
                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                  &copy;{" "}
                  <a className="border-bottom" href="#">
                    FlexiHire
                  </a>
                  , All Right Reserved.
                  <br />
                  Designed By{" "}
                  <a className="border-bottom" href="https://www.instagram.com/ajay.nemkul/">
                    Ajay Nemkul Shrestha
                  </a>{" "}
                  &{" "}
                  <a className="border-bottom" href="https://www.instagram.com/prafulstha.17/">
                    {" "}
                    Praful Shrestha
                  </a>
                </div>
                <div className="col-md-6 text-center text-md-end">
                  <div className="footer-menu">
                    <a href="/">Home</a>
                    <a href="/ai">Chat with AI</a>
                    <a href="/faq">FAQs</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PageFooter;
