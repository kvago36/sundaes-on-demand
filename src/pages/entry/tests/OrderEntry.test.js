import { rest } from 'msw'

import { render, screen, waitFor } from '../../../test-utils/testing-library-utils'
import { server } from '../../../mocks/server'

import OrderEntry from '../OrderEntry'

test('error for scoops and topping routes', async () => {
  server.resetHandlers(
    rest.get('/scoops', (_, res, ctx) => {
      return res(ctx.status(500))
    }),
    rest.get('/toppings', (_, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<OrderEntry />)

  await waitFor(async () => {
    const alers = await screen.findAllByRole('alert')
    expect(alers).toHaveLength(2)
  })
})