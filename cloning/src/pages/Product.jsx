import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Products() {
    const [productList, setProductList] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
    });
    const [sortOption, setSortOption] = useState("default");
    const [user, setUser] = useState(null);

    // 사용자 인증 상태 추적
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    // Firestore에서 제품 목록 가져오기
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const products = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProductList(products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // 입력 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 제품 추가 핸들러
    const handleAddProduct = async () => {
        const { name, description, price, imageUrl } = newProduct;
        if (!name || !description || !price) {
            alert("Please fill out all required fields before adding a product.");
            return;
        }

        try {
            const productWithDefaultImage = {
                ...newProduct,
                imageUrl: imageUrl || "/default-image.png",
                addedBy: user ? user.email : "Anonymous",
                addedAt: new Date().toISOString(),
            };

            const docRef = await addDoc(collection(db, "products"), productWithDefaultImage);
            setProductList((prev) => [...prev, { id: docRef.id, ...productWithDefaultImage }]);
            setNewProduct({ name: "", description: "", price: "", imageUrl: "" });
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product. Please try again.");
        }
    };

    // 제품 삭제 핸들러
    const handleDeleteProduct = async (id) => {
        try {
            await deleteDoc(doc(db, "products", id));
            setProductList((prev) => prev.filter((product) => product.id !== id));
            alert("Product deleted successfully.");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Please try again.");
        }
    };

    // 정렬 핸들러
    const handleSortChange = (e) => {
        const selectedOption = e.target.value;
        setSortOption(selectedOption);

        let sortedList = [...productList];

        if (selectedOption === "price") {
            sortedList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (selectedOption === "alphabetical") {
            sortedList.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            sortedList = productList; // 기본 정렬 복원
        }

        setProductList(sortedList);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            {/* 페이지 제목 */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800">Products</h1>
                <p className="text-lg text-gray-600">Browse our exclusive product collection</p>
            </div>

            {/* 정렬 옵션 */}
            <div className="max-w-6xl mx-auto px-4 mb-6">
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/3"
                >
                    <option value="default">Sort By</option>
                    <option value="price">Price (Low)</option>
                    <option value="alphabetical">Name (A-Z)</option>
                </select>
            </div>

            {/* 제품 추가 폼 */}
            <div className="max-w-6xl mx-auto px-4 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Add a New Product</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            placeholder="Product Name"
                            className="border border-gray-300 rounded-lg p-2 w-full"
                        />
                        <input
                            type="text"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            placeholder="Product Description"
                            className="border border-gray-300 rounded-lg p-2 w-full"
                        />
                        <input
                            type="text"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            placeholder="Product Price (e.g., $25)"
                            className="border border-gray-300 rounded-lg p-2 w-full"
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            value={newProduct.imageUrl}
                            onChange={handleInputChange}
                            placeholder="Image URL"
                            className="border border-gray-300 rounded-lg p-2 w-full"
                        />
                    </div>
                    <button
                        onClick={handleAddProduct}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Add Product
                    </button>
                </div>
            </div>

            {/* 제품 목록 */}
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productList.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
                    >
                        <img
                            src={product.imageUrl || "/default-image.png"}
                            alt={product.name}
                            className="w-full h-40 object-contain rounded-md mb-4"
                        />
                        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                        <p className="text-lg font-semibold text-orange-500 mt-4">{product.price}</p>
                        <div className="flex justify-between mt-4">
                            <Link
                                to={`/productDetail/${product.id}`}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                View Details
                            </Link>
                            <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}