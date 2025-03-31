import React, { useEffect, useState } from 'react';
import './ScrollText.css';

export default function ScrollText() {
  const [visibleIndex, setVisibleIndex] = useState(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const height = window.innerHeight;

    if (scrollY < height * 0.8) {
      setVisibleIndex(0);
    } else if (scrollY < height * 1.8) {
      setVisibleIndex(1);
    } else {
      setVisibleIndex(2);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // ✅ 새로고침 시 바로 반영
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-text-page">
      <section className={`text-section ${visibleIndex === 0 ? 'visible' : ''}`}>
        <h1>스크롤하면 바뀌는 글자</h1>
      </section>

      <section className={`text-section ${visibleIndex === 1 ? 'visible' : ''}`}>
        <h1>두 번째 메시지 등장</h1>
      </section>

      <section className={`image-section ${visibleIndex === 2 ? 'visible' : ''}`}>
        <img
          src={process.env.PUBLIC_URL + '/assets/image4.JPG'}
          alt="scroll-image"
          className="scroll-image"
        />
      </section>
    </div>
  );
}
