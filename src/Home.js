import React from 'react'
import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import DeviceCard from './DeviceCard'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import AddDevice from './AddDevice'
import DeviceList from './DeviceList'

export default function Home() {
    const test = [
        {device_name: 'HP', id: 1, serial_number: 1111111, brand_id: 1, location_id: 1, device_image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHN8ZW58MHx8MHx8&w=1000&q=80'},
        {device_name: 'Apple', id: 2, serial_number: 2222222, brand_id: 2, location_id: 2, device_image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHN8ZW58MHx8MHx8&w=1000&q=80'}
    ]

    const [devices, setDevices] = useState(null)
    let navigate = useNavigate()

    const handleClick = ()=>{
        navigate('/add')
    }

    useEffect(()=>{
        axios.get('https://ucltest.acorns.life/devices')
        .then((res)=>{
            if (res.status === 200){
                if (res.data.status !== 'success'){
                    message.error('error fetching devices')
                }
                setDevices(res.data['data'])
            }
            // setDevices(data)
        })
        .catch(e=>{
            console.log('error')
        })
    },[])
    // console.log(devices[0]['serial_number'])

  return (
    <>
        <Button type='primary' size='large' style={{display: 'block', marginLeft: 'auto', marginBottom: '10px'}} onClick={handleClick}>Add</Button>
        {/* <DeviceList devices={test} /> */}
        {devices && <DeviceList devices={devices} setDevices={setDevices}/>}
        
    </>
  )
}
