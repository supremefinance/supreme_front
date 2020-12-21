import React from 'react'
import logo from '../../assets/img/icon_supreme.png';

interface SupremeIconProps {
  size?: number
  v1?: boolean
  v2?: boolean
  v3?: boolean
}

const SupremeIcon: React.FC<SupremeIconProps> = ({ size = 36, v1, v2, v3 }) => (
  <span
    role="img"
    style={{
      fontSize: size,
      filter: v1 ? 'saturate(0.5)' : undefined,
    }}
  >
    <img src={logo} />
  </span>
)

export default SupremeIcon
