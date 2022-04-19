import { DEFAULT_PROFILE_IMAGE } from './constant'

const handleBrokenImage = (e: any) => {
  e.target.src = DEFAULT_PROFILE_IMAGE
  e.target.onerror = null
}

export default handleBrokenImage
