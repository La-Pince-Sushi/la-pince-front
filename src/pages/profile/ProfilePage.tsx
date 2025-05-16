import { Button } from "../../components/common/Button";
import { useUserStore } from "../../store/userStore";
import { useLocation } from "react-router-dom";
import LegalNotice from "../legal/LegalNotice";
import PrivacyPolicy from "../legal/PrivacyPolicy";
import { useState } from "react";
import { clearAccessToken, clearRefreshToken } from "../../utils/jwtUtils.ts";
import { useBudgetStore } from "../../store/budgetStore.ts";
import { useExpenseStore } from "../../store/expensesStore.ts";

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
    <div className="container">
      <h2 className="title">Profil utilisateur</h2>
      <div
        className="box box-custom-form is-flex is-flex-direction-column is-justify-content-space-between"
        style={{ height: "100%" }}
      >
        <form>
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

          <div className="columns">
            <div className="column">
              <Button to={"/profile/email"} label="Modifier l'email" />
            </div>
            <div className="column">
              <Button
                to={"/profile/password"}
                label="Modifier le mot de passe"
              />
            </div>
            <div className="column">
              <Button
                type="button"
                label="Supprimer le compte"
                onClick={handleOpenModal}
              />
            </div>
          </div>
        </form>

        {/* Section pour les mentions légales et la politique de confidentialité */}
        <div className="buttons is-centered">
          <Button to={"/profile/legal-notice"} label="Mentions légales" />
          <Button
            to={"/profile/privacy-policy"}
            label="Politique de confidentialité"
          />
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
            <footer className="modal-card-foot">
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
