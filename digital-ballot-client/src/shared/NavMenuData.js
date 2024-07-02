import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as VscIcons from 'react-icons/vsc'
import * as LiaIcons from 'react-icons/lia'
import * as CgIcons from 'react-icons/cg'
import * as BiIcons from 'react-icons/bi'

export const NavMenuData = [
  {
    title: 'Main',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Audit Log',
    path: '/audit-log',
    icon: <AiIcons.AiOutlineAudit/>,
    cName: 'nav-text'
  },
  {
    title: 'Data Export',
    path: '/data-export',
    icon: <FaIcons.FaFileExport/>,
    cName: 'nav-text'
  },
  {
    title: 'Data Source',
    path: '/data-source',
    icon: <FaIcons.FaFileImport/>,
    cName: 'nav-text'
  },
  {
    title: 'Election Setup',
    path: '/election-setup',
    icon: <VscIcons.VscServerProcess/>,
    cName: 'nav-text'
  },
  {
    title: 'Mail Sorting',
    path: '/mail-sorting',
    icon: <LiaIcons.LiaMailBulkSolid/>,
    cName: 'nav-text'
  },
  {
    title: 'Pull List',
    path: '/pull-list',
    icon: <CgIcons.CgPlayListRemove/>,
    cName: 'nav-text'
  },
  {
    title: 'Reporting',
    path: '/reporting',
    icon: <BiIcons.BiSolidReport/>,
    cName: 'nav-text'
  },
  {
    title: 'Tags',
    path: '/tags',
    icon: <FaIcons.FaTags/>,
    cName: 'nav-text'
  },
]