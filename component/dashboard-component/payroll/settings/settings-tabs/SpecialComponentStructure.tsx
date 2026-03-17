import React, { useContext, useEffect, useRef, useState } from "react";
import type { InputRef, RefSelectProps } from "antd";
import { Form, Input, InputNumber, Select } from "antd";
import type { FormInstance } from "antd/es/form";
import { MdDeleteForever } from "react-icons/md";
import {
  CustomButton as Button,
  CustomTable as Table,
} from "@/lib/AntdComponents";
import { message } from "antd";

const EditableContext = React.createContext<FormInstance<any> | null>(null);
const typeOptions = [
  { label: "Deductable", value: "deductable" },
  { label: "Bonus", value: "bonus" },
];
interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
  dataType?: string;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  dataType,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const numinputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<RefSelectProps>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      selectRef.current!?.focus();
      inputRef.current!?.focus();
      numinputRef.current!?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {title === "Amount" ? (
          <InputNumber
            suffix="NGN"
            ref={numinputRef}
            onPressEnter={save}
            onBlur={save}
            controls={false}
            placeholder="Enter Amount"
            className="!w-[10rem]"
          />
        ) : (
          <>
            {title === "Type" ? (
              <Select
                onSelect={save}
                ref={selectRef}
                options={typeOptions}
                defaultValue={typeOptions[0].value}
              />
            ) : (
              <Input
                placeholder="Enter Item"
                ref={inputRef}
                onPressEnter={save}
                onBlur={save}
              />
            )}
          </>
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  title: string;
  amount: number;
  name: string;
  type: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const SpecialStructureTable = ({
  dataSource,
  setDataSource,
}: {
  dataSource: DataType[];
  setDataSource: React.Dispatch<React.SetStateAction<DataType[]>>;
}) => {
  const [count, setCount] = useState(1);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
    dataType?: string;
  })[] = [
    {
      title: "Special Component",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      editable: true,
      dataType: "number",
    },
    {
      title: "Type",
      dataIndex: "type",
      editable: true,
      dataType: "select",
    },
    {
      dataIndex: "operation",
      render: (_, record) => (
        <Button
          onClick={() => handleDelete(record.key)}
          disabled={record.key === 0}
          icon={<MdDeleteForever />}
          className="!ml-auto"
        />
      ),
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      name: "Enter Component Title",
      amount: 0,
      type: "deductible",
      title: "Special Component",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      {dataSource?.length > 0 && (
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
          pagination={false}
        />
      )}
      <Button
        className="!mt-1"
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Add Item
      </Button>
    </div>
  );
};

export default SpecialStructureTable;
