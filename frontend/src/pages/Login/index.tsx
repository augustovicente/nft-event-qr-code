import { useState } from "react";
import { LoginContainer } from "./styles";
import { useAuth } from "contexts/auth.context";
import { ByCapitel } from "components/ByCapitel/ByCapitel";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [seePwd, setSeePwd] = useState(false);
    const { signIn } = useAuth();
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        const response = await signIn({
            email: username,
            password
        });
        setLoading(false);
        
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
                    <div className={`form-group ${error ? 'error': ''}`}>
                        <label htmlFor="username">E-mail</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={`form-group ${error ? 'error': ''}`}>
                        <label htmlFor="password">Senha</label>
                        <div className="pwd-content">
                            <input
                                type={seePwd ? 'text' : 'password'}
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {seePwd ? (
                                <i className="ph ph-eye-slash" onClick={() => setSeePwd(false)}></i>
                            ) : (
                                <i className="ph ph-eye" onClick={() => setSeePwd(true)}></i>
                            )}
                        </div>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                Senha ou email incorretos.
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn">
                        Entrar
                        {loading && (
                            <img src="imgs/spinner.webp" />)}
                    </button>
                </form>
                <ByCapitel theme="dark" />
            </div>
        </LoginContainer>
    );
}