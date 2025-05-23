import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './custom-button.scss';


interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  to?: string;
}

export function Button({ label, to, onClick, ...rest }: IButtonProps) {
  if (to) {
    return (
      <Link to={to} className="button">
        {label}
      </Link>
    );
  }
  return (
    <button className="button" onClick={onClick} {...rest}>
      {label}
    </button>
  );
}

export function SmallButton({ label, to, onClick, ...rest }: IButtonProps) {
  if (to) {
    return (
      <Link to={to} className="button is-small">
        {label}
      </Link>
    );
  }
  return (
    <button className="button is-small" onClick={onClick} {...rest}>
      {label}
    </button>
  );
}

export function UpdateButton({ label, to, onClick, ...rest }: IButtonProps) {
  if (to) {
    return (
      <Link to={to} className="button is-small is-update">
        <EditIcon className="icon" />
        {label}
      </Link>
    );
  }
  return (
    <button className="button is-small is-update" onClick={onClick} {...rest}>
      <EditIcon className="icon" />
      {label}
    </button>
  );
}

export function DeleteButton({ label, to, onClick, ...rest }: IButtonProps) {
  if (to) {
    return (
      <Link to={to} className="button is-small is-delete">
        <DeleteIcon className="icon " />
        {label}
      </Link>
    );
  }
  return (
    <button className="button is-small is-delete" onClick={onClick} {...rest}>
      <DeleteIcon className="icon " />
      {label}
    </button>
  );
}

export function AddBudgetButton({ label, to, onClick, ...rest }: IButtonProps) {
  if (to) {
    return (
    <Link to={to} className="button is-budget">
        {label}
      </Link>
    );
  }
  return (
    <button className="button " onClick={onClick} {...rest}>
      {label}
    </button>
  );
}

export function AddExpenseButton({ label, to, onClick, ...rest }: IButtonProps) {
  if (to) {
    return (
      <Link to={to} className="button is-expense">
        {label}
      </Link>
    );
  }
  return (
    <button className="button " onClick={onClick} {...rest}>
      {label}
    </button>
  );
}

export function HomeButton({ label, to, onClick, ...rest }: IButtonProps) {
  if (to) {
    return (
      <Link to={to} className="button is-medium is-link is-home">
        {label}
      </Link>
    );
  }
  return (
    <button className="button is-medium" onClick={onClick} {...rest}>
      {label}
    </button>
  );
}

