// ═══════════════════════════════════════════════
//  ANTEC GROUP — AI ASSISTANT CHATBOT
//  Drop this script at the bottom of your page,
//  just before </body>. No dependencies needed.
// ═══════════════════════════════════════════════

(function () {
  // ── Styles ──────────────────────────────────
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap');

    #antec-chat-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
      z-index: 9000;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #012d1d;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 24px rgba(1,45,29,0.35);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      overflow: hidden;
    }
    #antec-chat-fab:hover {
      transform: scale(1.08);
      box-shadow: 0 8px 32px rgba(1,45,29,0.45);
    }
    #antec-chat-fab .fab-icon { transition: opacity 0.2s, transform 0.2s; position: absolute; }
    #antec-chat-fab .fab-icon.hidden { opacity: 0; transform: scale(0.6) rotate(30deg); pointer-events: none; }

    #antec-chat-badge {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 10px;
      height: 10px;
      background: #fed65b;
      border-radius: 50%;
      border: 2px solid #012d1d;
      animation: pulse-badge 2s infinite;
    }
    @keyframes pulse-badge {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.7; }
    }

    #antec-chat-window {
      position: fixed;
      bottom: 108px;
      right: 32px;
      z-index: 9000;
      width: 380px;
      max-height: 560px;
      background: #f9faf6;
      border: 1px solid #c1c8c2;
      box-shadow: 0 24px 64px rgba(1,45,29,0.18), 0 4px 16px rgba(0,0,0,0.06);
      display: flex;
      flex-direction: column;
      transform: translateY(20px) scale(0.95);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease;
      overflow: hidden;
    }
    #antec-chat-window.open {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: all;
    }
    @media (max-width: 480px) {
      #antec-chat-window {
        right: 0; left: 0; bottom: 0;
        width: 100%; max-height: 90dvh;
        border-radius: 0;
        border-left: none; border-right: none; border-bottom: none;
      }
      #antec-chat-fab { bottom: 20px; right: 20px; }
    }

    /* Header */
    #antec-chat-header {
      background: #012d1d;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .chat-avatar {
      width: 38px; height: 38px;
      background: #fed65b;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .chat-avatar svg { width: 18px; height: 18px; }
    .chat-header-info { flex: 1; }
    .chat-header-name {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 15px; font-weight: 500;
      color: #fff; margin: 0; line-height: 1.2;
    }
    .chat-header-status {
      font-family: 'Inter', sans-serif;
      font-size: 11px; color: rgba(255,255,255,0.55);
      display: flex; align-items: center; gap: 5px; margin-top: 2px;
    }
    .status-dot {
      width: 6px; height: 6px; background: #4ade80;
      border-radius: 50%; display: inline-block;
    }
    .chat-close-btn {
      background: none; border: none; cursor: pointer;
      color: rgba(255,255,255,0.5); padding: 4px;
      display: flex; align-items: center; justify-content: center;
      transition: color 0.2s;
    }
    .chat-close-btn:hover { color: #fff; }

    /* Gold accent bar */
    .chat-accent-bar { height: 2px; background: #fed65b; flex-shrink: 0; }

    /* Messages */
    #antec-chat-messages {
      flex: 1; overflow-y: auto; padding: 20px 16px;
      display: flex; flex-direction: column; gap: 12px;
      scroll-behavior: smooth;
    }
    #antec-chat-messages::-webkit-scrollbar { width: 4px; }
    #antec-chat-messages::-webkit-scrollbar-track { background: transparent; }
    #antec-chat-messages::-webkit-scrollbar-thumb { background: #c1c8c2; border-radius: 2px; }

    .chat-msg { display: flex; gap: 8px; animation: msg-in 0.3s ease; }
    @keyframes msg-in { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
    .chat-msg.user { flex-direction: row-reverse; }

    .msg-avatar {
      width: 28px; height: 28px; border-radius: 50%;
      background: #e2e3e0; display: flex; align-items: center;
      justify-content: center; flex-shrink: 0; margin-top: 2px;
    }
    .msg-avatar.bot-av { background: #012d1d; }
    .msg-avatar svg { width: 13px; height: 13px; }

    .msg-bubble {
      max-width: 78%;
      padding: 10px 14px;
      font-family: 'Inter', sans-serif;
      font-size: 13.5px; line-height: 1.6;
      color: #1a1c1a;
    }
    .chat-msg.bot .msg-bubble {
      background: #fff;
      border: 1px solid #e2e3e0;
      border-bottom-left-radius: 0;
      border-radius: 0 12px 12px 12px;
    }
    .chat-msg.user .msg-bubble {
      background: #012d1d;
      color: #fff;
      border-radius: 12px 12px 0 12px;
    }

    .msg-time {
      font-size: 10px; color: #717973;
      margin-top: 4px; font-family: 'Inter', sans-serif;
    }
    .chat-msg.user .msg-time { text-align: right; }

    /* Quick replies */
    .quick-replies {
      display: flex; flex-wrap: wrap; gap: 6px;
      padding: 0 16px 12px; flex-shrink: 0;
    }
    .quick-reply-btn {
      font-family: 'Inter', sans-serif;
      font-size: 11.5px; font-weight: 500;
      color: #012d1d; background: #fff;
      border: 1px solid #c1c8c2;
      padding: 6px 12px;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
    }
    .quick-reply-btn:hover { background: #f3f4f1; border-color: #012d1d; }

    /* Typing indicator */
    .typing-indicator {
      display: flex; gap: 4px; padding: 10px 14px;
      background: #fff; border: 1px solid #e2e3e0;
      border-radius: 0 12px 12px 12px;
      width: fit-content;
    }
    .typing-dot {
      width: 6px; height: 6px; background: #717973;
      border-radius: 50%; animation: typing 1.2s infinite;
    }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typing { 0%,60%,100% { transform:translateY(0); } 30% { transform:translateY(-5px); } }

    /* Input area */
    #antec-chat-footer {
      padding: 12px 16px;
      background: #fff;
      border-top: 1px solid #e2e3e0;
      display: flex; gap: 8px; align-items: flex-end;
      flex-shrink: 0;
    }
    #antec-chat-input {
      flex: 1; resize: none; border: 1px solid #c1c8c2;
      padding: 9px 12px; font-family: 'Inter', sans-serif;
      font-size: 13.5px; color: #1a1c1a; background: #f9faf6;
      outline: none; line-height: 1.5; min-height: 38px; max-height: 100px;
      transition: border-color 0.2s;
    }
    #antec-chat-input:focus { border-color: #012d1d; }
    #antec-chat-input::placeholder { color: #717973; }

    #antec-chat-send {
      width: 38px; height: 38px; border: none;
      background: #012d1d; color: #fff;
      cursor: pointer; display: flex; align-items: center;
      justify-content: center; flex-shrink: 0;
      transition: background 0.2s, transform 0.15s;
    }
    #antec-chat-send:hover { background: #1b4332; }
    #antec-chat-send:active { transform: scale(0.93); }
    #antec-chat-send:disabled { background: #c1c8c2; cursor: not-allowed; }

    .chat-footer-note {
      font-family: 'Inter', sans-serif;
      font-size: 10px; color: #717973;
      text-align: center; padding: 0 16px 10px;
      background: #fff; flex-shrink: 0;
    }
    .chat-footer-note span { color: #fed65b; font-weight: 600; }
  `;
  document.head.appendChild(style);

  // ── HTML ─────────────────────────────────────
  const html = `
    <!-- FAB Button -->
    <button id="antec-chat-fab" aria-label="Open Antec Assistant">
      <span id="antec-badge" id="antec-chat-badge"></span>
      <svg class="fab-icon" id="fab-open" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24">
        <path fill="#fed65b" d="M12 2C6.48 2 2 6.03 2 11c0 2.67 1.19 5.07 3.09 6.72L4 22l4.52-1.51A10.1 10.1 0 0 0 12 21c5.52 0 10-4.03 10-9S17.52 2 12 2Z"/>
        <circle cx="8.5" cy="11" r="1.2" fill="#012d1d"/>
        <circle cx="12" cy="11" r="1.2" fill="#012d1d"/>
        <circle cx="15.5" cy="11" r="1.2" fill="#012d1d"/>
      </svg>
      <svg class="fab-icon hidden" id="fab-close" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path stroke="#fff" stroke-width="2.5" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/>
      </svg>
    </button>

    <!-- Chat Window -->
    <div id="antec-chat-window" role="dialog" aria-label="Antec Group Assistant">
      <div id="antec-chat-header">
        <div class="chat-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path fill="#012d1d" d="M12 2C8 2 5 5 5 9c0 2.5 1.2 4.7 3 6v3l3-1.5L14 18v-3c1.8-1.3 3-3.5 3-6 0-4-3-7-5-7Z"/>
          </svg>
        </div>
        <div class="chat-header-info">
          <p class="chat-header-name">Antec Assistant</p>
          <div class="chat-header-status"><span class="status-dot"></span> Online · Antec Group</div>
        </div>
        <button class="chat-close-btn" id="antec-chat-close" aria-label="Close chat">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </button>
      </div>
      <div class="chat-accent-bar"></div>

      <div id="antec-chat-messages"></div>

      <div class="quick-replies" id="antec-quick-replies"></div>

      <div id="antec-chat-footer">
        <textarea id="antec-chat-input" placeholder="Ask about our services…" rows="1" aria-label="Message input"></textarea>
        <button id="antec-chat-send" aria-label="Send message" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path fill="#fff" d="M2 12L22 2 12 22l-2-7-8-3Z"/>
          </svg>
        </button>
      </div>
      <div class="chat-footer-note">Powered by <span>Antec AI</span> · We typically reply instantly</div>
    </div>
  `;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  // ── State & refs ─────────────────────────────
  const fab = document.getElementById("antec-chat-fab");
  const win = document.getElementById("antec-chat-window");
  const closeBtn = document.getElementById("antec-chat-close");
  const messagesEl = document.getElementById("antec-chat-messages");
  const input = document.getElementById("antec-chat-input");
  const sendBtn = document.getElementById("antec-chat-send");
  const quickRepliesEl = document.getElementById("antec-quick-replies");
  const fabOpen = document.getElementById("fab-open");
  const fabClose = document.getElementById("fab-close");
  const badge = document.getElementById("antec-badge");
  let isOpen = false;
  let isWaiting = false;
  let conversationHistory = [];

  const SYSTEM_PROMPT = `You are the Antec Group AI Assistant — a warm, knowledgeable, and professional virtual representative for Antec Group of Companies, headquartered in Accra, Ghana.

Antec Group has three main divisions:
1. Antec Herbal Centre — healthcare division blending traditional herbal wisdom with modern pharmaceutical precision for holistic wellness.
2. Sparnis Pharmacy Ltd — providing reliable access to essential medicines and professional consulting across a growing network.
3. Antec Homes — premium residential real estate developments redefining modern living in Ghana with architectural excellence.

The group was founded in 1999 and has served 12,000+ global clients with 25+ years of excellence.

Your role:
- Answer questions about Antec Group's services, divisions, history, and values
- Help visitors find the right division for their needs
- Direct inquiries to the correct contact (info@antecgroup.com / +233 302 000 000)
- For property inquiries, mention they can visit the Antec Homes page
- For healthcare/herbal questions, mention the Herbal Centre page
- Be concise — keep responses to 2-4 sentences unless more detail is truly needed
- Maintain a tone that is professional yet warm; embody the brand values of reliability, prestige, and trust
- If asked something you don't know, offer to connect them with the team via email or phone

Do NOT make up specific property prices, stock availability, medical advice, or internal company data you don't know.`;

  const QUICK_REPLIES_INITIAL = [
    "Tell me about Antec Homes",
    "Herbal Centre services",
    "Contact the team",
    "About Antec Group",
  ];

  // ── Toggle ────────────────────────────────────
  function toggleChat() {
    isOpen = !isOpen;
    win.classList.toggle("open", isOpen);
    fabOpen.classList.toggle("hidden", isOpen);
    fabClose.classList.toggle("hidden", !isOpen);
    if (badge) badge.style.display = isOpen ? "none" : "";
    if (isOpen && messagesEl.children.length === 0) initGreeting();
  }

  fab.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", toggleChat);

  // ── Greeting ──────────────────────────────────
  function initGreeting() {
    appendMessage(
      "bot",
      "Hello! Welcome to Antec Group. 👋 I'm here to help you explore our healthcare and real estate divisions. What can I assist you with today?",
    );
    showQuickReplies(QUICK_REPLIES_INITIAL);
  }

  // ── Messages ──────────────────────────────────
  function getTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function appendMessage(role, text) {
    const isBot = role === "bot";
    const msg = document.createElement("div");
    msg.className = `chat-msg ${isBot ? "bot" : "user"}`;
    msg.innerHTML = `
      <div class="msg-avatar ${isBot ? "bot-av" : ""}">
        ${
          isBot
            ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill="#fed65b" d="M12 2C8 2 5 5 5 9c0 2.5 1.2 4.7 3 6v3l3-1.5L14 18v-3c1.8-1.3 3-3.5 3-6 0-4-3-7-5-7Z"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#717973"/><path fill="#717973" d="M4 20c0-4 3.6-7 8-7s8 3 8 7H4Z"/></svg>`
        }
      </div>
      <div>
        <div class="msg-bubble">${escapeHtml(text).replace(/\n/g, "<br>")}</div>
        <div class="msg-time">${getTime()}</div>
      </div>
    `;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return msg;
  }

  function showTyping() {
    const el = document.createElement("div");
    el.className = "chat-msg bot";
    el.id = "antec-typing";
    el.innerHTML = `
      <div class="msg-avatar bot-av">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill="#fed65b" d="M12 2C8 2 5 5 5 9c0 2.5 1.2 4.7 3 6v3l3-1.5L14 18v-3c1.8-1.3 3-3.5 3-6 0-4-3-7-5-7Z"/></svg>
      </div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById("antec-typing");
    if (el) el.remove();
  }

  function showQuickReplies(replies) {
    quickRepliesEl.innerHTML = "";
    replies.forEach((r) => {
      const btn = document.createElement("button");
      btn.className = "quick-reply-btn";
      btn.textContent = r;
      btn.addEventListener("click", () => {
        quickRepliesEl.innerHTML = "";
        sendMessage(r);
      });
      quickRepliesEl.appendChild(btn);
    });
  }

  // ── API call ──────────────────────────────────
  async function sendMessage(text) {
    if (!text.trim() || isWaiting) return;
    isWaiting = true;
    sendBtn.disabled = true;
    input.value = "";
    input.style.height = "auto";
    quickRepliesEl.innerHTML = "";

    appendMessage("user", text);
    conversationHistory.push({ role: "user", content: text });

    showTyping();

    try {
      const res = await fetch(
        "https://router.huggingface.co/novita/v3/openai/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.1-8b-instruct",
            max_tokens: 500,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...conversationHistory,
            ],
          }),
        },
      );

      const data = await res.json();
      console.log("HF response:", data);
      const reply =
        data.choices?.[0]?.message?.content ||
        "I'm sorry, I couldn't process that. Please contact us at info@antecgroup.com.";

      removeTyping();
      appendMessage("bot", reply);
      conversationHistory.push({ role: "assistant", content: reply });

      const lower = text.toLowerCase();
      if (
        lower.includes("home") ||
        lower.includes("property") ||
        lower.includes("real estate")
      ) {
        showQuickReplies([
          "View developments",
          "Pricing info",
          "Location details",
          "Contact sales",
        ]);
      } else if (
        lower.includes("herbal") ||
        lower.includes("health") ||
        lower.includes("medicine") ||
        lower.includes("pharmacy")
      ) {
        showQuickReplies([
          "Book consultation",
          "Product range",
          "Opening hours",
          "Find a branch",
        ]);
      } else if (
        lower.includes("contact") ||
        lower.includes("reach") ||
        lower.includes("call")
      ) {
        showQuickReplies([
          "Email the team",
          "Call us",
          "Visit our office",
          "Back to services",
        ]);
      } else {
        showQuickReplies([
          "Tell me more",
          "Contact the team",
          "View all services",
        ]);
      }
    } catch (e) {
      removeTyping();
      console.error("Chatbot error:", e);
      appendMessage(
        "bot",
        "Apologies, I'm having trouble connecting. Please reach us directly at info@antecgroup.com or call +233 302 000 000.",
      );
    }

    isWaiting = false;
    sendBtn.disabled = false;
    input.focus();
  }

  // ── Input handling ────────────────────────────
  input.addEventListener("input", function () {
    sendBtn.disabled = this.value.trim() === "";
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 100) + "px";
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(this.value.trim());
    }
  });

  sendBtn.addEventListener("click", () => sendMessage(input.value.trim()));

  // ── Util ──────────────────────────────────────
  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ── Auto-open hint after delay ────────────────
  setTimeout(() => {
    if (!isOpen && badge) {
      badge.style.display = "block";
    }
  }, 3000);
})();
