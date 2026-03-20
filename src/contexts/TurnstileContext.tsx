import { createContext, useContext, useState, type ReactNode } from "react";

interface TurnstileContextType {
  turnstileActive: boolean;
  requestTurnstile: () => void;
}

const TurnstileContext = createContext<TurnstileContextType>({
  turnstileActive: false,
  requestTurnstile: () => {},
});

export function TurnstileProvider({ children }: { children: ReactNode }) {
  const [turnstileActive, setTurnstileActive] = useState(false);

  const requestTurnstile = () => setTurnstileActive(true);

  return (
    <TurnstileContext.Provider value={{ turnstileActive, requestTurnstile }}>
      {children}
    </TurnstileContext.Provider>
  );
}

export const useTurnstile = () => useContext(TurnstileContext);
