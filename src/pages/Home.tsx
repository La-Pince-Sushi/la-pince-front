import { Link, useLocation } from "react-router-dom";
import mascot from "../assets/logo-pince-crabe-final.png";
import LegalNotice from "./legal/LegalNotice";
import PrivacyPolicy from "./legal/PrivacyPolicy";

export function Home() {
  const location = useLocation();

  return (
    <section className="hero bg-ivoire">
      <div className="is-flex-direction-column">
        <div className="hero-body">
          <div className="columns is-vcentered is-gapless">
            <div className="column is-half">
              <h1 className="title is-size-2 mb-4 has-text-centered">Bienvenue sur La Pince</h1>
              <div className="subtitle mb-5 " style={{ lineHeight: "2" }}>
              <p>Bienvenue sur La Pince, l’application simple pour gérer votre budget.</p>
              <p>Suivez vos revenus et dépenses en un clin d’œil.</p>
              <p>Fixez vos objectifs d’épargne et contrôlez vos finances facilement.</p>
              <p>Adaptée à tous : étudiants, familles, indépendants.</p>
              <p>Sécurité et confidentialité garanties.</p>
              </div>
              {location.pathname === "/mentions-legales" ? (
                <LegalNotice />
              ) : location.pathname === "/politique-de-confidentialite" ? (
                <PrivacyPolicy />
              ) : (
                <>
                  <div className="hero-foot buttons is-centered">
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
