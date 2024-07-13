import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "@/components/Button";
import { LinkField, KeyTextField } from "@prismicio/client";

describe("Button Component", () => {
  it("Should render button with label and icon", () => {
    const linkField: LinkField = {
      link_type: "Web",
      url: "https://example.com",
    };
    const label: KeyTextField = "Click Me";

    render(
      <Button
        linkField={linkField}
        label={label}
      />
    );

    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("Should render button without icon when showIcon is false", () => {
    const linkField: LinkField = {
      link_type: "Web",
      url: "https://example.com",
    };
    const label: KeyTextField = "Click Me";

    render(
      <Button
        linkField={linkField}
        label={label}
        showIcon={false}
      />
    );

    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByText("Click Me")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
