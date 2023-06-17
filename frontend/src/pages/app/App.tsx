import { Router } from "routes/routes";
import './App.css';
import { AuthProvider } from 'contexts/auth.context';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from "styled-components";
import { theme } from "styles/themes/theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router />
                <ToastContainer theme="colored" newestOnTop autoClose={3000}  />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
