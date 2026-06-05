export default function SpaceForm() {
  return `
    <div>
      <h2 id="spaceFormTitle" class="font-bold text-xl mb-4">Crear nuevo espacio</h2>

      <form id="spaceForm" class="grid gap-4">
        <input type="hidden" name="spaceId" value="" />

        <div class="grid gap-2">
          <label class="text-sm font-medium">Nombre del espacio</label>
          <input
            type="text"
            name="name"
            placeholder="Sala A, Oficina 3"
            required
            class="border border-slate-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="grid gap-2">
            <label class="text-sm font-medium">Tipo</label>
            <input
              type="text"
              name="type"
              placeholder="Meeting Room, Private Office"
              required
              class="border border-slate-300 rounded px-3 py-2 w-full"
            />
          </div>

          <div class="grid gap-2">
            <label class="text-sm font-medium">Capacidad</label>
            <input
              type="number"
              name="capacity"
              min="1"
              required
              class="border border-slate-300 rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <button id="spaceFormButton" type="submit" class="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Guardar espacio
          </button>
          <button id="cancelSpaceEdit" type="button" class="mt-2 bg-slate-300 hover:bg-slate-400 text-slate-900 px-4 py-2 rounded">
            Cancelar edición
          </button>
        </div>
      </form>
    </div>
  `;
}
