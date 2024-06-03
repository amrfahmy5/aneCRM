import configPage from './config';
import UpdateSupplierOrderModule from '@/modules/SupplierOrderModule/UpdateSupplierOrderModule';

export default function InvoiceUpdate() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <UpdateSupplierOrderModule config={config} />;
}
