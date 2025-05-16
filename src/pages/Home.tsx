import { Link, useLocation } from "react-router-dom";
import mascot from "../assets/logo-pince-crabe-final.png";
import LegalNotice from "./legal/LegalNotice";
import PrivacyPolicy from "./legal/PrivacyPolicy";

export function Home() {
  const location = useLocation();

  return (
    <section className="hero p-0 bg-ivoire">
      <div className="is-flex-direction-column">
        <div className="hero-body">
          <div className="columns is-vcentered is-gapless">
            <div className="column is-half">
              <h1 className="title mb-3 has-text-centered">Bienvenue sur La Pince</h1>
              <div className="subtitle mb-4">
              <p>Suivez vos <strong>revenus</strong> et <strong>dépenses</strong> en un clin d’œil. 
              Fixez vos objectifs d’épargne et contrôlez vos <strong>finances</strong> facilement. 
              Adaptée à tous : étudiants, familles, indépendants.
              La <strong>Sécurité</strong> et <strong>confidentialité</strong> sont garanties.
              </p>
              </div>
              {location.pathname === "/mentions-legales" ? (
                <LegalNotice />
              ) : location.pathname === "/politique-de-confidentialite" ? (
                <PrivacyPolicy />
              ) : (
                <>
                  <div className="hero-foot buttons is-centered mb-1">
                    <Link to="/signin" className="button is-medium">
                      Se connecter
                    </Link>
                    <Link to="/signup" className="button is-medium">
                      S'inscrire
                    </Link>
                  </div>
                </>
              )}
            </div>
            <div className="column is-half has-text-centered">
              {location.pathname === "/mentions-legales" ||
              location.pathname === "/politique-de-confidentialite" ? null : (
                <img
                  src={mascot}
                  alt="La mascotte"
                  style={{ maxHeight: "400px" }}
                />
              )}
            </div>
          </div>
        </div>
        <footer className="has-text-centered mt-5">
          <Link to="/legal-notice">Mentions légales</Link> |{" "}
          <Link to="/privacy-policy">
            Politique de confidentialité
          </Link>
        </footer>
      </div>
    </section>
  );
}
