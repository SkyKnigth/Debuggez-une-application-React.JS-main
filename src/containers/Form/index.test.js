import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Form from "./index";

describe("When Events is created", () => {
  beforeEach(() => {
    jest.useFakeTimers(); 
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); 
    jest.useRealTimers(); 
  });

  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      fireEvent.submit(screen.getByTestId("form")); 

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
    });
  });
});