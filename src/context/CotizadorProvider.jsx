import { useState, createContext } from "react"
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from "../helpers"
import Swal from "sweetalert2"

const CotizadorContext = createContext()

const CotizadorProvider = ({ children }) => {

  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: ""
  })
  const [resultado, setResultado] = useState(0)
  const [cargando, setCargando] = useState(false)

  const handleChangeDatos = e => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  const newAlertError = (title, text) => {
    Swal.fire({
      title,
      text,
      icon: "error"
    })
  }

  const cotizarSeguro = () => {
    // Una Base
    let resultado = 1250000

    // Obtener diferencia de años
    const diferencia = obtenerDiferenciaYear(datos.year)

    // Hay que restar el 3% por cada año
    resultado -= ((diferencia * 3) * resultado) / 100

    // Americano 15%
    // Europeo 30%
    // Asiatico 5%
    resultado *= calcularMarca(datos.marca)

    // Basico 20%
    // Completo 50%
    resultado *= calcularPlan(datos.plan)

    // Formatear el resultado
    resultado = formatearDinero(resultado)

    setCargando(true)

    setTimeout(() => {
      setResultado(resultado)
      setCargando(false)
    }, 1500);

    
  }

  return(
    <CotizadorContext.Provider
      value={{
        datos,
        handleChangeDatos,
        newAlertError,
        cotizarSeguro,
        resultado,
        cargando
      }}
    >
      {children}
    </CotizadorContext.Provider>
  )
}

export { 
  CotizadorProvider 
}
export default CotizadorContext