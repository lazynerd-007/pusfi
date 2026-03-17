import { CustomButton as Button } from "@/lib/AntdComponents";
import { useCardCheckoutMutation } from "@/services/collection";
import { message } from "antd";
import { useState, ChangeEvent } from "react";



interface Data {
  businessId: string;
  email: string
}

const Card: React.FC<Data> = ({businessId, email}) => {
  const [checkout, {isLoading: laoding}] = useCardCheckoutMutation()

  const [data, setData] = useState({ 
    email: email,
    amount: "",
    callBack: "https://app.pursfinance.com/cardReceipt",
    businessId: businessId
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      amount: e.target.value
    });
  };

  const payNow=()=>{
    checkout(data).unwrap()
    .then((response)=>{
      window.location.href = response?.data?.authorization_url;
    }).catch(()=>{
      message.error("payment failed")
    })
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="relative mb[1rem]">
        <label
          className="absolute top-[10%] text-[12px] px-[16px] text-[#899A9A]"
          htmlFor="cardNumber"
        >
          Amount to Pay
        </label>
        <input
          required={true}
          id="amount"
          name="amount"
          placeholder="10000"
          value={data.amount}
          onChange={handleChange}
          className="w-full h-[50px] text-[12px] py[20px] pt-[10px] px-[16px] rounded-[5px] border-solid border-[1.5px] text-[#899A9A] border-[#B8C9C9] focus-visible:outline-[#3180E7]"
        />
      </div>
   
      <Button
      loading={laoding}
      onClick={payNow}
      >
        Pay Now</Button>
    </div>
  );
};

export default Card;
