export default function ReservationForm() {
  return `
    <div>
      <h2 id="reservationFormTitle" class="font-bold text-xl mb-4">Nueva reserva</h2>

      <form id="reservationForm" class="grid gap-4">
        <input type="hidden" name="reservationId" value="" />

        <div class="grid gap-2">
          <label class="text-sm font-medium">Espacio</label>
          <input
            type="text"
            name="workspace"
            placeholder="Sala A, Oficina 3, etc."
            required
            class="border border-slate-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="grid gap-2">
            <label class="text-sm font-medium">Fecha</label>
            <input
              type="date"
              name="date"
              required
              class="border border-slate-300 rounded px-3 py-2 w-full"
            />
          </div>

          <div class="grid gap-2">
            <label class="text-sm font-medium">Hora de inicio</label>
            <input
              type="time"
              name="startHour"
              required
              class="border border-slate-300 rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="grid gap-2">
            <label class="text-sm font-medium">Hora de fin</label>
            <input
              type="time"
              name="endHour"
              required
              class="border border-slate-300 rounded px-3 py-2 w-full"
            />
          </div>

          <div class="grid gap-2">
            <label class="text-sm font-medium">Motivo</label>
            <input
              type="text"
              name="reason"
              placeholder="Reunión, presentación, etc."
              required
              class="border border-slate-300 rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            id="reservationFormButton"
            type="submit"
            class="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Crear reserva
          </button>

          <button
            id="cancelReservationEdit"
            type="button"
            class="mt-2 bg-slate-300 hover:bg-slate-400 text-slate-900 px-4 py-2 rounded"
          >
            Cancelar edición
          </button>
        </div>
      </form>
    </div>
  `;
}
