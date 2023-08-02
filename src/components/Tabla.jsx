import { FilaTabla } from "./FilaTabla"

export const Tabla = ({title, data=[]}) => {
  return (
    <>

                    <table className="table table-bordered">
                        
                        <tbody>
                            {
                                data.map((d,i) =>(
                                    <FilaTabla
                                        key={i}
                                        d={d}
                                    />
                                ))
                            }
                    
                        </tbody>
                    </table>        

    </>
  )
}
