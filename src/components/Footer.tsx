import { Link } from "react-router-dom";

export default function Footer() {
  return(
    <footer className="has-text-centered pt-4 pb-2 bg-ivoire">
      <Link to="/legal-notice" className="mr-2" >Mentions légales</Link>
      <span className="mr-2">|</span>
      <Link to="/privacy-policy">Politique de confidentialité</Link>
    </footer>
  )
}