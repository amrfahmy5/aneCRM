import dayjs from 'dayjs';
import configPage from './config';
import PaymentSupplierOrderDataTableModule from '@/modules/PaymentSupplierOrderModule/PaymentSupplierOrderDataTableModule';

export default function PaymentInvoice() {
  const searchConfig = {
    displayLabels: ['number'],
    searchFields: 'number',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['number'];
  const dataTableColumns = [
    {
      title: 'Number',

      dataIndex: 'number',
    },
    {
      title: 'Supplier',
      dataIndex: ['supplier', 'company'],
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Order Number',
      dataIndex: ['supplierOrder', 'number'],
    },
    {
      title: 'Order year',
      dataIndex: ['supplierOrder', 'year'],
    },
    {
      title: 'Payment Mode',
      dataIndex: ['paymentMode', 'name'],
    },
  ];

  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return <PaymentSupplierOrderDataTableModule config={config} />;
}
