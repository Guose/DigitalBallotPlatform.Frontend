import { Main } from './components/Main/Main'
import { AuditLog } from './components/Audit/AuditLog'
import { DataExport } from './components/DataExport/DataExport'
import { DataSource } from './components/DataSource/DataSource'
import { ElectionSetup } from './components/ElectionSetup/ElectionSetup'
import { MailSorting } from './components/MailSorting/MailSorting'
import { PullList } from './components/PullList/PullList'
import { Reporting } from './components/Reporting/Reporting'
import { Tags } from './components/Tags/Tags'

const AppRoutes = [
  {
    index: true,
    element: <Main />
  },
  {
    path: '/audit-log',
    element: <AuditLog />
  },
  {
    path: '/data-export',
    element: <DataExport />
  },
  {
    path: '/data-source',
    element: <DataSource />
  },
  {
    path: '/election-setup',
    element: <ElectionSetup />
  },
  {
    path: '/mail-sorting',
    element: <MailSorting />
  },
  {
    path: '/pull-list',
    element: <PullList />
  },
  {
    path: '/reporting',
    element: <Reporting />
  },
  {
    path: '/tags',
    element: <Tags />
  },
]

export default AppRoutes