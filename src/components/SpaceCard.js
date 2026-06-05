export default function SpaceCard(space) {
  const { id, name, type, capacity } = space;

  return `
    <article class="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <h3 class="font-bold text-lg mb-2">${name}</h3>
      <p class="text-sm text-slate-700"><strong>Tipo:</strong> ${type}</p>
      <p class="text-sm text-slate-700"><strong>Capacidad:</strong> ${capacity}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        <button
          class="px-3 py-2 rounded bg-yellow-500 text-white text-sm"
          data-action="edit-space"
          data-id="${id}"
        >Editar</button>
        <button
          class="px-3 py-2 rounded bg-red-600 text-white text-sm"
          data-action="delete-space"
          data-id="${id}"
        >Eliminar</button>
      </div>
    </article>
  `;
}
