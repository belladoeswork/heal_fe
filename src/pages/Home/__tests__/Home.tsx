import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Home from "../Home";

describe("<Home />", () => {
  const renderHelper = () => {
    const mockProps = {
      history: {} as any,
      location: {} as any,
      match: {} as any,
    };

    const { container } = render(
      <MemoryRouter>
        <Home {...mockProps} />
      </MemoryRouter>
    );

    return { firstChild: container.firstChild };
  };

  it("should redirect to dashboard", () => {
    const { firstChild } = renderHelper();
    // Since Home component renders a Redirect, it doesn't render any DOM
    expect(firstChild).toBeNull();
  });
});
