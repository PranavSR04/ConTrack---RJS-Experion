import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Spin,
  Upload,
} from "antd";
import { FilePdfOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import styles from "../Msa.module.css";
import { AddMsaPropsType } from "./types";
// import BreadCrumbs from "../../../Components/BreadCrumbs/Breadcrumbs";
const AddMsa = ({
  fileName,
  msaRefId,
  msaAdded,
  handleFileUpload,
  handleInputChange,
  handleDateChange,
  handleEndDateChange,
  handleAddMsa,
  isModalVisible,
  handleCancel,
  handleOk,
  validateStartDate,
  start_date,
  date_validate,
  spinning,
  beforeUpload,
}: AddMsaPropsType) => {
  return (
    <>
      <div className={styles.AddMsa}>
        <div>
          {/* <BreadCrumbs
            style={{
              marginTop: "-1rem",
              fontSize: 16,
              // color: "red !important",
              fontStyle: "italic",
            }}
          /> */}
          <br />
          <h3 className={styles.AddMsa_Heading}>
            ADD MASTER SERVICE AGREEMENT
          </h3>
        </div>
        <div className={styles.AddMsaDetails}>
          <h4 className={styles.AddMsaDetails_Heading}>
            Master Service Agreement Details
          </h4>
          <Form
            name="complex-form"
            encType="multipart/form-data"
            style={{ maxWidth: 600 }}
            requiredMark={false}
          >
            <div className={styles.AddMsaDetails_row1}>
              <Form.Item
                className={styles.AddMsaDetails_row1_col1}
                name="msa_ref_id"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label="MSA Reference ID"
                valuePropName={msaRefId}
              >
                <Input
                  name="msa_ref_id"
                  value={msaRefId}
                  readOnly
                  className={styles.AddMsaDetails_inputs_msarefid}
                />
              </Form.Item>
              <Form.Item
                className={styles.AddMsaDetails_row1_col2}
                name="client_name"
                label={
                  <div>
                    Client Name
                    <span style={{ color: "red" }}> *</span>
                  </div>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Please enter the Client Name" },
                  {
                    pattern: /^.{5,}$/,
                    message: "Client name must contain at least 5 characters",
                  },
                ]}
              >
                <Input
                  name="client_name"
                  className={styles.AddMsaDetails_inputs}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                className={styles.AddMsaDetails_row1_col3}
                name="region"
                label={
                  <div>
                    Region
                    <span style={{ color: "red" }}> *</span>
                  </div>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Please enter the Region" },
                  {
                    pattern: /^[a-zA-Z]+$/,
                    message: "Region must be letters",
                  },
                ]}
              >
                <Input
                  name="region"
                  className={styles.AddMsaDetails_inputs}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </div>
            <div className={styles.AddMsaDetails_row2}>
              <Form.Item
                className={styles.AddMsaDetails_row2_col1}
                name="start_date"
                label={
                  <div>
                    Start Date
                    <span style={{ color: "red" }}> *</span>
                  </div>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Please enter the Start Date" },
                ]}
              >
                <DatePicker
                  className={styles.AddMsaDetails_inputs_startdate}
                  onChange={handleDateChange}
                  required
                />
              </Form.Item>
              <Form.Item
                className={styles.AddMsaDetails_row2_col2}
                name="end_date"
                label={
                  <div>
                    End Date
                    <span style={{ color: "red" }}> *</span>
                  </div>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Please enter the End Date" },
                  {
                    validator: validateStartDate,
                  },
                ]}
              >
                <DatePicker
                  className={styles.AddMsaDetails_inputs}
                  onChange={handleEndDateChange}
                  required
                />
              </Form.Item>
            </div>
            <div className={styles.AddMsaDetails_row3}>
              <Form.Item
                name="file"
                className={styles.AddMsaDetails_row3_col1}
                label={
                  <div>
                    Upload Master Service Agreement
                    <span style={{ color: "red" }}> *</span>
                  </div>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Please upload File" }]}
              >
                {fileName ? (
                  <div>
                    <FilePdfOutlined
                      className={styles.AddMsaDetails_row3_col1_fileicon}
                    />
                    <br />
                    <p className={styles.AddMsaDetails_row3_col1_filename}>
                      {fileName}
                    </p>
                  </div>
                ) : (
                  <Upload
                    action=""
                    listType="picture-card"
                    fileList={[]}
                    accept=".pdf,.docx"
                    customRequest={handleFileUpload}
                    beforeUpload={beforeUpload}
                  >
                    <button
                      style={{ border: 0, background: "none" }}
                      type="button"
                    >
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                  </Upload>
                )}
              </Form.Item>
              <Form.Item
                name="comments"
                className={styles.AddMsaDetails_row3_col2}
                label={
                  <div>
                    Comments/Remarks
                    <span style={{ color: "red" }}> *</span>
                  </div>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <TextArea
                  rows={4}
                  name="comments"
                  onChange={handleInputChange}
                />
              </Form.Item>
            </div>
            <Button
              className={styles.AddMsaDetails_Button}
              type="primary"
              htmlType="submit"
              onClick={handleAddMsa}
            >
              Add MSA
            </Button>

            <Modal
              title="Are you sure you want to add this MSA?"
              visible={isModalVisible}
              onCancel={handleCancel}
              className={styles.modal_msa}
              footer={[
                <Button
                  className={styles.modal_okbutton}
                  key="ok"
                  onClick={handleOk}
                >
                  Yes
                </Button>,
                <Button
                  key="cancel"
                  className={styles.modal_cancelbutton}
                  onClick={handleCancel}
                >
                  No
                </Button>,
              ]}
            >
              <Spin spinning={spinning} fullscreen />
            </Modal>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddMsa;
