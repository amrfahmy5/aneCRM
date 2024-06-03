import React from 'react';

import CrudModule from '@/modules/CrudModule';
import SupplierForm from '@/forms/SupplierForm';

function Supplier() {
  const entity = 'supplier';
  const searchConfig = {
    displayLabels: ['company'],
    searchFields: 'company,managerSurname,managerName',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['company'];

  const readColumns = [
    {
      title: 'Company',
      dataIndex: 'company',
    },
    {
      title: 'Manager Name',
      dataIndex: 'managerName',
    },
    {
      title: 'Manager Surname',
      dataIndex: 'managerSurname',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'tel',
    },
    {
      title: 'Bank Account',
      dataIndex: 'bankAccount',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
  ];
  const dataTableColumns = [
    {
      title: 'Company',
      dataIndex: 'company',
    },

    {
      title: 'Manager Name',
      dataIndex: 'managerName',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'tel',
    },
  ];

  const ADD_NEW_ENTITY = 'Add new Supplier';
  const DATATABLE_TITLE = 'Supplier List';
  const ENTITY_NAME = 'supplier';
  const CREATE_ENTITY = 'Create supplier';
  const UPDATE_ENTITY = 'Update supplier';
  const PANEL_TITLE = 'Supplier Panel';

  const config = {
    entity,
    PANEL_TITLE,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <CrudModule
      createForm={<SupplierForm />}
      updateForm={<SupplierForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Supplier;
