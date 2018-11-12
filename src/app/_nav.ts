export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
 

 
  {
    name: 'Forms',
    url: '/forms',
    icon: 'icon-note',
    children: [
      {
        name: 'Basic Forms',
        url: '/forms/basic-forms',
        icon: 'icon-note'
      },
      {
        name: 'Advanced',
        url: '/forms/advanced-forms',
        icon: 'icon-note',
        badge: {
          variant: 'danger',
          text: 'PRO'
        }
      },
      {
        name: 'Validation',
        url: '/forms/validation-forms',
        icon: 'icon-note',
        badge: {
          variant: 'danger',
          text: 'PRO'
        }
      },
    ]
  },
  
   
  {
    name: 'Customer',
    url: '/customer',
    icon: 'icon-people',
    children: [
      {
        name: 'Add Customer',
        url: '/customer/add-customer',
        icon: 'icon-plus'
      },
      {
        name: 'Search Customer',
        url: '/customer/search-customer',
        icon: 'icon-magnifier'
      },     
       {
        name: 'Edit Customer',
        url: '/customer/edit-customer',
        icon: 'icon-pencil'
      },
    ]
  },
  

];
