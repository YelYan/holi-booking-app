import { QueryProviders } from "./QueryProviders";
import { AuthProvider } from "./AuthProvider";
import { StoreProvider } from "./StoreProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProviders>
      <AuthProvider>
        <StoreProvider>{children}</StoreProvider>
      </AuthProvider>
    </QueryProviders>
  );
};

export default AppProvider;
