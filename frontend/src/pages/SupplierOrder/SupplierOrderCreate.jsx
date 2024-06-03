import configPage from './config';
import CreateSupplierOrderModule from '@/modules/SupplierOrderModule/CreateSupplierOrderModule';

const customConfig = {
  /*your custom config*/
};
const config = {
  ...configPage,
  //customConfig,
};

export default function SupplierOrderCreate() {
  return <CreateSupplierOrderModule config={config} />;
}
