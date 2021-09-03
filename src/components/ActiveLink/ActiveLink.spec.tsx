import { render } from '@testing-library/react'
import { ActiveLink } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink Component', () => {
  it('active link renders correctly', () => {
    const { getByText, debug } = render(
      <ActiveLink href="/" activeClassName="active">
        <a >Home</a>
      </ActiveLink>
    )
    
    expect(getByText('Home')).toBeInTheDocument()
    debug() // funciona como um console.log
  })
  
  it('active link receiving active class', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a >Home</a>
      </ActiveLink>
    )
    
    expect(getByText('Home')).toHaveClass('active')
  })
})