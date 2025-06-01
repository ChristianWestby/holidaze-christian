export default function ProfileHeader({ profile }) {
  return (
    <section className="flex items-center gap-8 mb-8">
      <div className="relative">
        <img
          src={profile.avatar || "https://placehold.co/120x120"}
          alt={profile.name}
          className={`w-28 h-28 rounded-full object-cover shadow-sm border-4 ${
            profile.venueManager ? "border-orange-600" : "border-gray-300"
          }`}
        />
        {profile.venueManager && (
          <span className="absolute bottom-0 right-0 bg-orange-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
            Venue Manager
          </span>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-3xl font-thin text-white">Velkommen tilbake,</p>
        
        <h1 className="text-3xl font-bold tracking-wide">{profile.name}</h1>
        {profile.bio && <p className="text-gray-600 mt-1">{profile.bio}</p>}
        <p className="text-3xl font-thin text-white">{profile.email}</p>
      </div>
    </section>
  );
}