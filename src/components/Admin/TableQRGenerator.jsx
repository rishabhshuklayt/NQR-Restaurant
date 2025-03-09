import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { FaQrcode, FaDownload, FaFilePdf, FaBrush } from 'react-icons/fa';
import { MdContentCopy, MdRestaurantMenu, MdTableBar } from 'react-icons/md';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useLocation } from 'react-router-dom';

// Import background images
const bgOptions = [
    { id: 'classic', name: 'Classic', color: 'bg-gray-100' },
    { id: 'food', name: 'Food Pattern', color: 'bg-yellow-100' },
    { id: 'modern', name: 'Modern', color: 'bg-blue-100' },
    { id: 'elegant', name: 'Elegant', color: 'bg-green-100' },
    { id: 'minimalist', name: 'Minimalist', color: 'bg-gray-50' }
];

function TableQRGenerator() {
    const [tableNumber, setTableNumber] = useState('');
    const [generatedQRs, setGeneratedQRs] = useState([]);
    const [selectedBackground, setSelectedBackground] = useState('classic');
    const [isLoading, setIsLoading] = useState(true);
    const baseUrl = window.location.origin;
    const location = useLocation();
    
    // Generate default QR codes on first load
    useEffect(() => {
        if (isLoading && generatedQRs.length === 0) {
            // Generate QR codes for first 5 tables
            const defaultQRs = Array.from({ length: 5 }, (_, i) => ({
                id: Date.now() + i,
                tableNo: `T-${i + 1}`,
                url: `${baseUrl}/menu?table=T-${i + 1}`,
                background: selectedBackground
            }));
            
            setGeneratedQRs(defaultQRs);
            setIsLoading(false);
        }
    }, [isLoading, baseUrl, selectedBackground, generatedQRs.length]);
    
    // Check if PDF download was requested
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('format') === 'pdf' && generatedQRs.length > 0) {
            generatePDF();
        }
    }, [location, generatedQRs]);

    const generateQR = () => {
        if (!tableNumber) return;
        
        const newQR = {
            id: Date.now(),
            tableNo: tableNumber,
            url: `${baseUrl}/menu?table=${tableNumber}`,
            background: selectedBackground
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
        const startNum = parseInt(tableNumber) || 1;  // Default to 1 if not valid
        
        const newQRs = Array.from({ length: 10 }, (_, i) => ({
            id: Date.now() + i,
            tableNo: `T-${startNum + i}`,
            url: `${baseUrl}/menu?table=T-${startNum + i}`,
            background: selectedBackground
        }));

        setGeneratedQRs(prev => [...newQRs, ...prev]);
        setTableNumber('');
    };

    const generatePDF = () => {
        if (generatedQRs.length === 0) {
            alert('Please generate at least one QR code first');
            return;
        }

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Add title
        doc.setFontSize(20);
        doc.setTextColor(0, 128, 0); // Green color
        doc.text('FoodCrafters - Table QR Codes', 105, 15, { align: 'center' });
        
        // Add logo-like element
        doc.setFillColor(0, 128, 0);
        doc.circle(105, 30, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text('FC', 105, 33, { align: 'center' });
        
        // Add description
        doc.setTextColor(80, 80, 80);
        doc.setFontSize(10);
        doc.text('Scan the QR code with your mobile device to view our menu and place your order.', 105, 45, { align: 'center' });
        
        // Define grid layout params
        const startY = 55;
        const qrSize = 45;
        const cellPadding = 10;
        const cellWidth = (210 - 3 * cellPadding) / 2; // A4 width is 210mm
        const cellHeight = qrSize + 25;
        
        // Generate QR codes grid
        let currentX = cellPadding;
        let currentY = startY;
        let counter = 0;
        
        generatedQRs.forEach((qr, index) => {
            // Start a new page if needed
            if (currentY + cellHeight > 290) { // A4 height is 297mm
                doc.addPage();
                currentY = startY;
                counter = 0;
            }
            
            // Determine x position
            if (counter % 2 === 0) {
                currentX = cellPadding;
            } else {
                currentX = cellPadding * 2 + cellWidth;
            }
            
            // Add background color based on selected style
            let bgColor;
            switch(qr.background) {
                case 'food': bgColor = [255, 250, 230]; break;
                case 'modern': bgColor = [230, 240, 255]; break;
                case 'elegant': bgColor = [230, 255, 240]; break;
                case 'minimalist': bgColor = [250, 250, 250]; break;
                default: bgColor = [245, 245, 245];
            }
            
            doc.setFillColor(...bgColor);
            doc.roundedRect(currentX, currentY, cellWidth, cellHeight, 3, 3, 'F');
            
            // Add border
            doc.setDrawColor(200, 200, 200);
            doc.roundedRect(currentX, currentY, cellWidth, cellHeight, 3, 3, 'S');
            
            // Add table icon and number
            doc.setFillColor(0, 128, 0);
            doc.circle(currentX + 12, currentY + 12, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text('FC', currentX + 12, currentY + 14, { align: 'center' });
            
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(16);
            doc.text(qr.tableNo, currentX + cellWidth - 15, currentY + 15, { align: 'right' });
            
            // Get the QR code image from the DOM if available
            const canvas = document.getElementById(`qr-${qr.tableNo}`);
            let qrImage;
            
            if (canvas) {
                qrImage = canvas.toDataURL('image/png');
            } else {
                // If canvas not found (e.g., when directly opening PDF), create a new QR
                const tempCanvas = document.createElement('canvas');
                const qr = new QRCodeCanvas({
                    value: qr.url,
                    size: 200,
                    level: 'H',
                    includeMargin: true
                });
                qr.toCanvas(tempCanvas);
                qrImage = tempCanvas.toDataURL('image/png');
            }
            
            // Add QR code
            const qrX = currentX + (cellWidth - qrSize) / 2;
            const qrY = currentY + 25;
            doc.addImage(qrImage, 'PNG', qrX, qrY, qrSize, qrSize);
            
            // Add table name and instruction
            doc.setTextColor(80, 80, 80);
            doc.setFontSize(10);
            doc.text(`Table: ${qr.tableNo}`, currentX + cellWidth/2, currentY + qrSize + 35, { align: 'center' });
            doc.setFontSize(8);
            doc.text('Scan to order', currentX + cellWidth/2, currentY + qrSize + 42, { align: 'center' });
            
            // Add some food icons as decoration
            if (qr.background === 'food') {
                // Simple food icon representations
                doc.setFillColor(255, 200, 100);
                doc.circle(currentX + 10, currentY + cellHeight - 10, 3, 'F');
                doc.circle(currentX + cellWidth - 10, currentY + cellHeight - 10, 3, 'F');
            }
            
            // Increment counter and update y position if needed
            counter++;
            if (counter % 2 === 0) {
                currentY += cellHeight + cellPadding;
            }
        });
        
        // Add footer
        const pageCount = doc.getNumberOfPages();
        for(let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(`FoodCrafters Restaurant | Generated on ${new Date().toLocaleDateString()}`, 105, 290, { align: 'center' });
            doc.text(`Page ${i} of ${pageCount}`, 190, 290, { align: 'right' });
        }
        
        // Save the PDF
        doc.save('FoodCrafters-Table-QR-Codes.pdf');
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Table Number
                            </label>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={tableNumber}
                                    onChange={(e) => setTableNumber(e.target.value)}
                                    placeholder="Enter table number (e.g., T-1)"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Background Style
                            </label>
                            <select 
                                value={selectedBackground}
                                onChange={(e) => setSelectedBackground(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                {bgOptions.map(option => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={generateQR}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <FaQrcode />
                            Generate QR
                        </button>
                        <button
                            onClick={generateBulkQRs}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <MdTableBar />
                            Generate 10 QRs
                        </button>
                        <button
                            onClick={generatePDF}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <FaFilePdf />
                            Export as PDF
                        </button>
                    </div>
                </div>

                {/* PDF Features Info */}
                {generatedQRs.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                        <h3 className="text-yellow-800 font-medium flex items-center gap-2 mb-2">
                            <FaFilePdf />
                            PDF Export Features
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-start gap-2">
                                <div className="bg-yellow-200 rounded-full p-1 mt-0.5">
                                    <MdTableBar className="text-yellow-800" size={14} />
                                </div>
                                <span>Table names &amp; numbers clearly displayed</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="bg-yellow-200 rounded-full p-1 mt-0.5">
                                    <FaBrush className="text-yellow-800" size={14} />
                                </div>
                                <span>Custom background styles</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="bg-yellow-200 rounded-full p-1 mt-0.5">
                                    <MdRestaurantMenu className="text-yellow-800" size={14} />
                                </div>
                                <span>FoodCrafters branding included</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Generated QRs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {generatedQRs.map(({ id, tableNo, url, background }) => {
                        const bgClass = bgOptions.find(bg => bg.id === background)?.color || 'bg-gray-100';
                        
                        return (
                            <div key={id} className={`rounded-lg shadow-md p-6 ${bgClass}`}>
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
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                    />
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-gray-500 break-all">{url}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default TableQRGenerator; 