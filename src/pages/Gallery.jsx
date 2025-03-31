import React, { useEffect, useRef } from 'react';
import './Gallery.css';

export default function Gallery() {
  const fadeRefs = useRef([]);
  const gatherRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      // ✅ 페이드인 애니메이션 처리
      fadeRefs.current.forEach((ref) => {
        if (!ref) return;
        const top = ref.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) {
          ref.classList.add('fade-in');
        }
      });

      // ✅ 모이기 애니메이션 처리
      const gatherSection = gatherRef.current;
      if (gatherSection) {
        const top = gatherSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) {
          gatherSection.classList.add('gather-start');
        }
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // ✅ 추가: 새로고침 없이도 애니메이션 동작
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const images = [
    '/assets/image1.JPG',
    '/assets/image2.JPG',
    '/assets/image3.JPG',
    '/assets/image4.JPG'
  ];

  return (
    <div className="gallery-container">
      {/* 흐르는 이미지 */}
      <div className="scrolling-images">
        <div className="scroll-track">
          {images.concat(images).map((src, index) => (
            <img key={index} src={process.env.PUBLIC_URL + src} alt={`img${index}`} />
          ))}
        </div>
      </div>

      {/* 페이드인 섹션 1 */}
      <div className="fade-section" ref={(el) => (fadeRefs.current[0] = el)}>
        <div className="fade-img-box">
          <img src={process.env.PUBLIC_URL + '/assets/image1.JPG'} alt="section1" className="fade-img" />
        </div>
        <div className="fade-text">
          <h2>섹션 1</h2>
          <p>이미지와 텍스트가 좌우로 나란히 보입니다.</p>
        </div>
      </div>

      {/* 페이드인 섹션 2 */}
      <div className="fade-section" ref={(el) => (fadeRefs.current[1] = el)}>
        <div className="fade-img-box">
          <img src={process.env.PUBLIC_URL + '/assets/image2.JPG'} alt="section2" className="fade-img" />
        </div>
        <div className="fade-text">
          <h2>섹션 2</h2>
          <p>구조가 동일하게 유지되며, 텍스트도 보입니다.</p>
        </div>
      </div>

      {/* 모이는 이미지 섹션 */}
      <div className="gather-section" ref={gatherRef}>
        {[0, 1, 2, 3].map((i) => (
          <img
            key={i}
            src={process.env.PUBLIC_URL + `/assets/image${i + 1}.JPG`}
            className={`gather-img gather${i + 1}`}
            alt={`gather-${i + 1}`}
          />
        ))}
        <h2 className="gather-title">하나로 모이는 순간</h2>
      </div>
    </div>
  );
}
