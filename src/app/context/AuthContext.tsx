import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "admin" | "organization" | "applicant";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  organizationName?: string;
  isApproved?: boolean; // For organizations
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: UserRole, organizationName?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initialize demo users if not already present
    const usersJson = localStorage.getItem("users");
    if (!usersJson) {
      const demoUsers: User[] = [
        {
          id: "1",
          email: "admin@giveback.com",
          name: "Admin User",
          role: "admin",
        },
        {
          id: "2",
          email: "org@example.com",
          name: "John Smith",
          role: "organization",
          organizationName: "Hope Foundation",
          isApproved: true,
        },
        {
          id: "3",
          email: "user@example.com",
          name: "Jane Doe",
          role: "applicant",
        },
        {
          id: "4",
          email: "pending@example.com",
          name: "Sarah Johnson",
          role: "organization",
          organizationName: "Green Earth Initiative",
          isApproved: false,
        },
      ];
      localStorage.setItem("users", JSON.stringify(demoUsers));
    }

    // Check for stored user on mount
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Get all users from localStorage
    const usersJson = localStorage.getItem("users");
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];

    // Find user with matching email
    const foundUser = users.find((u) => u.email === email);
    
    if (foundUser) {
      // In a real app, you'd verify the password hash
      // For now, we'll just check if password is not empty
      if (password) {
        setUser(foundUser);
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        return true;
      }
    }
    
    return false;
  };

  const signup = async (
    email: string,
    _password: string,
    name: string,
    role: UserRole,
    organizationName?: string
  ): Promise<boolean> => {
    // Get existing users
    const usersJson = localStorage.getItem("users");
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];

    // Check if email already exists
    if (users.some((u) => u.email === email)) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      organizationName,
      isApproved: role === "organization" ? false : undefined, // Organizations need approval
    };

    // Add to users array
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // If not an organization or is applicant, log them in immediately
    if (role !== "organization") {
      setUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    }

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}