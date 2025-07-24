import mascot from "../assets/logo-pince-crabe-final.png";
import { HomeButton } from "../components/common/Button.tsx";

export function Home() {
  return (
    <section className="bg-ivoire">
      <div className="container is-flex-direction-column">
        <div className="columns is-vcentered is-gapless">
          <div className="column is-half">
            <h1 className="title pb-2 has-text-centered mb-5">Bienvenue sur La Pince</h1>
            <div className="subtitle m-0 pb-2">
              <p className="px-5 is-size-5 mb-4"><strong>La Pince</strong> est une application pensée pour vous <strong>accompagner</strong> pas à pas vers une gestion <strong>simple</strong>, sereine et accessible de vos <strong>budgets</strong>. Suivez vos <strong>dépenses</strong>, fixez vos <strong>objectifs</strong>, recevez des <strong>alertes</strong> quand un budget est presque atteint, et <strong>visualisez</strong> en un clin d'œil où va votre argent — sur tous vos appareils, en toute <strong>sécurité</strong>.
              </p>
            </div>            
              <div className="hero-foot buttons is-centered mt-4">
                <HomeButton to="/signin" label="Se connecter"/>
                <HomeButton to="/signup" label="S'inscrire"/>
              </div>             
          </div>
          <div className="column is-half has-text-centered">            
            <img
              src={mascot}
              alt="La mascotte"
              className="img-max-height-400"
            />            
          </div>
        </div>
      </div>
    </section>
  );
}
