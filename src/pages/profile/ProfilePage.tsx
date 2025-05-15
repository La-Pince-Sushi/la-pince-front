import { Button } from "../../components/common/Button";
import { useUserStore } from "../../store/userStore";
import { clearAccessToken, clearRefreshToken } from "../../utils/jwtUtils.ts";
import { useLocation } from "react-router-dom";
import LegalNotice from "../legal/LegalNotice";
import PrivacyPolicy from "../legal/PrivacyPolicy";

export function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const deleteUser = useUserStore((state) => state.deleteUser);
  const location = useLocation(); // Permet de détecter la route actuelle

  const handleDeleteUser = async () => {
    await deleteUser();
    clearRefreshToken();
    clearAccessToken();
  };

  // Affichage conditionnel des mentions légales ou de la politique de confidentialité
  if (location.pathname === "/profile/mentions-legales") {
    return <LegalNotice />;
  }

  if (location.pathname === "/profile/politique-de-confidentialite") {
    return <PrivacyPolicy />;
  }

  return (
    <div className="container">
      <h2 className="title">Profil utilisateur</h2>
      <div className="box box-custom-form is-flex is-flex-direction-column is-justify-content-space-between" style={{ height: "100%" }}>
        <form>
          <div className="field">
            <label className="label" htmlFor="email">Adresse mail</label>
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
              <Button to={"/profile/password"} label="Modifier le mot de passe" />
            </div>
            <div className="column">
              <Button label="Supprimer le compte" onClick={handleDeleteUser} />
            </div>
          </div>
        </form>

        {/* Section pour les mentions légales et la politique de confidentialité */}
        <div className="buttons is-centered">
          <Button to={"/profile/legal-notice"} label="Mentions légales" />
          <Button to={"/profile/privacy-policy"} label="Politique de confidentialité" />
        </div>
      </div>
    </div>
  );
}