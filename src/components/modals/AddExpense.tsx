import { Button, DatePicker, Form, Input, Modal, Select } from "antd";

interface AddExpenseProps {
  isExpenseModalVisible: boolean;
  handleExpenseModalCancel: () => void;
  onFinish: (values: any, type: string) => void;
}

export default function AddExpense({
  isExpenseModalVisible,
  handleExpenseModalCancel,
  onFinish,
}: AddExpenseProps) {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Add Expenses"
      visible={isExpenseModalVisible}
      onCancel={handleExpenseModalCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the amount for your expenses",
            },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the expenses date" },
          ]}
        >
          <DatePicker className="custom-input" format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Tag"
          name="tag"
          style={{ fontWeight: 600 }}
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select className="select-input-2">
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="education">Learning</Select.Option>
            <Select.Option value="work">Work</Select.Option>
            <Select.Option value="health">Health and wellness</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="shopping">Shopping</Select.Option>
            <Select.Option value="misc">Miscellaneous</Select.Option>
            {/* Add more tags here */}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
