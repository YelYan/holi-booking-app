import { QueryProviders } from "./QueryProviders";
import { AuthProvider } from "./AuthProvider";
import { StoreProvider } from "./StoreProvider";
import { PersistProvider } from "./PersistProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProviders>
      <AuthProvider>
        <PersistProvider>
          <StoreProvider>{children}</StoreProvider>
        </PersistProvider>
      </AuthProvider>
    </QueryProviders>
  );
};

export default AppProvider;
