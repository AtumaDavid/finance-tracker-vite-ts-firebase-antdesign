import { Button, DatePicker, Form, Input, Modal, Select } from "antd";

interface AddIncomeProps {
  isIncomeModalVisible: boolean;
  handleIncomeModalCancel: () => void;
  onFinish: (values: any, type: string) => void;
}

export default function AddIncome({
  isIncomeModalVisible,
  handleIncomeModalCancel,
  onFinish,
}: AddIncomeProps) {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Add Income"
      visible={isIncomeModalVisible}
      onCancel={handleIncomeModalCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "Income");
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
              message: "Please input the income amount",
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
            {
              required: true,
              message: "Please select the income date",
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" className="custom-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
              message: "Please select a tag",
            },
          ]}
        >
          <Select className="select-input-2">
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
            {/* Add more tags here */}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
