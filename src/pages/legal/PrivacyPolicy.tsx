import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="legal-page container">
      <h1 className="title is-4 mb-1"><strong>Politique de confidentialité</strong></h1>

      <h2 className="subtitle is-5 mt-0 mb-1"><strong>Introduction</strong></h2>

      <p className="mt-0 mb-1">
        Bienvenue sur La Pince ! Nous attachons une grande importance à la
        protection de vos données personnelles et à votre vie privée. Cette
        politique de confidentialité vous explique quelles informations nous
        collectons, comment nous les utilisons et comment nous les protégeons.
      </p>

      <h2 className="subtitle is-5 mt-0 mb-1"><strong>Collecte et traitement des données personnelles</strong></h2>
      <p className="mt-0 mb-1">
        Les informations collectées via ce site sont destinées à La Pince. Vous
        disposez d'un droit d'accès, de rectification et de suppression des
        données vous concernant. Pour exercer ce droit, veuillez nous contacter
        à l'adresse suivante : rgpd@lapince.fr.
      </p>
      <p className="mt-0 mb-1">
        Nous collectons les données suivantes :<br />
        - Adresse e-mail et mot de passe pour l'authentification.
        <br />
        - Informations sur les budgets et dépenses (description, montant, date).
        <br />
        Ces données sont nécessaires pour le fonctionnement de l'application et
        sont stockées de manière sécurisée.
      </p>

      <h2 className="subtitle is-5 mt-0 mb-1"><strong>Utilisation des Informations</strong></h2>
      <p className="mt-0 mb-1">
        Les informations que nous collectons auprès de vous peuvent être
        utilisées pour personnaliser votre expérience et répondre à vos besoins
          individuels.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
