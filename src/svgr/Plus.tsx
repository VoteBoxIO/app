import * as React from 'react'
import type { SVGProps } from 'react'
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={30}
    height={31}
    viewBox="0 0 30 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 1.23169C16 0.679405 15.5523 0.231689 15 0.231689C14.4477 0.231689 14 0.679405 14 1.23169V14.2317H1C0.447715 14.2317 0 14.6794 0 15.2317C0 15.784 0.447715 16.2317 1 16.2317H14V29.2317C14 29.784 14.4477 30.2317 15 30.2317C15.5523 30.2317 16 29.784 16 29.2317V16.2317H29C29.5523 16.2317 30 15.784 30 15.2317C30 14.6794 29.5523 14.2317 29 14.2317H16V1.23169Z"
      fill="#4F5277"
    />
  </svg>
)
export default SvgPlus
