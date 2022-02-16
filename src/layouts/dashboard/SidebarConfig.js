
import React from 'react';

import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Adverts',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Categories',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },

  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill)
  // },


  {
    title: 'Inbox',
    path: '/dashboard/inbox',
    icon: getIcon(lockFill)
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon(lockFill)
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon(personAddFill)
  },

  {
    title: 'Settings',
    path: '/register',
    icon: getIcon(personAddFill)
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon(alertTriangleFill)
  }
];

const sidebarConfigOther = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'My Adverts',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'My Wallet',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'My Bookings',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'My Account',
    path: '/login',
    icon: getIcon(lockFill)
  },
  {
    title: 'Rent Payment',
    path: '/register',
    icon: getIcon(personAddFill)
  }
];


export default sidebarConfig;
