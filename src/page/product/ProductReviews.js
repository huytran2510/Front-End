import React, { useEffect, useState } from "react";
import "../../css/productReview.css";
import { useLocalStorage } from "../../util/useLocalStorage";
const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jwt, setJwt] = useLocalStorage("", "jwt");

  console.log("productId:" + productId);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/product/${productId}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) {
    return <p>Đang tải đánh giá...</p>;
  }

  return (
    <div className="product-reviews">
        
      <h2>Đánh giá sản phẩm</h2>
      {reviews.length === 0 ? (
        <p>Hiện tại chưa có đánh giá nào cho sản phẩm này.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.reviewId} className="review-card">
            <div className="review-header">
              <strong>Khách hàng:</strong> {review.customerName || "Ẩn danh"}
              <span className="rating">
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i}>&#9733;</span> // Hiển thị sao
                ))}
                {Array.from({ length: 5 - review.rating }, (_, i) => (
                  <span key={i}>&#9734;</span> // Hiển thị sao rỗng
                ))}
              </span>
            </div>
            <p className="review-text">{review.reviewText}</p>
            <span className="review-date">
              Ngày đánh giá:{" "}
              {new Date(review.reviewDate).toLocaleDateString("vi-VN")}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductReviews;
