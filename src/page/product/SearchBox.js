import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "../../css/SearchBox.css"; // Đảm bảo CSS tùy chỉnh đã được liên kết

const SearchBox = ({ selectedAddress, setSelectedAddress, onClose }) => {
  const [items, setItems] = useState([]);

  const handleSearch = async (query) => {
    if (!query.trim()) return [];

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${query}&countrycodes=VN`
      );

      if (response.ok) {
        const data = await response.json();
        // Nếu không có kết quả từ API
        if (data.length === 0) {
          return [];
        }
        // Chuyển đổi dữ liệu API thành định dạng phù hợp
        return data.map((item) => ({
          id: item.place_id,
          name: item.display_name,
        }));
      } else {
        console.error("Lỗi khi gọi API:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Lỗi hệ thống khi gọi API:", error);
      return [];
    }
  };

  const handleOnSearch = async (query) => {
    console.log("Query:", query);

    // Chỉ gọi API khi query không trống
    if (!query.trim()) return [];

    const results = await handleSearch(query);

    console.log("Results:", results);
    setItems(results);
    // return results; // Quan trọng: trả về mảng
  };
  const handleOnSelect = (item) => {
    setSelectedAddress(item.name);
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
      <button className="close-button" style={{color:"black"}} onClick={onClose}>
          &times; {/* Dấu "x" đóng */}
        </button>        <h3 className="title">Giao hàng</h3>
        <ReactSearchAutocomplete
          items={items} // Sử dụng `items` từ state
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          placeholder="Nhập địa chỉ..."
          autoFocus
          styling={{
            zIndex: 2,
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          resultStringKeyName="name" // Kết quả hiển thị qua key `name`
          fuseOptions={{ keys: ["name"] }}
        />
        {selectedAddress && (
          <div className="selected-address">
            <h4>Địa chỉ đã chọn:</h4>
            <p>{selectedAddress}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
