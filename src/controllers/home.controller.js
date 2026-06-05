import ReservationCard from "@components/ReservationCard";
import { getSession } from "@/utils";
import {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} from "@/services/reservation.service";

const renderReservations = (reservations, user) => {
  const container = document.querySelector("#reservationsContainer");
  const filteredReservations =
    user.role === "admin"
      ? reservations
      : reservations.filter((reservation) => reservation.userId === user.id);

  container.innerHTML = filteredReservations?.length
    ? filteredReservations
        .map((reservation) => ReservationCard(reservation, user))
        .join("")
    : `
        <div class="w-full text-center py-8 col-span-2">
          <p class="text-slate-500">No hay reservas disponibles</p>
        </div>
      `;
};





























const toggleForm = () => {
  const section = document.querySelector("#reservationSection");
  section?.classList.toggle("hidden");
};

const resetForm = () => {
  const form = document.querySelector("#reservationForm");
  const title = document.querySelector("#reservationFormTitle");
  const submit = document.querySelector("#reservationFormButton");
  const hiddenId = document.querySelector("[name='reservationId']");

  if (form) form.reset();
  if (hiddenId) hiddenId.value = "";
  if (title) title.textContent = "Nueva reserva";
  if (submit) submit.textContent = "Crear reserva";
};

const fillForm = (reservation) => {
  const form = document.querySelector("#reservationForm");
  if (!form) return;

  const title = document.querySelector("#reservationFormTitle");
  const submit = document.querySelector("#reservationFormButton");
  const hiddenId = document.querySelector("[name='reservationId']");

  form.workspace.value = reservation.workspace;
  form.date.value = reservation.date;
  form.startHour.value = reservation.startHour;
  form.endHour.value = reservation.endHour;
  form.reason.value = reservation.reason;
  if (hiddenId) hiddenId.value = reservation.id;
  if (title) title.textContent = "Editar reserva";
  if (submit) submit.textContent = "Actualizar reserva";
};

const handleReservationActions = async (event, user) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const action = button.dataset.action;
  const id = button.dataset.id;

  if (!id) return;

  try {
    if (action === "approve") {
      await updateReservation(id, { status: "approved" });
    }

    if (action === "reject") {
      await updateReservation(id, { status: "rejected" });
    }

    if (action === "delete") {
      await deleteReservation(id);
    }

    if (action === "cancel") {
      await updateReservation(id, { status: "cancelled" });
    }

    if (action === "edit") {
      const reservation = await getReservationById(id);
      if (reservation.userId !== user.id || reservation.status !== "pending") {
        alert("No puedes editar esta reserva.");
        return;
      }
      fillForm(reservation);
      const section = document.querySelector("#reservationSection");
      section?.classList.remove("hidden");
      section?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    await loadReservations(user);
  } catch (error) {
    console.error(error);
    alert("No se pudo completar la acción. Intenta de nuevo.");
  }
};

const loadReservations = async (user) => {
  const reservations = await getReservations();
  renderReservations(reservations, user);
};

export const homeController = async () => {
  const user = getSession();
  const container = document.querySelector("#reservationsContainer");
  const openButton = document.querySelector("#openReservationForm");
  const section = document.querySelector("#reservationSection");
  const form = document.querySelector("#reservationForm");

  if (!container) return;

  const refresh = async () => {
    try {
      await loadReservations(user);
    } catch (error) {
      console.error(error);
      container.innerHTML = `
        <div class="w-full text-center py-8 col-span-2">
          <p class="text-red-600">Error al cargar las reservas. Intenta de nuevo.</p>
        </div>
      `;
    }
  };

  if (openButton) {
    openButton.addEventListener("click", () => {
      resetForm();
      toggleForm();
      section?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const reservationId = formData.get("reservationId")?.toString();
      const data = {
        workspace: formData.get("workspace")?.toString() || "",
        date: formData.get("date")?.toString() || "",
        startHour: formData.get("startHour")?.toString() || "",
        endHour: formData.get("endHour")?.toString() || "",
        reason: formData.get("reason")?.toString() || "",
      };

      try {
        if (reservationId) {
          await updateReservation(reservationId, data);
        } else {
          await createReservation({ ...data, status: "pending", userId: user.id });
        }
        resetForm();
        toggleForm();
        await refresh();
      } catch (error) {
        console.error(error);
        alert(
          reservationId
            ? "No se pudo actualizar la reserva. Intenta nuevamente."
            : "No se pudo crear la reserva. Intenta nuevamente."
        );
      }
    });
  }

  const cancelEdit = document.querySelector("#cancelReservationEdit");
  if (cancelEdit) {
    cancelEdit.addEventListener("click", () => {
      resetForm();
      toggleForm();
    });
  }

  container.addEventListener("click", (event) => {
    handleReservationActions(event, user);
  });

  await refresh();
};
