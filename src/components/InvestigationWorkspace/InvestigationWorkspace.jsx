import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import styles from './InvestigationWorkspace.module.css';
import { Link } from 'react-router-dom';
import saveIcon from '/assets/save.png';
import noteIcon from '/assets/note.png';
import imgIcon from '/assets/img.png';
import webIcon from '/assets/web.png';



let idCounter = 0;
const generateId = () => `item-${idCounter++}`;

export default function InvestigationWorkspace() {
  const [items, setItems] = useState([]);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [connections, setConnections] = useState([]);
  const [linkStartId, setLinkStartId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  const isDraggingCanvas = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const updateSizeAndPosition = (id, ref, position) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              width: parseInt(ref.style.width),
              height: parseInt(ref.style.height),
              x: position.x,
              y: position.y,
            }
          : item
      )
    );
  };

  const getCenteredPosition = (width, height) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
  
    const centerX = (rect.width / 2 - offset.x) / scale - width / 2;
    const centerY = (rect.height / 2 - offset.y) / scale - height / 2;
  
    return { x: centerX, y: centerY };
  };
  

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setConnections((prev) => prev.filter((conn) => conn.from !== id && conn.to !== id));
  };

  const handleStartLink = (id) => {
    setLinkStartId(id);
  };

  const handleFinishLink = (id) => {
    if (linkStartId && linkStartId !== id) {
      setConnections((prev) => [...prev, { from: linkStartId, to: id }]);
      setLinkStartId(null);
    }
  };

  const addNote = () => {
    const width = 200;
    const height = 150;
    const { x, y } = getCenteredPosition(width, height);
    const newNote = {
      id: generateId(),
      type: 'note',
      x,
      y,
      width,
      height,
      content: 'Nouvelle note',
    };
    setItems((prev) => [...prev, newNote]);
  };
  

  const addImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const width = 200;
      const height = 200;
      const { x, y } = getCenteredPosition(width, height);
      const newImage = {
        id: generateId(),
        type: 'image',
        x,
        y,
        width,
        height,
        src: reader.result,
      };
      setItems((prev) => [...prev, newImage]);
    };
    reader.readAsDataURL(file);
  };


  const addLink = () => {
    const width = 250;
    const height = 150;
    const { x, y } = getCenteredPosition(width, height);
    const newLink = {
      id: generateId(),
      type: 'link',
      x,
      y,
      width,
      height,
      title: 'Titre du lien',
      url: '',
    };
    setItems((prev) => [...prev, newLink]);
  };
  
  

  const updatePosition = (id, data) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, x: data.x, y: data.y } : item
      )
    );
  };

  const updateContent = (id, content) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, content } : item))
    );
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY;
    setScale((prev) => Math.max(0.1, prev - delta * 0.001));
  };


  const updateLinkTitle = (id, title) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title } : item))
    );
  };
  
  const updateLinkUrl = (id, url) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, url } : item))
    );
  };
  

  const handleMouseDown = (e) => {
    if (e.target.classList.contains(styles.canvas)) {
      isDraggingCanvas.current = true;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e) => {
    if (!isDraggingCanvas.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingCanvas.current = false;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    
    <div className={styles.workspace} ref={containerRef}>

<div className={styles.titleWrapper}>
    <h1 className={styles.title}>Investigation Web</h1>
  </div>
  <Link to="/" className={styles.backButton}>← Back</Link>


  <div className={styles.toolbar}>
  {/* Save button */}
  <button className={styles.toolbarButton} onClick={() => {}}>
    <img src={import.meta.env.BASE_URL + saveIcon} alt="Save" className={styles.iconImage} />
  </button>

  {/* Add Note button */}
  <button className={styles.toolbarButton} onClick={addNote}>
    <img src={import.meta.env.BASE_URL + noteIcon} alt="Add Note" className={styles.iconImage} />
  </button>

  {/* Add Image button */}
  <button onClick={() => fileInputRef.current.click()} className={styles.toolbarButton}>
    <img src={import.meta.env.BASE_URL + imgIcon} alt="Add Image" className={styles.iconImage} />
  </button>
  <input
    type="file"
    accept="image/*"
    onChange={addImage}
    ref={fileInputRef}
    style={{ display: 'none' }}
  />

  {/* Add Link button */}
  <button className={styles.toolbarButton} onClick={addLink}>
    <img src={import.meta.env.BASE_URL + webIcon} alt="Add Link" className={styles.iconImage} />
  </button>
</div>


      <div
        className={styles.canvasWrapper}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: '0 0',
        }}
      >
        <div className={styles.canvas}></div>

        <svg className={styles.connectionSvg}>
          {connections.map((conn, idx) => {
            const from = items.find((i) => i.id === conn.from);
            const to = items.find((i) => i.id === conn.to);
            if (!from || !to) return null;

            const fromX = from.x + from.width / 2;
            const fromY = from.y + from.height / 2;
            const toX = to.x + to.width / 2;
            const toY = to.y + to.height / 2;

            return (
              <line
                key={idx}
                x1={fromX}
                y1={fromY}
                x2={toX}
                y2={toY}
                stroke="red"
                strokeWidth="2"
              />
            );
          })}


        </svg>

        {items.map((item) => (
          <Rnd
            key={item.id}
            size={{ width: item.width, height: item.height }}
            position={{ x: item.x, y: item.y }}
            onDragStop={(e, d) => updatePosition(item.id, d)}
            scale={scale}
            enableResizing={item.type !== 'link'} 
            onResizeStop={(e, direction, ref, delta, position) => {
              updateSizeAndPosition(item.id, ref, position);
            }}
          >
            <div
              className={styles.item}
              onClick={() => handleFinishLink(item.id)}
            >
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(item.id);
                }}
                title="Delete"
              >
                ×
              </button>
              <button
                className={styles.linkButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartLink(item.id);
                }}
                title="Link"
              >
                🔗
              </button>
                {item.type === 'note' ? (
                <textarea
                    className={styles.note}
                    value={item.content}
                    onChange={(e) => updateContent(item.id, e.target.value)}
                />
                ) : item.type === 'image' ? (
                <img
                    src={import.meta.env.BASE_URL + item.src}
                    alt="uploaded"
                    className={styles.image}
                    draggable="false"
                />
                ) : item.type === 'link' ? (
                <div className={styles.link}>
                    <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateLinkTitle(item.id, e.target.value)}
                    placeholder="Titre"
                    className={styles.linkTitle}
                    />
                    <input
                    type="text"
                    value={item.url}
                    onChange={(e) => updateLinkUrl(item.id, e.target.value)}
                    placeholder="https://"
                    className={styles.linkUrl}
                    />
                    <button
                    className={styles.linkVisit}
                    onClick={() => window.open(item.url, '_blank')}
                    >
                    Visiter
                    </button>
                </div>
                ) : null}

            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
}
