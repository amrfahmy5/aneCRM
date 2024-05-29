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
        label="Money"
        name="amount"
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
        label="Transfer From"
        name="moneyFrom"
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
        label="Transfer To"
        name="moneyTo"
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
    </>
  );
}
