import React, { useState, useEffect } from 'react';
import { Form, Divider, Button, PageHeader, Tag } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectCurrentItem, selectRecordPaymentItem } from '@/redux/erp/selectors';

import { useErpContext } from '@/context/erp';

import Loading from '@/components/Loading';

import PaymentSupplierOrderForm from '@/forms/PaymentSupplierOrderForm';

import calculate from '@/utils/calculate';

export default function RecordPayment({ config }) {
  let { entity } = config;
  const { erpContextAction } = useErpContext();
  const { recordPanel } = erpContextAction;
  const dispatch = useDispatch();

  const { isLoading, isSuccess, current: currentSupplierOrder } = useSelector(selectRecordPaymentItem);
  console.log("currentSupplierOrder:::::::::::::::")

  console.log(currentSupplierOrder)
  const [form] = Form.useForm();

  const [maxAmount, setMaxAmount] = useState(0);
  useEffect(() => {
    if (currentSupplierOrder) {
      const { credit, total, discount } = currentSupplierOrder;

      setMaxAmount(calculate.sub(calculate.sub(total, discount), credit));
    }
  }, [currentSupplierOrder]);
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'recordPayment' }));
      recordPanel.close();
      dispatch(erp.list({ entity }));
    }
  }, [isSuccess]);

  const onSubmit = (fieldsValue) => {
    if (currentSupplierOrder) {
      const { _id: supplierOrder } = currentSupplierOrder;
      const supplier = currentSupplierOrder.supplier && currentSupplierOrder.supplier._id;
      fieldsValue = {
        ...fieldsValue,
        supplierOrder,
        supplier,
      };
    }

    dispatch(
      erp.recordPayment({
        entity: 'payment/supplierOrder',
        jsonData: fieldsValue,
      })
    );
  };

  return (
    <>
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <PaymentSupplierOrderForm maxAmount={maxAmount} />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Record Payment
            </Button>
          </Form.Item>
        </Form>
      </Loading>
    </>
  );
}
