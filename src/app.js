const chatContainer = document.getElementById("chat-container");
const messageForm = document.getElementById("message-form");
const userInput = document.getElementById("user-input");
const apiSelector = document.getElementById("api-selector");

// We'll read the API endpoint from an environment variable
const BASE_URL = process.env.API_ENDPOINT;
// This will be replaced at build time by Parcel with the appropriate value
// from the corresponding .env file.

function createMessageBubble(content, sender = "user") {
  const wrapper = document.createElement("div");
  wrapper.classList.add("message", sender === "user" ? "user-message" : "bot-message");

  const avatar = document.createElement("div");
  avatar.classList.add("message-avatar");
  avatar.textContent = sender === "user" ? "U" : "A";

  const bubble = document.createElement("div");
  bubble.classList.add("message-content");
  bubble.textContent = content;

  // sender가 "user"인 경우 순서를 바꿔서 추가
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
  // const mode = apiSelector.value;
  // const url = mode === "assistant" ? `${BASE_URL}/assistant` : `${BASE_URL}/chat`;
  const url = `${BASE_URL}/assistant`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userMessage }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.reply;
}

messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  chatContainer.appendChild(createMessageBubble(message, "user"));
  userInput.value = "";
  scrollToBottom();

  try {
    const response = await getAssistantResponse(message);
    chatContainer.appendChild(createMessageBubble(response, "assistant"));
    scrollToBottom();
  } catch (error) {
    console.error("Error fetching assistant response:", error);
    chatContainer.appendChild(
      createMessageBubble(
        "Error fetching response. Check console.",
        "assistant"
      )
    );
    scrollToBottom();
  }
});
