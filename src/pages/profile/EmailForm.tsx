import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "../../components/common/Button"
import { useUserStore } from "../../store/userStore.ts";
import { useNavigate } from "react-router-dom";
import { showWarningToast } from "../../utils/toastUtils.tsx";

export function EmailForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);
  const updateUser = useUserStore(state => state.updateUser);

  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
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

  useEffect(() => {
    setCurrentEmail(user?.email || "");
  }, [user?.email]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "confirmEmail") setConfirmEmail(value);
    if (name === "newEmail") setNewEmail(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (newEmail !== confirmEmail) {
      showWarningToast("La nouvelle adresse mail et la confirmation ne correspondent pas.");
      setNewEmail("")
      setConfirmEmail("")
      inputRef.current?.focus()
      return;
    }

    if (currentEmail === newEmail) {
      showWarningToast("L'ancienne adresse mail et la nouvelle adresse email sont identiques.");
      setNewEmail("")
      setConfirmEmail("")
      inputRef.current?.focus()
      return;
    }

    const success = await updateUser({ email: newEmail });

    if (success) {
      setLocalSuccess(true);
    } else {
      setNewEmail("");
      setConfirmEmail("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="container ivory-panel table-panel">
      <h2 className="table-title is-size-4">Modification de l'adresse mail</h2>
      <form onSubmit={handleSubmit} method='POST'>

        <div className="field">
          <label className="label" htmlFor="currentEmail">Ancienne adresse mail</label>
          <div className="control">
            <input
              className="input"
              name="currentEmail"
              id="currentEmail"
              placeholder={currentEmail}
              value={currentEmail}
              readOnly
              aria-readonly="true"
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="newEmail">Nouvelle adresse mail</label>
          <div className="control">
            <input
              className="input"
              type="newEmail"
              name="newEmail"
              id="newEmail"
              value={newEmail}
              onChange={handleChange}
              required
              ref={inputRef}
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="confirmEmail">Confirmation de l'adresse mail</label>
          <div className="control">
            <input
              className="input"
              type="email"
              name="confirmEmail"
              id="confirmEmail"
              value={confirmEmail}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="field is-grouped">
          <Button type="submit" label={"Confirmer"} />
          <Button type="button" label="Retour" onClick={() => navigate(-1)} />
        </div>
      </form>
    </div>
  )
}