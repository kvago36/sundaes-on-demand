import { render, screen } from '@testing-library/react'

import Options from '../Options'

test('display scoops', async () => {
  render(<Options optionType="scoops" />)

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  const alts = scoopImages.map(img => img.alt)
  expect(alts).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})


test('display toppings', async () => {
  render(<Options optionType="toppings" />)

  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i })
  expect(toppingImages).toHaveLength(3)

  const alts = toppingImages.map(img => img.alt)
  expect(alts).toEqual(['M&Ms topping', 'Hot fudge topping', 'Peanut butter cups topping'])
})