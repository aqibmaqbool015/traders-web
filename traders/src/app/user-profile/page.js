import UserInfoTab from "../components/UserInfoTab";
const image = {
    avatar: "/chat-user.png",
}

const UserProfile = () => {
    return (
        <>
            <div className=''>
                <div className="bg-white p-4 border-b border-b-customLightBorder flex items-center">
                    <img src={image.avatar} alt="" className="w-[40px] h-[40px] inline-block object-contain " />
                    <div>
                        <h1 className="font-bold text-lg text-customBlue mx-3">Danny Ayres</h1>
                        <p className="font-normal text-[13px] text-customMessage mx-3">abc@gmail.com</p>
                    </div>
                </div>
            </div>
            <UserInfoTab />

        </>
    );
}

export default UserProfile;