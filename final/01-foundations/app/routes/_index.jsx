import { NavLink } from "@remix-run/react";

export const meta = () => {
  return [{ title: "Welcome to RenderATL!" }];
};

export default function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to RenderATL!</h1>
      <nav aria-label="main">
        <NavLink to="/app">App</NavLink>
      </nav>
    </div>
  );
}
