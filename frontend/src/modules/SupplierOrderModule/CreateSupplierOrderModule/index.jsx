import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import SuuplierOrderForm from '@/modules/SupplierOrderModule/Forms/SuuplierOrderForm';

export default function CreateSupplierOrderModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={SuuplierOrderForm} />
    </ErpLayout>
  );
}
