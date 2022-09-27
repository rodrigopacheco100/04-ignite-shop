import { styled } from '../config'

export const CartContainer = styled('main', {
  width: '30rem',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
  backgroundColor: '$gray800',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
  padding: '1.5rem 3rem 3rem',

  flexDirection: 'column',

  variants: {
    showCart: {
      true: {
        display: 'flex'
      },
      false: {
        display: 'none'
      }
    }
  },

  svg: {
    position: 'absolute',
    top: 24,
    right: 24
  },

  '> p': {
    marginTop: 72,
    fontSize: 20
  }
})

export const CartItems = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 32,
  gap: 24
})

export const CartItem = styled('div', {
  display: 'flex',
  gap: 20
})

export const CartItemDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  p: {
    fontSize: '$md'
  },

  span: {
    fontSize: '$md',
    fontWeight: 'bold'
  },

  button: {
    color: '$green500',
    background: 'transparent',
    border: 'none',
    width: 'fit-content',
    fontSize: '1rem',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed'
    },

    '&:not(:disabled):hover': {
      color: '$green300'
    }
  }
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 102,
  height: 93,
  background: '$productBackground',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  }
})

export const CartFooter = styled('footer', {
  width: '100%',
  marginTop: 'auto',

  '> button': {
    backgroundColor: '$green500',
    width: '100%',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    fontSize: '$md',
    fontWeight: 'bold',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed'
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300'
    }
  }
})

export const CartItemsQuantity = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '$md',
  marginBottom: '0.5em'
})

export const CartItemsPrice = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '$xl',
  fontWeight: 'bold',
  marginBottom: '3.5rem'
})
