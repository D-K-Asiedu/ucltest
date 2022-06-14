import React from 'react'
import { Card, Col, Row, Image, Button } from 'antd';

export default function DeviceCard({ device}) {
  const base_url = 'https://ucltest.acorns.life/'
  return (
      <>
        <Card bordered={true} style={{maxWidth: 350,}}>
            <Row>
            <Col span={10}>
                <div style={{padding: '10px'}}>
                <Image style={{height: '120px'}} src={base_url+device.images[0].image_path} />
                </div>
            </Col>
            <Col span={14}>
              <div>
                <h2 style={{margin: 0}}>{device.device_name}</h2>
                <h4 style={{margin: 0}}>{device.serial_number}</h4>
                <p style={{margin: 0}}>{device.location_id}</p>
                <p style={{margin: 0}}>{device.brand_id}</p>
                <Button type='primary' style={{marginRight: '3px'}}>Update</Button>
                <Button type='danger'>Delete</Button>
              </div>
            </Col>
            </Row>
        </Card>
      </>
  )
}
