// Конфігурація Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCC8ozxBEZwOkulcM0hK9TrrQpKEcrVvt0",
    authDomain: "messengerchat-bdbd4.firebaseapp.com",
    databaseURL: "https://messengerchat-bdbd4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "messengerchat-bdbd4",
    storageBucket: "messengerchat-bdbd4.firebasestorage.app",
    messagingSenderId: "1035013588475",
    appId: "1:1035013588475:web:93de8e7b25c28207e8b75e",
    measurementId: "G-125367YZ6W"
  };
  
  // Ініціалізація Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database().ref("chat");
  
  // Змінна для зберігання нікнейму
  let nickname = "";
  
  // Функція для входу в чат
  function startChat() {
      nickname = document.getElementById("nickname").value.trim();
      if (nickname) {
          document.getElementById("nickname-container").style.display = "none";
          document.getElementById("chat-container").style.display = "block";
          loadMessages();
      } else {
          alert("Введіть нікнейм!");
      }
  }
  
  // Функція для відправки повідомлення
  function sendMessage() {
      const messageInput = document.getElementById("message");
      const message = messageInput.value.trim();
      if (message) {
          db.push({
              nickname: nickname,
              message: message,
              timestamp: Date.now()
          });
          messageInput.value = "";
      }
  }
  
  // Завантаження і відображення повідомлень
  function loadMessages() {
      db.on("child_added", (snapshot) => {
          const data = snapshot.val();
          const messagesDiv = document.getElementById("messages");
          const messageElement = document.createElement("p");
          messageElement.textContent = `${data.nickname}: ${data.message}`;
          messagesDiv.appendChild(messageElement);
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
      });
  }
  
  // Відправка повідомлення по натисканню Enter
  document.getElementById("message").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
          sendMessage();
      }
  });