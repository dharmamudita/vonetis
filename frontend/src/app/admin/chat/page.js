'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChats(msgs);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, selectedUser]);

  // Group messages by user
  const groupedChats = chats.reduce((acc, msg) => {
    if (!acc[msg.userId]) {
      acc[msg.userId] = { userId: msg.userId, userName: msg.userName || 'Unknown User', messages: [] };
    }
    acc[msg.userId].messages.push(msg);
    return acc;
  }, {});
  const userList = Object.values(groupedChats);
  const currentMessages = selectedUser ? groupedChats[selectedUser]?.messages || [] : [];

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || !selectedUser || sending) return;
    const text = input;
    setInput('');
    setSending(true);

    try {
      await addDoc(collection(db, 'chats'), {
        userId: selectedUser,
        userName: groupedChats[selectedUser]?.userName || 'User',
        text: text,
        sender: 'admin',
        createdAt: serverTimestamp(),
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="page-wrapper">
      <section style={{ padding: 'var(--space-32) 0 var(--space-16)' }}>
        <div className="container">
          <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
            <ArrowLeft size={16} /> Kembali ke Admin
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>
            Chat <span className="gradient-text">Panel</span>
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'var(--space-4)', minHeight: 600 }}>
            {/* User list */}
            <div className="glass-panel" style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, padding: 'var(--space-3)', color: 'var(--text-secondary)' }}>Percakapan</h3>
              {userList.length === 0 ? (
                <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
                  Belum ada percakapan
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {userList.map(u => (
                    <button 
                      key={u.userId}
                      onClick={() => setSelectedUser(u.userId)}
                      style={{ 
                        padding: 'var(--space-3)', textAlign: 'left', borderRadius: 'var(--radius-md)',
                        background: selectedUser === u.userId ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                        border: '1px solid', borderColor: selectedUser === u.userId ? 'var(--green)' : 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.userName}</p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                        {u.messages[u.messages.length - 1]?.text.slice(0, 30)}...
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Chat area */}
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {!selectedUser ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
                  Pilih percakapan untuk mulai chat
                </div>
              ) : (
                <>
                  <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--glass-border)', fontWeight: 600 }}>
                    Chat dengan {groupedChats[selectedUser]?.userName}
                  </div>
                  
                  <div style={{ flex: 1, padding: 'var(--space-4)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {currentMessages.map(msg => (
                      <div key={msg.id} style={{ 
                        alignSelf: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                        maxWidth: '70%', background: msg.sender === 'admin' ? 'var(--green)' : 'var(--glass-bg)',
                        color: msg.sender === 'admin' ? 'white' : 'var(--text-primary)',
                        padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)'
                      }}>
                        <p style={{ fontSize: 'var(--text-sm)' }}>{msg.text}</p>
                        <span style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px', display: 'block', textAlign: 'right' }}>{msg.time}</span>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <form onSubmit={handleSend} style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: 'var(--space-2)' }}>
                    <input 
                      type="text" className="input" placeholder="Balas pesan..." style={{ flex: 1 }}
                      value={input} onChange={e => setInput(e.target.value)} disabled={sending}
                    />
                    <button type="submit" className="btn btn-primary" disabled={!input.trim() || sending}>
                      {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
