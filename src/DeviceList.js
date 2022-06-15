import React from 'react'
import DeviceCard from './DeviceCard'

export default function DeviceList({devices, setDevices}) {
  return (
    <>
    {
    devices.map(device => (
        <div key={device.id}>
            {console.log(device)}
            <DeviceCard device={device} setDevices={setDevices}/>
        </div>
    ))
    }
    </>
  )
}
