import dayjs from 'dayjs';
import { Tag } from 'antd';
import React from 'react';

import CrudModule from '@/modules/CrudModule';
import LeadForm from '@/forms/TransferMoneyForm';

import configPage from './config';

export default function Lead() {
  const searchConfig = {
    displayLabels: ['firstname', 'company'],
    searchFields: 'description,moneyFrom,moneyTo',
    outputValue: '_id',
  };
  const entityDisplayLabels = ['number', 'company'];

  const readColumns = [
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
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Transfer From',
      dataIndex: 'moneyFrom.name',
    },
    {
      title: 'Transfer To',
      dataIndex: 'moneyTo.name',
    },
  ];

  const dataTableColumns = [
    {
      title: 'Transfer From',
      dataIndex: ['moneyFrom','name'],
    },
    {
      title: 'Transfer To',
      dataIndex: ['moneyTo','name']
    },
    {
      title: 'Money',
      dataIndex: ['amount'],
    },
    {
      title: 'date',
      dataIndex: ['date'],
      render: (date) => dayjs(date).format('DD/MM/YYYY'),

    },
    {
      title: 'Description',
      dataIndex: ['description'],
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
