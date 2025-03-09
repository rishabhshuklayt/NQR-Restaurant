import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { FaQrcode, FaDownload } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';

function TableQRGenerator() {
    const [tableNumber, setTableNumber] = useState('');
    const [generatedQRs, setGeneratedQRs] = useState([]);
    const baseUrl = window.location.origin;

    const generateQR = () => {
        if (!tableNumber) return;
        
        const newQR = {
            id: Date.now(),
            tableNo: tableNumber,
            url: `${baseUrl}/menu?table=${tableNumber}`
        };
        
        setGeneratedQRs(prev => [newQR, ...prev]);
        setTableNumber('');
    };

    const downloadQR = (tableNo) => {
        const canvas = document.getElementById(`qr-${tableNo}`);
        if (!canvas) return;

        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = `table-${tableNo}-qr.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const copyUrl = (url) => {
        navigator.clipboard.writeText(url)
            .then(() => alert('URL copied to clipboard!'))
            .catch(err => console.error('Failed to copy URL:', err));
    };

    const generateBulkQRs = () => {
        const startNum = parseInt(tableNumber);
        if (isNaN(startNum)) return;

        const newQRs = Array.from({ length: 10 }, (_, i) => ({
            id: Date.now() + i,
            tableNo: `T-${startNum + i}`,
            url: `${baseUrl}/menu?table=T-${startNum + i}`
        }));

        setGeneratedQRs(prev => [...newQRs, ...prev]);
        setTableNumber('');
    };

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Table QR Generator</h1>
                    <p className="text-gray-600">Generate QR codes for restaurant tables</p>
                </div>

                {/* QR Generator Form */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Table Number
                            </label>
                            <input
                                type="text"
                                value={tableNumber}
                                onChange={(e) => setTableNumber(e.target.value)}
                                placeholder="Enter table number (e.g., T-1)"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-end gap-2">
                            <button
                                onClick={generateQR}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                            >
                                <FaQrcode />
                                Generate QR
                            </button>
                            <button
                                onClick={generateBulkQRs}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Generate 10 QRs
                            </button>
                        </div>
                    </div>
                </div>

                {/* Generated QRs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {generatedQRs.map(({ id, tableNo, url }) => (
                        <div key={id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Table {tableNo}</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => copyUrl(url)}
                                        className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                        title="Copy URL"
                                    >
                                        <MdContentCopy />
                                    </button>
                                    <button
                                        onClick={() => downloadQR(tableNo)}
                                        className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                                        title="Download QR"
                                    >
                                        <FaDownload />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-inner flex justify-center">
                                <QRCodeCanvas
                                    id={`qr-${tableNo}`}
                                    value={url}
                                    size={150}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>
                            <div className="mt-4">
                                <p className="text-xs text-gray-500 break-all">{url}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TableQRGenerator; 