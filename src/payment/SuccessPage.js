import React, {useEffect, useState} from "react";
import "./../css/sucessPage.css"

const SuccessPage = () => {
    const [paymentStatus, setPaymentStatus] = useState(null);
    useEffect(() => {
        console.log("connecting")
        // Kết nối WebSocket đến server
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        // Xử lý khi nhận được thông báo
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received:', data);
            console.log(paymentStatus)
            // Cập nhật trạng thái thanh toán
            setPaymentStatus(data);
        };

        // Xử lý khi kết nối đóng
        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Xử lý lỗi WebSocket
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Đóng kết nối khi component bị unmount
        return () => ws.close();
    }, []);
    return (
        <div className="container" style={{
            background : "#dcf0fa",
            maxWidth: "380px",
            margin: "50px auto",
            overflow: "hidden",
        }}>
            <div className="printer-top"></div>

            <div className="paper-container">
                <div className="printer-bottom"></div>

                <div className="paper">
                    <div className="main-contents">
                        <div className="success-icon">&#10004;</div>
                        <div className="success-title">
                            Thanh toán hoàn tất
                        </div>
                        <div className="success-description">
                            Cảm ơn bạn đã hoàn tất thanh toán! Bạn sẽ sớm nhận được email thanh toán của mình.                        </div>
                        <div className="order-details">
                            <div className="order-number-label">Mã Hóa Đơn</div>
                            {paymentStatus ? paymentStatus.orderId : 'Đang chờ dữ liệu...'}
                            <div className="complement">Cảm Ơn Quý Khách!</div>
                        </div>
                    </div>
                    <div className="jagged-edge"></div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage