import { useContext } from 'react'
import { Context } from '../contexts/SupremeProvider'

const useSupreme = () => {
  const { supreme } = useContext(Context)
  return supreme
}

export default useSupreme
