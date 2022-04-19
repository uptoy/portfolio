export default async function fetcher(url:any) {
  const res = await fetch(url)
  return res.json()
}
