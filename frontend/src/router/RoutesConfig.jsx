import React from 'react';
// import {
//   DesktopOutlined,
//   SettingOutlined,
//   CustomerServiceOutlined,
//   FileTextOutlined,
//   FileSyncOutlined,
//   DashboardOutlined,
//   TeamOutlined,
//   UserOutlined,
//   CreditCardOutlined,
//   BankOutlined,
// } from "@ant-design/icons";

// export const IconMenu = ({ name }) => {
//   const components = {
//     DesktopOutlined: DesktopOutlined,
//     SettingOutlined: SettingOutlined,
//     CustomerServiceOutlined: CustomerServiceOutlined,
//     FileTextOutlined: FileTextOutlined,
//     FileSyncOutlined: FileSyncOutlined,
//     DashboardOutlined: DashboardOutlined,
//     TeamOutlined: TeamOutlined,
//     UserOutlined: UserOutlined,
//     CreditCardOutlined: CreditCardOutlined,
//     BankOutlined: BankOutlined,
//     Default: DesktopOutlined,
//   };

//   const IconTag = components[name || "Default"] || SettingOutlined;
//   return <IconTag />;
// };

export const routesConfig = [
  {
    path: '/',
    component: 'Dashboard',
  },
  {
    path: '/customer',
    component: 'Customer',
  },
  {
    path: '/invoice',
    component: 'Invoice/index',
  },
  {
    path: '/invoice/create',
    component: 'Invoice/InvoiceCreate',
  },
  {
    path: '/invoice/read/:id',
    component: 'Invoice/InvoiceRead',
  },
  {
    path: '/invoice/update/:id',
    component: 'Invoice/InvoiceUpdate',
  },
  {
    path: '/invoice/pay/:id',
    component: 'Invoice/InvoiceRecordPayment',
  },
  {
    path: '/quote',
    component: 'Quote/index',
  },
  {
    path: '/quote/create',
    component: 'Quote/QuoteCreate',
  },
  {
    path: '/quote/read/:id',
    component: 'Quote/QuoteRead',
  },
  {
    path: '/quote/update/:id',
    component: 'Quote/QuoteUpdate',
  },
  {
    path: '/payment/invoice',
    component: 'PaymentInvoice/index',
  },
  {
    path: '/payment/invoice/create',
    component: 'PaymentInvoice/PaymentInvoiceCreate',
  },
  {
    path: '/payment/invoice/read/:id',
    component: 'PaymentInvoice/PaymentInvoiceRead',
  },
  {
    path: '/payment/invoice/update/:id',
    component: 'PaymentInvoice/PaymentInvoiceUpdate',
  },
  {
    path: '/employee',
    component: 'Employee',
  },
  {
    path: '/admin',
    component: 'Admin',
  },
  {
    path: '/settings',
    component: 'Settings/Settings',
  },
  {
    path: '/payment/mode',
    component: 'PaymentMode',
  },
  {
    path: '/expenseCategory/list',
    component: 'expenseCategory',
  },
  {
    path: '/email',
    component: 'Email/index',
  },
  {
    path: '/email/read/:id',
    component: 'Email/EmailRead',
  },
  {
    path: '/email/update/:id',
    component: 'Email/EmailUpdate',
  },
  {
    path: '/settings/advanced',
    component: 'AdvancedSettings',
  },
  {
    path: '/profile',
    component: 'Profile',
  },
  {
    path: '/lead',
    component: 'Lead/index',
  },
  {
    path: '/lead/create',
    component: 'Lead/LeadCreate',
  },
  {
    path: '/lead/read/:id',
    component: 'Lead/LeadRead',
  },
  {
    path: '/lead/update/:id',
    component: 'Lead/LeadUpdate',
  },
  {
    path: '/offer',
    component: 'Offer/index',
  },
  {
    path: '/offer/create',
    component: 'Offer/OfferCreate',
  },
  {
    path: '/offer/read/:id',
    component: 'Offer/OfferRead',
  },
  {
    path: '/offer/update/:id',
    component: 'Offer/OfferUpdate',
  },

  {
    path: '/expense',
    component: 'Expense/index',
  },
  {
    path: '/expense/create',
    component: 'Expense/ExpenseCreate',
  },
  {
    path: '/expense/read/:id',
    component: 'Expense/ExpenseRead',
  },
  {
    path: '/expense/update/:id',
    component: 'Expense/ExpenseUpdate',
  },


  {
    path: '/withdrawals',
    component: 'Withdrawals/index',
  },
  {
    path: '/withdrawals/create',
    component: 'Withdrawals/WithdrawalsCreate',
  },
  {
    path: '/withdrawals/read/:id',
    component: 'Withdrawals/WithdrawalsRead',
  },
  {
    path: '/withdrawals/update/:id',
    component: 'Withdrawals/WithdrawalsUpdate',
  },


  {
    path: '/transferMoney',
    component: 'TransferMoney/index',
  },
  {
    path: '/transferMoney/create',
    component: 'TransferMoney/transferMoneyCreate',
  },
  {
    path: '/transferMoney/read/:id',
    component: 'TransferMoney/transferMoneyRead',
  },
  {
    path: '/transferMoney/update/:id',
    component: 'TransferMoney/transferMoneyUpdate',
  },


  {
    path: '/expenseCategory',
    component: 'ExpenseCategory/index',
  },
  {
    path: '/expenseCategory/create',
    component: 'ExpenseCategory/ExpenseCategoryCreate',
  },
  {
    path: '/expenseCategory/read/:id',
    component: 'ExpenseCategory/ExpenseCategoryRead',
  },
  {
    path: '/expenseCategory/update/:id',
    component: 'ExpenseCategory/ExpenseCategoryUpdate',
  },


  {
    path: '/supplier',
    component: 'Supplier',
  },
  {
    path: '/supplierOrder',
    component: 'SupplierOrder/index',
  },
  {
    path: '/supplierOrder/create',
    component: 'SupplierOrder/SupplierOrderCreate',
  },
  {
    path: '/supplierOrder/read/:id',
    component: 'SupplierOrder/SupplierOrderRead',
  },
  {
    path: '/supplierOrder/update/:id',
    component: 'SupplierOrder/SupplierOrderUpdate',
  },
  {
    path: '/supplierOrder/pay/:id',
    component: 'SupplierOrder/SupplierOrderRecordPayment',
  },

  {
    path: '/payment/supplierOrder',
    component: 'PaymentSupplierOrder/index',
  },
  {
    path: '/payment/supplierOrder/create',
    component: 'PaymentSupplierOrder/PaymentSupplierOrderCreate',
  },
  {
    path: '/payment/supplierOrder/read/:id',
    component: 'PaymentSupplierOrder/PaymentSupplierOrderRead',
  },
  {
    path: '/payment/supplierOrder/update/:id',
    component: 'PaymentSupplierOrder/PaymentSupplierOrderUpdate',
  },

];
