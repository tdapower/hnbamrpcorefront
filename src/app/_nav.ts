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
      //  {
      //   name: 'Edit Customer',
      //   url: '/customer/edit-customer',
      //   icon: 'icon-pencil'
      // },
    ]
  },

  {
    name: 'Hospital',
    url: '/hospital',
    icon: 'icon-people',
    children: [
      {
        name: 'Add Hospital',
        url: '/hospital/add-hospital',
        icon: 'icon-plus'
      },
      {
        name: 'Search Hospital',
        url: '/hospital/search-hospital',
        icon: 'icon-magnifier'
      }
    ]
  },
  {
    name: 'Workflow Job',
    url: '/workflowjob',
    icon: 'icon-people',
    children: [
      {
        name: 'Add Job',
        url: '/workflowjob/add-workflowjob',
        icon: 'icon-plus'
      },
      {
        name: 'Search Job',
        url: '/workflowjob/search-workflowjob',
        icon: 'icon-magnifier'
      },     
      //  {
      //   name: 'Edit Job',
      //   url: '/workflowjob/edit-workflowjob',
      //   icon: 'icon-pencil'
      // },
      
    ]
  },
  
  {
    name: 'Medical Letter',
    url: '/medicalletter',
    icon: 'icon-people',
    children: [
      {
        name: 'Generate',
        url: '/medicalletter/generate-medicalletter',
        icon: 'icon-plus'
      }
    ]
  }
 
  ,
  
  {
    name: 'Proposal',
    url: '/proposal',
    icon: 'icon-people',
    children: [
      {
        name: 'Search Proposal',
        url: '/proposal/search-proposal',
        icon: 'icon-plus'
      }
    ]
  }

];
