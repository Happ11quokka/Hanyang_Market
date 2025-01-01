import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Firebase 설정에서 auth 가져오기
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

export default function Login() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('로그인 성공:', userData);
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('user');
      console.log('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        {user ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">안녕하세요, {user.displayName}님!</h1>
            <img
              src={user.photoURL}
              alt="User Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-700 mb-4">Email: {user.email}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6">Google로 로그인하세요</h1>
            <button
              onClick={handleGoogleLogin}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                alt="Google Logo"
                className="w-6 h-6"
              />
              Google 로그인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}