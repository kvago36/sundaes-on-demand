import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

test('order phases for happy path', async () => {
  render(<App />)

  const scoop = await screen.findByRole('checkbox', { name: 'Hot fudge' })
  const topping = await screen.findByRole('spinbutton', { name: 'Chocolate' })

  userEvent.click(scoop)
  userEvent.clear(topping)
  userEvent.type(topping, '2')

  const orderButton = screen.getByRole('button', { name: /order sundae!/i })
  const priceInfo = screen.getByRole('heading', { name: /grand total:/i })
  expect(priceInfo).toHaveTextContent('5.50')

  userEvent.click(orderButton)

  const terms = await screen.findByRole('checkbox', { name: /terms and conditions/i })
  
  const scoops = await screen.findByRole('heading', { name: /scoops: /i })
  const toppings = await screen.findByRole('heading', { name: /toppings: /i })

  expect(scoops).toHaveTextContent('4.00')
  expect(toppings).toHaveTextContent('1.50')

  userEvent.click(terms)

  const confirmOrder = screen.getByRole('button', { name: /confirm order/i })
  userEvent.click(confirmOrder)

  const successOrder = await screen.findByRole('heading', { name: /thank you/i })

  expect(successOrder).toBeInTheDocument()

  const newOrder = screen.getByRole('button', { name: /new order/i })
  userEvent.click(newOrder)

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /design your sundae!/i })).toBeInTheDocument();
  })

  expect(await screen.findByRole('checkbox', { name: 'Hot fudge' })).not.toBeChecked()
  expect(await screen.findByRole('spinbutton', { name: 'Chocolate' })).toHaveValue(0)
})