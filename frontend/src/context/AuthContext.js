'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  EmailAuthProvider,
  linkWithCredential,
  updatePassword
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Fetch additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Register (Email/Password & Email Verification)
  async function register(email, password, displayName, phone = '') {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Send email verification
    await sendEmailVerification(result.user);
    
    // Update profile
    await updateProfile(result.user, { displayName });
    
    // Save to Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
      email,
      displayName,
      phone,
      role: email === 'admin@xatraworks.com' ? 'admin' : 'user',
      phoneVerified: false,
      emailVerified: false,
      photoURL: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return result.user;
  }

  // Login with email and password
  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  }

  // Login with Google
  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Check if user exists in Firestore, if not create
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        phone: result.user.phoneNumber || '',
        role: 'user',
        photoURL: result.user.photoURL,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    return result.user;
  }

  // Logout
  async function logout() {
    await signOut(auth);
  }

  // Reset password
  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }

  const value = {
    user,
    userData,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    isAdmin: userData?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
