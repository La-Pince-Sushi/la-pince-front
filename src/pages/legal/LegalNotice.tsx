import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button.tsx";

const LegalNotice: React.FC = () => {

  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  return (
    <div className={`legal-page container ${isMobile ? "" : "has-margin-top"}`}>
      <h1 className="title is-4 mb-1"><strong>Mentions Légales</strong></h1>

      <p className="mt-0 mb-1">
        Éditeur du site: O'clock Publications
        <br />
        Nom de l'entreprise : La Pince
        <br />
        Forme juridique : Société par actions simplifiée
        <br />
        Adresse : 1, rue de la Paix 75001 Paris
        <br />
        E-mail : lapince@lapince.fr
        <br />
        Directeur de la publication : Ronald Pognon
        <br />
        Numéro d'immatriculation au registre du commerce et des sociétés (RCS) :
        RCS PARIS B 123 456 789
      </p>

      <h2 className="subtitle is-5 mt-0 mb-1"><strong>Hébergement</strong></h2>
      <p className="mt-0 mb-1">
        Nom de l'hébergeur : Héberg'o'clock
        <br />
        E-mail : hebergoclock@oclock.io
      </p>

      <h2 className="subtitle is-5 mt-0 mb-1"><strong>Propriété intellectuelle</strong></h2>
      <p className="mt-0 mb-1">
        Le site et chacun des éléments qui le composent (tels que textes,
        images, photographies, vidéos, etc.) sont la propriété exclusive de La
        Pince ou sont utilisés avec l'autorisation de leurs propriétaires
        respectifs. Toute reproduction, représentation ou utilisation, intégrale
        ou partielle, des éléments du site est strictement interdite sans
        autorisation préalable écrite de La Pince.
      </p>

      <h2 className="subtitle is-5 mt-0 mb-1"><strong>Cookies</strong></h2>
      <p className="mt-0 mb-1">
        Ce site n'utilise pas de cookies.
      </p>

      <h2 className="subtitle is-5 mt-0 mb-1"><strong>Limitation de responsabilité</strong></h2>
      <p className="mt-0 mb-1">
        La Pince ne peut être tenue responsable des dommages directs ou indirects
        causés au matériel de l'utilisateur lors de l'accès au site.
      </p>
      <Button className="back-link" onClick={() => navigate(-1)} label="Retour"/>
    </div>
  );
};

export default LegalNotice;
