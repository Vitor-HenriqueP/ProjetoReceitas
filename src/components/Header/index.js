import './header.css';
import { Link } from 'react-router-dom'
import saude from "./saude.png"

function Header(){
  return(
    <header>
      <Link className="logo" to="/">Receitas</Link>
      <Link className="logo" to="/"><img src={saude}/></Link>
      
      <Link className="favoritos" to="/favoritos">Minhas Receitas</Link>

    </header>
  )
}

export default Header;