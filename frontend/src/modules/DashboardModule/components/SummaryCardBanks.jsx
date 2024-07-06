import { Tag, Divider, Row, Col, Spin, Tooltip } from 'antd';
function formatCurrency(value) {
  return `${value} L.E`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
export default function AnalyticSummaryCard({
  banks,
  isLoading = false,
}) {
  let banksdiv = banks.map(bank => {
    let tagContentTotal =
      (bank?.totalPaymentInvoice || 0) -
      (bank?.totalPaymentSO || 0) -
      (bank?.totalExpense || 0) -
      (bank?.totalWithdrawals || 0) -
      (bank?.totalMoneySend || 0) +
      (bank?.totalMoneyReceived || 0) &&
      formatCurrency(
        (bank?.totalPaymentInvoice || 0) -
        (bank?.totalPaymentSO || 0) -
        (bank?.totalExpense || 0) -
        (bank?.totalWithdrawals || 0) -
        (bank?.totalMoneySend || 0) +
        (bank?.totalMoneyReceived || 0)
      )
    return (
      <Row gutter={[0, 0]} justify="space-between" wrap={false}>
        <Col className="gutter-row" flex="70px" style={{ textAlign: 'left' }}>
          <div className="left" style={{ whiteSpace: 'nowrap', marginTop: '5px' }}>
            {bank.name}
          </div>
        </Col>
        <Divider
          style={{
            height: '100%',
            padding: '10px 0',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          type="vertical"
        ></Divider>
        <Col
          className="gutter-row"
          flex="auto"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isLoading ? (
            <Spin />
          ) : (
            <Tooltip title={tagContentTotal}>
              <Tag
                color={"black"}
                style={{
                  margin: '0 auto',
                  justifyContent: 'center',
                  maxWidth: '110px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {tagContentTotal ? tagContentTotal : '0.00 L.E'}
              </Tag>
            </Tooltip>
          )}
        </Col>

      </Row>)
  });

  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      md={{ span: 12 }}
      lg={{ span: 6 }}
    >
      <div
        className="whiteBox shadow"
        style={{ color: '#595959', fontSize: 13, minHeight: '106px', height: '100%' }}
      >
        <div className="pad15 strong" style={{ textAlign: 'center', justifyContent: 'center' , backgroundColor:'#cd2027' }}>
          <h3 style={{ color: '#22075e', marginBottom: 0, textTransform: 'capitalize' }}>
            Bank Accounts
          </h3>
        </div>
        <Divider style={{ padding: 0, margin: 0 }}></Divider>
        <div className="pad15">
          {banksdiv}
        </div>
      </div>
    </Col>
  );
}
