import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function SubscriptionCard({ subscription }) {
    const navigate = useNavigate();

    const handleCancel = async (e) => {
        e.stopPropagation(); // ✅ card click trigger hone se rokta hai
        try {
            await api.put(`/subscriptions/${subscription._id}/cancel`);
            alert("Subscription cancelled successfully");
            window.location.reload(); // simple refresh (later improve)
        } catch (err) {
            console.log(err);
            alert("Failed to cancel subscription");
        }
    };

    return (
        <div
            onClick={() => navigate(`/subscriptions/${subscription._id}`)}
            className="cursor-pointer bg-white rounded-xl border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
            <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">
                        {subscription.name}
                    </h3>

                    <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                            subscription.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {subscription.status}
                    </span>
                </div>

                {/* Price */}
                <p className="text-2xl font-bold text-purple-600">
                    ₹{subscription.price}
                    <span className="text-sm font-normal text-gray-500">
                        {" / "}
                        {subscription.frequency}
                    </span>
                </p>

                {/* Meta Info */}
                <div className="mt-4 space-y-1 text-sm text-gray-600">
                    <p>
                        <span className="font-medium">Category:</span>{" "}
                        {subscription.category || "—"}
                    </p>
                    <p>
                        <span className="font-medium">Renewal:</span>{" "}
                        {subscription.renewalDate
                            ? new Date(subscription.renewalDate).toDateString()
                            : "N/A"}
                    </p>
                </div>

                {/* Actions */}
                {subscription.status === "active" && (
                    <div className="mt-5">
                        <button
                            onClick={handleCancel}
                            className="w-full px-4 py-2 text-sm font-semibold text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition"
                        >
                            Cancel Subscription
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
