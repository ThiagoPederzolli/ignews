import { render, screen, fireEvent } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/client')

// , () => {
//   return {
//     useSession() {
//       return [null, false]
//     },
//     signIn: jest.fn()
//   }
// }

jest.mock('next/router')

describe('SignInButton Component', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])
    render(
      <SubscribeButton />
    )
    
    expect(screen.getByText(/subscribe now/i)).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])
    const signInMocked = mocked(signIn)
    render(<SubscribeButton />)
    const subscribeButton = screen.getByText(/subscribe now/i)

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects user to posts when user has a subscription', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([{
      user: { name: 'John Doe', email: 'john.doe@example.com'},
      expires: 'fale-expires',
      activeSubscription: 'fake-active-subscription'
    }, false])

    const pushMock = jest.fn()

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)

    render(<SubscribeButton />)
    const subscribeButton = screen.getByText(/subscribe now/i)

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalled()
  })
})