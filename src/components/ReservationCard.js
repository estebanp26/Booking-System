export default function ReservationCard(reservation, currentUser) {
  const {
    id,
    workspace,
    date,
    startHour,
    endHour,
    reason,
    status,
    userId,
  } = reservation;

  const isOwner = currentUser?.id === userId;
  const isPending = status === "pending";

  return `
    <article class="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <h3 class="font-bold text-lg mb-3">${workspace}</h3>

      <div class="space-y-2 text-sm text-slate-700">
        <p><strong>Fecha:</strong> ${date}</p>
        <p><strong>Horario:</strong> ${startHour} - ${endHour}</p>
        <p><strong>Motivo:</strong> ${reason}</p>
        <p>
          <strong>Estado:</strong>
          <span class="font-semibold ${status === "approved"
      ? "text-emerald-700"
      : status === "rejected"
        ? "text-red-600"
        : "text-slate-600"
    }">
            ${status}
          </span>
        </p>
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        ${currentUser?.role === "admin" ? `
          <button
            class="px-3 py-2 rounded bg-blue-600 text-white text-sm"
            data-action="approve"
            data-id="${id}"
          >Aprobar</button>

          <button
            class="px-3 py-2 rounded bg-orange-500 text-white text-sm"
            data-action="reject"
            data-id="${id}"
          >Rechazar</button>

          <button
            class="px-3 py-2 rounded bg-red-600 text-white text-sm"
            data-action="delete"
            data-id="${id}"
          >Eliminar</button>
        ` : ""}

        ${isOwner && isPending ? `
          <button
            class="px-3 py-2 rounded bg-yellow-500 text-white text-sm"
            data-action="edit"
            data-id="${id}"
          >Editar</button>

          <button
            class="px-3 py-2 rounded bg-red-600 text-white text-sm"
            data-action="cancel"
            data-id="${id}"
          >Cancelar</button>
        ` : ""}
      </div>
    </article>
  `;
}
