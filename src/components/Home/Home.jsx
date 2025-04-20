// src/components/Home/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import textScan from '/assets/text-scan.png'; // Import image using ES6 syntax
import extensionImage from '/assets/exx.png';
import journalistImage from '/assets/journalist-image.png';
import oubayImage from '/assets/oubay.jpeg'; // Adjust the path based on the location of the image
import saifImage from '/assets/saif.jpeg'; // Adjust the path based on the location of the image
import logowImage from '/assets/logow.png'; // Adjust the path based on the image location
import bgImage from '/assets/bg.jpeg'; // Adjust the path based on the image location
function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section
      className={`${styles.section} ${styles.heroSection}`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={styles.heroText}>
        <img src={import.meta.env.BASE_URL +logowImage} alt="FACTS Logo" className={styles.titleImage} />
        <p className={styles.slogan}>Unmask the truth, Elevate the voice.</p>
      </div>
    </section>

          {/* Text Detector Section */}
            <section className={`${styles.section} ${styles.detectorSection}`}>
            <div className={styles.detectorContent}>
                <img src={import.meta.env.BASE_URL +textScan} alt="Text Detection Illustration" className={styles.detectorImage} />
                <div className={styles.detectorText}>
                <h2>Detect Fake News and AI-Generated Text</h2>
                <p>
                    Our advanced detector analyzes any text to identify whether it’s fake news, AI-generated, or human-written.
                    Empower yourself with the truth in just one click.
                </p>
                <Link to="/detector" className={styles.detectorButton}>Start Detecting</Link>
                </div>
            </div>
            </section>



      {/* Download Extension Section */}
      <section className={`${styles.section} ${styles.extensionSection}`}>
        <div className={styles.extensionContent}>
          <div className={styles.extensionText}>
            <h2>Download Our Browser Extension</h2>
            <p>
              Enhance your experience by installing our browser extension. It helps you instantly detect fake news and AI-generated content while you browse.
            </p>
            <Link to="/extension" className={styles.extensionButton}>Get the Extension</Link>
          </div>
          {/* Image of the extension */}
          <img src={import.meta.env.BASE_URL +extensionImage} alt="Extension Icon" className={styles.extensionImage} />
        </div>
      </section>

      {/* Become a Journalist Section */}
      <section className={`${styles.section} ${styles.journalistSection}`}>
  <div className={styles.journalistContent}>
  <img src={import.meta.env.BASE_URL + journalistImage} alt="Become a Journalist" className={styles.journalistImage} />
      <div className={styles.journalistText}>
      <h2>Become a Journalist</h2>
      <p>
        Empower yourself with the ability to share the truth. Write and publish articles anonymously on our platform and become a voice for transparency and integrity.
      </p>
      <Link to="/journalist" className={styles.journalistButton}>Start Writing</Link>
    </div>
  </div>
</section>

      {/* Our Team Section */}
      <section className={`${styles.section} ${styles.memberSection}`}>
      <h2 className={styles.heading}>Our Team</h2>
        <div className={styles.team}>
          <div className={styles.member}>
            <img src={import.meta.env.BASE_URL + oubayImage}alt="Team member 1" />
            <p className={styles.name}>Oubay Hamzaoui</p>
            <p className={styles.role}>Co-Founder & Tech Lead</p>
          </div>
          <div className={styles.member}>
            <img src={import.meta.env.BASE_URL + saifImage} alt="Team member 2" />
            <p className={styles.name}>Saif Zaier</p>
            <p className={styles.role}>Co-Founder & Content Lead</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
