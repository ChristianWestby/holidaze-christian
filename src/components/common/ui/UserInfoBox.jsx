export default function UserInfoBox({ name, email }) {
  return (
    <div className="bg-orange-400 bg-opacity-90 border border-black text-black mb-2 text-sm p-4 rounded">
      <p><strong>Navn:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  );
}