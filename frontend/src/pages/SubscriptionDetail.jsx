import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function SubscriptionDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    const fetchSubscription = async () => {
        try {
            const { data } = await api.get(`/subscriptions/${id}`);
            setSubscription(data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load subscription");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscription();
    }, [id]);

    /* ---------------- ACTION HANDLERS ---------------- */

    const handleCancel = async () => {
        if (!window.confirm("Are you sure you want to cancel this subscription?")) return;

        try {
            setActionLoading(true);
            await api.put(`/subscriptions/${id}/cancel`);
            await fetchSubscription(); // refresh data
        } catch (err) {
            alert("Failed to cancel subscription");
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("This action is irreversible. Delete subscription?")) return;

        try {
            setActionLoading(true);
            await api.delete(`/subscriptions/${id}`);
            navigate("/subscriptions");
        } catch (err) {
            alert("Failed to delete subscription");
        } finally {
            setActionLoading(false);
        }
    };

    const handleEdit = () => {
        navigate(`/subscriptions/${id}/edit`);
    };

    /* ---------------- UI STATES ---------------- */

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading subscription details...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600">
                {error}
            </div>
        );
    }

    if (!subscription) return null;

    const statusColor =
        subscription.status === "active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700";

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {subscription.name}
                        </h2>
                        <span className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${statusColor}`}>
                            {subscription.status}
                        </span>
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-gray-500 hover:text-gray-800"
                    >
                        ← Back
                    </button>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Info label="Price" value={`₹${subscription.price}`} />
                    <Info label="Currency" value={subscription.currency} />
                    <Info label="Billing Cycle" value={subscription.frequency} />
                    <Info label="Category" value={subscription.category || "—"} />
                    <Info label="Payment Method" value={subscription.paymentMethod || "—"} />
                    <Info label="Start Date" value={new Date(subscription.startDate).toDateString()} />
                    <Info
                        label="Renewal Date"
                        value={
                            subscription.renewalDate
                                ? new Date(subscription.renewalDate).toDateString()
                                : "N/A"
                        }
                    />
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 mt-10">
                    <button
                        onClick={handleEdit}
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow"
                    >
                        Edit
                    </button>

                    {subscription.status === "active" && (
                        <button
                            onClick={handleCancel}
                            disabled={actionLoading}
                            className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow"
                        >
                            Cancel
                        </button>
                    )}

                    <button
                        onClick={handleDelete}
                        disabled={actionLoading}
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ---------------- Reusable Info Component ---------------- */

function Info({ label, value }) {
    return (
        <div className="bg-gray-50 rounded-lg p-4 border">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-lg font-semibold text-gray-800 mt-1">
                {value}
            </p>
        </div>
    );
}
