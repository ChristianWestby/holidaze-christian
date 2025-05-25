export default function VenueInfo({ name, description }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">{name}</h2>
      <p className="text-sm text-gray-300">
        {description?.substring(0, 100)}...
      </p>
    </div>
  );
}