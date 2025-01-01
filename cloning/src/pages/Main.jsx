import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Firebase initialization file
import { collection, getDocs, orderBy, limit, query, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth for user information
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link

export default function Main() {
    const [recentProducts, setRecentProducts] = useState([]);
    const [user, setUser] = useState(null); // Track user state
    const navigate = useNavigate(); // Initialize useNavigate

    // Initialize Firebase Auth and listen to authentication state
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe(); // Cleanup on component unmount
    }, []);

    // Fetch recent products from Firestore
    useEffect(() => {
        const fetchRecentProducts = async () => {
            try {
                const q = query(
                    collection(db, "products"),
                    orderBy("addedAt", "desc"),
                    limit(3)
                );
                const querySnapshot = await getDocs(q);
                const products = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setRecentProducts(products);
            } catch (error) {
                console.error("Error fetching recent products:", error);
            }
        };
        fetchRecentProducts();
    }, []);

    const handleButtonClick = () => {
        if (user) {
            navigate("/products"); // Redirect to shopping if logged in
        } else {
            navigate("/login"); // Redirect to login if not logged in
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <section className="hero bg-blue-100 py-16 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-extrabold mb-4 sm:text-5xl">
                        Welcome to Hanyang Market
                    </h1>
                    <p className="text-lg mb-6 max-w-2xl mx-auto">
                        The trusted marketplace for Hanyang community. Buy, sell, and connect with ease in a reliable environment tailored just for you.
                    </p>
                    <button
                        onClick={handleButtonClick}
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition duration-300 transform hover:scale-105"
                    >
                        {user ? "Try Shopping" : "Login to Get Started"}
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="features py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Why Choose Hanyang Market?
                    </h2>
                    <ul className="space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
                        <li className="p-6 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
                            <h3 className="text-xl font-semibold mb-2">
                                Convenient Transactions
                            </h3>
                            <p>
                                Enjoy seamless and quick transactions tailored specifically for
                                the Hanyang University community.
                            </p>
                        </li>
                        <li className="p-6 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
                            <h3 className="text-xl font-semibold mb-2">Trusted Community</h3>
                            <p>
                                Buy and sell with confidence within a reliable network of
                                Hanyang students and staff.
                            </p>
                        </li>
                        <li className="p-6 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
                            <h3 className="text-xl font-semibold mb-2">
                                Sustainable Practices
                            </h3>
                            <p>
                                Promote sustainability by giving your items a second life and
                                reducing waste.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Latest Updates Section */}
            <section className="updates py-16 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Latest Updates</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {recentProducts.map((product) => (
                            <Link
                                to={`/productDetail/${product.id}`} // Link to the ProductDetail page
                                key={product.id}
                                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                            >
                                <img
                                    src={product.imageUrl || "/default-image.png"}
                                    alt={product.name}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-lg font-bold">{product.name}</h3>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-orange-500 font-semibold mt-2">
                                    {product.price}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}