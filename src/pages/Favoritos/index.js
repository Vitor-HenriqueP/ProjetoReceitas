import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

function Favoritos(){
  const [receitas, setreceitas] = useState([])

  useEffect(()=>{

    const minhaLista = localStorage.getItem("@primeflix");
    setreceitas(JSON.parse(minhaLista) || [])

  }, [])


  function excluirreceita(id){
    let filtroreceitas = receitas.filter( (item) => {
      return (item.id !== id)
    })

    setreceitas(filtroreceitas);
    localStorage.setItem("@primeflix", JSON.stringify(filtroreceitas) )
    toast.success("receita removido com sucesso")
  }

  return(
    <div className="minhas-receitas">
      <h1>Minhas receitas</h1>

      {receitas.length === 0 && <span>Você é frango :( </span>}

      <ul>
        {receitas.map((item) => {
          return(
            <li key={item.id}>
              <span>{item.title}</span>

              <div>
                <Link to={`/receita/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirreceita(item.id) }>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favoritos;