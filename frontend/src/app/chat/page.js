'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Send, Paperclip, Smile, Phone, MoreVertical, Loader2 } from 'lucide-react';
import styles from './page.module.css';

export default function ChatPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'chats'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || !user || sending) return;
    const text = input;
    setInput('');
    setSending(true);

    try {
      await addDoc(collection(db, 'chats'), {
        userId: user.uid,
        userName: user.displayName || 'User',
        text: text,
        sender: 'user',
        createdAt: serverTimestamp(),
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  }

  if (loading || !user) {
    return <div className="page-wrapper" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="skeleton" style={{ width: 200, height: 40 }} />
    </div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.chatContainer}>
        {/* Header */}
        <div className={styles.chatHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.adminAvatar}>
              <span>X</span>
              <div className="status-dot status-dot-online" style={{ position: 'absolute', bottom: 0, right: 0 }} />
            </div>
            <div>
              <h3 className={styles.adminName}>XATRA WORKS Support</h3>
              <p className={styles.adminStatus}>Online — Biasanya membalas dalam 5 menit</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messagesArea}>
          {messages.map((msg) => (
            <div key={msg.id} className={`${styles.message} ${msg.sender === 'user' ? styles.messageUser : styles.messageAdmin}`}>
              <div className={styles.messageBubble}>
                <p>{msg.text}</p>
                <span className={styles.messageTime}>{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form className={styles.inputArea} onSubmit={handleSend}>
          <button type="button" className={styles.attachBtn}><Paperclip size={20} /></button>
          <input
            type="text"
            className={styles.chatInput}
            placeholder="Ketik pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={sending}
            id="chat-input"
          />
          <button type="submit" className={styles.sendBtn} disabled={!input.trim() || sending} id="chat-send-btn">
            {sending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
      </div>
    </div>
  );
}
