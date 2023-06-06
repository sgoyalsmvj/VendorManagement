import React from 'react'

import * as XLSX from "xlsx";
import { Button, DatePicker, Select } from 'antd';

import useFetch from '@/hooks/useFetch'
import { request } from '@/request'

// STYLING FOR REPORTS SECTION

const rowStyle = {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(5, 1fr)"
}

const header = {
    fontWeight: "Bold",
    fontSize: "18px"
}

const colStyle = {
    display: "flex",
    flexDirection: "column",

}

const container = {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
    height: "100vh",
    marginTop: "40px",
    background: "#fff",
}

const button = {
    background: "#FF2828",
    color: "white"
}

const Report = () => {
    const jobs = useFetch(() => request.list('job', {})).result;

    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    };

    return (
        <div style={container}>

            <div style={{ ...rowStyle, ...header }}>
                <p>Title</p>
                <p>Status</p>
                <p>ID</p>
                <p>Client</p>
                <p>Budget</p>
            </div>
            <div style={colStyle}>
                {
                    jobs && jobs.map(j => {
                        return (<div style={rowStyle}>
                            <p>{j['title']}</p>
                            <p>{j['status']}</p>
                            <p>{j['_id']}</p>
                            <p>{j['client']}</p>
                            <p>{j['budget']}</p>
                        </div>)
                    })
                }
                <div style={{ display: 'flex', gap: '20px', marginTop: '40px', marginLeft: 'auto' }}>
                    <Select placeholder="Filter Reports By"></Select>
                    <Button style={button} onClick={() => downloadExcel(jobs)}>
                        Download Jobs Excel Sheet
                    </Button>
                    <Button style={button} onClick={() => downloadCsv(jobs)}>
                        Download Jobs CSV
                    </Button>
                    <Button style={button} onClick={() => downloadPdf(jobs)}>
                        Download Jobs PDF
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Report