import { styled } from '../config'

export const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1100,
  margin: '0 auto',

  variants: {
    showCart: {
      true: {
        button: {
          backgroundColor: '$green500',
          '&:hover': {
            backgroundColor: '$green300'
          }
        }
      },
      false: {}
    }
  },

  button: {
    backgroundColor: '$gray800',
    width: '3rem',
    height: '3rem',
    border: 0,
    color: '$white',
    borderRadius: 6,

    '&:hover': {
      backgroundColor: '$gray600'
    }
  }
})
