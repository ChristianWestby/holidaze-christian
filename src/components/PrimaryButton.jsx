// components/PrimaryButton.jsx
export default function PrimaryButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="inline-block px-4 py-2 border border-black text-black text-sm uppercase tracking-wide hover:bg-black hover:text-white transition"
    >
      {label}
    </button>
  );
}
