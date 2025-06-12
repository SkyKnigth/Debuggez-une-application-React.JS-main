import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
    const headings = await screen.findAllByText("Nos réalisations");
    expect(headings.length).toBeGreaterThan(0); // ou : screen.findByRole(...)
  });

  it("a list of people is displayed", async () => {
    render(<Home />);
    const teamTitle = await screen.findByRole("heading", { name: "Notre équipe" });
    expect(teamTitle).toBeInTheDocument();
    expect(await screen.findByText("Samira")).toBeInTheDocument();
  });

  it("a footer is displayed", async () => {
    render(<Home />);
    expect(await screen.findByText("Contactez-nous")).toBeInTheDocument();
    expect(screen.getByText(/45 avenue de la République/)).toBeInTheDocument();
  });

  /*it("an event card, with the last event, is displayed", async () => {
   
  )};*/
)}