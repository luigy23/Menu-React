import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { obtenerTotalVentas, obtenerVentasMeseros } from "../../../Services/ApiReportes";
import { formatPrecio } from "../../../Services/formatPrecio";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const Reportes = () => {
  const [fecha, setFecha] = useState({
    startDate: null,
    endDate: null,
  });

  const [ventas, setVentas] = useState({
    CantidadPedidos: 0,
    TotalFacturado: 0,
  });
  const [ventasMeseros, setVentasMeseros] = useState([]);

  const traerVentas = async (fecha) => {
    const ventas = await obtenerTotalVentas(fecha);
    const ventasMeseros =  await obtenerVentasMeseros(fecha);

    console.log("ventasMeseros:", ventasMeseros);  
    setVentasMeseros(ventasMeseros); 


    console.log("ventas:", ventas);
    //{ CantidadPedidos: 9, TotalFacturado: 379000 }
    setVentas(ventas);
  };

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setFecha(newValue);
    if (newValue.startDate && newValue.endDate) {
      traerVentas(newValue);
    }
  };

  return (
    <>
      <div>Reportes</div>

      <main className="flex flex-col relative gap-4 p-4 items-center justify-center w-full">
        <Datepicker
          primaryColor={"green"}
          value={fecha}
          onChange={handleValueChange}
          popoverDirection="down"
          i18n="es"
          containerClassName={" relative  w-10/12"}
          toggleClassName={"absolute right-0 top-0 p-2 cursor-pointer"}
          placeholder="Seleccionar fecha"
          separator=" hasta"
          showShortcuts={true}
          configs={{
            shortcuts: {
              today: "Hoy",
              yesterday: "Ayer",
              past: (period) => `Ult. ${period} días`,
              currentMonth: "Este Mes",
              pastMonth: "Mes Pasado",
            },
          }}
        />

        <div className="flex flex-col  rounded-lg w-full items-center justify-center p-2 gap-3">
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Cantidad Pedidos</TableColumn>
              <TableColumn>Total Facturado</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{ventas.CantidadPedidos}</TableCell>
                <TableCell>{formatPrecio(ventas.TotalFacturado)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>


          {/* Tabla para este array 
            [
    {
      Mesero: 'luigy',
      CantidadPedidos: 6,
      TotalVentas: 379000,
      TotalPropinas: 0,
      TotalVentasConPropinas: 379000
    },
    {
      Mesero: 'paco',
      CantidadPedidos: 2,
      TotalVentas: 92000,
      TotalPropinas: 0,
      TotalVentasConPropinas: 92000
    }
  ] */}
  <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Mesero</TableColumn>
              <TableColumn>Cantidad Pedidos</TableColumn>
              <TableColumn>Total Ventas</TableColumn>
              <TableColumn>Total Propinas</TableColumn>
            </TableHeader>
            <TableBody>
              {ventasMeseros.map((mesero) => (
                <TableRow key={mesero.Mesero}
                >
                  <TableCell 
                  >{mesero.Mesero}</TableCell>
                  <TableCell>{mesero.CantidadPedidos}</TableCell>
                  <TableCell>{formatPrecio(mesero.TotalVentas)}</TableCell>
                    <TableCell>{formatPrecio(mesero.TotalPropinas)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </div>
      </main>
    </>
  );
};

export default Reportes;
