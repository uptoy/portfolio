import { useRouter } from "next/router"

const Sample = () => {
  const router = useRouter()
  const { id } = router.query

  return <>Sample:{id}</>
}

export default Sample
