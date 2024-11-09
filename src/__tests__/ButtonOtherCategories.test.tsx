import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import ButtonOtherCategories from "../components/ButtonOtherCategories/ButtonOtherCategories";

describe("ButtonOtherCategories Component", () => {
  // Funkcja pomocnicza do renderowania komponentu
  const renderButtonOtherCategories = (props = {
    text: "Zobacz więcej",
    categoryName: "desserts"
  }) => {
    return render(
      <BrowserRouter>
        <ButtonOtherCategories {...props} />
      </BrowserRouter>
    );
  };

  describe("Rendering", () => {
    it("should render without crashing", () => {
      expect(() => renderButtonOtherCategories()).not.toThrow();
    });

    it("should render with correct text content", () => {
      renderButtonOtherCategories();
      expect(screen.getByText("Zobacz więcej")).toBeInTheDocument();
    });

    it("should have correct link destination", () => {
      renderButtonOtherCategories();
      expect(screen.getByRole("link")).toHaveAttribute("href", "/categories/desserts");
    });
  });

  describe("Accessibility", () => {
    it("should have correct aria-label", () => {
      renderButtonOtherCategories();
      expect(screen.getByRole("link")).toHaveAttribute(
        "aria-label",
        "See all recipes in desserts category"
      );
    });

    it("should be focusable", () => {
      renderButtonOtherCategories();
      const link = screen.getByRole("link");
      link.focus();
      expect(link).toHaveFocus();
    });
  });

  describe("Props handling", () => {
    it("should handle empty category name", () => {
      renderButtonOtherCategories({ text: "Zobacz więcej", categoryName: "" });
      expect(screen.getByRole("link")).toHaveAttribute("href", "/categories/");
    });

    it("should handle long category names", () => {
      const longCategory = "very-long-category-name-test-with-many-words";
      renderButtonOtherCategories({ 
        text: "Zobacz więcej", 
        categoryName: longCategory 
      });
      expect(screen.getByRole("link")).toHaveAttribute(
        "href", 
        `/categories/${longCategory}`
      );
    });

    it("should handle different text content", () => {
      renderButtonOtherCategories({ 
        text: "Pokaż wszystkie", 
        categoryName: "desserts" 
      });
      expect(screen.getByText("Pokaż wszystkie")).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have correct CSS class", () => {
      renderButtonOtherCategories();
      expect(screen.getByRole("link")).toHaveClass("btn");
    });
  });

  describe("Edge cases", () => {
    it("should handle special characters in category name", () => {
      const specialCategory = "śniadania&lunch";
      renderButtonOtherCategories({ 
        text: "Zobacz więcej", 
        categoryName: specialCategory 
      });
      expect(screen.getByRole("link")).toHaveAttribute(
        "href", 
        `/categories/${specialCategory}`
      );
    });
  });
});