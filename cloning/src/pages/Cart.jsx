import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]); // 카트에 있는 상품 목록
  const [totalPrice, setTotalPrice] = useState(0); // 총 가격
  const auth = getAuth();
  const user = auth.currentUser;

  // 카트 아이템 가져오기
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) return;

      try {
        const cartRef = collection(db, "carts", user.uid, "items");
        const cartSnapshot = await getDocs(cartRef);
        const items = cartSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
        calculateTotalPrice(items);
      } catch (error) {
        console.error("카트 데이터 가져오기 오류:", error);
      }
    };

    fetchCartItems();
  }, [user]);

  // 총 가격 계산
  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => {
      const numericPrice = parseFloat(item.price.replace(/[^\d.-]/g, "")); // 숫자만 추출
      return acc + numericPrice * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  // 카트에서 상품 제거
  const handleRemoveItem = async (itemId) => {
    if (!user) return;

    try {
      const itemRef = doc(db, "carts", user.uid, "items", itemId);
      await deleteDoc(itemRef);
      const updatedItems = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
      alert("상품이 카트에서 삭제되었습니다.");
    } catch (error) {
      console.error("상품 삭제 오류:", error);
      alert("상품 삭제에 실패했습니다.");
    }
  };

  // 특정 상품 구매 처리
  const handlePurchaseItem = async (item) => {
    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    try {
      const itemRef = doc(db, "carts", user.uid, "items", item.id);
      await deleteDoc(itemRef); // 카트에서 상품 제거
      const updatedItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
      alert(`${item.name} 상품이 ${item.price}원에 구매 완료되었습니다!`);
    } catch (error) {
      console.error("구매 처리 오류:", error);
      alert("구매 처리에 실패했습니다.");
    }
  };

  // 전체 구매 처리
  const handlePurchaseAll = async () => {
    if (cartItems.length === 0) {
      alert("카트가 비어있습니다.");
      return;
    }

    try {
      const cartRef = collection(db, "carts", user.uid, "items");
      for (const item of cartItems) {
        const itemRef = doc(cartRef, item.id);
        await deleteDoc(itemRef);
      }
      setCartItems([]);
      setTotalPrice(0);
      alert(`총 ${totalPrice.toFixed(2)}원에 구매 완료되었습니다!`);
    } catch (error) {
      console.error("전체 구매 처리 오류:", error);
      alert("전체 구매 처리에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">카트에 상품이 없습니다.</p>
        ) : (
          <div>
            {/* 상품 목록 */}
            <ul className="divide-y divide-gray-300">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl || "/default-image.png"}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-md"
                    />
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
                      <p className="text-gray-600">Price: {item.price}원</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePurchaseItem(item)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      Purchase
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* 총 가격 표시 */}
            <div className="text-right mt-6">
              <h2 className="text-xl font-bold">Total: {totalPrice.toFixed(2)}원</h2>
            </div>

            {/* 전체 구매 버튼 */}
            <button
              onClick={handlePurchaseAll}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition mt-4 w-full"
            >
              Purchase All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}