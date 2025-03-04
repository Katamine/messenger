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
  
  // Словник для співставлення назв картинок із їх URL
  const imageMap = {
      "1": "images/1.png",
      "2": "images/2.png",
      "3": "images/3.png",
      "4": "images/4.png",
      "5": "images/5.png",
      "6": "images/6.png",
      "7": "images/7.png",
      "8": "images/8.png",
      "9": "images/9.png",
      "10": "images/10.png",
      "11": "images/11.png",
      "12": "images/12.png",
      "13": "images/13.png",
      "14": "images/14.png",
      "15": "images/15.png",
      "16": "images/16.png"
  };
  
  // Функція для входу в чат
  function startChat() {
      nickname = document.getElementById("nickname").value.trim();
      if (nickname) {
          localStorage.setItem("chatNickname", nickname);
          showChat();
      } else {
          alert("Введіть нікнейм!");
      }
  }
  
  // Функція для відображення чату
  function showChat() {
      document.getElementById("nickname-container").style.display = "none";
      document.getElementById("chat-container").style.display = "block";
      document.getElementById("emoji-picker").style.display = "block";
      loadMessages();
  }
  
  // Функція для виходу
  function logout() {
      localStorage.removeItem("chatNickname"); // Видаляємо нікнейм із localStorage
      document.getElementById("chat-container").style.display = "none";
      document.getElementById("emoji-picker").style.display = "none";
      document.getElementById("nickname-container").style.display = "block";
      document.getElementById("nickname").value = ""; // Очищаємо поле
      db.off("child_added"); // Вимикаємо слухач
      document.getElementById("messages").innerHTML = ""; // Очищаємо чат
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
          let messageText = data.message;
          for (const [key, url] of Object.entries(imageMap)) {
              const regex = new RegExp(`:${key}:`, "g");
              messageText = messageText.replace(regex, `<img src="${url}" alt="${key}">`);
          }
          messageElement.innerHTML = `${data.nickname}: ${messageText}`;
          messagesDiv.appendChild(messageElement);
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
      });
  }
  
  // Функція для додавання картинки в поле вводу
  function addImage(imageName) {
      const messageInput = document.getElementById("message");
      messageInput.value += `:${imageName}:`;
      messageInput.focus();
  }
  
  // Відправка повідомлення по натисканню Enter
  document.getElementById("message").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
          sendMessage();
      }
  });
  
  // Перевірка наявності збереженого нікнейму при завантаженні сторінки
  window.onload = function() {
      const savedNickname = localStorage.getItem("chatNickname");
      if (savedNickname) {
          nickname = savedNickname;
          showChat();
      }
  };