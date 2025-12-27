import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CATEGORY_OPTIONS = [
  "Entertainment",
  "Education",
  "Fitness",
  "Finance",
  "Utilities",
  "Other",
];

const CURRENCY_OPTIONS = ["INR", "USD", "EUR"];
const FREQUENCY_OPTIONS = ["monthly", "yearly"];
const PAYMENT_OPTIONS = ["card", "upi", "netbanking", "cash", "other"];

export default function AddSubscription() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "INR",
    frequency: "monthly",
    category: "Other", // default enum value
    paymentMethod: "card",
    startDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = {
        name: form.name,
        price: Number(form.price),
        currency: form.currency,
        frequency: form.frequency,
        category: form.category,
        paymentMethod: form.paymentMethod,
        startDate: form.startDate,
      };

      const res = await api.post("/subscriptions", payload);
      console.log("Subscription created:", res.data);

      alert("Subscription created! Email scheduled via QStash.");
      navigate("/subscriptions");
    } catch (err) {
      console.log("CREATE ERROR 👉", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to create subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Add Subscription
        </h2>
        <p className="text-gray-500 mb-6">
          Track your recurring expenses easily
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Subscription Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Netflix"
            required
          />

          <Input
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="499"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Currency"
              name="currency"
              value={form.currency}
              onChange={handleChange}
              options={CURRENCY_OPTIONS}
            />
            <Select
              label="Billing Cycle"
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
              options={FREQUENCY_OPTIONS}
            />
          </div>

          <Select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            options={CATEGORY_OPTIONS}
          />

          <Select
            label="Payment Method"
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            options={PAYMENT_OPTIONS}
          />

          <Input
            label="Start Date"
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Add Subscription"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        {...props}
        className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
      >
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
