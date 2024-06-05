import { ErpLayout } from '@/layout';
import PaymentOrderSupplierERP from './components/PaymentOrderSupplierERP';
import DataTableDropMenu from './components/DataTableDropMenu';

export default function PaymentInvoiceDataTableModule({ config }) {
  return (
    <ErpLayout>
      <PaymentOrderSupplierERP config={config} DataTableDropMenu={DataTableDropMenu}></PaymentOrderSupplierERP>
    </ErpLayout>
  );
}
