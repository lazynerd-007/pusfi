import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import { TabsProps } from "antd";
import All from "./ticket-tabs/All";
import Ongoing from "./ticket-tabs/Ongoing";
import New from "./ticket-tabs/New";
import Resolved from "./ticket-tabs/Resolved";
import AllIcons from "./icons/AllIcons";
import NewIcon from "./icons/NewIcon";
import ResolvedIcon from "./icons/ResolvedIcon";
import OnGoingIcon from "./icons/OnGoingIcon";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <span className="flex items-center gap-[0.2rem]">
        <AllIcons />
        <p className="text-inherit text[#181336] text-[16px] font-[400]">
          All Tickets
        </p>
      </span>
    ),
    children: <All />,
  },
  {
    key: "2",
    label: (
      <span className="flex items-center gap-[0.2rem]">
        <NewIcon />
        <p className="text-inherit text[#181336] text-[16px] font-[400]">New</p>
      </span>
    ),
    children: <New />,
  },
  {
    key: "3",
    label: (
      <span className="flex items-center gap-[0.2rem]">
        <OnGoingIcon />
        <p className="text-inherit text[#181336] text-[16px] font-[400]">
          On-Going
        </p>
      </span>
    ),
    children: <Ongoing />,
  },
  {
    key: "4",
    label: (
      <span className="flex items-center gap-[0.2rem]">
        <ResolvedIcon />
        <p className="text-inherit text[#181336] text-[16px] font-[400]">
          Resolved
        </p>
      </span>
    ),
    children: <Resolved />,
  },
];
const TicketTabs = () => {
  return <Tabs defaultActiveKey="1" items={items} />;
};

export default TicketTabs;
