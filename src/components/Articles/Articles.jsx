import React, { useState } from "react";
import styles from "./Articles.module.css";
import anonImg from "/assets/anon.png";
import upArrow from '/assets/up.png';
import downArrow from '/assets/down.png';

const allArticles = [
  {
    id: 1,
    category: "Privacy",
    poster: "Anon#3281",
    upvotes: 24,
    title: "Mass Surveillance in Modern Times",
    content: `In today’s digital age, surveillance has become a constant in the lives of global citizens. From mobile tracking to social media monitoring, personal information is being watched more than ever. Governments and corporations alike have access to tools that can intrude on privacy...`
  },
  {
    id: 2,
    category: "Leaks",
    poster: "Anon#5827",
    upvotes: 15,
    title: "Data Leaks in Journalism",
    content: `Leaks have always played a critical role in journalism, allowing reporters to uncover truth and hold power accountable. But the digital era brings new challenges. Journalists must now protect whistleblowers while managing large datasets...`
  },
  {
    id: 3,
    category: "Technology",
    poster: "Anon#9172",
    upvotes: 38,
    title: "The Rise of Artificial Intelligence",
    content: `Artificial Intelligence (AI) is revolutionizing industries and daily life. With the capability to perform tasks that once required human intelligence, AI is transforming sectors like healthcare, finance, and education. However, this technology also raises questions about privacy, ethics, and its impact on jobs...`
  },
  {
    id: 4,
    category: "Privacy",
    poster: "Anon#7583",
    upvotes: 12,
    title: "Protecting Personal Data in the Digital Era",
    content: `As more personal data is stored online, it is crucial to adopt stronger security practices to protect it. From using strong passwords to implementing two-factor authentication, individuals must take steps to safeguard their data from hackers and malicious entities...`
  },
  {
    id: 5,
    category: "Leaks",
    poster: "Anon#1029",
    upvotes: 45,
    title: "Whistleblowing in the Corporate World",
    content: `Whistleblowing has become an essential tool for exposing corporate corruption, fraud, and other unethical practices. However, the protection of whistleblowers and the risks they face continue to be hotly debated topics in the business world...`
  },
  {
    id: 6,
    category: "Technology",
    poster: "Anon#2189",
    upvotes: 27,
    title: "Blockchain and its Potential Beyond Cryptocurrencies",
    content: `Blockchain technology is most commonly associated with cryptocurrencies like Bitcoin, but its applications extend far beyond that. From secure voting systems to decentralized finance (DeFi), blockchain has the potential to revolutionize various industries...`
  },
  {
    id: 7,
    category: "Security",
    poster: "Anon#4930",
    upvotes: 33,
    title: "Cybersecurity in a Remote Work World",
    content: `As remote work becomes more prevalent, the need for robust cybersecurity practices has grown. Companies must ensure that employees are following secure practices, using encrypted communication tools, and avoiding common pitfalls like phishing attacks...`
  }
];

const categories = ["All", "Privacy", "Leaks", "Technology", "Security"];

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles =
    selectedCategory === "All"
      ? allArticles
      : allArticles.filter((article) => article.category === selectedCategory);

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        {filteredArticles.map((article) => (
          <div key={article.id} className={styles.card}>
            <div className={styles.header}>
              <span className={styles.poster}>
                <img src={anonImg} alt="anon" className={styles.anonIcon} />
                {article.poster}
              </span>             
              <div className={styles.votes}>
                <div>
                  <button>
                    <img src={upArrow} alt="Upvote" className={`${styles.voteIcon} ${styles.upIcon}`} />
                  </button>
                  <button>
                    <img src={downArrow} alt="Downvote" className={`${styles.voteIcon} ${styles.downIcon}`} />
                  </button>
                </div>
                <span className={styles.voteCount}>{article.upvotes}</span>
              </div>
            </div>
            <h2 className={styles.title}>{article.title}</h2>
            <p className={styles.excerpt}>{article.content.split(" ").slice(0, 40).join(" ")}...</p>
            <button className={styles.readMore}>Read Full Article</button>
          </div>
        ))}
      </div>
      <div className={styles.right}>
        <h3 className={styles.catTitle}>Categories</h3>
        <ul className={styles.categoryList}>
          {categories.map((cat) => (
            <li
              key={cat}
              className={`${styles.categoryItem} ${
                selectedCategory === cat ? styles.activeCategory : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Articles;
