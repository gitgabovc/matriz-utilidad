import { useEffect, useRef  } from "react"
import { useForm } from "../hooks/useForm"
import { Tabla } from "./Tabla"

export const LayoutForm = ({setAlternativas, setEventos, setProbabilidades, eventos, alternativas, probabilidades, initialValue, generar, onSubmitForm}) => {
    const inputRef = useRef(null);

    const {pv, cvu, cf,s,ev,p, onInputChange, onResetForTable} = useForm({
        ...initialValue,
        s:"",
        ev:"",
        p:""
    })

    const addTableRow = (e) => {
        e.preventDefault()
        if ([s,ev,p].includes("")) {
            console.log("No pueden ir vacios");
            return;
        }
        setAlternativas(val=>[...val, s]);
        setEventos(val=>[...val,ev]);
        setProbabilidades(val=>[...val,p]);
        onResetForTable();
        inputRef.current.focus();
    }
    useEffect(() => {
      if (generar) {
        onSubmitForm({pv, cvu, cf})
      }
    
    }, [generar])
    


  return (
    <>

        <div className="row mt-2">
            <h5>Datos Monetarios</h5>
        </div>
        <div className="row">
            <div className="col-6">
                <label  form="exampleFormControlInput1" className="form-label">Precio de Venta</label>
                <input 
                    value={pv}
                    onChange={onInputChange}
                    name="pv"
                    type="text" className="form-control" id="exampleFormControlInput1" placeholder="Ingresa el precio"/>
                
            </div>
            <div className="col-6">
                <label  form="exampleFormControlInput1" className="form-label">Cvu</label>
                <input 
                    value={cvu}
                    onChange={onInputChange}
                    name="cvu"
                type="text" className="form-control" id="exampleFormControlInput1" placeholder="Igresa Cvu"/>
                
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-6">
                <label  form="exampleFormControlInput1" className="form-label">Costo Fijo</label>
                <input 
                    value={cf}
                    onChange={onInputChange}
                    name="cf"
                type="text" className="form-control" id="exampleFormControlInput1" placeholder="Ingresa el cf"/>
                
            </div>
            
        </div>
        <div className="row mt-4">
            <h5>Alternativas, Eventos y Probabilidades</h5>
        </div>
        <div className="row">
            <div className="col-4">
                <label  form="exampleFormControlInput1" className="form-label">Alternativa</label>
                <input 
                    ref={inputRef}
                    value={s}
                    onChange={onInputChange}
                    name="s"
                type="text" className="form-control" id="exampleFormControlInput1" placeholder="Alternativa"/>
                
            </div>
            <div className="col-3">
                <label  form="exampleFormControlInput1" className="form-label">Evento</label>
                <input 
                    value={ev}
                    onChange={onInputChange}
                    name="ev"
                type="text" className="form-control" id="exampleFormControlInput1" placeholder="Evento"/>
                
            </div>
            <div className="col-3">
                <label  form="exampleFormControlInput1" className="form-label">Probabilidad</label>
                <input 
                    value={p}
                    onChange={onInputChange}
                    name="p"
                type="text" className="form-control" id="exampleFormControlInput1" placeholder="Probabilidad"/>
            </div>
            <div className="col-2 d-flex justify-content-start align-items-end">
                <a 
                    onClick={addTableRow}
                    href="" className="btn btn-primary"
                >
                    +
                </a>
            </div>
            

        </div>

        <div className="row mt-3">
            <div className="col-4">
                <Tabla
                    title="Alternativas"
                    data={alternativas}
                    />
            </div>
            <div className="col-3">
                <Tabla
                    title="Eventos"
                    data={eventos}
                    />
            </div>
            <div className="col-3">
                <Tabla
                    title="Probabilidad"
                    data={probabilidades}
                />
            </div>
        </div>

    </>
  )
}
