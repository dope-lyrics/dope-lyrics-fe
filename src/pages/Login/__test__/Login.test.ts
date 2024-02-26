import { screen, render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Login from "@/pages/Login/Login.vue";
import { fireEvent } from "@testing-library/vue";

beforeEach(() => {
  render(Login);
});

describe("show error when inputs are empty after submissions", () => {
  it("when the username is empty", async () => {
    const submitButton = screen.getByRole("button", {
      name: "Login",
    });

    await fireEvent.click(submitButton);

    const usernameInputErrorElement = document.querySelector(
      ".form-error-field.username"
    );
    expect(usernameInputErrorElement).toBeTruthy();
  });

  it("when the password is empty", async () => {
    const submitButton = screen.getByRole("button", {
      name: "Login",
    });

    await fireEvent.click(submitButton);

    const passwordInputErrorElement = document.querySelector(
      ".form-error-field.password"
    );

    expect(passwordInputErrorElement).toBeTruthy();
  });
});

it("shows error if username input length is less than 6", async () => {
  const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement;
  const inputValueLessThan6Character = "usern";

  await fireEvent.update(usernameInput, inputValueLessThan6Character);

  const submitButton = screen.getByRole("button", {
    name: "Login",
  });

  await fireEvent.click(submitButton);

  const usernameInputErrorElement = document.querySelector(
    ".form-error-field.username"
  );

  expect(usernameInputErrorElement).toBeTruthy();
});

it("shows error if password input length is less than 3 after form submission", async () => {
  const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
  const inputValueLessThan3Character = "pa";

  await fireEvent.update(passwordInput, inputValueLessThan3Character);

  const submitButton = screen.getByRole("button", {
    name: "Login",
  });

  await fireEvent.click(submitButton);

  const passwordInputErrorElement = document.querySelector(
    ".form-error-field.password"
  );

  expect(passwordInputErrorElement).toBeTruthy();
});
