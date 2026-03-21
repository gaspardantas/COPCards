import { useEffect, useRef } from "react";

function Bubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  function spawnBubble() {
    const container = containerRef.current;
    if (!container) return;
    const size = Math.random() * 20 + 8;
    const el = document.createElement("div");
    el.className = "bubble";
    el.style.left = `${Math.random() * 100}%`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.animationDuration = `${Math.random() * 8 + 6}s`;
    el.dataset.id = String(nextId.current++);
    el.addEventListener("mouseenter", () => {
      el.classList.add("popped");
      setTimeout(() => el.remove(), 300);
    });
    el.addEventListener("animationend", () => el.remove());
    container.appendChild(el);
  }

  function spawnFish() {
    const container = containerRef.current;
    if (!container) return;
    const fishEmojis = ["🐠", "🐟", "🐡", "🐙"];
    const emoji = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
    const size = Math.random() * 24 + 16;
    const top = Math.random() * 75 + 5;
    const duration = Math.random() * 18 + 12;
    const el = document.createElement("div");
    el.textContent = emoji;
    el.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            top: ${top}%;
            right: -80px;
            opacity: ${Math.random() * 0.5 + 0.3};
            filter: drop-shadow(0 0 8px rgba(0,245,255,0.3));
            pointer-events: none;
            z-index: 0;
            animation: fishSwimLeft ${duration}s linear forwards;
        `;
    el.addEventListener("animationend", () => el.remove());
    container.appendChild(el);
  }

  function spawnJellyfish() {
    const container = containerRef.current;
    if (!container) return;
    const el = document.createElement("div");
    el.textContent = "🪼";
    const size = Math.random() * 30 + 20;
    el.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            left: ${Math.random() * 90 + 5}%;
            top: ${Math.random() * 60 + 10}%;
            opacity: 0.35;
            animation: jellyFloat ${Math.random() * 8 + 6}s ease-in-out ${
      Math.random() * 4
    }s infinite;
            filter: drop-shadow(0 0 12px rgba(0,201,177,0.5));
            pointer-events: none;
            z-index: 0;
        `;
    container.appendChild(el);
  }

  function spawnShark() {
    const container = containerRef.current;
    if (!container) return;
    const el = document.createElement("div");
    el.textContent = "🦈";
    const duration = Math.random() * 20 + 15;
    el.style.cssText = `
            position: absolute;
            font-size: 80px;
            top: ${Math.random() * 50 + 15}%;
            right: -120px;
            opacity: 0.85;
            filter: drop-shadow(0 0 20px rgba(0,245,255,0.4));
            pointer-events: none;
            z-index: 1;
            animation: fishSwimLeft ${duration}s ease-in-out forwards;
        `;
    el.addEventListener("animationend", () => el.remove());
    container.appendChild(el);
  }

  function addSeaFloor() {
    const container = containerRef.current;
    if (!container) return;
    const items = ["🪸", "🪸", "🦪", "🪸", "🦀", "🪸", "🦪", "🪸", "🪸", "🦞"];
    items.forEach((emoji, i) => {
      const el = document.createElement("div");
      el.textContent = emoji;
      const size = Math.random() * 20 + 20;
      el.style.cssText = `
                position: absolute;
                font-size: ${size}px;
                bottom: ${Math.random() * 3}%;
                left: ${6 + i * 9 + Math.random() * 4}%;
                opacity: ${Math.random() * 0.4 + 0.3};
                filter: drop-shadow(0 0 8px rgba(0,201,177,0.4));
                pointer-events: none;
                z-index: 0;
                animation: sway ${Math.random() * 3 + 2}s ease-in-out ${
        Math.random() * 2
      }s infinite;
            `;
      container.appendChild(el);
    });
  }

  useEffect(() => {
    addSeaFloor();
    for (let i = 0; i < 4; i++) setTimeout(() => spawnJellyfish(), i * 800);
    for (let i = 0; i < 8; i++) setTimeout(() => spawnBubble(), i * 600);
    spawnFish();
    setTimeout(() => spawnShark(), 3000);
    const bubbleInterval = setInterval(() => spawnBubble(), 1200);
    const fishInterval = setInterval(() => spawnFish(), 3000);
    const sharkInterval = setInterval(() => spawnShark(), 25000);
    return () => {
      clearInterval(bubbleInterval);
      clearInterval(fishInterval);
      clearInterval(sharkInterval);
    };
  }, []);

  return <div className="bubbles-container" ref={containerRef} />;
}

export default Bubbles;
