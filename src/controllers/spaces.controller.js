import SpaceCard from "@/components/SpaceCard";
import { getSpaces, getSpaceById, createSpace, updateSpace, deleteSpace } from "@/services/space.service";

const renderSpaces = (spaces) => {
  const container = document.querySelector("#spacesContainer");
  container.innerHTML = spaces?.length
    ? spaces.map((space) => SpaceCard(space)).join("")
    : `
        <div class="w-full text-center py-8 col-span-2">
          <p class="text-slate-500">No hay espacios registrados.</p>
        </div>
      `;
};

const resetSpaceForm = () => {
  const form = document.querySelector("#spaceForm");
  const title = document.querySelector("#spaceFormTitle");
  const submit = document.querySelector("#spaceFormButton");
  const hiddenId = document.querySelector("[name='spaceId']");

  if (form) form.reset();
  if (hiddenId) hiddenId.value = "";
  if (title) title.textContent = "Crear nuevo espacio";
  if (submit) submit.textContent = "Guardar espacio";
};

const fillSpaceForm = (space) => {
  const form = document.querySelector("#spaceForm");
  if (!form) return;

  const title = document.querySelector("#spaceFormTitle");
  const submit = document.querySelector("#spaceFormButton");
  const hiddenId = document.querySelector("[name='spaceId']");

  form.name.value = space.name;
  form.type.value = space.type;
  form.capacity.value = space.capacity;
  if (hiddenId) hiddenId.value = space.id;
  if (title) title.textContent = "Editar espacio";
  if (submit) submit.textContent = "Actualizar espacio";
};

const loadSpaces = async () => {
  const spaces = await getSpaces();
  renderSpaces(spaces);
};

const handleSpaceActions = async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const action = button.dataset.action;
  const id = button.dataset.id;
  if (!id) return;

  try {
    if (action === "edit-space") {
      const space = await getSpaceById(id);
      fillSpaceForm(space);
      const section = document.querySelector("#spaceForm");
      section?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (action === "delete-space") {
      await deleteSpace(id);
      await loadSpaces();
    }
  } catch (error) {
    console.error(error);
    alert("No se pudo completar la acción. Intenta de nuevo.");
  }
};

export const spacesController = async () => {
  const form = document.querySelector("#spaceForm");
  const cancelEdit = document.querySelector("#cancelSpaceEdit");
  const container = document.querySelector("#spacesContainer");

  if (!container || !form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const spaceId = formData.get("spaceId")?.toString();
    const data = {
      name: formData.get("name")?.toString() || "",
      type: formData.get("type")?.toString() || "",
      capacity: Number(formData.get("capacity") || 0),
    };

    try {
      if (spaceId) {
        await updateSpace(spaceId, data);
      } else {
        await createSpace(data);
      }
      resetSpaceForm();
      await loadSpaces();
    } catch (error) {
      console.error(error);
      alert("No se pudo guardar el espacio. Intenta de nuevo.");
    }
  });

  if (cancelEdit) {
    cancelEdit.addEventListener("click", () => {
      resetSpaceForm();
    });
  }

  container.addEventListener("click", handleSpaceActions);
  await loadSpaces();
};
