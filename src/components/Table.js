import React from 'react';

export const Table = ({data}) => (
    <table
        className="pure-table"
        style={{
        width: "100%",
        direction: 'rtl'
    }}>
        <thead>
            <tr>
                <th style={{
                    textAlign: "right"
                }}>#</th>
                <th style={{
                    textAlign: "right"
                }}>نام فروشگاه</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={index.toString()}>
                    <td>
                        {index + 1}
                    </td>
                    <td>
                        {item.title}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)