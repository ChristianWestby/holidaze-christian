export default function PrimaryButton({ text, label, onClick, type = "button", full = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        full ? "w-full" : "px-6"
      } py-2 border border-black bg-white text-black rounded hover:bg-black hover:text-white transition-colors duration-300 text-sm font-medium`}
    >
      {label || text}
    </button>
  );
}