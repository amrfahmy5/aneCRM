import configPage from './config';
import RecordPaymentSupplierOrderModule from '@/modules/SupplierOrderModule/RecordPaymentSupplierOrderModule';

export default function SupplierOrderRecord() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <RecordPaymentSupplierOrderModule config={config} />;
}
