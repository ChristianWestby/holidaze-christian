export default function PrimaryButton({ text, label, onClick, type = "button", full = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        full ? "w-full" : "px-6"
      } py-2 border border-black bg-black text-white rounded hover:bg-white hover:text-black transition-colors duration-300 text-sm font-medium`}
    >
      {label || text}
    </button>
  );
}