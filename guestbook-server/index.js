require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port =  process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('✅ MySQL 연결 성공');
});

app.get('/api/messages', (req, res) => {
  connection.query('SELECT * FROM guestb ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('조회 실패:', err);
      res.status(500).send('DB 오류');
      return;
    }
    res.json(results);
  });
});

app.post('/api/messages', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).send('이름과 메시지를 입력하세요.');
  }

  const sql = 'INSERT INTO guestb (name, message, created_at) VALUES (?, ?, NOW())';
  connection.query(sql, [name, message], (err, result) => {
    if (err) {
      console.error('등록 실패:', err);
      res.status(500).send('DB 오류');
      return;
    }
    res.status(201).send('등록 완료');
  });
});

app.listen(port, () => {
  console.log(`🚀 백엔드 서버 실행 중: http://localhost:${port}`);
});
