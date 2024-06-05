import configPage from './config';
import UpdatePaymentSupplierOrderModule from '@/modules/PaymentSupplierOrderModule/UpdatePaymentSupplierOrderModule';

export default function PaymentInvoiceUpdate() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <UpdatePaymentSupplierOrderModule config={config} />;
}
