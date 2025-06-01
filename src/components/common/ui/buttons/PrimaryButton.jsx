export default function PrimaryButton({ text, label, onClick, type = "button", full = false, disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${
        full ? "w-full" : "px-4"
      } py-2 rounded text-sm text-white bg-white/20 hover:bg-white/90 hover:text-black transition-colors duration-300 disabled:opacity-30`}
    >
      {label || text}
    </button>
  );
}