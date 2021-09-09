import  { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { Async } from '.'

test('it renders correctly', async () => {
  render(<Async />)

  expect(screen.getByText(/async comp/i)).toBeInTheDocument()
  // expect( await screen.findByText(/button/i)).toBeInTheDocument()

  // await waitFor(() => {
  //   expect(screen.getByText(/button/i)).toBeInTheDocument()
  // })

  await waitForElementToBeRemoved(screen.queryByText(/button/i))
})