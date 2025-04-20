import React, { useState } from 'react';
import styles from './TextDetector.module.css';

function TextDetector() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('Awaiting input...');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult('Analyzing...');

    try {
      // Simulate AI detection response (since key is removed)
      const aiResult = 'AI detection is disabled. No key provided.';

      // Simulate Fake News detection response
      const fakeNewsResult = 'Fake news detection is disabled. No API key provided.';

      setResult(`${aiResult}\n\n${fakeNewsResult}`);
    } catch (err) {
      console.error('Error:', err);
      setResult('Error occurred while detecting.');
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2>AI Text and Fake News Detector</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Paste your text here..."
      />
      <button onClick={handleCheck} disabled={loading}>
        {loading ? 'Detecting...' : 'Detect'}
      </button>
      <div className={`${styles.result} ${result.includes('Fake') ? styles.fake : styles.real}`}>
        <strong>Result:</strong> {result}
      </div>
    </div>
  );
}

export default TextDetector;
