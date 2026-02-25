

export const feedbacks = [
    {
        id: 1,
        productId: 1, // Đánh giá này dành cho sản phẩm có ID = 1
        name: "Amanda Wilson",
        date: "03 Tháng 10, 2025",
        rating: 5,
        comment: "Chất lượng sản phẩm vượt ngoài mong đợi. Đóng gói cẩn thận, sạch sẽ và giao hàng rất nhanh. Tôi sẽ tiếp tục mua ủng hộ."
    },
    {
        id: 2,
        productId: 1, // Đánh giá này cũng dành cho sản phẩm có ID = 1
        name: "Trần Văn Nam",
        date: "15 Tháng 11, 2025",
        rating: 4,
        comment: "Sản phẩm ngon, hương vị đậm đà đúng chuẩn. Giao hàng đúng hẹn. Tuy nhiên hộp hơi móp một chút do quá trình vận chuyển."
    },
    {
        id: 3,
        productId: 2, // Đánh giá này dành cho sản phẩm có ID = 2
        name: "Nguyễn Thu Hà",
        date: "20 Tháng 12, 2025",
        rating: 5,
        comment: "Rất ngon! Mình đã mua biếu bố mẹ và các cụ rất thích. Sẽ ủng hộ shop dài dài."
    },
    {
        id: 4,
        productId: 3, // Đánh giá này dành cho sản phẩm có ID = 3
        name: "Lê Minh Tuấn",
        date: "05 Tháng 01, 2026",
        rating: 3,
        comment: "Bình thường, không có gì quá đặc sắc so với giá tiền."
    }
];

// Hàm hỗ trợ: Lấy danh sách đánh giá dựa vào ID của sản phẩm
export const getFeedbackByProductId = (productId) => {
    // Chuyển productId về dạng Number để so sánh cho chính xác
    return feedbacks.filter(feedback => feedback.productId === Number(productId));
};