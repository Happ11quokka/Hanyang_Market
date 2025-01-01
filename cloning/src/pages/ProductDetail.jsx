import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function ProductDetail() {
  const { productId } = useParams(); // URL에서 productId 가져옴
  const [product, setProduct] = useState(null); // 상품 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const auth = getAuth(); // Firebase Auth
  const user = auth.currentUser; // 현재 로그인된 사용자

  // 상품 데이터 가져오기
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", productId); // Firestore에서 상품 참조
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() }); // 상품 데이터 설정
        } else {
          console.error("상품을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("상품 데이터 가져오기 오류:", error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchProduct();
  }, [productId]);

  // 카트에 상품 추가
  const handleAddToCart = async () => {
    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    try {
      const cartRef = collection(db, "carts", user.uid, "items"); // 사용자별 카트 경로
      await addDoc(cartRef, {
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
        addedAt: new Date().toISOString(), // 현재 시간 추가
      });
      alert("카트에 상품이 추가되었습니다.");
    } catch (error) {
      console.error("카트 추가 오류:", error);
      alert("카트 추가에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>상품을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <img
          src={product.imageUrl || "/default-image.png"}
          alt={product.name}
          className="w-full h-64 object-contain rounded-md mb-6" // object-contain으로 수정
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
        <p className="text-lg text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-orange-500 mb-4">Price: {product.price}</p>
        <p className="text-gray-500 mb-2">
          <strong>Added By:</strong> {product.addedBy || "Unknown"}
        </p>
        <p className="text-gray-500">
          <strong>Added On:</strong> {new Date(product.addedAt).toLocaleString() || "N/A"}
        </p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
        <div className="mt-6">
          <Link
            to="/products"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}