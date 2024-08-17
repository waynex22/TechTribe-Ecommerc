import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faClipboard,
  faCoins,
  faPen,
  faTicket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useGetUserMutation } from "src/redux/rtkQuery/user_customers";
const LayoutUserComponent: React.FC = () => {
  const [getUser] = useGetUserMutation();
  const [accessToken, setAccessToken] = useState<string>('');
  const [infoUserFormToken, setInfoUserFormToken] = useState<{ [key: string]: any } | null>(null);
  const [infoUser, setInfoUser] = useState<{ [key: string]: any } | null>(null);

  useEffect(() => {
    const getAccessToken = localStorage.getItem('access_token');

    // console.log(getAccessToken);

    if (getAccessToken !== null) {
      setAccessToken(getAccessToken);
    }
  }, [infoUserFormToken]);

  // useEffect(() => {
  //   const getUserWithtk = async () => {
  //     if(accessToken) {
  //       const response = await getUser(accessToken).unwrap()
  //       console.log(response);
  //       // setInfoUser(response.data)
  //     }
  //   }

  //   getUserWithtk()
  // },[])

  const decodeToken = () => {
    if (accessToken !== '') {
      const decodeToken = jwtDecode(accessToken) as { [key: string]: any };
      setInfoUserFormToken(decodeToken)
      // console.log(decodeToken);
    }
  }

  useEffect(() => {
    decodeToken()
  }, [accessToken]);
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-4 m-auto pt-5 pb-8">
        <div className="col-span-2 p-4 rounded-lg">
          <div className="flex pb-3 items-center">
            <img className="w-[45px] h-[45px] object-cover rounded-full"
              src={'https://salt.tikicdn.com/desktop/img/avatar.png'}
              alt=""
            />
            <div className="flex flex-col justify-center ps-4">
              <p className="text-[12px] text-gray-600 font-normal">Tài khoản của</p>
              <div className="text-left text-sm text-gray-700">{infoUserFormToken?.username}</div>
            </div>
          </div>
          <hr />
          <div className=" mt-7">
            <div className="your-account mb-3">
              <Link className="focus:bg-gray-200 flex items-center bg-slate-200/30 backdrop-blur-0 p-3 rounded-lg" to="info/">
                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.14 34.22" id="user"><g><path d="M15.07 2.29c4.36 0 5.69 1.73 5.69 7.4 0 4.08-2.55 7.4-5.69 7.4s-5.68-3.32-5.68-7.4c0-5.67 1.32-7.4 5.68-7.4m0-2.29c-6.8 0-8 4.34-8 9.69s3.58 9.7 8 9.7 8-4.34 8-9.7S21.88 0 15.07 0zM2.38 34.22l-.09-.08V34a6.39 6.39 0 0 0 0-.64c.14-7.77.75-9.55 7.72-10.95a8.48 8.48 0 0 0 5 1.51 8.46 8.46 0 0 0 5-1.51c3.48.71 5.33 1.56 6.27 2.86 1.14 1.55 1.4 4.36 1.47 8.38v.52l-.09.09h2.37v-.64c-.15-9.33-1.37-12-10.69-13.67a5.58 5.58 0 0 1-4.37 1.67 5.61 5.61 0 0 1-4.37-1.67C1.49 21.58.19 24.19 0 33.27A7.23 7.23 0 0 1 0 34v.22z"></path></g></svg>
                <span className="text-gray-700 text-sm ps-2">
                  Thông tin cá nhân
                </span>
              </Link>
            </div>
            <div className="your-purchase mb-3">
              <Link className="focus:bg-gray-200 flex items-center bg-slate-200/30 backdrop-blur-0 p-3 rounded-lg" to="password/">
                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="password"><g><path fill="#886cff" d="M21,8v8c0,2.8-2.2,5-5,5H8c-1.4,0-2.6-0.6-3.5-1.5C3.6,18.6,3,17.4,3,16V8c0-2.8,2.2-5,5-5h8
		c1.4,0,2.6,0.6,3.5,1.5C20.4,5.4,21,6.6,21,8z"></path><path fill="#fff" d="M9.4,14.4c-0.4,0-0.7-0.2-0.9-0.5c-0.3-0.5-0.1-1.1,0.4-1.4l5.3-2.9c0.5-0.3,1.1-0.1,1.4,0.4
			c0.3,0.5,0.1,1.1-0.4,1.4l-5.3,2.9C9.7,14.4,9.5,14.4,9.4,14.4z"></path><path fill="#fff" d="M14.4,14.8c-0.2,0-0.4-0.1-0.6-0.2L9,11c-0.4-0.3-0.5-1-0.2-1.4c0.3-0.4,0.9-0.5,1.4-0.2L15,13
			c0.4,0.3,0.5,1,0.2,1.4C15,14.6,14.7,14.8,14.4,14.8z"></path><path fill="#fff" d="M12,16c-0.6,0-1-0.4-1-1V9c0-0.6,0.4-1,1-1s1,0.4,1,1v6C13,15.6,12.6,16,12,16z"></path><path d="M21,8v8c0,2.8-2.2,5-5,5H8c-1.4,0-2.6-0.6-3.5-1.5l5.1-5.1h0L11,13l0.3-0.3l1.4-1.4L13,11l1.4-1.4l5.1-5.1
		C20.4,5.4,21,6.6,21,8z" opacity=".1"></path></g></svg>
                <span className="text-gray-700 text-sm ps-2">
                  Mật khẩu
                </span>
              </Link>
            </div>
            <div className="your-purchase mb-3">
              <Link className="focus:bg-gray-200 flex items-center bg-slate-200/30 backdrop-blur-0 p-3 rounded-lg" to="address/">
                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 491.855" viewBox="0 0 512 491.855" id="delivery-address"><polygon fill="#d84200" points="175.481 241.293 42.629 241.293 0 155.001 132.852 155.001"></polygon><polygon fill="#c63502" points="175.297 241.411 153.982 198.266 42.445 241.477"></polygon><path fill="#33b1ff" d="M243.816,0c-66.043,0-119.581,53.538-119.581,119.581c0,99.6,119.581,190.422,119.581,190.422
		s119.581-96.27,119.581-190.422C363.397,53.538,309.859,0,243.816,0z"></path><path fill="#00cfff" d="M269.347,2.741c-53.774,11.696-94.05,59.561-94.05,116.84c0,69.57,58.336,134.847,93.517,167.891
		c35.055-33.98,94.583-101.46,94.583-167.891C363.397,62.302,323.121,14.438,269.347,2.741z"></path><rect width="308.975" height="250.242" x="160.396" y="241.293" fill="#ff6700"></rect><rect width="308.975" height="250.242" x="42.629" y="241.293" fill="#ff9100"></rect><polygon fill="#ff791f" points="351.816 241.855 42.816 241.855 42.445 491.654 130.896 491.855 163.411 363.426 308.791 339.392"></polygon><polygon fill="#d84200" points="352.16 241.293 469.371 241.293 512 155.001 394.789 155.001"></polygon><polygon fill="#e84d00" points="0 339.273 308.975 339.273 351.604 241.359 42.629 241.359"></polygon><circle cx="243.797" cy="118" r="46.22" fill="#fff"></circle></svg>
                <span className="text-gray-700 text-sm ps-2">
                  Sổ địa chỉ
                </span>
              </Link>
            </div>
            <div className="your-purchase mb-3">
              <Link className="focus:bg-gray-200 flex items-center bg-slate-200/30 backdrop-blur-0 p-3 rounded-lg" to="purchase/">
                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" id="check-order"><path fill="#c37f50" d="M67,8.47H12.78a3.67,3.67,0,0,0-3.67,3.68V91.32A3.67,3.67,0,0,0,12.78,95H67a3.68,3.68,0,0,0,3.68-3.68V12.15A3.68,3.68,0,0,0,67,8.47ZM65.37,89.69H14.42V13.78h51Z"></path><path fill="#af6650" d="M65.37,60.5V89.69H43.5V95H67a3.68,3.68,0,0,0,3.68-3.68V60.5Z"></path><rect width="5.31" height="22.85" x="65.37" y="48" fill="#af6650"></rect><rect width="5.31" height="22.85" x="65.37" y="48" fill="#af6650"></rect><path fill="#dca764" d="M65.37,33.6h5.31V12.15A3.67,3.67,0,0,0,67,8.47H12.79a3.68,3.68,0,0,0-3.68,3.68V32.83h5.31v-19h51Z"></path><rect width="32.33" height="5.31" x="23.72" y="8.47" fill="#c37f50"></rect><rect width="50.95" height="75.91" x="14.42" y="13.78" fill="#cfd6ff"></rect><rect width="42.95" height="40.55" x="18.42" y="17.78" fill="#e8efff" rx="1.24"></rect><rect width="25.76" height="7.92" x="27.01" y="65.38" fill="#e8efff" rx="1.24"></rect><path fill="#7481a9" d="M53.91,8v4.44a1.3,1.3,0,0,1-1.29,1.3H27.18a1.3,1.3,0,0,1-1.3-1.3V8a1.3,1.3,0,0,1,1.3-1.3h3.95a3.24,3.24,0,0,0,3.25-3.25V2.36A1.36,1.36,0,0,1,35.75,1h8.3a1.36,1.36,0,0,1,1.36,1.36V3.49a3.25,3.25,0,0,0,3.25,3.25h4A1.3,1.3,0,0,1,53.91,8Z"></path><path fill="#889fc2" d="M53.91,8v2.51a1.29,1.29,0,0,1-1.29,1.29H27.18a1.3,1.3,0,0,1-1.3-1.29V8a1.3,1.3,0,0,1,1.3-1.3h3.95a3.24,3.24,0,0,0,3.25-3.25V2.36A1.36,1.36,0,0,1,35.75,1h8.3a1.36,1.36,0,0,1,1.36,1.36V3.49a3.25,3.25,0,0,0,3.25,3.25h4A1.3,1.3,0,0,1,53.91,8Z"></path><rect width="21.25" height="21.25" x="29.27" y="24" fill="#ff9d50" rx="1.47"></rect><path fill="#ffb15f" d="M48.94,25.42V41.78a1.32,1.32,0,0,1-1.13,1.43H32.49a1.31,1.31,0,0,1-1.13-1.43V25.42A1.3,1.3,0,0,1,32.49,24H47.81A1.31,1.31,0,0,1,48.94,25.42Z"></path><path fill="#ffde82" d="M48.94,26v-.59A1.31,1.31,0,0,0,47.81,24H32.49a1.3,1.3,0,0,0-1.13,1.42V26Z"></path><rect width="7.31" height="8.47" x="36.24" y="24" fill="#ff703c"></rect><rect width="7.31" height="2.02" x="36.24" y="24" fill="#ff8941"></rect><path fill="#fff" d="M41.26,36H38.52a.81.81,0,0,1-.81-.81.82.82,0,0,1,.81-.81h2.74a.81.81,0,1,1,0,1.62Z"></path><path fill="#4c5472" d="M42.09,39.56h-4.4a1,1,0,0,1,0-2h4.4a1,1,0,0,1,0,2Z"></path><path fill="#3a3c51" d="M55.52 57.87H24.27a1 1 0 010-2H55.52a1 1 0 010 2zM55.52 63.75H24.27a1 1 0 110-2H55.52a1 1 0 110 2zM55.52 69.62H24.27a1 1 0 110-2H55.52a1 1 0 110 2zM50.52 75.5H24.27a1 1 0 110-2H50.52a1 1 0 110 2zM38.84 81.37H24.27a1 1 0 110-2H38.84a1 1 0 010 2z"></path><circle cx="72.65" cy="80.75" r="14.24" fill="#50b981"></circle><path fill="#fff" d="M69.07,86.44,64.56,83A2,2,0,0,1,67,79.8l3.16,2.43,8-7.54A2,2,0,0,1,80.9,77.6l-9.24,8.71A2,2,0,0,1,69.07,86.44Z"></path></svg>
                <span className="text-gray-700 text-sm ps-2">
                  Đơn mua
                </span>
              </Link>
            </div>
            <div className="your-purchase mb-3">
              <Link className="focus:bg-gray-200 flex items-center bg-slate-200/30 backdrop-blur-0 p-3 rounded-lg" to="voucher/">
                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="voucher"><path fill="#ffc343" d="m40,24c0-3.031,2.248-5.537,5.167-5.943.483-.067.833-.498.833-.985v-6.072c0-1.105-.895-2-2-2H4c-1.105,0-2,.895-2,2v6.072c0,.488.35.918.833.985,2.92.405,5.167,2.912,5.167,5.943s-2.248,5.537-5.167,5.943c-.483.067-.833.498-.833.985v6.072c0,1.105.895,2,2,2h40c1.105,0,2-.895,2-2v-6.072c0-.488-.35-.918-.833-.985-2.92-.405-5.167-2.912-5.167-5.943Z"></path><path fill="#ff8200" d="m44,35H4c-1.104,0-2-.896-2-2v4c0,1.104.896,2,2,2h40c1.104,0,2-.896,2-2v-4c0,1.104-.896,2-2,2Z"></path><path fill="#ffa221" d="m16,9H4c-1.105,0-2,.895-2,2v6.072c0,.488.35.918.833.985,2.92.405,5.167,2.912,5.167,5.943s-2.248,5.537-5.167,5.943c-.483.067-.833.498-.833.985v6.072c0,1.105.895,2,2,2h12V9Z"></path><path fill="#ff6500" d="m2,33v4c0,1.104.896,2,2,2h12v-4H4c-1.104,0-2-.896-2-2Z"></path><path fill="#08105e" d="m45.305,19.048c.966-.134,1.695-.984,1.695-1.976v-6.072c0-1.654-1.346-3-3-3H4c-1.654,0-3,1.346-3,3v6.072c0,.992.729,1.842,1.695,1.976,2.455.341,4.305,2.47,4.305,4.952s-1.851,4.611-4.305,4.952c-.966.134-1.695.983-1.695,1.976v6.072c0,1.654,1.346,3,3,3h40c1.654,0,3-1.346,3-3v-6.072c0-.993-.729-1.842-1.695-1.976-2.455-.341-4.305-2.47-4.305-4.952s1.851-4.612,4.305-4.952Zm-6.305,4.952c0,3.475,2.592,6.456,6,6.928v6.072c0,.551-.449,1-1,1h-27v-2.333c0-.552-.448-1-1-1s-1,.448-1,1v2.333H4c-.551,0-1-.449-1-1l-.03-6.066c3.438-.478,6.03-3.458,6.03-6.934s-2.592-6.456-6-6.928v-6.072c0-.552.449-1,1-1h11v2.333c0,.552.448,1,1,1s1-.448,1-1v-2.333h27c.551,0,1,.448,1,1l.03,6.067c-3.438.477-6.03,3.458-6.03,6.933Z"></path><path fill="#08105e" d="M16 15.417c-.552 0-1 .448-1 1v2.333c0 .552.448 1 1 1s1-.448 1-1v-2.333c0-.552-.448-1-1-1zM16 21.833c-.552 0-1 .448-1 1v2.333c0 .552.448 1 1 1s1-.448 1-1v-2.333c0-.552-.448-1-1-1zM16 28.25c-.552 0-1 .448-1 1v2.333c0 .552.448 1 1 1s1-.448 1-1v-2.333c0-.552-.448-1-1-1z"></path></svg>
                <span className="text-gray-700 text-sm ps-2">
                  Voucher
                </span>
              </Link>
            </div>
            <div className="your-purchase mb-3">
              <Link className="focus:bg-gray-200 flex items-center bg-slate-200/30 backdrop-blur-0 p-3 rounded-lg" to="coin/">
                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" id="coin"><g transform="translate(370 -322)"><circle cx="-340" cy="352" r="24" fill="#ecb751"></circle><path fill="#fdefb4" d="m -340,328 a 23.999998,23.999998 0 0 0 -24,24 23.999998,23.999998 0 0 0 0.80859,6.125 l 29.30274,-29.30273 A 23.999998,23.999998 0 0 0 -340,328 Z m 8.22852,1.48633 -30.75,30.75 a 23.999998,23.999998 0 0 0 1.30273,2.94726 l 32.40234,-32.40234 a 23.999998,23.999998 0 0 0 -2.95507,-1.29492 z m 14.40234,14.60742 -30.53711,30.53711 a 23.999998,23.999998 0 0 0 2.61523,0.75781 l 28.67188,-28.67187 a 23.999998,23.999998 0 0 0 -0.75,-2.62305 z"></path><circle cx="-340" cy="352" r="19" fill="#fad461"></circle><path fill="#ecb751" d="m -332.74023,334.44922 a 19.000002,19.000002 0 0 1 7.93945,15.42969 19.000002,19.000002 0 0 1 -19,19 19.000002,19.000002 0 0 1 -7.25781,-1.44922 A 19.000002,19.000002 0 0 0 -340,371 a 19.000002,19.000002 0 0 0 19,-19 19.000002,19.000002 0 0 0 -11.74023,-17.55078 z"></path><path fill="#2d3a66" className="leading-normal indent-0 text-left no-underline decoration-black decoration-solid normal-case isolation-auto mix-blend-normal" d="m -340,327 c -13.79527,0 -25,11.20473 -25,25 0,13.79527 11.20473,25 25,25 13.79527,0 25,-11.20473 25,-25 0,-13.79527 -11.20473,-25 -25,-25 z m 0,2 c 12.71439,0 23,10.28561 23,23 0,12.71439 -10.28561,23 -23,23 -12.71439,0 -23,-10.28561 -23,-23 0,-12.71439 10.28561,-23 23,-23 z m 0,3 c -11.03385,0 -20,8.96615 -20,20 0,4.47859 1.47574,8.62426 3.9668,11.95898 a 1.0005843,1.0005843 0 0 0 1.60351,-1.19726 C -356.67253,359.75928 -358,356.03987 -358,352 c 0,-9.95297 8.04703,-18 18,-18 9.95297,0 18,8.04703 18,18 0,9.95297 -8.04703,18 -18,18 -2.90317,0 -5.63881,-0.68455 -8.06445,-1.90234 a 1.0001196,1.0001196 0 1 0 -0.89844,1.78711 c 2.6962,1.35362 5.74444,2.11523 8.96289,2.11523 11.03385,0 20,-8.96615 20,-20 0,-11.03385 -8.96615,-20 -20,-20 z m -0.0156,8.00977 A 1.0001,1.0001 0 0 0 -341,341.02344 l 0,1.82812 c -0.129,0.0229 -0.25818,0.0326 -0.38672,0.0645 a 1.0000999,1.0000999 0 0 0 -0.002,0 c -2.34794,0.58291 -4.05078,2.59832 -4.05078,4.94336 0,2.33692 1.69345,4.34308 4.02929,4.93359 1.39014,0.42125 2.22115,0.24654 3.18946,0.64062 1.33427,0.73365 1.93635,2.11188 1.55273,3.4375 -0.38734,1.33832 -1.73256,2.32618 -3.32812,2.32618 -1.59557,0 -2.94273,-0.98786 -3.33008,-2.32618 a 1.0004338,1.0004338 0 1 0 -1.92188,0.55664 c 0.56125,1.93903 2.24731,3.32071 4.24805,3.67383 l 0,1.875 a 1.0001,1.0001 0 1 0 2,0 l 0,-1.87304 c 2.00384,-0.35084 3.69196,-1.73418 4.25391,-3.67579 0.65324,-2.25735 -0.43841,-4.65375 -2.5586,-5.78711 a 1.0000999,1.0000999 0 0 0 -0.0801,-0.0371 c -1.50119,-0.63822 -2.5095,-0.43015 -3.46679,-0.72657 a 1.0000999,1.0000999 0 0 0 -0.0547,-0.0156 c -1.53561,-0.38123 -2.53319,-1.62452 -2.5332,-3.00195 10e-6,-1.37791 0.99753,-2.62071 2.5332,-3.00196 1.5356,-0.38081 3.14672,0.25626 3.90625,1.47461 a 1.0001673,1.0001673 0 1 0 1.69727,-1.05859 c -0.82543,-1.32407 -2.19033,-2.1809 -3.69727,-2.44336 l 0,-1.80664 a 1.0001,1.0001 0 0 0 -1.01562,-1.01367 z m 14.89453,15.38671 a 0.50005,0.50005 0 0 0 -0.45508,0.38086 c -0.7302,2.78803 -2.25554,5.31184 -4.39453,7.25586 a 0.50005,0.50005 0 1 0 0.67187,0.74024 c 2.28269,-2.07462 3.91217,-4.76692 4.69141,-7.74219 a 0.50005,0.50005 0 0 0 -0.46289,-0.63477 0.50005,0.50005 0 0 0 -0.0508,0 z m -6.52149,9.04493 a 0.50005,0.50005 0 0 0 -0.26758,0.084 c -0.20732,0.13384 -0.41961,0.2625 -0.63476,0.38672 a 0.50050437,0.50050437 0 0 0 0.5,0.86719 c 0.22952,-0.13252 0.45458,-0.27127 0.67578,-0.41407 a 0.50005,0.50005 0 0 0 -0.27344,-0.92382 z m -20.83398,0.85937 a 1.0001,1.0001 0 0 0 -0.67969,1.76172 c 0.25692,0.22458 0.51884,0.4429 0.78711,0.6543 a 1.0001,1.0001 0 1 0 1.23828,-1.57032 c -0.24157,-0.19036 -0.47762,-0.3876 -0.70898,-0.58984 a 1.0001,1.0001 0 0 0 -0.63672,-0.25586 z" color="#000" font-family="sans-serif" font-weight="400" overflow="visible"></path><ellipse cx="-129.048" cy="474.108" fill="#fdefb4" rx="5.314" ry="7.517" transform="rotate(30)"></ellipse><ellipse cx="-351.299" cy="357.187" fill="#fdefb4" rx="2.953" ry="2.228"></ellipse><path fill="#8d8d81" d="m -342.88867,343.54102 c -1.53578,0.91141 -2.55078,2.51306 -2.55078,4.31835 0,0.7137 0.17303,1.38868 0.45898,2.00977 a 5.3136654,7.5168929 30 0 0 0.76953,-1.14648 5.3136654,7.5168929 30 0 0 1.32227,-5.18164 z" color="#000" font-family="sans-serif" font-weight="400" overflow="visible" className="leading-normal indent-0 text-left no-underline decoration-solid decoration-black normal-case isolation-auto mix-blend-normal"></path><path fill="#8d8d81" className="leading-normal indent-0 text-left no-underline decoration-solid decoration-black normal-case isolation-auto mix-blend-normal" d="m -342.88867,343.54102 c -1.53578,0.91141 -2.55078,2.51306 -2.55078,4.31835 0,0.7137 0.17303,1.38868 0.45898,2.00977 a 5.3136654,7.5168929 30 0 0 0.76953,-1.14648 5.3136654,7.5168929 30 0 0 1.32227,-5.18164 z" color="#000" font-family="sans-serif" font-weight="400" overflow="visible"></path></g></svg>
                <span className="text-gray-700 text-sm ps-2">
                  Xu
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-10 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutUserComponent;
