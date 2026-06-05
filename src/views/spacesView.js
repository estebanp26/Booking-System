import SpaceForm from "@/components/SpaceForm";
import { spacesController } from "@/controllers/spaces.controller";

export default function spacesView() {
  setTimeout(() => {
    spacesController();
  });

  return `
    <div class="flex">
      <aside class="w-64 bg-slate-900 text-white h-screen p-5">
        <h2 class="text-2xl font-bold mb-8">Admin Spaces</h2>
        <nav class="flex flex-col gap-4">
          <a href="/home" class="px-3 py-2 bg-gray-500 rounded-xl" data-link>Home</a>
          <a href="/admin/spaces" class="px-3 py-2 bg-slate-700 rounded-xl" data-link>Spaces</a>
        </nav>
      </aside>

      <main class="flex-1 p-6 bg-slate-100 min-h-screen">
        <div class="mb-6">
          <h1 class="text-3xl font-bold mb-2">Spaces Management</h1>
          <p class="text-slate-600">Solo los administradores pueden crear, editar y eliminar espacios.</p>
        </div>

        <section class="bg-white p-5 rounded-lg shadow mb-6">
          ${SpaceForm()}
        </section>

        <section class="bg-white p-5 rounded-lg shadow">
          <h2 class="text-xl font-bold mb-4">Listado de espacios</h2>
          <div id="spacesContainer" class="grid gap-4 md:grid-cols-2"></div>
        </section>
      </main>
    </div>
  `;
}
