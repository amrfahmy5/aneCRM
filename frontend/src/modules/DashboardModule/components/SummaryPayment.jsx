import { Tag, Divider, Row, Col, Spin, Tooltip } from 'antd';

export default function AnalyticSummaryCard({
  title,
  tagContent1,
  tagContent2,
  tagContent3,
  tagColor1,
  tagColor2,
  tagColor3,
  prefix1,
  prefix2,
  isLoading = false,
}) {
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
        <div className="pad15 strong" style={{ textAlign: 'center', justifyContent: 'center' }}>
          <h3 style={{ color: '#22075e', marginBottom: 0, textTransform: 'capitalize' }}>
            {title}
          </h3>
        </div>
        <Divider style={{ padding: 0, margin: 0 }}></Divider>
        <div className="pad15">
          <Row gutter={[0, 0]} justify="space-between" wrap={false}>
            <Col className="gutter-row" flex="70px" style={{ textAlign: 'left' }}>
              <div className="left" style={{ whiteSpace: 'nowrap' , marginTop:'5px'}}>
                {prefix1}
              </div>
              <div className="left" style={{ whiteSpace: 'nowrap' , marginTop:'5px'}}>
                {prefix2}
              </div>
              <div className="left" style={{ whiteSpace: 'nowrap' , marginTop:'5px'}}>
                Remaining
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
                <Tooltip title={tagContent3}>
                  <Tag
                    color={tagColor1}
                    style={{
                      margin: '0 auto',
                      justifyContent: 'center',
                      maxWidth: '110px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {tagContent1 ? tagContent1 : '0.00 L.E'}
                  </Tag>
                  <Tag
                    color={tagColor2}
                    style={{
                      margin: '0 auto',
                      justifyContent: 'center',
                      maxWidth: '110px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {tagContent2 ? tagContent2 : '0.00 L.E'}
                  </Tag>
                  <Tag
                    color={tagColor3}
                    style={{
                      margin: '0 auto',
                      justifyContent: 'center',
                      maxWidth: '110px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {tagContent3 ? tagContent3 : '0.00 L.E'}
                  </Tag>
                </Tooltip>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );
}
