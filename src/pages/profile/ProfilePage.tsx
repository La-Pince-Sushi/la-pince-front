import { Button } from "../../components/common/Button";
import { useUserStore } from "../../store/userStore";
import { useLocation } from "react-router-dom";
import LegalNotice from "../legal/LegalNotice";
import PrivacyPolicy from "../legal/PrivacyPolicy";
import { useState } from "react";
import { clearAccessToken, clearRefreshToken } from "../../utils/jwtUtils.ts";
import { useBudgetStore } from "../../store/budgetStore.ts";
import { useExpenseStore } from "../../store/expensesStore.ts";
import "../../styles/_forms.scss";

export function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const deleteUser = useUserStore((state) => state.deleteUser);
  const location = useLocation(); // Permet de détecter la route actuelle

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCancelDeleteUser = () => setShowModal(false);

  const handleConfirmDeleteUser = async () => {
    await deleteUser();
    clearAccessToken();
    clearRefreshToken();
    useUserStore.getState().clearUserState();
    useBudgetStore.getState().clearBudgetState();
    useExpenseStore.getState().clearExpenseState();
    setShowModal(false);
  };

  // Affichage conditionnel des mentions légales ou de la politique de confidentialité
  if (location.pathname === "/profile/legal-notice") {
    return <LegalNotice />;
  }

  if (location.pathname === "/profile/privacy-policy") {
    return <PrivacyPolicy />;
  }

  return (
    <div className="container profile-page">
      <h2 className="title">Profil utilisateur</h2>
      <div
        className="box box-custom-form is-flex is-flex-direction-column is-justify-content-space-between uniform-spacing"
        style={{ height: "100%" }}
      >
        <form className="mb-0">
          <div className="field">
            <label className="label" htmlFor="email">
              Adresse mail
            </label>
            <div className="control">
              <input
                className="input"
                value={user?.email || ""}
                id="email"
                readOnly
              />
            </div>
          </div>

          <div id="box-button-profile-form">
            <div className="p-2 button-profile">
              <Button to={"/profile/email"} label="Modifier l'email" />
            </div>
            <div className="p-2 button-profile">
              <Button
                to={"/profile/password"}
                label="Modifier le mot de passe"
                className="is-fullwidth"
              />
            </div>
            <div className="p-2 button-profile">
              <Button
                type="button"
                label="Supprimer le compte"
                onClick={handleOpenModal}
                className="button"
              />
            </div>
          </div>
        </form>

        {/* Section pour les mentions légales et la politique de confidentialité */}
        <div id="is-no-gap" className="buttons is-flex is-justify-content-center is-align-items-center">
          <div className="button-profile p-2">
            <Button
              to={"/profile/legal-notice"}
              label="Mentions légales"
              className="is-fullwidth"
            />
          </div>
          <div className="button-profile p-2">
            <Button
              to={"/profile/privacy-policy"}
              label="Politique de confidentialité"
              className="is-fullwidth ml-4" // Ajoutez un espacement entre les boutons
            />
          </div>
        </div>
      </div>
      {/* Modale de confirmation */}
      {showModal && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={handleCancelDeleteUser}
          ></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Confirmation de suppression</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleCancelDeleteUser}
              ></button>
            </header>
            <section className="modal-card-body">
              <p>
                Êtes-vous sûr de vouloir supprimer votre compte ? Cette action
                est irréversible et toutes vos données seront supprimées.
              </p>
            </section>
            <footer className="modal-card-foot is-justify-content-space-between">
              <button
                className="button is-danger"
                onClick={handleConfirmDeleteUser}
              >
                Oui, supprimer
              </button>
              <button className="button ml-4" onClick={handleCancelDeleteUser}>
                Annuler
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
