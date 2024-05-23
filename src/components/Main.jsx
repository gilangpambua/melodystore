import React, { useState } from "react";
import biola from "../assets/biola.png";
import drum from "../assets/drum.png";
import gitar from "../assets/gitar.png";
import mic from "../assets/mic.png";
import piano from "../assets/piano.png";

const Main = () => {
  const products = [
    { id: 1, name: "Biola", price: 1200000, img: biola },
    { id: 2, name: "Drum", price: 7000000, img: drum },
    { id: 3, name: "Gitar", price: 4200000, img: gitar },
    { id: 4, name: "Mic", price: 500000, img: mic },
    { id: 5, name: "Piano", price: 700000, img: piano },
  ];

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxChange = (productId, price, isChecked) => {
    if (isChecked) {
      setSelectedProducts([...selectedProducts, { productId, price }]);
    } else {
      setSelectedProducts(
        selectedProducts.filter((product) => product.productId !== productId)
      );
    }
  };

  const calculateTotal = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price,
      0
    );
  };

  const calculateDiscount = (total) => {
    if (total <= 551000) return 0;
    if (total <= 1200000) return total * 0.1;
    if (total <= 2500000) return total * 0.25;
    if (total <= 5500000) return total * 0.35;
    return 0;
  };

  const total = calculateTotal();
  const discount = calculateDiscount(total);
  const totalPayment = total - discount;
  const [IsAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const logout = () => {
    setData([]);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };
  const checkout = () => {
    window.location.href = "/checkout";
  };

  return (
    <div>
      <div className="flex justify-between px-[50px] py-[25px]">
        <div className="text-[32px] font-bold flex justify-left ">
          MELODY STORE
        </div>
        <a onClick={logout}>
          <div className="text-[20px] font-bold"> Logout</div>
        </a>
      </div>

      <div className="text-[32px] font-bold flex justify-center">
        OUR PRODUCT
      </div>
      <div className="flex justify-center pt-[50px] text-center">
        <div className="flex flex-wrap font-bold justify-center">
          {products.map((product) => (
            <div key={product.id} className="m-4">
              <div className="w-[200px] h-[250px] bg-[#C4C4C4] flex items-center justify-center rounded-[20px]">
                <img
                  className="max-w-full max-h-full"
                  src={product.img}
                  alt={product.name}
                />
              </div>
              <div>Rp.{product.price.toLocaleString()}</div>
              <div className="flex items-center justify-center mt-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleCheckboxChange(
                      product.id,
                      product.price,
                      e.target.checked
                    )
                  }
                  className="mr-2"
                />
                <label>Pilih</label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid justify-end items-center mt-4 px-20">
        <div className="text-[22px] font-bold">
          <div>Total Product: Rp.{total.toLocaleString()}</div>
          <div>Discount: Rp.{discount.toLocaleString()}</div>
          <div>Total Pembayaran: Rp.{totalPayment.toLocaleString()}</div>
        </div>
        <div className="font-bold text-[24px] text-white pt-[10px]">
          <button
            onClick={checkout}
            disabled={selectedProducts.length === 0}
            className={`bg-[#1A719C] w-[150px] h-[50px] rounded-[10px] ${
              selectedProducts.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
