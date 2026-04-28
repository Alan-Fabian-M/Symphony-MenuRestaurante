import React from 'react';
import { Button } from './button';
import { Input } from './input';

export function ReservationForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-zinc-300">Nombre Completo</label>
          <Input id="name" placeholder="Ej. Juan Pérez" required />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-zinc-300">Correo Electrónico</label>
          <Input id="email" type="email" placeholder="juan@ejemplo.com" required />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium text-zinc-300">Fecha</label>
          <Input id="date" type="date" className="text-zinc-50" required />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="time" className="text-sm font-medium text-zinc-300">Hora</label>
          <Input id="time" type="time" className="text-zinc-50" required />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="guests" className="text-sm font-medium text-zinc-300">Número de Personas</label>
        <Input id="guests" type="number" min="1" max="20" placeholder="2" required />
      </div>
      
      <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold py-6 text-lg mt-4">
        Confirmar Reserva
      </Button>
      
      <p className="text-xs text-center text-zinc-500 mt-4">
        Las reservas se mantienen hasta 15 minutos después de la hora indicada. 
        Para grupos mayores a 8 personas, por favor contacte directamente al restaurante.
      </p>
    </form>
  );
}
