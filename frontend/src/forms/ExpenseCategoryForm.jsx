import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Switch, Button, Select, Divider, Row, Col } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

export default function LeadForm() {

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
      <Form.Item label="description" name="description">
        <Input />
      </Form.Item>
      <Form.Item
        label="Mode enabled"
        name="enabled"
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingRight: '5px',
        }}
        valuePropName="checked"
        initialValue={true}
      >
        <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
      </Form.Item>
    </>
  );
}
