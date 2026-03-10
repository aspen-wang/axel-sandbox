import { components } from '@/dashboard.config'
import { notFound } from 'next/navigation'
import ComponentView from './ComponentView'

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }))
}

export default function ComponentPage({ params, searchParams }) {
  const comp = components.find((c) => c.slug === params.slug)
  if (!comp) notFound()

  return <ComponentView comp={comp} version={searchParams.v || null} />
}
