import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiSend,
  FiPaperclip,
  FiMoreVertical,
  FiPhone,
  FiVideo,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const conversations = [
  {
    id: 1,
    name: "TechCorp BD",
    avatar: "T",
    role: "Employer",
    lastMsg: "We would like to invite you for an interview.",
    time: "2h ago",
    unread: 2,
    online: true,
    color: "from-purple-500 to-blue-500",
    messages: [
      {
        id: 1,
        text: "Hello! We reviewed your application for Frontend Developer.",
        from: "them",
        time: "10:00 AM",
      },
      {
        id: 2,
        text: "Your profile looks impressive. We'd like to learn more.",
        from: "them",
        time: "10:01 AM",
      },
      {
        id: 3,
        text: "Thank you! I'm very interested in the position.",
        from: "me",
        time: "10:05 AM",
      },
      {
        id: 4,
        text: "We would like to invite you for an interview.",
        from: "them",
        time: "10:10 AM",
      },
    ],
  },
  {
    id: 2,
    name: "PixelCraft HR",
    avatar: "P",
    role: "Employer",
    lastMsg: "Please send your updated portfolio.",
    time: "1d ago",
    unread: 0,
    online: false,
    color: "from-pink-500 to-rose-500",
    messages: [
      {
        id: 1,
        text: "Hi! We saw your profile and are interested.",
        from: "them",
        time: "Yesterday",
      },
      {
        id: 2,
        text: "Please send your updated portfolio.",
        from: "them",
        time: "Yesterday",
      },
      {
        id: 3,
        text: "Sure, I'll send it right away!",
        from: "me",
        time: "Yesterday",
      },
    ],
  },
  {
    id: 3,
    name: "DevHouse Ltd",
    avatar: "D",
    role: "Employer",
    lastMsg: "Thank you for applying!",
    time: "3d ago",
    unread: 0,
    online: true,
    color: "from-green-500 to-teal-500",
    messages: [
      {
        id: 1,
        text: "Thank you for applying to our Backend Engineer position!",
        from: "them",
        time: "3 days ago",
      },
      {
        id: 2,
        text: "We will review your application and get back to you.",
        from: "them",
        time: "3 days ago",
      },
    ],
  },
  {
    id: 4,
    name: "NextGen Tech",
    avatar: "N",
    role: "Employer",
    lastMsg: "Are you available for a call?",
    time: "5d ago",
    unread: 1,
    online: false,
    color: "from-orange-500 to-yellow-500",
    messages: [
      {
        id: 1,
        text: "Hello! Are you available for a call?",
        from: "them",
        time: "5 days ago",
      },
    ],
  },
];

const Messages = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState(1);
  const [input, setInput] = useState("");
  const [convos, setConvos] = useState(conversations);
  const [mobileView, setMobileView] = useState("list");
  const bottomRef = useRef(null);

  const activeConvo = convos.find((c) => c.id === activeId);

  const filtered = convos.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, convos]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setConvos(
      convos.map((c) =>
        c.id === activeId
          ? {
              ...c,
              lastMsg: input,
              time: "just now",
              messages: [
                ...c.messages,
                { id: Date.now(), text: input, from: "me", time: "just now" },
              ],
            }
          : c,
      ),
    );
    setInput("");
  };

  const selectConvo = (id) => {
    setActiveId(id);
    setMobileView("chat");
    setConvos(convos.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="card-theme border rounded-2xl overflow-hidden"
      style={{ height: "calc(100vh - 160px)", minHeight: "500px" }}
    >
      <div className="flex h-full">
        {/* ===== Sidebar ===== */}
        <div
          className={`w-full sm:w-80 border-r border-theme flex flex-col flex-shrink-0 ${mobileView === "chat" ? "hidden sm:flex" : "flex"}`}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-theme">
            <h2 className="text-lg font-bold text-theme-primary mb-3">
              Messages
            </h2>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="input-theme w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map((convo) => (
              <button
                key={convo.id}
                onClick={() => selectConvo(convo.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition text-left border-b border-theme ${
                  activeId === convo.id
                    ? "bg-purple-500/10 border-l-2 border-l-purple-500"
                    : ""
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-11 h-11 bg-gradient-to-br ${convo.color} rounded-xl flex items-center justify-center`}
                  >
                    <span className="text-white font-bold">{convo.avatar}</span>
                  </div>
                  {convo.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-theme"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-theme-primary font-semibold text-sm">
                      {convo.name}
                    </p>
                    <span className="text-theme-muted text-xs">
                      {convo.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-theme-muted text-xs truncate flex-1">
                      {convo.lastMsg}
                    </p>
                    {convo.unread > 0 && (
                      <span className="ml-2 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                        {convo.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ===== Chat Area ===== */}
        <div
          className={`flex-1 flex flex-col ${mobileView === "list" ? "hidden sm:flex" : "flex"}`}
        >
          {activeConvo ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-theme bg-theme-secondary">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileView("list")}
                    className="sm:hidden text-theme-muted hover:text-theme-primary mr-1"
                  >
                    ←
                  </button>
                  <div className="relative">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${activeConvo.color} rounded-xl flex items-center justify-center`}
                    >
                      <span className="text-white font-bold text-sm">
                        {activeConvo.avatar}
                      </span>
                    </div>
                    {activeConvo.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-theme"></span>
                    )}
                  </div>
                  <div>
                    <p className="text-theme-primary font-semibold text-sm">
                      {activeConvo.name}
                    </p>
                    <p className="text-xs text-theme-muted">
                      {activeConvo.online ? (
                        <span className="text-green-500">● Online</span>
                      ) : (
                        "Offline"
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-purple-500 transition">
                    <FiPhone className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-purple-500 transition">
                    <FiVideo className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-purple-500 transition">
                    <FiMoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {activeConvo.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.from !== "me" && (
                      <div
                        className={`w-8 h-8 bg-gradient-to-br ${activeConvo.color} rounded-xl flex items-center justify-center mr-2 flex-shrink-0 self-end`}
                      >
                        <span className="text-white font-bold text-xs">
                          {activeConvo.avatar}
                        </span>
                      </div>
                    )}
                    <div
                      className={`max-w-xs lg:max-w-md ${msg.from === "me" ? "items-end" : "items-start"} flex flex-col gap-1`}
                    >
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm ${
                          msg.from === "me"
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none"
                            : "bg-theme-card border border-theme text-theme-primary rounded-bl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <p className="text-theme-muted text-xs px-1">
                        {msg.time}
                      </p>
                    </div>
                    {msg.from === "me" && (
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center ml-2 flex-shrink-0 self-end">
                        <span className="text-white font-bold text-xs">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-theme bg-theme-secondary">
                <div className="flex items-center gap-3">
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-purple-500 transition flex-shrink-0">
                    <FiPaperclip className="w-4 h-4" />
                  </button>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="input-theme flex-1 border rounded-xl px-4 py-2.5 text-sm"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 disabled:opacity-50 transition flex-shrink-0"
                  >
                    <FiSend className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <FiMessageSquare className="w-12 h-12 text-theme-muted mx-auto mb-3" />
                <p className="text-theme-secondary font-medium">
                  Select a conversation
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Messages;
