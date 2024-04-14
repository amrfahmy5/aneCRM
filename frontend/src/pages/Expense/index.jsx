import dayjs from 'dayjs';
import { Tag } from 'antd';
import React from 'react';

import CrudModule from '@/modules/CrudModule';
import LeadForm from '@/forms/ExpenseForm';

import configPage from './config';

export default function Lead() {
  const searchConfig = {
    displayLabels: ['firstname', 'company'],
    searchFields: 'firstname,company',
    outputValue: '_id',
  };
  const entityDisplayLabels = ['number', 'company'];

  const readColumns = [
    {
      title: 'Title',
      dataIndex: 'name',
    },
    {
      title: 'Expense Category',
      dataIndex: 'expenseCategory.name'
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: 'Payment Mode',
      dataIndex: 'paymentMode.name',
    },
    {
      title: 'Source',
      dataIndex: 'status',
      render: (status) => {
        let color =
          status === 'personal'
            ? 'cyan'
            : status === 'company'
            ? 'blue'
            : 'red';
        return <Tag color={color}>{status && status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Created by',
      dataIndex: 'created_by',
    },
  ];

  const dataTableColumns = [
    {
      title: 'Title',
      dataIndex: ['name'],
    },
    {
      title: 'Expense Category',
      dataIndex: ['expenseCategory','name']
    },
    {
      title: 'Money',
      dataIndex: ['total'],
    },
    {
      title: 'date',
      dataIndex: ['date'],
      render: (date) => dayjs(date).format('DD/MM/YYYY'),

    },
    {
      title: 'Source',
      dataIndex: 'status',
      render: (status) => {
        let color =
          status === 'personal'
            ? 'cyan'
            : status === 'company'
            ? 'blue'
            : 'red';
        return <Tag color={color}>{status && status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Created by',
      dataIndex: ['created_by'],
    },
  ];

  const config = {
    ...configPage,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <CrudModule
      createForm={<LeadForm />}
      updateForm={<LeadForm isUpdateForm={true} />}
      config={config}
    />
  );
}
