import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    const avatar = localStorage.getItem("avatar") || "";
    const venueManager = localStorage.getItem("venueManager") === "true";

    if (accessToken && name) {
      setUser({ accessToken, name, email, venueManager, avatar });
    }
  }, []);

 function login(data) {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("userName", data.name);
  localStorage.setItem("userEmail", data.email);
  localStorage.setItem("venueManager", data.venueManager);
  localStorage.setItem("avatar", data.avatar || "");

  setUser({
    accessToken: data.accessToken,
    name: data.name,
    email: data.email,
    venueManager: data.venueManager,
    avatar: data.avatar || "",
  });
}

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Dette gjør at vi kan importere useAuth() fra samme fil:
export function useAuth() {
  return useContext(AuthContext);
}