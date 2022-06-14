import React from 'react'
import { useEffect, useState } from 'react'
import { Button } from 'antd'
import DeviceCard from './DeviceCard'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import AddDevice from './AddDevice'
import DeviceList from './DeviceList'

export default function Home() {
    const [devices, setDevices] = useState(null)
    let navigate = useNavigate()
    let isLoading = true

    const test = [
        {device_name: 'HP', id: 1},
        {device_name: 'Iphone', id: 2}
    ]

    const handleClick = ()=>{
        navigate('/add')
    }

    useEffect(()=>{
        axios.get('https://ucltest.acorns.life/devices')
        .then((res)=>{
            if (res.status === 200){
                setDevices(res.data['data'])
                isLoading = false
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
        {devices && <DeviceList devices={devices} />}
        
    </>
  )
}
