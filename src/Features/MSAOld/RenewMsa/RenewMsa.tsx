import styles from "../Msa.module.css";
import { Button, DatePicker, Form, Input, Upload, Spin } from "antd";
import { FilePdfOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { RenewMsaPropType } from "./types";
import RenewMsaModal from "./RenewMsaModal";
import Toast from "../../../Components/Toast/Toast";
// import BreadCrumbs from "../../../Components/BreadCrumbs/Breadcrumbs";

const RenewMsa = ({
  msa_ref_id,
  handleInputChange,
  handleStartDateChange,
  handleEndDateChange,
  fileName,
  handleFileUpload,
  submitRenewMsa,
  region,
  clientName,
  visible,
  onCancel,
  modalPopUp,
  spinning,
  msaRenewed,
  beforeUpload,
}: RenewMsaPropType) => {
  console.log(msaRenewed);
  return (
    <>
      {/* <BreadCrumbs
        style={{
          marginLeft: "16rem",
          marginTop: "0.5rem",
          fontSize: 16,
          // color: "red !important",
          fontStyle: "italic",
        }}
      /> */}
      <div className={styles.AddMsa}>
        <div>
          <h3 className={styles.AddMsa_Heading}>
            RENEW MASTER SERVICE AGREEMENT
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
          >
            <div className={styles.AddMsaDetails_row1}>
              <Form.Item
                className={styles.AddMsaDetails_row1_col1}
                name="msa_ref_id"
              >
                MSA Reference ID <br />
                <Input
                  name="msa_ref_id"
                  readOnly
                  className={styles.AddMsaDetails_inputs}
                  disabled
                  value={msa_ref_id}
                />
              </Form.Item>
              <Form.Item
                className={styles.AddMsaDetails_row1_col2}
                name="client_name"
              >
                Client Name
                <span className={styles.AddMsaDetails_star}>*</span>
                <br />
                <Input
                  name="client_name"
                  value={clientName}
                  className={styles.AddMsaDetails_inputs}
                  onChange={handleInputChange}
                  disabled
                />
              </Form.Item>
              <Form.Item
                className={styles.AddMsaDetails_row1_col3}
                name="region"
              >
                Region
                <span className={styles.AddMsaDetails_star}>*</span>
                <br />
                <Input
                  name="region"
                  className={styles.AddMsaDetails_inputs}
                  value={region}
                  disabled
                />
              </Form.Item>
            </div>
            <div className={styles.AddMsaDetails_row2}>
              <Form.Item<string>
                className={styles.AddMsaDetails_row2_col1}
                name="start_date"
              >
                Start Date
                <span className={styles.AddMsaDetails_star}>*</span>
                <br />
                <DatePicker
                  format="YYYY-MM-DD"
                  className={styles.AddMsaDetails_inputs}
                  onChange={handleStartDateChange}
                  required
                />
              </Form.Item>
              <Form.Item
                className={styles.AddMsaDetails_row2_col2}
                name="end_date"
                required
              >
                End Date
                <span className={styles.AddMsaDetails_star}>*</span>
                <br />
                <DatePicker
                  format="YYYY-MM-DD"
                  className={styles.AddMsaDetails_inputs}
                  onChange={handleEndDateChange}
                />
              </Form.Item>
            </div>
            <div className={styles.AddMsaDetails_row3}>
              <Form.Item
                name="file"
                className={styles.AddMsaDetails_row3_col1}
                required
              >
                Upload Master Service Agreement
                <span className={styles.AddMsaDetails_star}>*</span>
                <br />
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
                    accept=".pdf,.docx"
                    beforeUpload={beforeUpload}
                    customRequest={handleFileUpload}
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
              >
                Comments/Remarks
                <span className={styles.AddMsaDetails_star}>*</span>
                <br />
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
              onClick={modalPopUp}
            >
              Renew MSA
            </Button>
          </Form>
        </div>
        <RenewMsaModal
          visible={visible}
          submitRenewMsa={submitRenewMsa}
          onCancel={onCancel}
        />
        <Spin spinning={spinning} fullscreen />
        {msaRenewed && (
          <Toast messageType="success" message="MSA Renewd"></Toast>
        )}
      </div>
    </>
  );
};

export default RenewMsa;
