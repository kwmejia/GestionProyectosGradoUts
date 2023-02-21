import { MsalProvider } from "@azure/msal-react";
import { AuthProvider } from "./context";
import { AppRouter } from "./routes/AppRouter";
import msalInstance from "./config/AzureConfig";

const App = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </MsalProvider>
  );
}

export default App;