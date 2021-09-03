import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'
import { SignInButton } from '.'

jest.mock('next-auth/client')

describe('SignInButton Component', () => {
  it('Sign In button renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])
    render(
      <SignInButton />
    )
    
    expect(screen.getByText(/sign in with github/i)).toBeInTheDocument()
  })

  it('Sign In button renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([{
      user: { name: 'John Doe', email: 'john.doe@example.com'},
      expires: 'fale-expires'
    }, false])
    render(
      <SignInButton />
    )
    
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
  })
})