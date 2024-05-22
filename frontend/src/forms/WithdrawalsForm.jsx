import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';
import { DatePicker, TimePicker, Calendar } from '@/components/CustomAntd';
import dayjs from 'dayjs';
import { useMoney } from '@/settings';
import SelectAsync from '@/components/SelectAsync';
import { PlusOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/auth/selectors';

export default function LeadForm() {
  const money = useMoney();
  const { TextArea } = Input;
  const currentAdmin = useSelector(selectAuth);

  return (
    <>
      <Form.Item
        label="Title"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input name!',
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        name="total"
        fieldKey="price"
        rules={[{ required: true, message: 'Missing money' }]}
      >
        <InputNumber
          className="moneyInput"
          min={0}
          controls={false}
          addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
          addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
        />
      </Form.Item>

      <Form.Item
        label="Source"
        name="status"
        rules={[
          {
            required: false,
            message: 'Please input source of money status!',
          },
        ]}
        initialValue={'personal'}
      >
        <Select
          options={[
            { value: 'personal', label: 'Personal' },
            { value: 'company', label: 'Company' },
          ]}
        ></Select>
      </Form.Item>

      <Form.Item
        label="Payment Mode"
        name="paymentMode"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <SelectAsync
          entity={'paymentMode'}
          displayLabels={['name']}
          withRedirect={true}
          urlToRedirect="/payment/mode"
          redirectLabel="Add Payment Mode"
        ></SelectAsync>
      </Form.Item>

      <Form.Item
        name="date"
        label="Date"
        rules={[
          {
            required: true,
            message: 'Please input date!',
          },
        ]}
        initialValue={dayjs()}
      >
        <DatePicker format={'DD/MM/YYYY'} />
      </Form.Item>

      <Form.Item label="description" name="description">
        <TextArea />
      </Form.Item>

      <Form.Item
        label="By"
        name="created_by"
        rules={[
          {
            required: true,
            message: 'Please input name!',
          },
        ]}
        initialValue={currentAdmin?.name}
      >
        <Input />
      </Form.Item>
    </>
  );
}
