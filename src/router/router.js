import loginView from "@/views/loginView";
import homeView from "@/views/homeView";
import spacesView from "@/views/spacesView";
import notFoundView from "@/views/notFound";
import accessDeniedView from "@/views/accessDeniedView";
import { getSession, isAuthenticated } from "@/utils";

const routes = {
  "/": { view: loginView },
  "/home": { view: homeView, roles: ["admin", "user"] },
  "/admin/spaces": { view: spacesView, roles: ["admin"] },
  "/denied": { view: accessDeniedView },
};

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = () => {
  const app = document.querySelector("#app");
  const path = window.location.pathname;
  const route = routes[path];
  const session = getSession();

  if (path === "/" && isAuthenticated()) {
    history.replaceState({}, "", "/home");
    app.innerHTML = homeView();
    return;
  }

  if (!route) {
    app.innerHTML = notFoundView();
    setTimeout(() => {
      document
        .querySelector("#goHome")
        ?.addEventListener("click", () => {
          navigateTo("/");
        });
    });
    return;
  }

  if (route.roles && !isAuthenticated()) {
    history.replaceState({}, "", "/");
    app.innerHTML = loginView();
    return;
  }

  if (route.roles && !route.roles.includes(session?.role)) {
    app.innerHTML = accessDeniedView();
    setTimeout(() => {
      document
        .querySelector("#goHome")
        ?.addEventListener("click", () => {
          navigateTo("/home");
        });
    });
    return;
  }

  app.innerHTML = route.view();
};

window.addEventListener("popstate", router);

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-link]");

  if (!link) return;

  event.preventDefault();
  navigateTo(link.getAttribute("href"));
});
