import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditSubscription() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        currency: "INR",
        frequency: "monthly",
        category: "",
        paymentMethod: "",
        startDate: "",
        renewalDate: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    /* ---------------- FETCH EXISTING DATA ---------------- */
    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const { data } = await api.get(`/subscriptions/${id}`);
                const sub = data.data;

                setFormData({
                    name: sub.name || "",
                    price: sub.price || "",
                    currency: sub.currency || "INR",
                    frequency: sub.frequency || "monthly",
                    category: sub.category || "",
                    paymentMethod: sub.paymentMethod || "",
                    startDate: sub.startDate?.slice(0, 10) || "",
                    renewalDate: sub.renewalDate?.slice(0, 10) || "",
                });
            } catch (err) {
                setError("Failed to load subscription");
            } finally {
                setLoading(false);
            }
        };

        fetchSubscription();
    }, [id]);

    /* ---------------- HANDLE CHANGE ---------------- */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await api.put(`/subscriptions/${id}`, formData);
            navigate(`/subscriptions/${id}`);
        } catch (err) {
            alert("Failed to update subscription");
        } finally {
            setSaving(false);
        }
    };

    /* ---------------- UI STATES ---------------- */
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading...
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

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Edit Subscription
                    </h2>

                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-gray-500 hover:text-gray-800"
                    >
                        ← Back
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
                    <Input label="Price" name="price" type="number" value={formData.price} onChange={handleChange} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Select
                            label="Currency"
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            options={["INR", "USD", "EUR"]}
                        />

                        <Select
                            label="Billing Cycle"
                            name="frequency"
                            value={formData.frequency}
                            onChange={handleChange}
                            options={["monthly", "yearly"]}
                        />
                    </div>

                    <Input label="Category" name="category" value={formData.category} onChange={handleChange} />
                    <Input label="Payment Method" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                            label="Start Date"
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                        />

                        <Input
                            label="Renewal Date"
                            type="date"
                            name="renewalDate"
                            value={formData.renewalDate}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow"
                        >
                            {saving ? "Saving..." : "Update Subscription"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function Input({ label, ...props }) {
    return (
        <div>
            <label className="block text-sm text-gray-600 mb-1">{label}</label>
            <input
                {...props}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
        </div>
    );
}

function Select({ label, options, ...props }) {
    return (
        <div>
            <label className="block text-sm text-gray-600 mb-1">{label}</label>
            <select
                {...props}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
                {options.map(opt => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}
