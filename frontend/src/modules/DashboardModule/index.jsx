import React from 'react';
import { Tag, Row, Col } from 'antd';

import { DashboardLayout } from '@/layout';

import { request } from '@/request';
import useFetch from '@/hooks/useFetch';

import RecentTable from './components/RecentTable';

import SummaryCard from './components/SummaryCard';
import SummaryCardPayment from './components/SummaryPayment';

import PreviewCard from './components/PreviewCard';
import CustomerPreviewCard from './components/CustomerPreviewCard';
import ChartTS from './components/ChartTimeSeries';
import ChartTSInvoice from './components/ChartTimeSeriesInvoice';
import ChartTSTWO from './components/ChartTSTWO';

import ChartPies from './components/ChartPie';
import ChartBars from './components/ChartBar';

const dataTableColumns = [
  {
    title: 'N#',
    dataIndex: 'number',
  },
  {
    title: 'Client',
    dataIndex: ['client', 'company'],
  },

  {
    title: 'Total',
    dataIndex: 'total',

    render: (total) => ` ${total} L.E`.replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status) => {
      let color = status === 'Draft' ? 'volcano' : 'green';

      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
];


function mergeMultipleArrays(arrays, key) {
  const map = new Map();
  arrays.forEach((arr) => {
    if (!arr) return;
    arr.forEach((item) => {
      if (map.has(item[key])) {
        map.set(item[key], { ...map.get(item[key]), ...item });
      } else {
        map.set(item[key], { ...item });
      }
    });
  });

  return Array.from(map.values());
}
function formatCurrency(value) {
  return `${value} L.E`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
export default function DashboardModule() {
  const { result: invoiceResult, isLoading: invoiceLoading } = useFetch(() =>
    request.summary({ entity: 'invoice' })
  );

  const { result: quoteResult, isLoading: quoteLoading } = useFetch(() =>
    request.summary({ entity: 'quote' })
  );
  const { result: transferMoneuResult, isLoading: transferMoneuLoading } = useFetch(() =>
    request.summary({ entity: 'transferMoney' })
  );
  // const { result: offerResult, isLoading: offerLoading } = useFetch(() =>
  //   request.summary({ entity: 'offer' })
  // );

  const { result: paymentResult, isLoading: paymentLoading } = useFetch(() =>
    request.summary({ entity: 'payment/invoice' })
  );
  const { result: clientResult, isLoading: clientLoading } = useFetch(() =>
    request.summary({ entity: 'client' })
  );
  const { result: withdrawalsResult, isLoading: withdrawalsLoading } = useFetch(() =>
    request.summary({ entity: 'withdrawals' })
  );
  const { result: expenseResult, isLoading: expenseLoading } = useFetch(() =>
    request.summary({ entity: 'expense' })
  );


  const resEntityDate = mergeMultipleArrays(
    [
      withdrawalsResult?.withdrawalssByPM,
      paymentResult?.paymentInvoiceByPM,
      expenseResult?.expensesByPM,
      transferMoneuResult?.transferFromByPM,
      transferMoneuResult?.transferToByPm,
    ],
    'name'
  );
  const cardsTotalSummary = resEntityDate.map((data, index) => {
    return (
      <SummaryCardPayment
        key={index}
        title={data?.name}
        tagColorPayment={'green'}
        tagColorExpense={'red'}
        tagColorWithdrawals={'gray'}
        tagColorMoneyTranfer={'pink'}
        tagColorMoneyReceived={'yellow'}
        tagColorTotal={'black'}
        prefixPayment={'Payment'}
        prefixExpense={'Expense'}
        prefixWithdrawals={'Withdrawals'}
        prefixMoneyTranfer={'Transfer'}
        prefixMoneyReceived={'Received'}
        tagContentPayment={data?.totalPaymentInvoice && formatCurrency(data?.totalPaymentInvoice)}
        tagContentExpense={data?.totalExpense && formatCurrency(data?.totalExpense)}
        tagContentWithdrawals={data?.totalWithdrawals && formatCurrency(data?.totalWithdrawals)}
        tagContentMoneyTranfer={data?.totalMoneySend && formatCurrency(data?.totalMoneySend)}
        tagContentMoneyReceived={
          data?.totalMoneyReceived && formatCurrency(data?.totalMoneyReceived)
        }
        tagContentTotal={
          (data?.totalPaymentInvoice || 0) -
            (data?.totalExpense || 0) -
            (data?.totalWithdrawals || 0) -
            (data?.totalMoneySend || 0) +
            (data?.totalMoneyReceived || 0) &&
          formatCurrency(
            (data?.totalPaymentInvoice || 0) -
              (data?.totalExpense || 0) -
              (data?.totalWithdrawals || 0) -
              (data?.totalMoneySend || 0) +
              (data?.totalMoneyReceived || 0)
          )
        }
      />
    );
  });

  const entityData = [
    {
      result: invoiceResult,
      isLoading: invoiceLoading,
      entity: 'invoice',
    },
    {
      result: quoteResult,
      isLoading: quoteLoading,
      entity: 'quote',
    },
    {
      result: paymentResult,
      isLoading: paymentLoading,
      entity: 'payment',
    },
    {
      result: expenseResult,
      isLoading: expenseLoading,
      entity: 'expense',
    },
    {
      result: withdrawalsResult,
      isLoading: withdrawalsLoading,
      entity: 'withdrawals',
    },
    {
      result: transferMoneuResult,
      isLoading: transferMoneuLoading,
      entity: 'Transfering',
    },
  ];

  const cards = entityData.map((data, index) => {
    const { result, entity, isLoading } = data;
    if (entity === 'offer') return null;
    return (
      <SummaryCard
        key={index}
        title={data?.entity === 'paymentInvoice' ? 'Payment' : data?.entity}
        tagColor={
          data?.entity === 'invoice'
            ? 'cyan'
            : data?.entity === 'quote'
            ? 'purple'
            : data?.entity === 'expense'
            ? 'red'
            : data?.entity === 'withdrawals'
            ? 'gray'
            : data?.entity === 'Transfering'
            ? 'yellow'
            : 'green'
        }
        prefix={'This month'}
        isLoading={isLoading}
        tagContent={result?.total && formatCurrency(result?.total)}
      />
    );
  });

  const statisticCards = entityData.map((data, index) => {
    const { result, entity, isLoading } = data;
    if (entity === 'payment' || entity === 'expense' || entity === 'withdrawals' ||entity === 'Transfering') return null;
    return (
      <PreviewCard
        key={index}
        title={`${data?.entity.charAt(0).toUpperCase() + data?.entity.slice(1)} Preview`}
        isLoading={isLoading}
        entity={entity}
        statistics={
          !isLoading &&
          result?.performance?.map((item) => ({
            tag: item?.status,
            color: 'blue',
            value: item?.percentage,
            total: item?.total,
          }))
        }
      />
    );
  });

  return (
    <DashboardLayout>
      <Row gutter={[24, 24]}>{cards}</Row>

      <div className="space30"></div>
      <Row gutter={[24, 24]}>{cardsTotalSummary}</Row>

      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 18 }}>
          <div className="whiteBox shadow" style={{ minHeight: '380px', height: '100%' }}>
            <Row className="pad10" gutter={[0, 0]}>
              {statisticCards}
            </Row>
          </div>
        </Col>
        <Col className="gutter-row w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
          <CustomerPreviewCard
            isLoading={clientLoading}
            activeCustomer={clientResult?.active}
            newCustomer={clientResult?.new}
          />
        </Col>
      </Row>

      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        
        
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <ChartBars expenses={expenseResult} title={'Expenses By Wallet'} />
        </Col>
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <ChartTS expenses={expenseResult} />
        </Col>  
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 8 }}>
          <ChartPies expenses={expenseResult} title={'Expense Category'} />
        </Col>
      </Row>

      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <ChartTSTWO
            title1={'sales'}
            Date={invoiceResult?.totalInvoiceMonthly}
            title2={'payment'}
            Date2={paymentResult?.totalPaymentMonthly}
          />
        </Col>
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <ChartTSInvoice title="Expense" Date={expenseResult?.totalExpenseMonthly} />
        </Col>
      </Row>

      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow" style={{ height: '100%' }}>
            <div className="pad20">
              <h3 style={{ color: '#22075e', marginBottom: 5 }}>Recent Invoices</h3>
            </div>

            <RecentTable entity={'invoice'} dataTableColumns={dataTableColumns} />
          </div>
        </Col>

        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow" style={{ height: '100%' }}>
            <div className="pad20">
              <h3 style={{ color: '#22075e', marginBottom: 5 }}>Recent Quotes</h3>
            </div>
            <RecentTable entity={'quote'} dataTableColumns={dataTableColumns} />
          </div>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
