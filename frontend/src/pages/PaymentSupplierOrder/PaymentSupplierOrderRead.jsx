import configPage from './config';
import ReadPaymentSupplierOrderModule from '@/modules/PaymentSupplierOrderModule/ReadPaymentSupplierOrderModule';

export default function PaymentInvoiceRead() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <ReadPaymentSupplierOrderModule config={config} />;
}
