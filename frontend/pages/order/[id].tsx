import { useRouter } from 'next/router';
const OrderDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>OrderDetail: {id}</p>;
}

export default OrderDetail
