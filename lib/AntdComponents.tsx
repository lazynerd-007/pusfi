"use client";
import {
  ConfigProvider,
  Button,
  ButtonProps,
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  Radio,
  RadioProps,
  RadioGroupProps,
  Tabs,
  TabsProps,
  Upload,
  UploadProps,
  Select,
  SelectProps,
  DatePicker,
  DatePickerProps,
  Checkbox,
  CheckboxProps,
  Table,
  TableProps,
  MenuProps,
  Menu,
  TimePicker,
  TimePickerProps,
  Switch,
  SwitchProps,
  Spin,
  SpinProps,
  Tooltip,
  TooltipProps,
  Modal,
  ModalProps,
  Collapse,
  CollapseProps,
  CollapsePanelProps,
  Steps,
  StepsProps,
} from "antd";
import { TextAreaProps } from "antd/es/input";
import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });
const primaryConfig = {
  fontFamily: archivo.style.fontFamily,
  colorPrimary: "#000000",
};

export const CustomButton = ({ ...props }: ButtonProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig, borderRadius: 5 } }}>
    <Button {...props} />
  </ConfigProvider>
);
export const CustomPasswordInput = ({ ...props }: InputProps) => (
  <ConfigProvider
    theme={{
      token: {
        ...primaryConfig,
      },
    }}
  >
    <Input.Password {...props} />
  </ConfigProvider>
);

export const CustomInput = ({ ...props }: InputProps) => (
  <ConfigProvider
    theme={{
      token: { ...primaryConfig },
    }}
  >
    <Input {...props} />
  </ConfigProvider>
);
export const CustomInputNumber = ({ ...props }: InputNumberProps) => (
  <ConfigProvider
    theme={{
      token: { ...primaryConfig },
    }}
  >
    <InputNumber controls={false} {...props} />
  </ConfigProvider>
);
export const CustomText = ({ ...props }: TextAreaProps) => (
  <ConfigProvider
    theme={{
      token: { ...primaryConfig },
    }}
  >
    <Input.TextArea {...props} />
  </ConfigProvider>
);
export const CustomRadio = ({ ...props }: RadioProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Radio {...props} />
  </ConfigProvider>
);
export const CustomRadioGroup = ({ ...props }: RadioGroupProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Radio.Group {...props} />
  </ConfigProvider>
);
export const CustomTabs = ({ ...props }: TabsProps) => (
  <ConfigProvider
    theme={{
      token: { ...primaryConfig },
      components: {
        Tabs: {
          itemSelectedColor: "#181336",
          itemActiveColor: "#181336",
          itemColor: "#515B6F",
          fontSize: 16,
          fontWeightStrong: 600,
        },
      },
    }}
  >
    <Tabs {...props} />
  </ConfigProvider>
);

export const CustomUpload = ({ ...props }: UploadProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Upload {...props} />
  </ConfigProvider>
);

export const CustomSelect = ({ ...props }: SelectProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Select {...props} />
  </ConfigProvider>
);

export const CustomDatePicker = ({ ...props }: DatePickerProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <DatePicker {...props} />
  </ConfigProvider>
);

export const CustomTimePicker = ({ ...props }: TimePickerProps) => (
  <ConfigProvider>
    <TimePicker {...props} />
  </ConfigProvider>
);

export const CustomCheckBox = ({ ...props }: CheckboxProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Checkbox {...props} />
  </ConfigProvider>
);

export const ThemeRadioGroup = ({ ...props }: RadioGroupProps) => (
  <ConfigProvider
    theme={{
      token: {
        ...primaryConfig,
        borderRadius: 5,
      },
      components: {
        Radio: {
          buttonBg: "transparent",
          buttonCheckedBg: "rgb(0, 0, 0,0.5)",
          buttonSolidCheckedColor: "rgb(0, 0, 0,0.5)",
          colorBorder: "rgb(0, 0, 0,0.1)",
        },
      },
    }}
  >
    <Radio.Group
      {...props}
      style={{
        borderRadius: 8,
        textAlign: "center",
      }}
    />
  </ConfigProvider>
);

export const ThemeRadioButton = ({ ...props }: RadioProps) => (
  <ConfigProvider
    theme={{
      token: {
        ...primaryConfig,
        borderRadius: 5,
      },
      components: {
        Radio: {
          buttonCheckedBg: "rgb(0, 0, 0,0.5)",
          buttonSolidCheckedColor: "rgb(0, 0, 0,0.5)",
          colorBorder: "rgb(0, 0, 0,0.1)",
        },
      },
    }}
  >
    <Radio.Button
      {...props}
      style={{
        borderRadius: 8,
        textAlign: "center",
        color: "#000",
        width: "100%",
        ...props.style,
      }}
    />
  </ConfigProvider>
);

export const CustomTable = ({ ...props }: TableProps<any>) => (
  <ConfigProvider
    theme={{
      token: {
        ...primaryConfig,
        borderRadius: 5,
      },
    }}
  >
    <Table {...props} />
  </ConfigProvider>
);

export const CustomMenu = ({ ...props }: MenuProps) => (
  <ConfigProvider
    theme={{
      token: {
        borderRadius: 5,
        fontSize: 16,
        ...primaryConfig,
      },
      components: {
        Menu: {},
      },
    }}
  >
    <Menu {...props} />
  </ConfigProvider>
);

export const CustomSwitch = ({ ...props }: SwitchProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Switch {...props} />
  </ConfigProvider>
);

export const CustomSpinner = ({ ...props }: SpinProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Spin {...props} />
  </ConfigProvider>
);

export const CustomTooltip = ({ ...props }: TooltipProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Tooltip {...props} />
  </ConfigProvider>
);

export const CustomModal = ({ ...props }: ModalProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Modal {...props} />
  </ConfigProvider>
);

export const CustomCollapse = ({ ...props }: CollapseProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Collapse {...props} />
  </ConfigProvider>
);

export const CustomCollapsePanel = ({ ...props }: CollapsePanelProps) => (
  <ConfigProvider theme={{ token: { ...primaryConfig } }}>
    <Collapse.Panel {...props} />
  </ConfigProvider>
);

export const CustomSteps = ({ ...props }: StepsProps) => (
  <ConfigProvider
    theme={{
      token: { borderRadius: 5, ...primaryConfig },
    }}
  >
    <Steps {...props} />
  </ConfigProvider>
);

export const CustomDragger = ({ ...props }: UploadProps) => (
  <ConfigProvider
    theme={{
      token: {
        borderRadius: 5,
        ...primaryConfig,
      },
    }}
  >
    <Upload.Dragger
      {...props}
      style={{
        border: "3px dashed #000000"
      }}
    />
  </ConfigProvider>
);
