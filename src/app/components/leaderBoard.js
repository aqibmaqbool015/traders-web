import { userLeader } from "../constant";

const Leaderboard = () => {
    return (
        <>
            <h2 className="text-2xl text-customBlue font-semibold mb-4">Leaderboard</h2>
            {userLeader.map((user, index) => (
                <div key={index} className="flex items-end space-x-3 border-b border-b-customBg pb-3 mb-3">
                    <img src={user.avatar} alt="" className="w-[50px] h-[50px] inline-block object-contain " />
                    <div className="flex-1">
                        <p className="font-normal text-[20px] text-customBlue ">{user.name}</p>
                        <div className='flex items-center'>
                            <img src={user.star} alt='' className='w-[16px] h-[16px] mr-2 object-contain inline-block ' />
                            <h3 className='text-sm text-customDarkGray'>
                                {user.lastMessage}
                            </h3>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='mx-2'>
                            <p className='text-[18px] text-customDarkGray font-normal  text-center'>
                                {user.sold}
                            </p>
                            <div className='w-[50px] flex justify-center items-center text-center h-[50px] rounded-[10px] border border-customOrange bg-customOrangeLightBg text-customOrange'>
                                {user.count}
                            </div>
                        </div>
                        <div className='mx-2'>
                            <p className='text-[18px] text-customDarkGray font-normal  text-center'>
                                {user.sales}
                            </p>
                            <div className='w-[50px] flex justify-center items-center text-center h-[50px] rounded-[10px] border border-customOrange bg-customOrangeLightBg text-customOrange'>
                                {user.count1}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className='flex justify-between items-center'>
                <p className="font-medium text-[16px] text-customBlue capitalize cursor-pointer">
                    previous
                </p>
                <div className='cursor-pointer mt-3'>
                    <p className="font-normal text-[15px] mx-1 inline-block text-white bg-customBlue rounded-full w-[23px] h-[23px] text-center  capitalize ">
                        1
                    </p>
                    <p className="font-normal text-[15px] mx-1 inline-block text-customBlue bg-transparent rounded-full w-[23px] h-[23px] text-center  capitalize ">
                        2
                    </p>
                    <p className="font-normal text-[15px] mx-1 inline-block text-customBlue bg-transparent rounded-full w-[23px] h-[23px] text-center  capitalize ">
                        3
                    </p>
                </div>
                <p className="font-medium text-[16px] text-customBlue capitalize  cursor-pointer">
                    next
                </p>
            </div>
        </>
    );
};

export default Leaderboard;
