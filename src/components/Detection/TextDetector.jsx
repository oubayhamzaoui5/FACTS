import React, { useState } from 'react';
import styles from './TextDetector.module.css'; // Importing the CSS Module

function TextDetector() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('Awaiting input...');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult('Analyzing...');

    try {
      // First, detect if the text is AI-generated using Hugging Face API
      const aiResponse = await fetch(
        'https://api-inference.huggingface.co/models/roberta-base-openai-detector',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          //Authorization: 'Bearer Hugface_api', // Replace with your Hugging Face token
          },
          body: JSON.stringify({ inputs: text }),
        }
      );

      if (!aiResponse.ok) {
        throw new Error(`AI Detection HTTP error! Status: ${aiResponse.status}`);
      }

      const aiData = await aiResponse.json();
      const aiPredictions = aiData[0];
      let aiResult = '';
      if (aiPredictions && Array.isArray(aiPredictions)) {
        const realPrediction = aiPredictions.find((item) => item.label === 'Real');
        const fakePrediction = aiPredictions.find((item) => item.label === 'Fake');

        if (realPrediction && fakePrediction) {
          if (realPrediction.score > fakePrediction.score) {
            aiResult = `This text is likely not Ai generated (Confidence: ${(realPrediction.score * 100).toFixed(2)}%)`;
          } else {
            aiResult = `This text is likely Ai generated (Confidence: ${(fakePrediction.score * 100).toFixed(2)}%)`;
          }
        } else {
          aiResult = 'Unexpected AI response format. Please try again.';
        }
      } else {
        aiResult = 'No AI prediction available. Please try different text.';
      }

      // Then, check if the text is fake news using a fake news API
     // const newsResponse = await fetch(
      //  `https://newsapi.org/v2/everything?q=${encodeURIComponent(text)}&apiKey=API_key_newapi` // Replace with your own News API key
     // );

      if (!newsResponse.ok) {
        throw new Error(`Fake News Detection HTTP error! Status: ${newsResponse.status}`);
      }

      const newsData = await newsResponse.json();
      let fakeNewsResult = '';
      if (newsData.status === 'ok' && newsData.articles && newsData.articles.length > 0) {
        fakeNewsResult = `This text seems to be related to news. Please verify it with the sources provided.`;
      } else {
        fakeNewsResult = 'No fake news related to this text was found.';
      }

      // Combine both AI and Fake News detection results
      setResult(`${aiResult}\n\n${fakeNewsResult}`);
    } catch (err) {
      console.error('Error:', err);
      setResult('Error occurred while detecting.');
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.hh2}>AI Text and Fake News Detector</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Paste your text here..."
        className={styles.ttextarea}
      />
      <button onClick={handleCheck} disabled={loading}  className={styles.bbutton}>
        {loading ? 'Detecting...' : 'Detect'}
      </button>
      <div className={`${styles.result} ${result.includes('Fake') ? styles.fake : styles.real}`}>
        <strong>Result:</strong> {result}
      </div>
    </div>
  );
}

export default TextDetector;
