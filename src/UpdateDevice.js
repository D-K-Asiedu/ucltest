import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateFormCard from './UpdateFormCard';

export default function UpdateDevice() {
    const [device, setDevice] = useState(null)
    let {id} = useParams()

    useEffect(()=>{
        let url = `https://ucltest.acorns.life/device/${id}`
        axios.get(url)
        .then(res => {
            if (res.status === 200 && res.data.message === 'Device found'){
                // console.log(res.data.data)
                setDevice(res.data.data)
            }
        },[])
    })

   return (
    <>
        {device && <UpdateFormCard device={device} />}
    </>
   )
}
