"use client"
import React, { useEffect, useState } from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';

const Orders = () => {
  const [orderDatas,setOrderDatas]= useState([])
 
  const[loading,setIsLoading]=useState(false)

  useEffect(()=>{
    const fetchOrder = async()=>{
      setIsLoading(true)
      try {
        const res = await fetch(`http://localhost:3000/api/order`)
        const data = await res.json()
    
        setOrderDatas(data)
       setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
        
      }
    }
    fetchOrder()
  },[])

    const rows = orderDatas.length>0 &&    orderDatas?.map((item,idx)=>{
      return {
        id:idx+1,col1: item.id, col2:item?.products[0]?.title, col3:item.price, col4:item.status,col5:item.createdAt.slice(0,10),col6:item.userEmail
      }
    });

    
  

      
      const columns = [
        { field: 'col1', headerName: 'ID', width: 250 },
        { field: 'col2', headerName: 'PRODUCT NAME', width: 150 },
        { field: 'col3', headerName: 'PRICE', width: 100 },
        { field: 'col4', headerName: 'STATUS', width: 350 },
        { field: 'col5', headerName: 'DATE', width: 150 },
        { field: 'col6', headerName: 'EMAIL', width: 250 },
      ];
      
    
 

  return (
    <div className='-z-0'>
         <div style={{ height: 300, width: '98%',marginInline:"auto" }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
    </div>
  )
}

export default Orders