import React, { useContext, useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Form, Input, InputNumber } from "antd";
import type { FormInstance } from "antd/es/form";
import { MdDeleteForever } from "react-icons/md";
import {
  CustomButton as Button,
  CustomTable as Table,
} from "@/lib/AntdComponents";
import { dataType } from "./CreateInvoice";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

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
  type?: string;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  type,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const numinputRef = useRef<HTMLInputElement>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef?.current!?.focus();
      numinputRef?.current!?.focus();
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
        {title === "items" ? (
          <Input
            placeholder="Enter Item"
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
          />
        ) : (
          <InputNumber
            controls={false}
            ref={numinputRef}
            onPressEnter={save}
            onBlur={save}
          />
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
  itemName: string;
  itemQty: number;
  itemPrice: number;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const ItemsTable = ({
  dataSource,
  setDataSource,
  setFormData,
}: {
  dataSource: DataType[];
  setDataSource: React.Dispatch<React.SetStateAction<DataType[]>>;
  setFormData: React.Dispatch<React.SetStateAction<dataType>>;
}) => {
  const [count, setCount] = useState(1);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
    type?: string;
  })[] = [
    {
      title: "items",
      dataIndex: "itemName",
      width: "30%",
      editable: true,
    },
    {
      title: "quantity",
      dataIndex: "itemQty",
      editable: true,
      type: "number",
    },
    {
      title: "Price",
      dataIndex: "itemPrice",
      editable: true,
      type: "number",
    },
    {
      title: "Amount",
      dataIndex: "",
      render: (_, record) => {
        const amount = record?.itemQty * record?.itemPrice;
        return <h5>{amount}</h5>;
      },
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
      itemName: "enter item name...",
      itemQty: 0,
      itemPrice: 0,
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
    const total = newData
      .map((e) => e.itemQty * e.itemPrice)
      .reduce((a, b) => a + b, 0);
    setFormData((prev) => ({
      ...prev,
      amount: total,
      tax: 0,
      taxPercent: 0,
      discount: 0,
      discountPercent: 0,
      shipping: 0,
    }));
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
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
      <Button onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Items
      </Button>
    </div>
  );
};

export default ItemsTable;
