import React from 'react'
import { Card, Col, Row, Image, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DeviceCard({ device, setDevices}) {
  const base_url = 'https://ucltest.acorns.life/'
  const navigate = useNavigate()

  const Update = () =>{
    navigate(`/update/${device.id}`)
  }

  const Delete = () =>{
    console.log("delete")
    axios.post(`https://ucltest.acorns.life/device/delete/${device.id}`)
    .then(res => {
      if (res.status === 200){
        if (res.data.status === 'success'){
          message.success('device deleted successfully')

          axios.get('https://ucltest.acorns.life/devices')
        .then((res)=>{
            if (res.status === 200){
                setDevices(res.data['data'])
            }
        })
        .catch(e=>{
            console.log('error')
        })
        }
      }
    })
  }

  return (
      <>
        <Card bordered={true} style={{margin: 10}}>
            <Row>
            <Col span={10}>
                <div style={{padding: '10px'}}>
                <Image style={{height: '150px'}}  src={base_url+device.images[0].image_path} />
                </div>
            </Col>
            <Col span={14}>
              <div>
                <h2 style={{margin: 0}}>{device.device_name}</h2>
                <h4 style={{margin: 0}}>{device.serial_number}</h4>
                <p style={{margin: 0}}>{device.location_id}</p>
                <p style={{margin: 0}}>{device.brand_id}</p>
                <Button type='primary' style={{marginRight: '3px'}} onClick={Update}>Update</Button>
                <Button type='danger' onClick={Delete}>Delete</Button>
              </div>
            </Col>
            </Row>
        </Card>
      </>
  )
}
