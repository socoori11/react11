import React, { useEffect, useState } from 'react';
import './Guestbook.css'; // CSS 파일을 불러오기만 함

export default function Guestbook() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/messages');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;

    try {
      await fetch('https://reactguest-279200547179.us-central1.run.app/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      setName('');
      setMessage('');
      setCurrentPage(1);
      fetchMessages();
    } catch (err) {
      console.error('전송 실패:', err);
    }
  };

  const indexOfLast = currentPage * messagesPerPage;
  const indexOfFirst = indexOfLast - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(messages.length / messagesPerPage);

  return (
    <div className="guestbook-page">
      <h1>방명록</h1>

      <form className="guestbook-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="메시지"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">등록</button>
      </form>

      <ul className="guestbook-list">
        {currentMessages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.name}</strong>: {msg.message}
            <div className="date">{new Date(msg.created_at).toLocaleString()}</div>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
