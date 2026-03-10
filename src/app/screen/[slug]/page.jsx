import { screens } from '@/dashboard.config'
import { notFound } from 'next/navigation'
import ScreenView from './ScreenView'

export function generateStaticParams() {
  return screens
    .filter((s) => s.component)
    .map((s) => ({ slug: s.slug }))
}

export default function ScreenPage({ params, searchParams }) {
  const screen = screens.find((s) => s.slug === params.slug)
  if (!screen || !screen.component) notFound()

  return <ScreenView slug={screen.slug} version={searchParams.v || null} />
}
