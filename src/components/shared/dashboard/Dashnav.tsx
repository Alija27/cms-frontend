import {RxHamburgerMenu} from "react-icons/rx"
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {useNavigate } from "react-router-dom";
import { logout } from "../../../app/feature/Auth/AuthApi";
import Buttons from "../buttons/Buttons";
const Dashnav = () => {
  const dispatch = useAppDispatch();
	const authState: any = useAppSelector((state) => state.AuthSlice);
  const navigate = useNavigate();

  const logoutUser = async () => {
		await dispatch(logout()).then(() => {
			navigate("/login");
		});
	};
  return (
    <>
      <div className="bg-white px-2 shadow py-3  flex justify-between mt-1">
        <div className="">
          <RxHamburgerMenu size={25}/>
        </div>
        <div>
      {/*    <FcManager size={28} className="border-2  rounded-full "/> */} 
         <Buttons onClick={logoutUser} text="Logout" type="submit" className="bg-red-500"/>
        {/* <HiOutlineUserCircle size={28} className="border-2  rounded-full "/> */}
        </div>
      </div>


    </>
  )
}

export default Dashnav