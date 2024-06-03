import configPage from './config';
import ReadSupplierOrderModule from '@/modules/SupplierOrderModule/ReadSupplierOrderModule';

export default function InvoiceRead() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <ReadSupplierOrderModule config={config} />;
}
