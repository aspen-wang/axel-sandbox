import { components } from '@/dashboard.config'
import { notFound } from 'next/navigation'
import ComponentPreview from './ComponentPreview'

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }))
}

export default function ComponentPreviewPage({ params, searchParams }) {
  const comp = components.find((c) => c.slug === params.slug)
  if (!comp) notFound()

  return <ComponentPreview slug={comp.slug} version={searchParams.v || 'A'} />
}
