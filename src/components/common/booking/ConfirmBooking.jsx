import PrimaryButton from "../PrimaryButton";

export default function ConfirmBooking({ dateRange, onConfirm, loading }) {
  const { start, end, guests } = dateRange;

  if (!start || !end || guests < 1) return null;

  return (
    <div className="bg-white border border-[#d2c6b2] rounded-lg shadow px-6 py-5 w-full text-black">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Bekreft detaljer</h3>

      <div className="space-y-2 text-sm">
        <p><span className="font-medium">Innsjekk:</span> {start.toLocaleDateString()}</p>
        <p><span className="font-medium">Utsjekk:</span> {end.toLocaleDateString()}</p>
        <p><span className="font-medium">Gjester:</span> {guests}</p>
      </div>

      <div className="mt-5">
        <PrimaryButton
          text={loading ? "Sender..." : "Bekreft booking"}
          onClick={onConfirm}
          disabled={loading}
          full={true}
        />
      </div>
    </div>
  );
}