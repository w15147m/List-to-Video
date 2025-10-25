import {
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";


export default function App() {
  return (
    <html lang="en">
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
