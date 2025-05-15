import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store/userStore.ts";
import { Button } from "../../components/common/Button.tsx";
import { useNavigate } from "react-router-dom";
import { showWarningToast } from "../../utils/toastUtils.tsx";
import { PasswordInput } from "../../components/common/PasswordInput.tsx";

export function PasswordForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  const updateUser = useUserStore(state => state.updateUser);

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
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmNewPassword") setconfirmNewPassword(value);
    }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (newPassword !== confirmNewPassword) {
      showWarningToast("Le nouveau mot de passe et la confirmation ne correspondent pas.");
      inputRef.current?.focus()
      setNewPassword("")
      setconfirmNewPassword("")
      return;
    }

    const success = await updateUser({ password: newPassword })
    if(success) {
      setLocalSuccess(true);
    } else {
      inputRef.current?.focus()
      setNewPassword("")
      setconfirmNewPassword("")
    }
  }

  return (
    <div className="container">
      <h2 className="title">Changement du mot de passe</h2>
      <div className="box box-custom-form">
        <form onSubmit={handleSubmit} method='POST'>

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
                ref={inputRef}
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
              />
            </div>
          </div>
          <Button type="submit" label={"Confirmer"} />
        </form>
      </div>
    </div>
  )
}