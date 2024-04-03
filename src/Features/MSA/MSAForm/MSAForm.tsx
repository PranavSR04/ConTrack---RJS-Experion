import React from 'react'
import styles from './MSAForm.module.css'
import { Button, DatePicker, Form, Input, Modal, Spin, Upload } from 'antd'
import { useNavigate } from 'react-router'
import { MSAFormProps } from './types'
import { FilePdfOutlined, PlusOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import moment from 'moment'
const MSAForm = ({
  msaData,
  fileName,
  handleFileUpload,
  beforeUpload,
  handleMSAForm,
  isModalVisible,
  handleSubmitForm,
  handleCancel,
  spinning,
  headingText,
   handleInputChange,
   handleStartDateChange,
   handleEndDateChange,
   validateStartDate
}
  :MSAFormProps) => {
    console.log(msaData.start_date)
  return (
    <div className={styles.MSAForm}>
      <h3 className={styles.MSAForm__heading}>
        {headingText} MASTER SERVICE AGREEMENT</h3>
      <div className={styles.MSAForm__Form}>
      <h4 className={styles.MSAForm__Form__Heading}>
            Master Service Agreement Details
          </h4>
      <Form
            name="complex-form"
            encType="multipart/form-data"
            style={{ maxWidth: 600 }}
            onFinish={handleSubmitForm}
            requiredMark={false}
          >
            <div className={styles.MSAForm__Form__row1}>
              <Form.Item
                className={styles.MSAForm__Form__row1__col1}
                name="msa_ref_id"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label="MSA Reference ID"
                valuePropName={msaData.msa_ref_id}
              >
                <Input
                  name="msa_ref_id"
                  value={msaData.msa_ref_id}
                  readOnly
                  className={styles.MSAForm__Form__input__msa_ref_id}
                />
              </Form.Item>
              <Form.Item
                className={styles.MSAForm__Form__row1__col2}
                name="client_name"
                valuePropName={msaData.client_name}
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
                  value={msaData.client_name}
                  className={styles.MSAForm__Form__inputs}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                className={styles.MSAForm__Form__row1__col3}
                name="region"
                label={
                  <div>
                    Region
                    <span style={{ color: "red" }}> *</span>
                  </div>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                valuePropName={msaData.region}
                rules={[
                  { required: true, message: "Please enter the Region" },

                ]}
              >
                <Input
                  name="region"
                  value={msaData.region}
                  className={styles.MSAForm__Form__inputs}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </div>
            <div className={styles.MSAForm__Form__row2}>
              <Form.Item
                className={styles.MSAForm__Form__row2__col1}
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
                    {
                      validator: validateStartDate,
                    }
                ]}
                valuePropName={msaData.start_date}
              >
                <DatePicker
                  className={styles.MSAForm__Form__inputs}
                  onChange={handleStartDateChange}

                  required
                />
              </Form.Item>
              <Form.Item
                className={styles.MSAForm__Form__row2__col2}
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
                ]}
                valuePropName={msaData.end_date}
              >
                <DatePicker
                  className={styles.MSAForm__Form__inputs}
                  onChange={handleEndDateChange}

                  required
                />
              </Form.Item>
            </div>
            <div className={styles.MSAForm__Form__row3}>
              <Form.Item
                name="file"
                className={styles.MSAForm__Form__row3__col1}
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
                      className={styles.MSAForm__Form__row3__col1__fileicon}
                    />
                    <br />
                    <p className={styles.MSAForm__Form__row3__col1__filename}>
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
                      <PlusOutlined/>
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                  </Upload>
                )}
              </Form.Item>
              <Form.Item
                name="comments"
                className={styles.MSAForm__Form__row3__col2}
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
              className={styles.MSAForm__Form__Button}
              type="primary"
              htmlType='submit'
              onClick={handleSubmitForm}
            >
              {headingText} MSA
            </Button>

            {/* <Modal
              title="Are you sure you want to submit this Form?"
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={[
                <Button
                  className={styles.MSAForm__Form__ModalOk}
                  type='primary'
                  key="ok"
                  onClick={handleSubmitForm}
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
            </Modal> */}
          </Form>
      </div>
    </div>
  )
}

export default MSAForm
