import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiSend,
  FiMoreVertical,
  FiMessageSquare,
  FiX,
  FiPlus,
  FiCheck,
  FiCheckCircle,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

//  Avatar
const Avatar = ({
  user,
  size = "md",
  color = "from-purple-500 to-blue-500",
}) => {
  const photo = user?.profilePhoto || user?.photoURL;
  const dims =
    size === "sm"
      ? "w-8 h-8 text-xs"
      : size === "lg"
        ? "w-12 h-12 text-base"
        : "w-10 h-10 text-sm";

  return photo ? (
    <img
      src={photo}
      alt={user?.name}
      className={`${dims} rounded-xl object-cover flex-shrink-0`}
    />
  ) : (
    <div
      className={`${dims} bg-gradient-to-br ${color} rounded-xl flex items-center justify-center flex-shrink-0`}
    >
      <span className="text-white font-bold">
        {user?.name?.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

//  Skeleton
const ConvoSkeleton = () => (
  <div className="flex items-center gap-3 px-5 py-4 animate-pulse">
    <div className="w-10 h-10 bg-theme-primary/30 rounded-xl flex-shrink-0" />
    <div className="flex-1 space-y-1.5">
      <div className="h-3.5 bg-theme-primary/30 rounded w-1/2" />
      <div className="h-3 bg-theme-primary/20 rounded w-3/4" />
    </div>
  </div>
);

// Format time
const formatTime = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const now = new Date();
  const diff = now - d;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return d.toLocaleDateString();
};

//  New Conversation Modal
const NewConvoModal = ({ onClose, onSelect }) => {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (q.length < 2) {
      setUsers([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/messages/users/search?q=${encodeURIComponent(q)}`,
        );
        setUsers(res.data.users || []);
      } catch {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [q]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-theme-card border border-theme rounded-2xl w-full max-w-md shadow-2xl z-10 overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-theme">
          <h3 className="font-bold text-theme-primary">New Message</h3>
          <button
            onClick={onClose}
            className="text-theme-muted hover:text-theme-primary transition"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-3">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, company or email..."
              className="input-theme w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          <div className="space-y-1 max-h-64 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : users.length === 0 && q.length >= 2 ? (
              <p className="text-theme-muted text-sm text-center py-8">
                No users found
              </p>
            ) : q.length < 2 ? (
              <p className="text-theme-muted text-sm text-center py-8">
                Type at least 2 characters to search
              </p>
            ) : (
              users.map((u) => (
                <button
                  key={u._id}
                  onClick={() => onSelect(u)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-500/10 transition text-left"
                >
                  <Avatar user={u} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-theme-primary font-medium text-sm truncate">
                      {u.name}
                    </p>
                    <p className="text-theme-muted text-xs capitalize truncate">
                      {u.role === "employer"
                        ? u.companyName || u.email
                        : u.role}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                      u.role === "employer"
                        ? "bg-blue-500/10 text-blue-500"
                        : u.role === "seeker"
                          ? "bg-purple-500/10 text-purple-500"
                          : "bg-gray-500/10 text-gray-500"
                    }`}
                  >
                    {u.role}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

//  Main Component
const Messages = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [convos, setConvos] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mobileView, setMobileView] = useState("list");
  const [convosLoading, setConvosLoading] = useState(true);
  const [msgsLoading, setMsgsLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [showNewConvo, setShowNewConvo] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const pollRef = useRef(null);

  const activeConvo = convos.find((c) => c._id === activeId);

  //  Fetch Conversations
  const fetchConvos = useCallback(async () => {
    try {
      const res = await api.get("/messages/conversations");
      setConvos(res.data.conversations || []);
    } catch {
      // silent
    } finally {
      setConvosLoading(false);
    }
  }, []);

  //  Fetch Messages
  const fetchMessages = useCallback(async (convId) => {
    if (!convId) return;
    setMsgsLoading(true);
    try {
      const res = await api.get(`/messages/${convId}`);
      setMessages(res.data.messages || []);
      // unread reset locally
      setConvos((prev) =>
        prev.map((c) => (c._id === convId ? { ...c, unread: 0 } : c)),
      );
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setMsgsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConvos();
  }, [fetchConvos]);

  // Poll new messages every 5 sec when chat open
  useEffect(() => {
    if (!activeId) return;
    pollRef.current = setInterval(async () => {
      try {
        const res = await api.get(`/messages/${activeId}`);
        setMessages(res.data.messages || []);
      } catch {}
    }, 5000);
    return () => clearInterval(pollRef.current);
  }, [activeId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //  Select Conversation
  const selectConvo = (id) => {
    setActiveId(id);
    setMobileView("chat");
    fetchMessages(id);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  //  Send Message
  const sendMessage = async () => {
    if (!input.trim() || !activeId || sending) return;
    const text = input.trim();
    setInput("");
    setSending(true);

    // Optimistic update
    const tempMsg = {
      _id: "temp_" + Date.now(),
      text,
      sender: {
        _id: user._id,
        name: user.name,
        profilePhoto: user.profilePhoto,
      },
      createdAt: new Date().toISOString(),
      temp: true,
    };
    setMessages((prev) => [...prev, tempMsg]);
    setConvos((prev) =>
      prev.map((c) =>
        c._id === activeId
          ? { ...c, lastMessage: text, lastMessageAt: new Date() }
          : c,
      ),
    );

    try {
      const res = await api.post(`/messages/${activeId}`, { text });
      setMessages((prev) =>
        prev.map((m) => (m._id === tempMsg._id ? res.data.message : m)),
      );
    } catch {
      toast.error("Failed to send");
      setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
      setInput(text); // restore
    } finally {
      setSending(false);
    }
  };

  //  Start New Conversation
  const handleNewConvo = async (recipient) => {
    setShowNewConvo(false);
    try {
      const res = await api.post("/messages/conversations", {
        recipientId: recipient._id,
      });
      const newConvo = res.data.conversation;

      // Already exists — just open it
      const exists = convos.find((c) => c._id === newConvo._id);
      if (!exists) {
        setConvos((prev) => [
          {
            ...newConvo,
            lastMessage: "",
            lastMessageAt: new Date(),
            unread: 0,
          },
          ...prev,
        ]);
      }
      selectConvo(newConvo._id);
    } catch {
      toast.error("Failed to start conversation");
    }
  };

  const filtered = convos.filter(
    (c) =>
      c.other?.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.other?.companyName?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalUnread = convos.reduce((sum, c) => sum + (c.unread || 0), 0);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="card-theme border rounded-2xl overflow-hidden"
      style={{ height: "calc(100vh - 160px)", minHeight: "500px" }}
    >
      <div className="flex h-full">
        {/*  Sidebar  */}
        <div
          className={`w-full sm:w-80 border-r border-theme flex flex-col flex-shrink-0 ${
            mobileView === "chat" ? "hidden sm:flex" : "flex"
          }`}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-theme flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-theme-primary flex items-center gap-2">
                Messages
                {totalUnread > 0 && (
                  <span className="bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalUnread}
                  </span>
                )}
              </h2>
              <button
                onClick={() => setShowNewConvo(true)}
                title="New Message"
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted w-4 h-4" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="input-theme w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {convosLoading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <ConvoSkeleton key={i} />
                ))}
              </>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center px-5">
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-3">
                  <FiMessageSquare className="w-7 h-7 text-purple-500" />
                </div>
                <p className="text-theme-secondary font-medium text-sm">
                  No conversations yet
                </p>
                <p className="text-theme-muted text-xs mt-1 mb-3">
                  Start a new conversation with someone
                </p>
                <button
                  onClick={() => setShowNewConvo(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-4 py-2 rounded-xl hover:opacity-90 transition"
                >
                  <FiPlus className="w-3.5 h-3.5" /> New Message
                </button>
              </div>
            ) : (
              filtered.map((convo) => (
                <button
                  key={convo._id}
                  onClick={() => selectConvo(convo._id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition text-left border-b border-theme ${
                    activeId === convo._id
                      ? "bg-purple-500/10 border-l-2 border-l-purple-500"
                      : ""
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <Avatar user={convo.other} size="md" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-theme-primary font-semibold text-sm truncate">
                        {convo.other?.name}
                      </p>
                      <span className="text-theme-muted text-xs flex-shrink-0 ml-2">
                        {formatTime(convo.lastMessageAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-theme-muted text-xs truncate flex-1">
                        {convo.lastMessage || "No messages yet"}
                      </p>
                      {convo.unread > 0 && (
                        <span className="w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                          {convo.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-theme-muted text-xs mt-0.5 capitalize opacity-70">
                      {convo.other?.role}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/*  Chat Area  */}
        <div
          className={`flex-1 flex flex-col min-w-0 ${mobileView === "list" ? "hidden sm:flex" : "flex"}`}
        >
          {activeConvo ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-theme bg-theme-secondary flex-shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileView("list")}
                    className="sm:hidden text-theme-muted hover:text-theme-primary mr-1 text-lg"
                  >
                    ←
                  </button>
                  <Avatar user={activeConvo.other} size="md" />
                  <div>
                    <p className="text-theme-primary font-semibold text-sm">
                      {activeConvo.other?.name}
                    </p>
                    <p className="text-xs text-theme-muted capitalize">
                      {activeConvo.other?.role === "employer"
                        ? activeConvo.other?.companyName || "Employer"
                        : activeConvo.other?.role}
                    </p>
                  </div>
                </div>
                <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-theme text-theme-muted hover:text-purple-500 transition">
                  <FiMoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-5 py-4">
                {msgsLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-3">
                      <FiMessageSquare className="w-7 h-7 text-purple-500" />
                    </div>
                    <p className="text-theme-secondary font-medium text-sm">
                      No messages yet
                    </p>
                    <p className="text-theme-muted text-xs mt-1">
                      Say hello to {activeConvo.other?.name}!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg, i) => {
                      const isMe =
                        msg.sender?._id === user?._id ||
                        msg.sender === user?._id;
                      const showAvatar =
                        !isMe &&
                        (i === 0 ||
                          messages[i - 1]?.sender?._id !== msg.sender?._id);

                      return (
                        <div
                          key={msg._id}
                          className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
                        >
                          {/* Other user avatar */}
                          {!isMe && (
                            <div className="flex-shrink-0 w-8">
                              {showAvatar ? (
                                <Avatar user={activeConvo.other} size="sm" />
                              ) : (
                                <div className="w-8" />
                              )}
                            </div>
                          )}

                          <div
                            className={`flex flex-col gap-1 max-w-xs lg:max-w-md ${isMe ? "items-end" : "items-start"}`}
                          >
                            <div
                              className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                isMe
                                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none"
                                  : "bg-theme-card border border-theme text-theme-primary rounded-bl-none"
                              } ${msg.temp ? "opacity-70" : ""}`}
                            >
                              {msg.text}
                            </div>
                            <div
                              className={`flex items-center gap-1 px-1 ${isMe ? "justify-end" : ""}`}
                            >
                              <p className="text-theme-muted text-xs">
                                {formatTime(msg.createdAt)}
                              </p>
                              {isMe &&
                                (msg.temp ? (
                                  <FiCheck className="w-3 h-3 text-theme-muted" />
                                ) : (
                                  <FiCheckCircle className="w-3 h-3 text-purple-400" />
                                ))}
                            </div>
                          </div>

                          {/* My avatar */}
                          {isMe && (
                            <div className="flex-shrink-0">
                              <Avatar user={user} size="sm" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <div ref={bottomRef} />
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-theme bg-theme-secondary flex-shrink-0">
                <div className="flex items-center gap-3">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder={`Message ${activeConvo.other?.name}...`}
                    className="input-theme flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || sending}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 disabled:opacity-40 transition flex-shrink-0"
                  >
                    {sending ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiSend className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4">
                <FiMessageSquare className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-theme-primary font-semibold mb-2">
                Your Messages
              </h3>
              <p className="text-theme-muted text-sm mb-4 max-w-xs">
                Select a conversation or start a new one to connect with
                employers and seekers.
              </p>
              <button
                onClick={() => setShowNewConvo(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition"
              >
                <FiPlus className="w-4 h-4" /> Start New Conversation
              </button>
            </div>
          )}
        </div>
      </div>

      {/*  New Conversation Modal  */}
      <AnimatePresence>
        {showNewConvo && (
          <NewConvoModal
            onClose={() => setShowNewConvo(false)}
            onSelect={handleNewConvo}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Messages;
