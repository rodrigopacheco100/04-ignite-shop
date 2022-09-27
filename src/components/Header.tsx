import Image from 'next/future/image'
import Link from 'next/link'
import { HiOutlineShoppingBag } from 'react-icons/hi'

import logo from '~/assets/logo.svg'
import { useCart } from '~/hooks/cart'
import { HeaderContainer } from '~/styles/components/header'

export const Header: React.FC = () => {
  const { toggleCartShown, cartShown } = useCart()

  return (
    <HeaderContainer showCart={cartShown ? 'true' : 'false'}>
      <Link href="/">
        <Image src={logo} alt="Logo" />
      </Link>

      <button type="button" onClick={() => toggleCartShown()}>
        <HiOutlineShoppingBag size={24} />
      </button>
    </HeaderContainer>
  )
}
