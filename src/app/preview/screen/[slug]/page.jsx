import { screens } from '@/dashboard.config'
import { notFound } from 'next/navigation'
import ScreenPreview from './ScreenPreview'

export function generateStaticParams() {
  return screens
    .filter((s) => s.component)
    .map((s) => ({ slug: s.slug }))
}

export default function ScreenPreviewPage({ params, searchParams }) {
  const screen = screens.find((s) => s.slug === params.slug)
  if (!screen || !screen.component) notFound()

  return <ScreenPreview slug={screen.slug} version={searchParams.v || 'A'} />
}
