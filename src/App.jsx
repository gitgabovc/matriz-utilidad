import { useEffect, useState } from "react"
import { LayoutForm } from "./components/LayoutForm"
import { Modal } from "./components/Modal"
import { calcularTabla, calcularVME, encontrarPosicionDelMaximo } from "./helpers";

function App() {


  const [eventos, setEventos] = useState([]);
  const [alternativas, setAlternativas] = useState([]);
  const [probailidades, setProbabilidades] = useState([]);
  const [generar, setGenerar] = useState(false);
  const [generarr, setGenerarr] = useState(false);
  const [tabla, setTabla] = useState([])
  const [initialValue, setInitialValue] = useState({
        pv:"",
        cvu:"",
        cf:""
  })
  const [VME, setVME] = useState([]);
  const [posicionMaximoValor, setPosicionMaximoValor] = useState(0);
  //console.log(tabla[0][0]);

  const onSubmitForm = ({pv, cvu, cf})=>{
    console.log({pv, cvu, cf});
    const x= calcularTabla(Number(pv), Number(cvu), Number(cf), eventos, alternativas, probailidades)
    setTabla(x);
    setVME(calcularVME(x, probailidades));
    setPosicionMaximoValor(encontrarPosicionDelMaximo(calcularVME(x, probailidades)));
  }

  useEffect(() => {
    
    if (generar) {
      setGenerarr(true)
    }
    
  }, [generar])
  




  return (
    <>
      <div className="container mt-5">

        <div className="row">
          <div className="col-12 col-sm-8">
            <h1 className="">Matriz de Pagos</h1>
          </div>
          <div className="col-12 col-sm-4">
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-formulario-datos">Agregar Datos</button>
          </div>
        </div>


        <div className="row mt-5 table-responsive p-4">
        <table className="table table-bordered">
          <thead className="table-success">
            <tr>
              <th scope="col">#</th>
              {
                eventos.map((value, i)=>(
                  <th key={i} className="">{value}</th>
                ))
              }
              <th>VME</th>
            </tr>
          </thead>
          <tbody>
            {
              generarr
              ?
              (
                
                  alternativas.map((value, i) => {
                    return (
                    <tr key={i} className={ i==posicionMaximoValor ? "bg-primary text-white":" " }>
                      <th className={i==posicionMaximoValor ? "bg-primary text-white":"table-success"} >{value}</th>
                      {eventos.map((value2, j) => (
                        <td key={j}>{tabla[i][j]}</td>
                      ))}
                      <th>{(VME[i]).toFixed(2)}</th>
                    </tr>
                  )})
                
              )
              :
              <></>
            }
            
          </tbody>
        </table>
        </div>

      </div>
      {
        generarr
        ?
        (
          <div className="container">
            <p>Para la siguiente gestion se debe producir o comprar {alternativas[posicionMaximoValor]} uds para obtener un valor monetario esperado de {VME[posicionMaximoValor]} Bs.-</p>
          </div>
        )
        :
        ""
      }
      <Modal
        title="Formulario de Datos"
        id="formulario-datos"
        setGenerar={setGenerar}
      >
        {
          <LayoutForm
            setEventos={setEventos}
            eventos={eventos}
            alternativas={alternativas}
            probabilidades={probailidades}
            setAlternativas={setAlternativas}
            setProbabilidades={setProbabilidades}
            initialValue={initialValue}
            generar={generar}
            onSubmitForm={onSubmitForm}
          />
        }
      </Modal>
    </>
  )
}

export default App
