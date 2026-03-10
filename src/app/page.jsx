import { screens, flows, components } from '@/dashboard.config'
import { readIterations } from '@/lib/iterations'
import DashboardShell from './DashboardShell'

export const dynamic = 'force-dynamic'

export default function Dashboard() {
  const iterations = readIterations()

  return (
    <DashboardShell
      screens={screens}
      flows={flows}
      components={components}
      iterations={iterations}
    />
  )
}
