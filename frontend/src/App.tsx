import { Suspense } from "react";
import { MsalProvider } from "@azure/msal-react";
import { AuthProvider } from "./context";
import { AppRouter } from "./routes/AppRouter";
import msalInstance from "./config/AzureConfig";
import { LoaderComponent } from "./modules/shared/components/loader/LoaderComponent";
import { AppTheme } from "./theme/AppTheme";

const App = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <AppTheme>
          <Suspense fallback={<LoaderComponent />}>
            <AppRouter />
          </Suspense>
        </AppTheme>
      </AuthProvider>
    </MsalProvider>
  );
}

export default App;