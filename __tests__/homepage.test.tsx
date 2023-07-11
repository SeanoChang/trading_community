import { beforeAll, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import Home from '../src/pages/index'
import { SessionProvider } from "next-auth/react";

describe("Home page", () => {
  vi.mock('../src/server/db.ts')

  it("Home renders without crashing", () => {
    render(
      <SessionProvider session={null}>
        <Home rand_quote={0} />
      </SessionProvider>
    );
  });

  it("Header exists", () => {
    render(
      <SessionProvider session={null}>
        <Home rand_quote={0} />
      </SessionProvider>
    );

    expect(document.querySelector("h1")).not.toBeNull();
  });

  it("Quote exists", () => {
    render(
      <SessionProvider session={null}>
        <Home rand_quote={0} />
      </SessionProvider>
    );

    expect(document.getElementById("quote")).not.toBeNull();
  });

  it("Sign in button exists", () => {
    render(
      <SessionProvider session={null}>
        <Home rand_quote={0} />
      </SessionProvider>
    );

    expect(document.getElementById("sign-in-button")).not.toBeNull();
  });
});
