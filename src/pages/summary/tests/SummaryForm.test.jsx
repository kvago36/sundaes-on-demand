import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SummaryForm from "../SummaryForm";

test('Initial conditions', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox');
  const button = screen.getByRole('button');

  expect(button).toBeDisabled()
  expect(checkbox).not.toBeChecked()

  userEvent.click(checkbox)

  expect(button).toBeEnabled()
});

test('Term popups in DOM', async () => {
  render(<SummaryForm />);

  const nullPop = screen.queryByText(/no ice cream will actually be delivered/i)
  expect(nullPop).not.toBeInTheDocument()

  const terms = screen.queryByText(/terms and conditions/i)
  userEvent.hover(terms)

  await waitFor(async () => {
    const pop = screen.queryByText(/no ice cream will actually be delivered/i)
    expect(pop).toBeInTheDocument()
  })

  userEvent.unhover(terms)

  const pop = screen.queryByText(/no ice cream will actually be delivered/i)

  await waitForElementToBeRemoved(pop)
})

test('Terms not in DOM', async () => {
  render(<SummaryForm />)

  const nullPop = screen.queryByText(/no ice cream will actually be delivered/i)

  expect(nullPop).not.toBeInTheDocument()
})

test('Terms present in DOM', async () => {
  render(<SummaryForm />)

  const terms = screen.queryByText(/terms and conditions/i)

  userEvent.hover(terms)
  const pop = screen.queryByText(/no ice cream will actually be delivered/i)

  await waitFor(() => {
    expect(pop).toBeInTheDocument()
  })
})