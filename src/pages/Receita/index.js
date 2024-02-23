import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import './receita-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify'

function Receita(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [Receita, setReceita] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadReceita(){
      await api
      .then((response)=>{
        setReceita(response.data);
        setLoading(false);
      })
      .catch(()=>{
        console.log("Receita NAO ENCONTRADa");
        navigate("/", { replace: true });
        return;
      })
    }

    loadReceita();


    return () => {
      console.log("COMPONENTE FOI DESMONTADO")
    }
  }, [navigate, id])


  function salvarReceita(){
    const minhaLista = localStorage

    let ReceitasSalvos = JSON.parse(minhaLista) || [];

    const hasReceita = ReceitasSalvos.some( (ReceitasSalvo) => ReceitasSalvo.id === Receita.id)

    if(hasReceita){
      toast.warn("Essa Receita já está na sua lista!")
      return;
    }

    ReceitasSalvos.push(Receita);
    localStorage.setItem("@primeflix", JSON.stringify(ReceitasSalvos));
    toast.success("Receita salva com sucesso!")

  }

  if(loading){
    return(
      <div className="Receita-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }
  
  return(
    <div className="Receita-info">
      <h1>{Receita.title}</h1>
      <img src={`http://data.whicdn.com/images/25686711/large.jpg`} alt={Receita.title} />

      <h3>Sinopse</h3>
      <span>{Receita.overview}</span>
      <strong>Avalição: {Receita.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarReceita}>xxx</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${Receita.title} Trailer`}>
            xxx
          </a>
        </button>
      </div>

    </div>
  )
}

export default Receita;