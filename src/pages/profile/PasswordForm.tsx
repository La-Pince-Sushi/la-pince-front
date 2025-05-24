import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store/userStore.ts";
import { Button } from "../../components/common/Button.tsx";
import { useNavigate } from "react-router-dom";
import { showWarningToast } from "../../utils/toastUtils.tsx";
import { PasswordInput } from "../../components/common/PasswordInput.tsx";
import { IUpdatePasswordPayload } from "../../types/index";

export function PasswordForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  const updateUser = useUserStore(state => state.updateUser);
  const user = useUserStore(state => state.user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");
  const [localSuccess, setLocalSuccess] = useState(false);

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (localSuccess) {
      navigate("/profile");
      setLocalSuccess(false);
    }
  }, [localSuccess])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "oldPassword") setOldPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmNewPassword") setconfirmNewPassword(value);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!oldPassword) {
      showWarningToast("Veuillez entrer votre ancien mot de passe.");
      inputRef.current?.focus()
      return;
    }

    if (newPassword !== confirmNewPassword) {
      showWarningToast("Le nouveau mot de passe et la confirmation ne correspondent pas.");
      inputRef.current?.focus()
      setOldPassword("");
      setNewPassword("")
      setconfirmNewPassword("")
      return;
    }

    const success = await updateUser({ oldPassword, password: newPassword } as IUpdatePasswordPayload);
    if (success) {
      setLocalSuccess(true);
    } else {
      inputRef.current?.focus();
      setOldPassword("");
      setNewPassword("");
      setconfirmNewPassword("");
    }
  };

  return (
    <div className="container ivory-panel table-panel">
      <h2 className="table-title is-size-4">Changement du mot de passe</h2>
      <form onSubmit={handleSubmit} method="POST">
        {/* Champ username caché pour l'accessibilité */}
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          value={user?.email || ""}
          style={{ display: 'none' }}
          readOnly
          aria-hidden="true"
        />

        <div className="field">
          <label className="label" htmlFor="oldPassword">Ancien mot de passe</label>
          <div className="control">
            <PasswordInput
              className="input"
              type="password"
              name="oldPassword"
              id="oldPassword"
              value={oldPassword}
              onChange={handleChange}
              required
              ref={inputRef}
              autoComplete="current-password"
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="newPassword">Nouveau mot de passe</label>
          <div className="control">
            <PasswordInput
              className="input"
              type="password"
              name="newPassword"
              id="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="confirmNewPassword">Confirmation du mot de passe</label>
          <div className="control">
            <PasswordInput
              className="input"
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="field is-grouped">
          <Button type="submit" label={"Confirmer"} />
          <Button type="button" label="Retour" onClick={() => navigate(-1)} />
        </div>
      </form>
    </div>
  );
}