// src/components/common/ui/buttons/GoBackButton.jsx

export default function GoBackButton({ onClick }) {
  return (
    <button
      onClick={onClick || (() => window.history.back())}
      className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition rounded"
    >
      ← Tilbake
    </button>
  );
}