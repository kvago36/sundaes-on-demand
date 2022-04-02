import userEvent from '@testing-library/user-event'

import { render, screen } from '../../../test-utils/testing-library-utils'

import Options from '../Options' 
import OrderEntry from '../OrderEntry' 

test('Update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />)

  const ss = screen.getByText('Scoops total: $', { exact: false })
  expect(ss).toHaveTextContent('0.00')

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')
  expect(ss).toHaveTextContent('2.00')

  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  expect(ss).toHaveTextContent('6.00')
})

describe('grand total', () => {
  test('grand total starts at $0:00', () => {
    render(<OrderEntry />)
    const header = screen.getByRole('heading', { name: /Grand total: \$/ })

    expect(header).toHaveTextContent('$0.00')
  })

  test('grand total updates properly if scoops first', async () => {
    render(<OrderEntry />)

    const hot = await screen.findByRole('checkbox', { name: 'Hot fudge' })
    userEvent.click(hot)

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')

    const header = screen.getByRole('heading', { name: /Grand total: \$/ })

    expect(header).toHaveTextContent('$3.50')
  })

  test('grand total updates properly if toppings first', async () => {
    render(<OrderEntry />)

    const header = screen.getByRole('heading', { name: /Grand total: \$/ })

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')

    const mm = await screen.findByRole('checkbox', { name: 'M&Ms' })
    userEvent.click(mm)

    expect(header).toHaveTextContent('$3.50')
  })

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />)
    const header = screen.getByRole('heading', { name: /Grand total: \$/ })

    expect(header).toHaveTextContent('$0.00')

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2')

    expect(header).toHaveTextContent('$4.00')

    // remove 1 scoop of vanilla and check grand total
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(header).toHaveTextContent('$2.00')
  })
})