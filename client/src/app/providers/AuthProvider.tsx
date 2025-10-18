import React, { createContext } from "react";
import { useUser } from "@/services/auth/auth-api-client";
import { loadStripe } from "@stripe/stripe-js";
import type { Stripe } from "@stripe/stripe-js";

type UserT = Record<"userId" | "email" | "role", string>;

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";

type AuthContextT = {
  user: UserT;
  isLoggedIn: boolean;
  isLoading: boolean;
  stripePromise: Promise<Stripe | null>;
};

const stripePromise = loadStripe(STRIPE_PUB_KEY);

const AuthContext = createContext<AuthContextT | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, isError } = useUser();
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn: !isError && !!user,
        stripePromise,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
