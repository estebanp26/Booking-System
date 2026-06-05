export default function AccessDeniedView() {
  return `
    <div class="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
      <div class="bg-white p-10 rounded-xl shadow-lg max-w-lg text-center">
        <h1 class="text-5xl font-bold text-red-600 mb-4">Acceso denegado</h1>
        <p class="text-slate-700 mb-6">
          No tienes permiso para acceder a esta sección. Si crees que deberías poder entrar, inicia sesión con una cuenta válida o regresa a la pantalla principal.
        </p>
        <button id="goHome" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
          Volver al inicio
        </button>
      </div>
    </div>
  `;
}
