import React, { useState, useEffect } from "react";
import api from "../api/axios";
import SubscriptionCard from "../components/SubscriptionCard";
import { useNavigate } from "react-router-dom";

export default function Subscriptions() {
    const navigate = useNavigate(); // ✅ yaha hona chahiye

    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscriptions = async () => {
        try {
            const { data } = await api.get("/subscriptions");
            setSubscriptions(data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        My Subscriptions
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Manage all your active subscriptions in one place
                    </p>
                </div>

                {/* Add Subscription Button */}
                <button
                    onClick={() => navigate("/subscriptions/add")}
                    className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition"
                >
                    + Add Subscription
                </button>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="text-gray-500">Loading subscriptions...</span>
                </div>
            ) : subscriptions.length === 0 ? (
                <EmptyState navigate={navigate} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subscriptions.map((sub) => (
                        <SubscriptionCard key={sub._id} subscription={sub} />
                    ))}
                </div>
            )}
        </div>
    );
}

/* ---------------- Empty State Component ---------------- */

function EmptyState({ navigate }) {
    return (
        <div className="flex flex-col items-center justify-center bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-800">
                No subscriptions found
            </h3>
            <p className="text-gray-500 mt-2 mb-6 max-w-sm">
                You haven’t added any subscriptions yet. Start tracking your expenses by adding one.
            </p>
            <button
                onClick={() => navigate("/subscriptions/add")}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition"
            >
                Add your first subscription
            </button>
        </div>
    );
}
