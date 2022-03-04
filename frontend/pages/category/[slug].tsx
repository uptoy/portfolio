import { useRouter } from 'next/router';
const CategoryDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <p>CategoryDetail: {slug}</p>;
}

export default CategoryDetail
