import { useState } from "react";
import { LoginContainer } from "./styles";
import { useAuth } from "contexts/auth.context";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const { signIn } = useAuth();
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await signIn({
            email: username,
            password
        });

        if (!response)
        {
            setError(true);
            return;
        }
    };
    return (
        <LoginContainer>
            <img className="background" src="imgs/background.png" alt="Background Login" />
            <div className="login-content">
                <img className="logo" src="imgs/hacktown.png" alt="Hacktown Logo" />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">E-mail</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            Senha ou email incorretos.
                        </div>
                    )}
                    <button type="submit" className="btn">
                        Entrar
                    </button>
                </form>
                <span className="by-capitel">by <b>Capitel</b></span>
            </div>
        </LoginContainer>
    );
}