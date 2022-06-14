import React, { useEffect, useState } from 'react'
import { Card, Input, Select, Form, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export default function AddDevice() {
    const [locations, setLocations] = useState(null)
    const [brands, setBrands] = useState(null)
    const navigate = useNavigate()

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
        axios.post('https://ucltest.acorns.life/device/add', JSON.stringify(values))
        .then(res => {
            if (res.status === 200){
                if (res.data.status === 'success'){
                    navigate('/')
                }
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

            <Card boardered={true} title="Add Device" style={{ }}>
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
                        rules={[{
                            required: true,
                            message: 'Please select brand id'
                        }
                        ]}
                    >
                        <Select defaultValue="brand id" onChange={handleChange} style={{ marginBottom: '8px', width: '100%' }}>
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
                        rules={[{
                            required: true,
                            message: 'Please select brand id'
                        }
                        ]}
                    >
                        <Select defaultValue="location id" onChange={handleChange} style={{ marginBottom: '8px', width: '100%' }}>
                            {
                                locations && locations.map(location => (
                                    <Option value={location.id} key={location.id}>{location.address}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="devive_image"
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
