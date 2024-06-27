import React from "react";

const Footer: React.FC = () => {
  return (
    <> 
      <footer className="bg-gray-100 text-gray-800 text-center">
        <div className="container mx-auto py-8  grid  md:grid-cols-5 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2 text-sm">
              <li>
                Hotline: <div className="text-blue-500">1900-0000</div>
              </li>
              <li>(1000 đ/phút, 8-21h kể cả T7, CN)</li>
              <li>
                <div className="hover:text-blue-500">
                  Các câu hỏi thường gặp
                </div>
              </li>
              <li>
                <div className="hover:text-blue-500">Gửi yêu cầu hỗ trợ</div>
              </li>
              <li>
                <div className="hover:text-blue-500">Hướng dẫn đặt hàng</div>
              </li>
              <li>
                <div className="hover:text-blue-500">
                  Phương thức vận chuyển
                </div>
              </li>
              <li>
                <div className="hover:text-blue-500">Chính sách đổi trả</div>
              </li>
              <li>
                <div className="hover:text-blue-500">Hướng dẫn trả góp</div>
              </li>
              <li>
                <div className="hover:text-blue-500">
                  Chính sách hàng nhập khẩu
                </div>
              </li>
              <li>
                Hỗ trợ khách hàng:{""}
                <div className="text-blue-500">hotro@2t.vn</div>
              </li>
              <li>
                Báo lỗi bảo mật:{" "}
                <div className="text-blue-500">security@2t.vn</div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Về 2T</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <div className="hover:text-blue-500">Giới thiệu TechTribe</div>
              </li>
              <li>
                <div className="hover:text-blue-500">TechTribe Blog</div>
              </li>
              <li>
                <div className="hover:text-blue-500">Tuyển dụng</div>
              </li>
              <li>
                <div className="hover:text-blue-500">
                  Chính sách bảo mật thanh toán
                </div>
              </li>
              <li>
                <div className="hover:text-blue-500">
                  Chính sách bảo mật thông tin cá nhân
                </div>
              </li>
              <li>
                <div className="hover:text-blue-500">
                  Chính sách giải quyết khiếu nại
                </div>
              </li>
              <li>
                <div className="hover:text-blue-500">Điều khoản sử dụng</div>
              </li>
              <li>
                <div className="hover:text-blue-500">Giới thiệu 2T Xu</div>
              </li>
              <li>
                <div className="hover:text-blue-500">
                  Tiếp thị liên kết cùng 2T
                </div>
              </li>
              <li>
                <div className="hover:text-blue-500">Bán hàng doanh nghiệp</div>
              </li>
              <li>
                <div className="hover:text-blue-500">Điều kiện vận chuyển</div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Hợp tác và liên kết</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <div className="hover:text-blue-500">
                  Quy chế hoạt động Sàn GDTMĐT
                </div>
              </li>
              <li>
                <div className="hover:text-blue-500">
                  Bán hàng cùng TechTribe
                </div>
              </li>
            </ul>
            <h3 className="font-semibold mb-2 mt-4">Chứng nhận bởi</h3>
            <div className="flex space-x-2 items-center justify-center">
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"
                alt="Cert 1"
                className="h-8"
              />
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
                alt="Cert 2"
                className="h-8"
              />
              <img
                src="https://images.dmca.com/Badges/dmca_protected_sml_120y.png?ID=388d758c-6722-4245-a2b0-1d2415e70127"
                alt="Cert 3"
                className="h-8"
              />
            </div>
          </div>
          <div className="mx-auto">
            <h3 className="font-semibold mb-2">Phương thức thanh toán</h3>
            <div className="grid grid-cols-3 items-center gap-2">
              <div>
                <svg
                  width="32"
                  height="33"
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30 10.3615C30 8.8731 28.7934 7.6665 27.305 7.6665H4.695C3.20659 7.6665 2 8.8731 2 10.3615V22.9715C2 24.4599 3.20659 25.6665 4.695 25.6665H27.305C28.7934 25.6665 30 24.4599 30 22.9715V10.3615ZM4.695 8.6665H27.305L27.4513 8.67273C28.3189 8.74688 29 9.47465 29 10.3615V22.9715L28.9938 23.1178C28.9196 23.9854 28.1919 24.6665 27.305 24.6665H4.695L4.54875 24.6603C3.6811 24.5861 3 23.8584 3 22.9715V10.3615L3.00622 10.2153C3.08037 9.3476 3.80815 8.6665 4.695 8.6665Z"
                    fill="#052E5C"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.67528 20.2746L8.14557 21.881H7L9.205 15.6665H10.4582L12.6632 21.881H11.4918L10.9621 20.2746H8.67528ZM8.93368 19.4176H10.6994L9.83377 16.7647H9.80362L8.93368 19.4176ZM15.9535 21.881V16.6054H17.8097V15.6665H12.9862V16.6054H14.8467V21.881H15.9535ZM19.5711 17.471V21.881H18.5676V15.6665H19.8553L21.7589 20.4081H21.7933L23.6968 15.6665H24.9802V21.881H23.9811V17.471H23.9509L22.1551 21.881H21.3971L19.6012 17.471H19.5711Z"
                    fill="#052E5C"
                  ></path>
                  <rect
                    x="22"
                    y="10.6665"
                    width="5"
                    height="3"
                    rx="1"
                    fill="#0B74E5"
                  ></rect>
                </svg>
              </div>
              <div>
                <img
                  className="w-8 h-9"
                  src="https://cdn.iconscout.com/icon/premium/png-256-thumb/visa-card-2-811516.png?f=webp"
                  alt=""
                />
              </div>
              <div className="relative">
                <svg
                  width="268"
                  height="256"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlSpace="preserve"
                  viewBox="0 0 268 256"
                  className="w-9 h-9 "
                >
                  <path
                    fill="#085CA8"
                    d="m145.49 47.907-13.99 13.99-.7.69-4.45 4.46-3.32 3.32-4.45 4.45-.69.69-1.94 1.94-.69.7h-.01l-6.56 6.55v.01l-.69.69a28.559 28.559 0 0 1-6.45 4.85c-1.17.64-2.36 1.2-3.59 1.67a28.572 28.572 0 0 1-8.47 1.85c-1.77.12-3.56.07-5.32-.14-3.8-.45-7.54-1.67-10.94-3.64-1.46-.84-2.95-1.72-4.19-2.95-.01 0-.01 0-.02-.01-.27-.26-.54-.53-.82-.82l-25.48-25.48-.54-.54c-.44-.49-.84-1.02-1.18-1.59a9.598 9.598 0 0 1-1.34-4.9c0-.28.01-.56.04-.83.04-.42.1-.82.18-1.2.04-.15.07-.31.11-.45.02-.06.04-.13.05-.19.36-1.2.95-2.33 1.77-3.34.22-.26.44-.52.69-.77l.45-.44 27.15-27.15h.01l16.45-16.45c3.67-3.67 9.51-3.83 13.36-.47l45.57 45.5z"
                    className="st0"
                  />
                  <path
                    fill="#EB2227"
                    d="M95.93 109.037c-2.19 0-4.35-.49-6.41-1.43l-5.22-5.21-1.28-1.27-.22-.23-2.43-2.43-12.16-12.29c.27.28.54.55.82.82 1.24 1.23 2.74 2.12 4.21 2.96 3.41 1.97 7.14 3.19 10.94 3.64 1.76.22 3.55.26 5.32.14 2.88-.18 5.74-.8 8.47-1.85 1.22-.47 2.42-1.02 3.59-1.67 2.31-1.28 4.48-2.89 6.45-4.85l.69-.69v-.01l6.56-6.55h.01l.69-.7 1.94-1.94.69-.69 4.45-4.45 3.32-3.32 4.45-4.46.7-.69 28.2-28.2 11.63-12.6.07-.07.62-.62c3.55-3.55 9.31-3.55 12.86 0l6.37 6.37h.01l.21.21c-2.82-.14-5.66.88-7.79 2.96l-21.55 21.19-.22.26-37.5 36.9-.05-.05-13.81 13.57-.09.11c-.04.05-.34.38-.83.87-1.09 1.06-3.36 3.06-6.4 4.5-1.38.65-2.78 1.12-4.17 1.41-.82.16-1.67.27-2.49.31h-.65v.05z"
                    className="st2"
                  />
                  <path
                    fill="#EB2227"
                    d="m225.74 74.147-.69.7-30.54 31-32.07 32.56a28.005 28.005 0 0 1-3.22 2.78c-.04.04-.08.07-.13.11-.15.11-.31.23-.47.34-.02.02-.04.03-.05.05a29.416 29.416 0 0 1-17.16 5.49c-7.9 0-15.07-3.1-20.38-8.14l-.02-.02-.72-.63-5.52-5.52-15.5-15.51-5.17-5.17-.72-.72c.84.14 1.69.2 2.55.2h.03l.69-.01c.99-.04 1.97-.15 2.94-.35 1.59-.33 3.19-.87 4.76-1.61 3.39-1.6 5.91-3.82 7.12-5 .47-.46.82-.85.97-1.02l11.92-11.71.05.05 40.99-40.32.22-.26 19.91-19.59c2.68-2.62 6.87-2.96 9.91-.87l4.72 4.72c.01 0 .01.01.01.01l25.6 25.6c.23.23.44.46.64.71 2.87 3.54 2.65 8.82-.67 12.13z"
                    className="st2"
                  />
                  <path
                    fill="#099DD9"
                    d="M126.81 40.207c-.72.72-1.91.7-2.64-.03-12.08-12.17-31.81-12.25-43.98-.17-12.16 12.08-12.25 31.81-.16 43.98l9.46 9.54c.06.06.13.14.16.21-.05 0-.09.01-.14.01-1.72.12-3.46.07-5.17-.13l-6.95-7.01c-13.52-13.62-13.44-35.71.18-49.24 13.63-13.52 35.71-13.43 49.24.19l.03.03c.72.73.7 1.9-.03 2.62zM141.27 52.127l-2.63 2.63-4.61-4.64c-.72-.73-.72-1.91.01-2.63s1.9-.72 2.63.01l4.6 4.63z"
                    className="st3"
                  />
                  <path
                    fill="#099DD9"
                    d="M101.65 90.187c-.03.02-.05.03-.08.05-1.14.62-2.3 1.17-3.5 1.63l-12.88-12.99c-8.06-8.12-9.21-20.85-2.74-30.27a1.86 1.86 0 0 1 2.58-.48c.85.58 1.06 1.74.48 2.59-5.46 7.94-4.48 18.69 2.32 25.54l13.82 13.93zM133.49 59.897l-.06.06-1.94 1.94-.62.62-14.49-14.6c-5.38-5.42-13.23-7.32-20.51-4.96-.97.32-2.02-.22-2.34-1.19-.32-.98.22-2.03 1.2-2.35 8.6-2.79 17.92-.53 24.28 5.88l14.48 14.6z"
                    className="st3"
                  />
                  <path
                    fill="#099DD9"
                    d="m125.72 67.667-2.63 2.63-14.52-14.64c-3.54-3.58-8.12-5.97-13.1-7.01-1-.21-1.65-1.19-1.43-2.19.21-1 .19-1.98.12-2.94 5.93.72 11.58 3.24 15.94 7.66l14.52 14.65z"
                    className="st3"
                  />
                  <path
                    fill="#099DD9"
                    d="m118.88 74.467-2.62 2.62-13.2-13.32c-2.02-2.03-4.67-3.2-7.48-3.67-.87-.16-1.44-1-1.28-1.88.16-.88.97-1.45 1.88-1.29 3.46.61 6.6 2.14 9.06 4.64l13.2 13.32z"
                    className="st3"
                  />
                </svg>
                <p className="text-[10px] bottom-0.5 absolute">VNPAY</p>
              </div>
            </div>
            <h3 className="font-semibold mb-2 mt-4">Dịch vụ giao hàng</h3>
            <img
              src="data:image/png;base64,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"
              alt=""
              className="h-8"
            />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-semibold mb-2">Kết nối với chúng tôi</h3>
            <div className="">
              <div className="flex">
                <div className="w-9 h-9">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/018/930/698/non_2x/facebook-logo-facebook-icon-transparent-free-png.png"
                    alt=""
                  />
                </div>
                <div className="w-10 h-10">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/018/930/575/small_2x/youtube-logo-youtube-icon-transparent-free-png.png"
                    alt=""
                  />
                </div>
                <div className="w-9 h-9">
                  <img
                    src="https://www.vikingcamps.com/wp-content/uploads/2024/01/linkedin-logo-linkedin-icon-transparent-free-png.webp"
                    alt=""
                  />
                </div>
              </div>
              <div className="text-blue-500">
                <i className="fab fa-youtube"></i>
              </div>
              <div className="text-blue-500">
                <i className="fab fa-zalo"></i>
              </div>
            </div>
            <h3 className="font-semibold mb-2 mt-4">
              Tải ứng dụng trên điện thoại
            </h3>
            <div className="flex items-center">
              <div>
                <img
                  className="h-[80px] w-[120px]"
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/qrcode.png"
                  alt="QR"
                />
              </div>
              <div className="flex flex-wrap mx-2">
                <div className="flex justify-center w-full">
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png"
                    alt="App Store"
                    className="w-[122px] h-[36px] my-2"
                  />
                </div>
                <div className="flex justify-center w-full">
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png"
                    alt="Google Play"
                    className="w-[122px] h-[36px] my-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 text-gray-600 py-4 text-center text-xs">
          <span>Công ty TNHH TECHTRIBE ( 2T )</span>
          <span>
            Toà nhà số 12 đường Nguyễn Thị Thập, Quận Thanh Khê Tây , Thành phố
            Đà Nẵng
          </span>
          <span>
            Giấy chứng nhận đăng ký doanh nghiệp số 9999999555 do Sở Kế Hoạch và
            Đầu Tư Thành phố Đà Nẵng cấp lần đầu vào ngày 06/06/2024.
          </span>
          <span>
            Hotline: <div className="text-blue-500">1900 0000</div>
          </span>
        </div>
      </footer>
    </>
  );
};
export default Footer;
