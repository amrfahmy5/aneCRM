import React, { useState, useEffect } from 'react';
import { Form, Divider, Button, PageHeader, Tag } from 'antd';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectUpdatedItem } from '@/redux/erp/selectors';

import { useErpContext } from '@/context/erp';

import Loading from '@/components/Loading';

import calculate from '@/utils/calculate';
import PaymentInvoiceForm from '../../Forms/PaymentInvoiceForm';
export default function UpdatePayment({ config, currentSupplierOrder ,date}) {
  let { entity } = config;
  const dispatch = useDispatch();

  const { isLoading, isSuccess } = useSelector(selectUpdatedItem);

  const [form] = Form.useForm();

  const [maxAmount, setMaxAmount] = useState(0);

  useEffect(() => {
    if (currentSupplierOrder) {
      const { credit, total, discount, amount } = currentSupplierOrder;
      // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      // console.log(credit+"---"+total+"---"+discount+"---"+amount+"---");

      // console.log(calculate.sub(calculate.sub(total, discount), calculate.sub(calculate.sub(credit, amount))));

      setMaxAmount(
        
        calculate.sub(calculate.sub(total, discount), calculate.sub(calculate.sub(credit, amount)))
      );
      if(date){
        currentSupplierOrder.date = dayjs(date);
      }
      else if (currentSupplierOrder.date) {
        currentSupplierOrder.date = dayjs(currentSupplierOrder.date);
      }
      form.setFieldsValue(currentSupplierOrder);
    }
  }, [currentSupplierOrder]);

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'recordPayment' }));
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
      erp.update({
        entity,
        id: currentSupplierOrder._id,
        jsonData: fieldsValue,
      })
    );
  };

  return (
    <>
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <PaymentInvoiceForm maxAmount={maxAmount} />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Payment
            </Button>
          </Form.Item>
        </Form>
      </Loading>
    </>
  );
}
