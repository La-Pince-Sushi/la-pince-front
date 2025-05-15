import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../store/authStore.ts";
import logo from "../../assets/logo-la-pince.png";
import './LoginPage.scss';
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore.ts";
import  { PasswordInput } from "../../components/common/PasswordInput.tsx";

export default function LoginPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  
  useEffect(() => {
    if (token && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, user]);

  const initialFormState = {
    email: "",
    password: ""
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(formData.email, formData.password);
    setFormData(initialFormState);
    inputRef.current?.focus()
  };

  return (
    <main className="login-page">
      <img src={logo} alt="Logo La Pince" className="login-logo" />
      <div className="login-box">
        <h1 className="title login-title">Connexion</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label htmlFor="email" className="label">Adresse mail</label>
            <div className="control">
              <input
                name="email"
                type="email"
                id="email"
                className="input"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="username"
                ref={inputRef}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="password" className="label">Mot de passe</label>
            <div className="control">
              <PasswordInput
                name="password"
                id="password"
                className="input"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="button is-primary is-fullwidth login-btn"
          >
            Se connecter
          </button>
        </form>

        <div className="register-link">
          <span>Pas encore de compte ?</span>
          <Link to="/signup">S'inscrire</Link>
        </div>
      </div>
      <footer className="has-text-centered mt-5">
        <Link to="/legal-notice">Mentions légales</Link> |{" "}
        <Link to="/privacy-policy">Politique de confidentialité</Link>
      </footer>
    </main>
  );
}