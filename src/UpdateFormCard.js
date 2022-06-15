import React, { useEffect, useState } from 'react'
import { Card, Input, Select, Form, Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

export default function UpdateFormCard({device}) {
    const [locations, setLocations] = useState(null)
    const [brands, setBrands] = useState(null)
    const navigate = useNavigate()
    let {id} = useParams()

    useEffect(()=>{
        axios.get('https://ucltest.acorns.life/locations')
        .then(res=>{
            if (res.status === 200){
                setLocations(res.data.data)
                // console.log(res.data.data[0].address)
                // console.log(locations)
            }
        })
        .catch(e => {
            console.log('error')
        })
    }, [])

    useEffect(()=>{
        axios.get('https://ucltest.acorns.life/brands')
        .then(res=>{
            if (res.status === 200){
                setBrands(res.data.data)
                // console.log(res.data.data[0].address)
                // console.log(locations)
            }
        })
        .catch(e => {
            console.log('error')
        })
    }, [])

    const normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e?.fileList;
      };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onFinish = (values) => {
        console.log(values)
        let formdata = new FormData()
        let data = values
        data.device_image = data.device_image[0]

        formdata.append('serial_number', data.device_name)
        formdata.append('device_name', data.device_name)
        formdata.append('brand_id', data.brand_id)
        formdata.append('location_id', data.location_id)
        formdata.append('device_image', data.device_image)

        console.log(data)
        axios.post(`https://ucltest.acorns.life/device/update/${id}`, formdata)
        .then(res => {
            console.log(res)
            if (res.status === 200){
                message.success('device updated successfully')
                navigate('/')
            }
        })
        .catch(e => {
            console.log('error')
        })
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>

            <Card boardered={true} title="Update Device">
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="Device Name"
                        name="device_name"
                        initialValue={device.device_name}
                        rules={[
                            {
                                required: true,
                                message: 'Please input device name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Serial Number"
                        name="serial_number"
                        initialValue={device.serial_number}
                        rules={[
                            {
                                required: true,
                                message: 'Please input serial number',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Brand ID"
                        name='brand_id'
                        initialValue={device['brand'].name}
                        rules={[{
                            required: true,
                            message: 'Please select brand id'
                        }
                        ]}
                    >
                        <Select defaultValue='brand id' onChange={handleChange} style={{ marginBottom: '8px', width: '100%' }}>
                        {
                                brands && brands.map(brand => (
                                    <Option value={brand.id} key={brand.id}>{brand.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Location ID"
                        name='location_id'
                        initialValue={device['location'].address}
                        rules={[{
                            required: true,
                            message: 'Please select brand id'
                        }
                        ]}
                    >
                        <Select defaultValue='location id' onChange={handleChange} style={{ marginBottom: '8px', width: '100%' }}>
                            {
                                locations && locations.map(location => (
                                    <Option value={location.id} key={location.id}>{location.address}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="device_image"
                        label="Device Image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload name="device_image"  listType="picture" action="/upload.do">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}
