import { QueryProviders } from "./QueryProviders";
import { AuthProvider } from "./AuthProvider";
import { StoreProvider } from "./StoreProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/store/store";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProviders>
      <AuthProvider>
        <PersistGate loading={null} persistor={persistor}>
          <StoreProvider>{children}</StoreProvider>
        </PersistGate>
      </AuthProvider>
    </QueryProviders>
  );
};

export default AppProvider;
