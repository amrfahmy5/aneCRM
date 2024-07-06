import { Row, Col, Form, Button } from 'antd';
import { DatePicker } from '@/components/CustomAntd';
import dayjs from 'dayjs';


function changeRange() {
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    if (!startDate) {
        alert("Please enter start date!");
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('start_date', startDate);
    urlParams.set('end_date', endDate);
    window.location.search = urlParams;
}
export default function RangeDate() {
    var url = new URL(window.location.href);
    let start_date = url.searchParams.get("start_date") ;
    let end_date = url.searchParams.get("end_date") ;
    
    return (
        <Form>
            <Row>
                <Col className="gutter-row"
                    xs={{ span: 8 }}
                    sm={{ span: 8 }}
                    md={{ span: 8 }}
                    lg={{ span: 8 }}>
                    <Form.Item
                        name="startDate"
                        label="Start Date"
                        rules={[
                            {
                                required: true,
                                type: 'object',
                            },
                        ]}
                        initialValue={dayjs(start_date?start_date:dayjs().clone().startOf("month"), "DD-MM-YYYY")}
                    >
                        <DatePicker style={{ width: '50%' }} format={'DD/MM/YYYY'} />
                    </Form.Item>
                </Col>
                <Col className="gutter-row"
                    xs={{ span: 8 }}
                    sm={{ span: 8 }}
                    md={{ span: 8 }}
                    lg={{ span: 8 }}>
                    <Form.Item
                        name="endDate"
                        label="End Date"
                        rules={[
                            {
                                required: true,
                                type: 'object',
                            },
                        ]}
                        initialValue={dayjs(end_date?end_date:dayjs().clone().endOf("month"), "DD-MM-YYYY")}
                    >
                        <DatePicker style={{ width: '50%' }} format={'DD/MM/YYYY'} />
                    </Form.Item>

                </Col>
                <Col className="gutter-row"
                    xs={{ span: 8 }}
                    sm={{ span: 8 }}
                    md={{ span: 8 }}
                    lg={{ span: 7 }}>
                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={() => changeRange()}
                            block
                        >
                            Chang Range
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>

    )

}


