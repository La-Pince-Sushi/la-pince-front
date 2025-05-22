import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../../store/authStore.ts';
import { useNavigate, Link } from 'react-router-dom';
// import logo from '../../assets/logo-la-pince.png';
import './LoginPage.scss';
import { showErrorToast } from '../../utils/toastUtils.tsx';
import { PasswordInput } from '../../components/common/PasswordInput.tsx';

export default function RegisterPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const register = useAuthStore(state => state.register);

  const initialFormState = {
    email: "",
    password: "",
    confirmPassword: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false); // État pour la case à cocher

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Vérifier si la case à cocher est cochée
    if (!acceptedPrivacyPolicy) {
      showErrorToast({message: 'Vous devez accepter la politique de confidentialité.'});
      checkboxRef.current?.focus();
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showErrorToast({message: 'Les mots de passe ne correspondent pas'});
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: ""}));
      passwordRef.current?.focus();
      return;
    }

    const success = await register(formData.email, formData.password);

    if (success) {
      setFormData(initialFormState);
      navigate("/signin");
    } else {
      setFormData(initialFormState);
      inputRef.current?.focus();
    }
  };

  return (
    <main className="login-page">
      {/* <img src={logo} alt="Logo" className="login-logo" /> */}
      <div className="login-box">
        <h1 className="title login-title">Créer un compte</h1>

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
                autoComplete="new-password"
                ref={passwordRef}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="confirmPassword" className="label">Confirmer le mot de passe</label>
            <div className="control">
              <PasswordInput
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                className="input"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Case à cocher pour accepter la politique de confidentialité */}
          <div className="field">
            <label className="checkbox policy-font-size">
              <input
                type="checkbox"
                checked={acceptedPrivacyPolicy}
                onChange={(e) => setAcceptedPrivacyPolicy(e.target.checked)}
                ref={checkboxRef}
              />
              {" "}J'accepte la{" "}
              <Link to="/privacy-policy">
                politique de confidentialité
              </Link> 
              {" "}et le {" "}
              <Link to="/privacy-policy">
                traitement des données personnelles
                </Link>
            </label>
          </div>

          <div className="field">
            <button type="submit" className="button is-primary is-fullwidth login-btn">
              Créer le compte
            </button>
          </div>
        </form>

        <div className="register-link">
          <span>Déjà un compte ?</span>
          <Link to="/signin">Se connecter</Link>
        </div>
      </div>
     
    </main>
  );
}