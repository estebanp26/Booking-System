# Booking-System

# Workspace Reservation System SPA

## Overview

This project is a web application that manages workspace reservations in a single page application (SPA) format.

It allows two user roles:

- **Admin**: can manage all reservations and spaces.
- **User**: can create and manage their own pending reservations.

The application is built with JavaScript, Vite, TailwindCSS, and JSON Server.

## What does this application do?

The program lets users log in, create reservations, and view existing bookings.

- Users can only see and edit their own pending reservations.
- Admins can see all reservations, approve or reject them, delete them, and manage workspace spaces.
- The app protects restricted areas and displays an "Access Denied" page if someone tries to go to a page they cannot visit.

## Installation

These steps explain how to run the program from your computer.

1. Open a terminal or command prompt.
2. Go to the project folder:

```bash
cd /home/Cohorte5/Escritorio/PerformanceTestJS-PDM3-C5
```

3. Install the project packages:

```bash
npm install
```

4. Start the application with:

```bash
npm run dev
```

After that, the app will be available in your browser. The command starts two services:

- Vite web server to show the website.
- JSON Server to simulate the backend API.

## How to use the application

### Login

Open the app in the browser and use one of the test accounts below.

- Admin email: `admin@test.com`
- Admin password: `A123456`

- User email: `user@test.com`
- User password: `A123456`

### After login

- If you log in as **Admin**, you can:
  - view all reservations,
  - approve or reject reservations,
  - delete reservations,
  - manage workspace spaces from the admin section.

- If you log in as **User**, you can:
  - create a new reservation,
  - view only your own reservations,
  - edit a reservation while it is still pending,
  - cancel a pending reservation.

## Application structure

The project code is split into small parts to make it easier to understand.

### Main parts

- `src/main.js`: starts the SPA and connects the router.
- `src/router/router.js`: controls which page is shown and checks if the user can visit that page.
- `src/views/`: contains the page templates for each screen.
- `src/components/`: contains reusable page pieces like forms and cards.
- `src/controllers/`: handles user actions, form events, and API calls.
- `src/services/`: holds the functions that call the simulated API.
- `src/utils.js`: saves and reads session information in the browser.

### Important files

- `src/views/loginView.js`: login screen.
- `src/views/homeView.js`: main dashboard page.
- `src/views/spacesView.js`: admin page for managing spaces.
- `src/views/accessDeniedView.js`: shown when a user visits a restricted section.
- `src/components/ReservationForm.js`: form for creating or editing a reservation.
- `src/components/SpaceForm.js`: form for creating or editing a workspace space.

## How the role check works

The app checks the user role after login to decide what pages can be visited.

- If the user is **not logged in**, they are sent to the login page.
- If the user is logged in as **admin**, they can open the admin route at `/admin/spaces`.
- If the user is logged in as **user**, they can only use the normal reservation pages.
- If someone types a restricted URL in the browser and they do not have permission, the app shows an "Access Denied" message.

This means the role is not just shown on screen. The app also blocks pages based on the URL.

## Data and API simulation

The app uses `db.json` as the fake data storage. JSON Server reads this file and creates endpoints automatically.

The main data sets are:

- `users`: saved login users and roles.
- `reservations`: saved reservation records.
- `spaces`: saved workspace spaces that only admins can manage.

Example data for users:

```json
{
  "id": "1",
  "email": "admin@test.com",
  "password": "A123456",
  "role": "admin",
  "name": "Administrador"
}
```

Example space data:

```json
{
  "id": "1",
  "name": "Sala A",
  "type": "Meeting Room",
  "capacity": 8
}
```

## Key features

### Reservation features

- Create a new reservation.
- Show only the logged-in user's reservations for normal users.
- Admin can see all reservations.
- Users can edit a reservation only while it is still pending.
- Users can cancel their pending reservations.
- Admin can approve, reject, or delete reservations.

### Space management features

- Admin can add new workspace spaces.
- Admin can edit existing spaces.
- Admin can delete spaces.

### Security and route protection

- The app saves the current user session in the browser.
- Protected routes require login.
- Admin pages require the admin role.
- Restricted access shows an "Access Denied" page.

## Browser behavior

When the app is open:

- The URL changes without full page reload.
- Page contents are updated dynamically.
- If the browser goes back or forward, the app updates correctly.

## Running the project again

If you close the terminal, run again:

```bash
npm install
npm run dev
```

Then open the browser and use the login form.

## Extra notes for non-technical users

- "SPA" means the website acts like an application, and it does not reload the whole page when you change screens.
- The login page is the first screen.
- After login, you see the home page with reservation details.
- Admin users see an extra menu item for workspace space management.
- A user should never see admin pages unless logged in as admin.

## Credentials for testing

- **Admin**:
  - Email: `admin@test.com`
  - Password: `A123456`

- **User**:
  - Email: `user@test.com`
  - Password: `A123456`

## Supported commands

```bash
npm install
npm run dev
```

That is all you need to run and use this workspace reservation system.
