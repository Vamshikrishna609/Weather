import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = city.trim();
    if (!q) return;
    onSearch(q);
    // don't clear immediately so users can tweak; clear if you prefer:
    // setCity("");
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
    <form onSubmit={handleSubmit} className="w-full max-w-xl flex gap-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city (e.g., Hyderabad)"
        className="flex-1 rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="rounded-xl px-5 py-3 font-semibold bg-white text-indigo-700 hover:opacity-90 shadow"
      >
        Search
      </button>
    </form>
    </div>
  );
}
