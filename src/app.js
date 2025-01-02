const chatContainer = document.getElementById("chat-container");
const messageForm = document.getElementById("message-form");
const userInput = document.getElementById("user-input");
const apiSelector = document.getElementById("api-selector");

const BASE_URL = process.env.API_ENDPOINT;
let threadId = null;

// 로딩 인디케이터 생성
function createLoadingIndicator() {
  const loader = document.createElement("div");
  loader.classList.add("loading-indicator");

  // 점 3개 추가
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    loader.appendChild(dot);
  }

  chatContainer.appendChild(loader); // 로딩 인디케이터를 chatContainer에 추가
}

// 로딩 인디케이터 제거
function removeLoadingIndicator() {
  const loader = chatContainer.querySelector(".loading-indicator");
  if (loader) {
    loader.remove();
  }
}

function createMessageBubble(content, sender = "user") {
  const wrapper = document.createElement("div");
  wrapper.classList.add("message", sender === "user" ? "user-message" : "bot-message");

  const avatar = document.createElement("div");
  avatar.classList.add("message-avatar");
  avatar.textContent = sender === "user" ? "U" : "A";

  const bubble = document.createElement("div");
  bubble.classList.add("message-content");
  bubble.textContent = content;

  if (sender === "user") {
    wrapper.appendChild(bubble);
    wrapper.appendChild(avatar);
  } else {
    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
  }

  return wrapper;
}

function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function getAssistantResponse(userMessage) {
  const url = `${BASE_URL}/assistant`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: userMessage,
      thread_id: threadId, // 기존 thread_id가 있다면 포함
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  if (data.thread_id) {
    threadId = data.thread_id;
  }

  return data.reply;
}

messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  // 사용자 입력 차단
  userInput.disabled = true;
  userInput.style.backgroundColor = "#f0f0f0"; // 비활성화 시 배경색 변경
  userInput.style.color = "#aaa"; // 비활성화 시 텍스트 색상 변경

  // 사용자 메시지 추가
  chatContainer.appendChild(createMessageBubble(message, "user"));
  userInput.value = "";
  scrollToBottom();

  // 로딩 인디케이터 추가
  createLoadingIndicator();
  scrollToBottom();

  try {
    const response = await getAssistantResponse(message);

    // 로딩 인디케이터 제거
    removeLoadingIndicator();

    // 서버 응답 추가
    chatContainer.appendChild(createMessageBubble(response, "assistant"));
    scrollToBottom();
  } catch (error) {
    console.error("Error fetching assistant response:", error);

    removeLoadingIndicator();

    chatContainer.appendChild(
      createMessageBubble(
        "Error fetching response. Please try again later.",
        "assistant"
      )
    );
    scrollToBottom();
  } finally {
    // 사용자 입력 허용
    userInput.disabled = false;
    userInput.style.backgroundColor = ""; // 원래 배경색 복원
    userInput.style.color = ""; // 원래 텍스트 색상 복원
    userInput.focus();
  }
});

// CSS for loading indicator
const style = document.createElement('style');
style.textContent = `
  .loading-indicator {
    display: flex;
    justify-content: flex-start; /* 왼쪽 정렬 */
    align-items: center;
    gap: 5px;
    margin: 10px 0;
  }

  .dot {
    width: 8px;
    height: 8px;
    background-color: #FFD700;
    border-radius: 50%;
    animation: bounce 1.5s infinite ease-in-out;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;
document.head.appendChild(style);
